import tw from "twin.macro";
import { brushImage, chatgptIcon, databaseIcon } from "./assets/icon";

const blockCSS = tw`bg-dark-700 w-full rounded-3xl px-10 py-8 flex flex-col gap-2`;
const descriptionCSS = tw`text-gray-300 font-normal tracking-tight`;

const App = () => {
  return (
    <main css={[tw`bg-dark-900 text-white pt-10`]}>
      <div css={[tw`container mx-auto min-h-screen flex flex-col gap-7`]}>
        <header css={[tw`flex flex-col gap-2`]}>
          <h1 css={[tw`text-5xl font-extrabold`]}>Dummy data Generator</h1>
          <p css={[tw`text-xl`, descriptionCSS]}>with chatgpt & faker.js</p>
        </header>

        <section css={[blockCSS, tw`gap-3`]}>
          <h2
            css={[tw`text-2xl font-semibold flex flex-row gap-3 items-center`]}
          >
            <img css={[tw`w-8`]} src={chatgptIcon} />
            ChatGpt Login
          </h2>

          <p css={[descriptionCSS, tw`text-lg font-medium`]}>
            실제 같은 더미 데이터 생성을 위해 chatgpt를 사용합니다
          </p>
        </section>

        <section css={[blockCSS, tw`items-center gap-5`]}>
          <img src={databaseIcon} css={[tw`w-16`]} />
          <div css={[tw`relative`]}>
            <h2 css={[tw`text-3xl font-semibold z-20 relative`]}>
              더미 데이터 생성하기
            </h2>
            <img
              src={brushImage}
              css={[tw`w-32 absolute top-0 left-32 z-10`]}
            />
          </div>
        </section>
      </div>
    </main>
  );
};

export default App;
