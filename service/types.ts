export interface IChatgptRequestParameter {
  model?: string
  systemContent: string
  userContent: string
  apiKey: string
}

export interface IChatgptResponse {
  id: string
  object: string
  created: number
  model: string
  usage: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
  choices: {
    message: {
      role: string
      content: string
    }
    finish_reason: string
    index: number
  }[]
}
