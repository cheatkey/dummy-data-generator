import { PROMPT_CONSTANTS } from '../constants'
import chatGPTRepository from './repository/chatgpt.repository'

export const getDummyDataWithChatGPT = (props: {
  dataDescription: string
  apiKey: string
}) => {
  return chatGPTRepository.getChatgptResponse({
    apiKey: props.apiKey,
    userContent: props.dataDescription,
    systemContent: PROMPT_CONSTANTS.system,
  })
}
