import { BlockType } from '../hooks/store/useSchema'
import { getFlattenBlocks } from './chatgpt.service'

const DUMMY_BLOCKS: BlockType[] = [
  {
    keyName: 'shillaHotelData',
    isObject: true,
    isArray: true,
    arrayLength: 3,
    children: [
      {
        keyName: 'OTAReviews',
        isObject: true,
        isArray: true,
        arrayLength: 4,
        children: [
          {
            keyName: 'rating',
            isObject: false,
            isArray: false,
            arrayLength: 1,
            children: [],
            metaData: '',
            description: '',
            uuid: '546682c0-b6ad-4af4-be0d-942c6cb22edb',
          },
          {
            keyName: 'OTAsource',
            isObject: false,
            isArray: false,
            arrayLength: 1,
            children: [],
            metaData: '',
            description: '',
            uuid: '5859e945-9dd4-475b-965a-35505a7a2aec',
          },
          {
            keyName: 'rawText',
            isObject: false,
            isArray: false,
            arrayLength: 1,
            children: [],
            metaData: '',
            description: '',
            uuid: 'a02371b5-3036-4879-bc08-4b68414a0ffb',
          },
          {
            keyName: 'nps',
            isObject: false,
            isArray: true,
            arrayLength: 3,
            children: [],
            metaData: '',
            description: '',
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

describe('chatgpt를 이용한 더미 데이터 json 생성 테스트', () => {
  it('children 요소들을 flat하게 변환한다. api로 호출할 수 있게 설명과 UUID만 남긴다.', () => {
    expect(getFlattenBlocks(DUMMY_BLOCKS).length).toBe(6)

    console.log(getFlattenBlocks(DUMMY_BLOCKS))
  })
})
