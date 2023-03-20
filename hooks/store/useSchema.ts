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
const tempInitialData: BlockType[] = [
  {
    keyName: 'shillaHotelData',
    isObject: true,
    isArray: true,
    arrayLength: 2,
    children: [
      {
        keyName: 'OTAReviews',
        isObject: true,
        isArray: true,
        arrayLength: 2,
        children: [
          {
            keyName: 'rating',
            isObject: false,
            isArray: false,
            arrayLength: 1,
            children: [],
            metaData: '',
            description: '호텔 평가 별점 데이터 0~100점으로 구성',
            uuid: '546682c0-b6ad-4af4-be0d-942c6cb22edb',
          },
          {
            keyName: 'OTAsource',
            isObject: false,
            isArray: false,
            arrayLength: 1,
            children: [],
            metaData: '',
            description: 'OTA 사이트 출처',
            uuid: '5859e945-9dd4-475b-965a-35505a7a2aec',
          },
          {
            keyName: 'rawText',
            isObject: false,
            isArray: false,
            arrayLength: 1,
            children: [],
            metaData: '',
            description: '호텔에 방문한 방문자 남기는 호텔 리뷰 텍스트',
            uuid: 'a02371b5-3036-4879-bc08-4b68414a0ffb',
          },
          {
            keyName: 'nps',
            isObject: false,
            isArray: true,
            arrayLength: 3,
            children: [],
            metaData: '',
            description: '0점 ~ 10점으로 구성된 NPS 점수',
            uuid: '2a329713-4cf3-4ce6-9b6a-a2577b88406b',
          },
        ],
        metaData: '',
        description: '',
        uuid: '1055a44c-b4cc-413d-a400-7c01aad12511',
      },
      {
        keyName: 'npsResponse',
        isObject: false,
        isArray: false,
        arrayLength: 1,
        children: [],
        metaData: '',
        description: '',
        uuid: '9c977e38-c99a-4f1d-aa21-3a4383e80395',
      },
      {
        keyName: 'npsShorttext',
        isObject: false,
        isArray: false,
        arrayLength: 1,
        children: [],
        metaData: '',
        description: '',
        uuid: '156d9100-3787-447a-889f-fef9ed6291be',
      },
    ],
    metaData: '',
    description: '',
    uuid: '51479809-815c-4a28-997e-7828a42cf4b8',
  },
]

const schemaInitialState: ISchemaState = {
  blocks: tempInitialData,
  // [getInitialBlock(), getInitialBlock(), getInitialBlock()],
}

export const findSchemaBlock = (props: {
  uuid: string
  parent?: string[]
  blocks: BlockType[] | WritableDraft<BlockType>[]
}) => {
  if (props.parent) {
    return props.parent
      .reduce((acc, parentKey) => {
        const foundItem = acc.find(item => item.uuid === parentKey)
        return foundItem?.children ?? []
      }, props.blocks)
      .find(item => item.uuid === props.uuid)
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

          const block = findSchemaBlock({
            uuid,
            parent,
            blocks: state.blocks,
          })

          if (block)
            block.children = block.children.filter(item => item.uuid !== uuid)
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
      setDescription: (uuid: string, description: string) => {
        set(state => {
          const block = state.blocks.find(item => item.uuid === uuid)
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
