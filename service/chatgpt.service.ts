import { zip } from 'lodash'
import cloneDeep from 'lodash/cloneDeep'
import { PROMPT_CONSTANTS } from '../constants'
import { BlockType } from '../hooks/store/useSchema'
import chatGPTRepository from './repository/chatgpt.repository'

export type FlattenBlocksType = {
  description: string
  uuid: string
  metaData: string
  count: number | undefined
  keyName: string
}

class ChatGPTService {
  private START_WITH_NUMBER_REGEX = /\d+. ((.*))/
  private PADDING_WITH_DOUBLE_QUOTE = /\"(.*?)\"/
  private PADDING_WITH_SINGLE_QUOTE = /\'(.*?)\'/
  private blocks: BlockType[] = []
  private apiKey: string = ''
  flattenBlocks: FlattenBlocksType[] = []

  constructor(blocks: BlockType[], apiKey: string) {
    this.blocks = blocks
    this.apiKey = apiKey

    this.flattenBlocks = this.getFlattenBlocks()
  }

  private getGeneratedTextByChatGPT = async (props: {
    dataDescription: string
    apiKey: string
    n: number
  }) => {
    const data = await chatGPTRepository.getChatgptResponse({
      apiKey: props.apiKey,
      userContent: props.dataDescription,
      systemContent: PROMPT_CONSTANTS.system,
      n: props.n,
    })

    const content = data.data.choices[0].message.content
    // .replace('\\n', '\n')
    console.log('content:', content)
    return content.split('\n')
  }

  private getFlattenBlocks = (): FlattenBlocksType[] => {
    let flattenBlocks: (BlockType & {
      count?: number
    })[] = cloneDeep(this.blocks)

    while (true) {
      flattenBlocks = flattenBlocks
        .map(block => {
          const isObject = block.isObject && block.children.length > 0

          if (isObject)
            return block.children.map(innerBlock => {
              const counterInfo = {
                innerBlockArrayLength: innerBlock.isArray
                  ? innerBlock.arrayLength
                  : 1,
                blockCount: block.count ? block.count : 1,
                blockArrayLength: block.isArray ? block.arrayLength : 1,
              }

              return {
                ...innerBlock,
                count: (() => {
                  console.log('안녕', block)
                  // 현재 데이터의 생성 수 * (부모 요소의 생성 수 or 부모 요소의 상속 받은 생성 수) 숫자 대로 몇개의 데이터를 생성할지 결정한다.
                  if (block.count) {
                    return (
                      counterInfo.innerBlockArrayLength * counterInfo.blockCount
                    )
                  }

                  return (
                    counterInfo.blockArrayLength *
                    counterInfo.innerBlockArrayLength
                  )
                })(),
              }
            })

          return {
            ...block,
            count: (() => {
              if (block.isArray && block.arrayLength) return block.arrayLength
              return 1
            })(),
          }
        })
        .flat()

      const isAllFlatted = flattenBlocks.every(
        block => block.children.length === 0,
      )
      if (isAllFlatted) break
    }

    return flattenBlocks
      .filter(block => block.isObject === false)
      .map(block => ({
        description: block.description,
        uuid: block.uuid,
        metaData: block.metaData,
        count: block.count,
        keyName: block.keyName,
      }))
  }

  private getNormalizeFunctions = (props: {
    startWithNumber: boolean
    paddingWithDobuleQuote: boolean
    paddingWithSingleQuote: boolean
  }) => {
    const funcs = []

    if (props.startWithNumber)
      funcs.push((values: string[]) =>
        this.getExtractedTextWithRegex(this.START_WITH_NUMBER_REGEX, values),
      )

    if (props.paddingWithDobuleQuote)
      funcs.push((values: string[]) =>
        this.getExtractedTextWithRegex(this.PADDING_WITH_DOUBLE_QUOTE, values),
      )

    if (props.paddingWithSingleQuote)
      funcs.push((values: string[]) =>
        this.getExtractedTextWithRegex(this.PADDING_WITH_SINGLE_QUOTE, values),
      )

    funcs.push((values: string[]) => values.map(value => value.trim()))
    return funcs
  }

  private normalizeGeneratedText = (_textList: string[]) => {
    const textList = cloneDeep(_textList)

    const isStartWithIndex = textList.some(item =>
      this.START_WITH_NUMBER_REGEX.test(item),
    )
    const paddingWithDobuleQuote = textList.some(item =>
      this.PADDING_WITH_DOUBLE_QUOTE.test(item),
    )
    const paddingWithSingleQuote = textList.some(item =>
      this.PADDING_WITH_SINGLE_QUOTE.test(item),
    )

    const normalizedTextList = this.getNormalizeFunctions({
      isStartWithIndex,
      paddingWithDobuleQuote,
      paddingWithSingleQuote,
    }).reduce((acc, func) => func(acc), textList)

    return normalizedTextList
  }

  private getExtractedTextWithRegex = (reg: RegExp, values: string[]) =>
    values.map(item => [...(item.match(reg) as RegExpMatchArray)][1])

  public generateDummyData = async () => {
    const generatedDummyData = await Promise.all(
      this.flattenBlocks.map(block =>
        this.getGeneratedTextByChatGPT({
          dataDescription: block.description,
          apiKey: this.apiKey,
          n: block.count ?? 1,
        }),
      ),
    )

    console.log('generatedDummyData:', generatedDummyData)

    return zip(this.flattenBlocks, generatedDummyData).map(
      ([blockInfo, generatedDummyData]) => ({
        uuid: blockInfo?.uuid,
        count: blockInfo?.count,
        generatedDummyData: this.normalizeGeneratedText(
          generatedDummyData ?? [],
        ),
      }),
    )
  }
}

export default ChatGPTService
