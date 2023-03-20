import axios from 'axios'
import { IChatgptRequestParameter, IChatgptResponse } from '../types'

const chatGPTRepository = {
  getChatgptResponse: (props: IChatgptRequestParameter) =>
    axios.post<IChatgptResponse>(
      `https://api.openai.com/v1/chat/completions`,
      {
        model: props.model ?? 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: props.systemContent,
          },
          {
            role: 'user',
            content: `${props.userContent}. ${props.n}건 만들어줘. 코드가 아닌 실제 값을 개행 문자로 구분해서 출력해줘`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${props.apiKey}`,
          'Content-Type': 'application/json',
        },
      },
    ),
}

export default chatGPTRepository
