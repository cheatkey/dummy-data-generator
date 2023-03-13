import type { NextApiRequest, NextApiResponse } from 'next'
import { ChatGPTUnofficialProxyAPI } from 'chatgpt'
import { z } from 'zod'

const postBodySchema = z.object({
  accessToken: z.string(),
  query: z.string(),
})

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  if (req.method === 'GET') {
    res.status(200).json({ hello: 'world' })
  }

  if (req.method === 'POST') {
    const body = postBodySchema.parse(req.body)

    const api = new ChatGPTUnofficialProxyAPI({
      accessToken: body.accessToken,
    })

    const chatgptResult = await api.sendMessage(body.query)

    res.status(200).json(chatgptResult.text)
  }
}

export default handler
