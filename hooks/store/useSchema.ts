import { create } from 'zustand'
import { combine } from 'zustand/middleware'
import { createTrackedSelector } from 'react-tracked'
import { immer } from 'zustand/middleware/immer'
import { v4 as uuidv4 } from 'uuid'

type BlockType = {
  keyName: string
  isObject: boolean
  isArray: boolean
  children: BlockType[]

  metaData: string
  description: string
  uuid: string
}

const INITIAL_BLOCK: Omit<BlockType, 'uuid'> = {
  keyName: '',
  isObject: false,
  isArray: true,
  children: [],
  metaData: '',
  description: '',
}

interface ISchemaState {
  blocks: BlockType[]
}
const schemaInitialState: ISchemaState = {
  blocks: [{ ...INITIAL_BLOCK, uuid: uuidv4() }],
}

export const useSchema = create(
  immer(
    combine(schemaInitialState, (set, get) => ({
      addNewBlock: () => {
        set(state => {
          state.blocks.push({ ...INITIAL_BLOCK, uuid: uuidv4() })
        })
      },
    })),
  ),
)

export const useSchemaSelector = createTrackedSelector(useSchema)
