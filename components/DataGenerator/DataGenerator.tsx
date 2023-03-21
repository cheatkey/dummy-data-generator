import tw from 'twin.macro'
import { blockCSS, darkButtonCSS, descriptionCSS } from '../../styles/styles'
import useDataGenerator from './hooks/useDataGenerator'

interface IDataGeneratorProps {}

const DataGenerator = ({}: IDataGeneratorProps) => {
  const { handleClickDataGenerateButton } = useDataGenerator()

  return (
    <section css={[blockCSS, tw`gap-5`]}>
      <div css={[tw`flex flex-col gap-2`]}>
        <h2 css={[tw`text-2xl font-semibold flex flex-row gap-3 items-center`]}>
          지정한 스키마로 더미 데이터 생성하기
        </h2>

        <p css={[descriptionCSS, tw`text-lg font-medium`]}>
          지정한 스키마를 기반으로 chatgpt에 더미데이터 생성 요청을 보내고, 이를
          json으로 정제하여 출력합니다.
        </p>

        <button
          css={[darkButtonCSS, tw`mt-4 h-10`]}
          onClick={handleClickDataGenerateButton}
        >
          데이터 생성하기
        </button>
      </div>
    </section>
  )
}

export default DataGenerator
