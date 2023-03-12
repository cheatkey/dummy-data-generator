import axios from "axios";

const chatgptService = {
  getAccessToken: () => axios.get(`https://chat.openai.com/api/auth/session`),
};

export default chatgptService;

export const CHAT_GPT_QUERY_KEY = {
  TOKEN: "TOKEN",
};
