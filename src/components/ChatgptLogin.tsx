import tw from "twin.macro";
import { chatgptIcon } from "../assets/icon";
import { blockCSS, descriptionCSS } from "../styles/styles";

interface IChatgptLoginProps {}

const ChatgptLogin = ({}: IChatgptLoginProps) => {
  return (
    <section css={[blockCSS, tw`gap-3`]}>
      <h2 css={[tw`text-2xl font-semibold flex flex-row gap-3 items-center`]}>
        <img css={[tw`w-8`]} src={chatgptIcon} />
        ChatGpt Login
      </h2>

      <p css={[descriptionCSS, tw`text-lg font-medium`]}>
        실제 같은 더미 데이터 생성을 위해 chatgpt를 사용합니다
      </p>
    </section>
  );
};

export default ChatgptLogin;
