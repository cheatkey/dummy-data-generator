import tw from 'twin.macro'
import { descriptionCSS } from '../styles/styles'

interface IHeaderProps {}

const Header = ({}: IHeaderProps) => {
  return (
    <header css={[tw`flex flex-col gap-3 text-center pt-24 pb-14`]}>
      <h1
        css={[
          tw`text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-700`,
        ]}
      >
        Dummy data Generator
      </h1>
      <p css={[descriptionCSS, tw`text-xl text-gray-100`]}>
        with chatGPT & faker.js
      </p>
    </header>
  )
}

export default Header
