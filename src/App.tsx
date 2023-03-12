import tw, { css } from "twin.macro";
import { brushImage, chatgptIcon, databaseIcon } from "./assets/icon";
import ChatgptLogin from "./components/ChatgptLogin";
import DataGenerator from "./components/DataGenerator";
import Header from "./components/Header";
import { blockCSS } from "./styles/styles";

const App = () => {
  return (
    <main css={[tw`bg-dark-900 text-white`]}>
      <div css={[tw`container mx-auto min-h-screen flex flex-col gap-7`]}>
        <Header />
        <ChatgptLogin />
        <DataGenerator />
      </div>
    </main>
  );
};

export default App;
