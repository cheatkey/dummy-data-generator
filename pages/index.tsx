import tw from 'twin.macro'
import ChatgptLogin from '../components/ChatgptLogin'
import DataGenerator from '../components/DataGenerator'
import Header from '../components/Header'

const App = () => (
  <main css={[tw`bg-dark-900 text-white`]}>
    <div css={[tw`container mx-auto min-h-screen flex flex-col gap-7`]}>
      <Header />
      <ChatgptLogin />
      <DataGenerator />
    </div>
  </main>
)

export default App
