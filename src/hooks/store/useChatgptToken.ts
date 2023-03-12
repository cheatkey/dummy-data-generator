import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { combine } from "zustand/middleware";

interface IChatgptConfigState {
  accessToken?: string;
}

const chatgptConfigInitialState: IChatgptConfigState = {
  accessToken: undefined,
};

const useChatgptConfig = create(
  persist(
    combine(chatgptConfigInitialState, (set, get) => ({
      setAccessToken: (accessToken: IChatgptConfigState["accessToken"]) => {
        set({
          accessToken,
        });
      },
    })),
    {
      name: "chat-gpt-config",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useChatgptConfig;
