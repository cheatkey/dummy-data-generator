import { create } from 'zustand'
import { combine } from 'zustand/middleware'
import { createTrackedSelector } from 'react-tracked'
import { immer } from 'zustand/middleware/immer'
import { v4 as uuidv4 } from 'uuid'
import { WritableDraft } from 'immer/dist/internal'

export type BlockType = {
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
  isArray: false,
  arrayLength: 1,
  children: [],
  metaData: '',
  description: '',
}

interface ISchemaState {
  blocks: BlockType[]
}

const getInitialBlock = () => ({ ...INITIAL_BLOCK, uuid: uuidv4() })

const schemaInitialState: ISchemaState = {
  blocks: [getInitialBlock(), getInitialBlock(), getInitialBlock()],
}

export const findParentBlock = (props: {
  parent: string[]
  blocks: BlockType[] | WritableDraft<BlockType>[]
}) =>
  props.parent.reduce((acc, parentKey) => {
    const foundItem = acc.find(item => item.uuid === parentKey)
    return foundItem?.children ?? []
  }, props.blocks)

export const findSchemaBlock = (props: {
  uuid: string
  parent?: string[]
  blocks: BlockType[] | WritableDraft<BlockType>[]
}) => {
  if (props.parent) {
    return findParentBlock({
      parent: props.parent,
      blocks: props.blocks,
    }).find(item => item.uuid === props.uuid)
  }

  return props.blocks.find(item => item.uuid === props.uuid)
}

export const useSchema = create(
  immer(
    combine(schemaInitialState, (set, get) => ({
      addNewBlock: (uuid?: string, parent?: string[]) => {
        set(state => {
          if (!uuid) {
            state.blocks.push(getInitialBlock())
            return
          }
          const block = findSchemaBlock({
            uuid,
            parent,
            blocks: state.blocks,
          })

          if (block) block.children.push(getInitialBlock())
        })

        console.log(get().blocks)
      },
      removeBlock: (uuid: string, parent?: string[]) => {
        set(state => {
          if (!parent) {
            state.blocks = state.blocks.filter(item => item.uuid !== uuid)
            return
          }

          const parentChildren = findParentBlock({
            parent: parent,
            blocks: state.blocks,
          })

          parentChildren.splice(
            parentChildren.findIndex(item => item.uuid === uuid),
            1,
          )
        })
      },
      toggleIsArray: (uuid: string, parent?: string[]) => {
        set(state => {
          const block = findSchemaBlock({
            uuid,
            parent,
            blocks: state.blocks,
          })
          if (block) {
            block.isArray = !block.isArray
          }
        })
      },
      toggleIsObject: (uuid: string, parent?: string[]) => {
        set(state => {
          const block = findSchemaBlock({
            uuid,
            parent,
            blocks: state.blocks,
          })

          if (block) {
            const nextIsObject = !block.isObject
            block.isObject = nextIsObject
            if (nextIsObject === true && block.children.length === 0) {
              block.children.push(getInitialBlock())
            }
          }
        })
      },
      setDescription: (
        uuid: string,
        description: string,
        parent?: string[],
      ) => {
        set(state => {
          const block = findSchemaBlock({
            uuid: uuid,
            parent: parent,
            blocks: state.blocks,
          })
          if (block) block.description = description
        })
      },
      setKeyName: (props: {
        uuid: string
        parent?: string[]
        keyName: string
      }) => {
        set(state => {
          const block = findSchemaBlock({
            uuid: props.uuid,
            parent: props.parent,
            blocks: state.blocks,
          })

          if (block) block.keyName = props.keyName
        })
      },
      setArrayLength: (
        uuid: string,
        arrayLength: number,
        parent?: string[],
      ) => {
        set(state => {
          const block = findSchemaBlock({
            uuid: uuid,
            parent: parent,
            blocks: state.blocks,
          })
          if (block) block.arrayLength = arrayLength
        })
      },
    })),
  ),
)

export const useSchemaSelector = createTrackedSelector(useSchema)
