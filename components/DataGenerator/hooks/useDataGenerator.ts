import { useState } from 'react'
import { useChatgptConfig } from '../../../hooks/store/useChatgptToken'
import { BlockType, useSchema } from '../../../hooks/store/useSchema'
import ChatGPTService, {
  FlattenBlocksType,
} from '../../../service/chatgpt.service'

const take = (n: number) => Array(n).fill(true)

const useDataGenerator = () => {
  const [flattenBlocks, setFlattenBlocks] = useState<FlattenBlocksType[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [generatedJson, setGeneratedJson] = useState<object>({})

  const handleClickDataGenerateButton = async () => {
    setIsLoading(true)

    const blocks = useSchema.getState().blocks

    const gptService = new ChatGPTService(
      blocks,
      useChatgptConfig.getState().apiKey ?? '',
    )

    setFlattenBlocks(gptService.flattenBlocks)

    const generated = await gptService.generateDummyData()

    const uuidMap = generated.reduce<Record<string, string[]>>((acc, cur) => {
      acc[cur.uuid as string] = cur.generatedDummyData
      return acc
    }, {})

    const searchBlock = (obj: BlockType, valueOnly?: boolean): any => {
      if (obj.isObject) {
        return obj.children.reduce((acc, cur) => {
          if (cur.isArray)
            return {
              ...acc,
              [cur.keyName]: take(cur.arrayLength).map(() =>
                searchBlock(cur, true),
              ),
            }
          return {
            ...acc,
            [cur.keyName]: searchBlock(cur, true),
          }
        }, {})
      }

      const value = uuidMap[obj.uuid].pop()

      if (valueOnly) return value
      return {
        [obj.keyName]: value,
      }
    }

    const generatedJson = blocks.reduce<Record<string, any>>((acc, cur) => {
      acc[cur.keyName] = (() => {
        if (cur.isArray) {
          return take(cur.arrayLength).map(() => searchBlock(cur, true))
        }

        return searchBlock(cur)
      })()
      return acc
    }, {})

    setGeneratedJson(generatedJson)

    setIsLoading(false)
  }

  return {
    handleClickDataGenerateButton,
    flattenBlocks,
    generatedJson,
    isLoading,
  }
}

export default useDataGenerator
