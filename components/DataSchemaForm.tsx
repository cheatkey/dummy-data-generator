import tw from 'twin.macro'
import { brushImage, databaseIcon } from '../assets/icon'
import {
  blockCSS,
  darkButtonCSS,
  selectDarkStyle,
  tailwindColor,
} from '../styles/styles'
import Select, { StylesConfig } from 'react-select'
import Image from 'next/image'
import SchemaForm from './SchemaForm/SchemaForm'
import useSchemaUUIDList from '../hooks/useSchemaUUIDList'
import { useSchemaSelector } from '../hooks/store/useSchema'

interface IDataGeneratorProps {}

const DataSchemaForm = ({}: IDataGeneratorProps) => {
  const uuidList = useSchemaUUIDList()
  const { addNewBlock } = useSchemaSelector()
  return (
    <section css={[blockCSS, tw`gap-8`]}>
      <div css={[tw`flex flex-col w-full gap-5 items-center`]}>
        <Image src={databaseIcon} css={[tw`w-16`]} alt={'database logo'} />
        <div css={[tw`relative`]}>
          <h2 css={[tw`text-3xl font-semibold z-20 relative`]}>
            더미 데이터 스키마 지정
          </h2>
          <Image
            src={brushImage}
            css={[tw`w-32 absolute top-0 left-40 z-10`]}
            alt={'brush image'}
          />
        </div>
      </div>

      <div css={tw`flex flex-col gap-5`}>
        {uuidList.map(uuid => (
          <SchemaForm key={uuid} uuid={uuid} />
        ))}

        <button
          css={[darkButtonCSS, tw`mt-4 h-9`]}
          onClick={() => {
            addNewBlock()
          }}
        >
          새로운 키 추가
        </button>
      </div>
    </section>
  )
}

export default DataSchemaForm
