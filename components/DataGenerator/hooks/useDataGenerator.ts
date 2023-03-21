import { BlockType, useSchema } from '../../../hooks/store/useSchema'
import ChatGPTService from '../../../service/chatgpt.service'

const take = (n: number) => Array(n).fill(true)

const useDataGenerator = () => {
  const handleClickDataGenerateButton = async () => {
    const blocks = useSchema.getState().blocks

    const gptService = new ChatGPTService(blocks, '')
    const generated = await gptService.generateDummyData()

    const uuidMap = generated.reduce<Record<string, string[]>>((acc, cur) => {
      acc[cur.uuid as string] = cur.generatedDummyData
      return acc
    }, {})

    const search = (obj: BlockType, valueOnly?: boolean): any => {
      if (obj.isObject) {
        console.log(obj)

        return obj.children.reduce((acc, cur) => {
          if (cur.isArray)
            return {
              ...acc,
              [cur.keyName]: take(cur.arrayLength).map(() => search(cur, true)),
            }
          return {
            ...acc,
            [cur.keyName]: search(cur, true),
          }
        }, {})
      }

      const value = uuidMap[obj.uuid].pop()

      if (valueOnly) return value
      return {
        [obj.keyName]: value,
      }
    }

    console.log(
      blocks.reduce<Record<string, any>>((acc, cur) => {
        acc[cur.keyName] = search(cur)
        return acc
      }, {}),
    )
  }

  return {
    handleClickDataGenerateButton,
  }
}

export default useDataGenerator
