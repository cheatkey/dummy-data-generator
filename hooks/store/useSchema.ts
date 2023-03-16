import { create } from 'zustand'
import { combine } from 'zustand/middleware'
import { createTrackedSelector } from 'react-tracked'
import { immer } from 'zustand/middleware/immer'

type BlockType = {
  dataType: 'primitive' | 'object'
  keyName: string
  isArray?: boolean
  children?: BlockType[]

  metaData?: string
  description?: string
}

const INITIAL_BLOCK: BlockType = {
  dataType: 'primitive',
  keyName: '',
}

interface ISchemaState {
  blocks: BlockType[]
}
const schemaInitialState: ISchemaState = {
  blocks: [],
}

export const useSchema = create(
  immer(
    combine(schemaInitialState, (set, get) => ({
      addNewBlock: () => {
        set(state => {
          state.blocks.push(INITIAL_BLOCK)
        })
      },
    })),
  ),
)

export const useSchemaSelector = createTrackedSelector(useSchema)
