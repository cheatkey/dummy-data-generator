import { create } from 'zustand'
import { combine } from 'zustand/middleware'
import { createTrackedSelector } from 'react-tracked'
import { immer } from 'zustand/middleware/immer'
import { v4 as uuidv4 } from 'uuid'

type BlockType = {
  keyName: string
  isObject: boolean
  isArray: boolean
  arrayLength: number
  children: BlockType[]

  metaData: string
  description: string
  uuid: string
}

const INITIAL_BLOCK: Omit<BlockType, 'uuid'> = {
  keyName: '',
  isObject: false,
  isArray: true,
  arrayLength: 10,
  children: [],
  metaData: '',
  description: '',
}

interface ISchemaState {
  blocks: BlockType[]
}
const schemaInitialState: ISchemaState = {
  blocks: [
    { ...INITIAL_BLOCK, uuid: uuidv4() },
    { ...INITIAL_BLOCK, uuid: uuidv4() },
    { ...INITIAL_BLOCK, uuid: uuidv4() },
  ],
}

export const useSchema = create(
  immer(
    combine(schemaInitialState, (set, get) => ({
      addNewBlock: () => {
        set(state => {
          state.blocks.push({ ...INITIAL_BLOCK, uuid: uuidv4() })
        })
      },
      toggleIsArray: (uuid: string) => {
        set(state => {
          const block = state.blocks.find(item => item.uuid === uuid)
          if (block) block.isArray = !block.isArray
        })
      },
      toggleIsObject: (uuid: string) => {
        set(state => {
          const block = state.blocks.find(item => item.uuid === uuid)
          if (block) block.isObject = !block.isObject
        })
      },
      setDescription: (uuid: string, description: string) => {
        set(state => {
          const block = state.blocks.find(item => item.uuid === uuid)
          if (block) block.description = description
        })
      },
      setKeyName: (uuid: string, keyName: string) => {
        set(state => {
          const block = state.blocks.find(item => item.uuid === uuid)
          if (block) block.keyName = keyName
        })
      },
      setArrayLength: (uuid: string, arrayLength: number) => {
        set(state => {
          const block = state.blocks.find(item => item.uuid === uuid)
          if (block) block.arrayLength = arrayLength
        })
      },
    })),
  ),
)

export const useSchemaSelector = createTrackedSelector(useSchema)
