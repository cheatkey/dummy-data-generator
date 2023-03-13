import tw, { css } from 'twin.macro'
import { chatgptIcon, linkIcon } from '../assets/icon'
import { useChatgptConfigSelector } from '../hooks/store/useChatgptToken'
import { baseInputCSS, blockCSS, descriptionCSS } from '../styles/styles'
import Image from 'next/image'

interface IChatgptLoginProps {}

const ChatgptLogin = ({}: IChatgptLoginProps) => {
  const { accessToken, setAccessToken, proxyURL, setProxyURL } =
    useChatgptConfigSelector()

  return (
    <section css={[blockCSS, tw`gap-3`]}>
      <h2 css={[tw`text-2xl font-semibold flex flex-row gap-3 items-center`]}>
        <Image css={[tw`w-8`]} src={chatgptIcon} alt={'chatgpt logo'} />
        ChatGpt Config
      </h2>

      <p css={[descriptionCSS, tw`text-lg font-medium`]}>
        실제 같은 더미 데이터 생성을 위해 chatgpt를 사용합니다.
      </p>

      <div css={[tw`flex flex-row`]}>
        <div css={[tw`flex flex-col w-1/2 pr-5 gap-1`]}>
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

          <input
            value={accessToken}
            placeholder="chatgpt access token"
            css={[baseInputCSS, tw`mt-2 w-full`]}
            onChange={e => {
              setAccessToken(e.target.value)
            }}
            type="password"
          />
        </div>

        <div css={[tw`border-l-[1px] border-gray-600 w-1/2 border-solid pl-5`]}>
          <h3 css={[tw`text-lg font-medium`]}>(Optional) chatgpt proxy url</h3>
          <p>chatgpt 프록시 서버를 사용하는 경우 URL을 입력해주세요.</p>

          <input
            value={proxyURL}
            placeholder="chatgpt access token"
            css={[baseInputCSS, tw`mt-3 w-full`]}
            onChange={e => {
              setProxyURL(e.target.value)
            }}
          />
        </div>
      </div>
    </section>
  )
}

export default ChatgptLogin
