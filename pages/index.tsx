import tw from 'twin.macro'
import ChatgptLogin from '../components/ChatgptLogin'
import DataSchemaForm from '../components/DataSchemaForm'
import Header from '../components/Header'
import ApiKeySettingModal from '../components/modals/ApiKeySettingModal'
import Modal from 'react-modal'
import DataGenerator from '../components/DataGenerator/DataGenerator'

const App = () => (
  <>
    <ApiKeySettingModal />
    <main id="main" css={[tw`bg-dark-900 text-white`]}>
      <div css={[tw`container mx-auto min-h-screen flex flex-col gap-7 pb-20`]}>
        <Header />
        <ChatgptLogin />
        <DataSchemaForm />
        <DataGenerator />
      </div>
    </main>
  </>
)

export default App
