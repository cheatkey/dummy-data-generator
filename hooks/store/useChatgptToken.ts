import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { combine } from 'zustand/middleware'
import { createTrackedSelector } from 'react-tracked'

interface IChatgptConfigState {
  apiKey?: string
  proxyURL?: string
  showModal: boolean
}

const chatgptConfigInitialState: IChatgptConfigState = {
  apiKey: undefined,
  proxyURL: undefined,
  showModal: true,
}

export const useChatgptConfig = create(
  persist(
    combine(chatgptConfigInitialState, (set, get) => ({
      setAPIKey: (accessToken: IChatgptConfigState['apiKey']) => {
        set({
          apiKey: accessToken,
        })
      },
      setProxyURL: (proxyURL: IChatgptConfigState['proxyURL']) => {
        set({ proxyURL })
      },
      setShowModal: (showModal: boolean) => {
        console.log('showModal:', showModal)
        set({ showModal })
      },
    })),
    {
      name: 'chat-gpt-config',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

export const useChatgptConfigSelector = createTrackedSelector(useChatgptConfig)
