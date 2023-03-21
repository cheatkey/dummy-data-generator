import tw from 'twin.macro'
import { blockCSS, darkButtonCSS, descriptionCSS } from '../../styles/styles'
import useDataGenerator from './hooks/useDataGenerator'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { spinnerIcon } from '../../assets/icon'

interface IDataGeneratorProps {}

const DataGenerator = ({}: IDataGeneratorProps) => {
  const {
    flattenBlocks,
    handleClickDataGenerateButton,
    generatedJson,
    isLoading,
  } = useDataGenerator()

  const hasGeneratedJson = JSON.stringify(generatedJson) !== JSON.stringify({})

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

      {flattenBlocks.length > 0 && (
        <div css={[tw`flex flex-col gap-2`]}>
          <h2 css={[tw`font-medium text-lg text-gray-100 pl-2`]}>
            chatgpt에 요청한 데이터 정보
          </h2>
          <div css={[tw`bg-dark-900 rounded-2xl p-5`]}>
            {flattenBlocks.map(block => (
              <p>
                {block.keyName} ({block.count}개)
                <p css={[tw`text-gray-300 pl-6`]}>{block.description}</p>
              </p>
            ))}
          </div>
        </div>
      )}

      {hasGeneratedJson && (
        <div css={[tw`flex flex-col gap-2`]}>
          <h2 css={[tw`font-medium text-lg text-gray-100 pl-2`]}>
            생성된 데이터
          </h2>
          <pre css={[tw`bg-dark-900 rounded-2xl p-4 whitespace-pre-wrap`]}>
            {isLoading ? (
              <div css={[tw`flex flex-col items-center py-10 gap-2`]}>
                <Image
                  src={spinnerIcon}
                  alt="spinner"
                  css={[tw`animate-spin`]}
                />
                <p css={[tw`text-gray-300 text-sm`]}>chatgpt 응답 대기중</p>
              </div>
            ) : (
              <>{JSON.stringify(generatedJson, null, 2)}</>
            )}
          </pre>
        </div>
      )}
    </section>
  )
}

export default DataGenerator
