import tw from 'twin.macro'
import ChatgptLogin from '../components/ChatgptLogin'
import DataGenerator from '../components/DataGenerator'
import Header from '../components/Header'
import ApiKeySettingModal from '../components/modals/ApiKeySettingModal'
import Modal from 'react-modal'

const App = () => (
  <>
    <ApiKeySettingModal />
    <main id="main" css={[tw`bg-dark-900 text-white`]}>
      <div css={[tw`container mx-auto min-h-screen flex flex-col gap-7`]}>
        <Header />
        <ChatgptLogin />
        <DataGenerator />
      </div>
    </main>
  </>
)

export default App
