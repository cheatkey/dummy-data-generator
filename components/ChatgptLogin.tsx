import tw, { css } from 'twin.macro'
import { chatgptIcon, linkIcon } from '../assets/icon'
import { useChatgptConfigSelector } from '../hooks/store/useChatgptToken'
import { baseInputCSS, blockCSS, descriptionCSS } from '../styles/styles'
import Image from 'next/image'

interface IChatgptLoginProps {}

const ChatgptLogin = ({}: IChatgptLoginProps) => {
  const { setShowModal, proxyURL, setProxyURL } = useChatgptConfigSelector()

  return (
    <section css={[blockCSS, tw`gap-5`]}>
      <div css={[tw`flex flex-col gap-2`]}>
        <h2 css={[tw`text-2xl font-semibold flex flex-row gap-3 items-center`]}>
          <Image css={[tw`w-8`]} src={chatgptIcon} alt={'chatgpt logo'} />
          ChatGpt Config
        </h2>

        <p css={[descriptionCSS, tw`text-lg font-medium`]}>
          실제 같은 더미 데이터 생성을 위해 chatGPT를 사용합니다.
        </p>
      </div>

      <div css={[tw`flex flex-row`]}>
        <div css={[tw`flex flex-col w-1/2 gap-1 pr-5`]}>
          <div css={[tw`flex flex-col gap-1 h-36 sm:h-20 lg:h-14`]}>
            <h3 css={[tw`text-lg font-medium`]}>Access Token</h3>
            <div css={[tw`flex flex-row`]}>
              <a
                href="https://platform.openai.com/account/api-keys"
                css={[tw`text-sky-500 font-semibold flex flex-row gap-1`]}
              >
                <Image src={linkIcon} css={[tw`w-5`]} alt={'link icon'} />
                여기
              </a>
              <p>에서 토큰을 조회할 수 있습니다.</p>
            </div>
          </div>

          <button
            css={[
              tw`bg-dark-800 mt-4 h-9 rounded-xl text-base text-gray-200 hover:text-white hover:bg-dark-900 transition-all`,
            ]}
            onClick={() => {
              setShowModal(true)
            }}
          >
            API key 설정
          </button>
        </div>

        <div
          css={[
            tw`flex flex-col w-1/2 gap-1 border-l-[1px] border-gray-600 border-solid pl-5`,
          ]}
        >
          <div css={[tw`flex flex-col gap-1 h-36 sm:h-20 lg:h-14`]}>
            <h3 css={[tw`text-lg font-medium`]}>
              (Optional) chatGPT Proxy URL
            </h3>
            <div css={[tw`flex flex-row`]}>
              <p>chatgpt proxy 서버를 사용하는 경우, URL을 입력해주세요.</p>
            </div>
          </div>

          <input
            value={proxyURL}
            placeholder="https://"
            css={[baseInputCSS, tw`mt-2 w-full`]}
            onChange={e => {
              setProxyURL(e.target.value)
            }}
            spellCheck={false}
          />
        </div>
      </div>
    </section>
  )
}

export default ChatgptLogin
