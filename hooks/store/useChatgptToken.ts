import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { combine } from 'zustand/middleware'
import { createTrackedSelector } from 'react-tracked'

interface IChatgptConfigState {
  accessToken?: string
  proxyURL?: string
}

const chatgptConfigInitialState: IChatgptConfigState = {
  accessToken: undefined,
  proxyURL: undefined,
}

export const useChatgptConfig = create(
  persist(
    combine(chatgptConfigInitialState, (set, get) => ({
      setAccessToken: (accessToken: IChatgptConfigState['accessToken']) => {
        set({
          accessToken,
        })
      },
      setProxyURL: (proxyURL: IChatgptConfigState['proxyURL']) => {
        set({ proxyURL })
      },
    })),
    {
      name: 'chat-gpt-config',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

export const useChatgptConfigSelector = createTrackedSelector(useChatgptConfig)
