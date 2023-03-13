import tw from 'twin.macro'
import { brushImage, databaseIcon } from '../assets/icon'
import { blockCSS, selectDarkStyle, tailwindColor } from '../styles/styles'
import Select, { StylesConfig } from 'react-select'
import Image from 'next/image'

interface IDataGeneratorProps {}

const DataGenerator = ({}: IDataGeneratorProps) => {
  return (
    <section css={[blockCSS, tw`gap-2`]}>
      <div css={[tw`flex flex-col w-full gap-5 items-center`]}>
        <Image src={databaseIcon} css={[tw`w-16`]} alt={'database logo'} />
        <div css={[tw`relative`]}>
          <h2 css={[tw`text-3xl font-semibold z-20 relative`]}>
            더미 데이터 생성하기
          </h2>
          <Image
            src={brushImage}
            css={[tw`w-32 absolute top-0 left-32 z-10`]}
            alt={'brush image'}
          />
        </div>
      </div>

      <div>
        <Select
          styles={selectDarkStyle}
          options={[{ value: 'test', label: 'test' }]}
        />
      </div>
    </section>
  )
}

export default DataGenerator
