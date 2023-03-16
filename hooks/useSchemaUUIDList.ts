import { useSchema } from './store/useSchema'
import { shallow } from 'zustand/shallow'

const useSchemaUUIDList = () => {
  const blockLengthList = useSchema(
    state => state.blocks.map(item => item.uuid),
    shallow,
  )

  return blockLengthList
}

export default useSchemaUUIDList
