import cloneDeep from 'lodash/cloneDeep'
import { PROMPT_CONSTANTS } from '../constants'
import { BlockType } from '../hooks/store/useSchema'
import chatGPTRepository from './repository/chatgpt.repository'

const START_WITH_NUMBER_REGEX = /\d+. ((.*))/
const PADDING_WITH_DOUBLE_QUOTE = /\"(.*?)\"/
const PADDING_WITH_SINGLE_QUOTE = /\'(.*?)\'/

export const generateTextWithChatgpt = async (props: {
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

  const content = data.data.choices[0].message.content.replace('\\n', '\n')

  return content.split('\n')
}

export const getFlattenBlocks = (blocks: BlockType[]) => {
  let flattenBlocks: (BlockType & {
    count?: number
  })[] = cloneDeep(blocks)

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

        return block
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
    }))
}

export const getDummyDataFromSchema = async (
  blocks: BlockType[],
  apiKey: string,
) => {
  const flattenBlocks = getFlattenBlocks(blocks)

  const generatedDummyData = await Promise.all(
    flattenBlocks.map(block =>
      generateTextWithChatgpt({
        dataDescription: block.description,
        apiKey,
        n: block.count ?? 1,
      }),
    ),
  )

  return generatedDummyData.map(normalizeGeneratedText)
}

const getExtractedTextWithRegex = (reg: RegExp, values: string[]) =>
  values.map(item => [...(item.match(reg) as RegExpMatchArray)][1])

const getNormalizeFunctions = (props: {
  startWithNumber: boolean
  paddingWithDobuleQuote: boolean
  paddingWithSingleQuote: boolean
}) => {
  const funcs = []

  if (props.startWithNumber)
    funcs.push((values: string[]) =>
      getExtractedTextWithRegex(START_WITH_NUMBER_REGEX, values),
    )

  if (props.paddingWithDobuleQuote)
    funcs.push((values: string[]) =>
      getExtractedTextWithRegex(PADDING_WITH_DOUBLE_QUOTE, values),
    )

  if (props.paddingWithSingleQuote)
    funcs.push((values: string[]) =>
      getExtractedTextWithRegex(PADDING_WITH_SINGLE_QUOTE, values),
    )

  funcs.push((values: string[]) => values.map(value => value.trim()))
  return funcs
}

export const normalizeGeneratedText = (_textList: string[]) => {
  const textList = cloneDeep(_textList)

  const startWithNumber = textList.some(item =>
    START_WITH_NUMBER_REGEX.test(item),
  )
  const paddingWithDobuleQuote = textList.some(item =>
    PADDING_WITH_DOUBLE_QUOTE.test(item),
  )
  const paddingWithSingleQuote = textList.some(item =>
    PADDING_WITH_SINGLE_QUOTE.test(item),
  )

  const normalizedTextList = getNormalizeFunctions({
    startWithNumber,
    paddingWithDobuleQuote,
    paddingWithSingleQuote,
  }).reduce((acc, func) => func(acc), textList)

  return normalizedTextList
}
