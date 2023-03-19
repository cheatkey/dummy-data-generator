import Image from 'next/image'
import Modal, { Styles } from 'react-modal'
import tw from 'twin.macro'
import { xIcon } from '../../assets/icon'
import {
  useChatgptConfig,
  useChatgptConfigSelector,
} from '../../hooks/store/useChatgptToken'
import { baseInputCSS } from '../../styles/styles'

interface IApiKeySettingModalProps {}

const customStyles: Styles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: 'initial',
    border: 'initial',
  },
  overlay: {
    backdropFilter: `blur(8px)`,
    background: 'rgb(0,0,0,0.1)',
    zIndex: 50,
  },
}

const ApiKeySettingModal = ({}: IApiKeySettingModalProps) => {
  const { showModal, setShowModal, apiKey, setAPIKey } =
    useChatgptConfigSelector()

  return (
    <Modal isOpen={showModal} style={customStyles} closeTimeoutMS={200}>
      <div
        css={[
          tw`z-10 bg-dark-700 py-6 px-8 rounded-3xl shadow-xl flex flex-col gap-2 relative w-96`,
        ]}
      >
        <h1 css={[tw`text-gray-100 text-lg font-medium`]}>
          chatgpt API key 설정
        </h1>
        <Image
          css={[tw`absolute top-6 right-6 cursor-pointer w-5`]}
          src={xIcon}
          onClick={() => {
            setShowModal(false)
          }}
          alt="close modal"
        />

        <input
          value={apiKey}
          placeholder="API KEY"
          css={[baseInputCSS, tw`mt-4 mb-2`]}
          onChange={e => {
            setAPIKey(e.target.value)
          }}
          spellCheck={false}
          type="password"
        />
      </div>
    </Modal>
  )
}

export default ApiKeySettingModal
