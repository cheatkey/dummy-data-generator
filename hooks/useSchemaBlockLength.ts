import { useSchema } from './store/useSchema'
import { shallow } from 'zustand/shallow'

const useSchemaBlockLength = () => {
  const blockLengthList: unknown[] = useSchema(
    state => Array(state.blocks.length).fill(0),
    shallow,
  )

  return blockLengthList
}

export default useSchemaBlockLength
