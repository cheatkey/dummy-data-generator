import cloneDeep from 'lodash/cloneDeep'
import { PROMPT_CONSTANTS } from '../constants'
import { BlockType } from '../hooks/store/useSchema'
import chatGPTRepository from './repository/chatgpt.repository'

export const generateTextWithChatgpt = (props: {
  dataDescription: string
  apiKey: string
}) => {
  return chatGPTRepository.getChatgptResponse({
    apiKey: props.apiKey,
    userContent: props.dataDescription,
    systemContent: PROMPT_CONSTANTS.system,
  })
}

export const getFlattenBlocks = (blocks: BlockType[]) => {
  let flattenBlocks: (BlockType & {
    count?: number
  })[] = cloneDeep(blocks)
  while (true) {
    flattenBlocks = flattenBlocks
      .map(block => {
        if (block.isObject && block.children.length > 0)
          return block.children.map(innerBlock => ({
            ...innerBlock,
            count: (() => {
              // 현재 데이터의 생성 수 * (부모 요소의 생성 수 or 부모 요소의 상속 받은 생성 수) 숫자 대로 몇개의 데이터를 생성할지 결정한다.
              if (block.count) {
                return (
                  (innerBlock.isArray ? innerBlock.arrayLength : 1) *
                  (block.count ? block.count : 1)
                )
              }

              return (
                (block.isArray ? block.arrayLength : 1) *
                (innerBlock.isArray ? innerBlock.arrayLength : 1)
              )
            })(),
          }))

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

export const getDummyDataFromSchema = (blocks: BlockType[]) => {
  const flattenBlocks = getFlattenBlocks(blocks)
}
