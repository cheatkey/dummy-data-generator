import tw from "twin.macro";
import { brushImage, databaseIcon } from "../assets/icon";
import { blockCSS } from "../styles/styles";

interface IDataGeneratorProps {}

const DataGenerator = ({}: IDataGeneratorProps) => {
  return (
    <section css={[blockCSS, tw`items-center gap-5`]}>
      <img src={databaseIcon} css={[tw`w-16`]} />
      <div css={[tw`relative`]}>
        <h2 css={[tw`text-3xl font-semibold z-20 relative`]}>
          더미 데이터 생성하기
        </h2>
        <img src={brushImage} css={[tw`w-32 absolute top-0 left-32 z-10`]} />
      </div>
    </section>
  );
};

export default DataGenerator;
