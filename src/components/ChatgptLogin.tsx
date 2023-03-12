import tw, { css } from "twin.macro";
import { chatgptIcon, linkIcon } from "../assets/icon";
import useChatgptConfig from "../hooks/store/useChatgptToken";
import { baseInputCSS, blockCSS, descriptionCSS } from "../styles/styles";

interface IChatgptLoginProps {}

const ChatgptLogin = ({}: IChatgptLoginProps) => {
  const setAccessToken = useChatgptConfig((state) => state.setAccessToken);
  const accessToken = useChatgptConfig((state) => state.accessToken);

  return (
    <section css={[blockCSS, tw`gap-3`]}>
      <h2 css={[tw`text-2xl font-semibold flex flex-row gap-3 items-center`]}>
        <img css={[tw`w-8`]} src={chatgptIcon} />
        ChatGpt Access Token
      </h2>

      <p css={[descriptionCSS, tw`text-lg font-medium`]}>
        실제 같은 더미 데이터 생성을 위해 chatgpt를 사용합니다.
      </p>

      <div css={[tw`flex flex-row`]}>
        <a
          href="https://platform.openai.com/account/api-keys"
          css={[tw`text-sky-500 font-semibold flex flex-row gap-1`]}
        >
          <img src={linkIcon} css={[tw`w-5`]} />
          여기
        </a>
        <p>에서 토큰을 조회할 수 있습니다.</p>
      </div>

      <input
        value={accessToken}
        placeholder="chatgpt access token"
        css={[baseInputCSS]}
        onChange={(e) => {
          setAccessToken(e.target.value);
        }}
        type="password"
      />
    </section>
  );
};

export default ChatgptLogin;
