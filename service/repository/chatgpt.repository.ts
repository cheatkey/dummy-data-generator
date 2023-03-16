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
            content: props.userContent,
            // 'x라는 가상의 호텔 리뷰 더미데이터 10개만 만들어줘. 성적은 50점에서 100점까지 범위를 가질 수 있어. 코드가 아닌 실제 값을 개행 문자로 구분해서 출력해',
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
