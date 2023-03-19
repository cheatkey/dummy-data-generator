import tw from 'twin.macro'
import { baseInputCSS, checkboxCSS } from '../../styles/styles'

interface IMetaDataCheckboxProps {
  children?: React.ReactNode
  name: string
  value: boolean
  handleCheckboxClick: () => void
}

const MetaDataCheckbox = ({
  children,
  name,
  value,
  handleCheckboxClick,
}: IMetaDataCheckboxProps) => {
  return (
    <div
      css={[
        tw`border-[1px] border-solid rounded-xl px-4 flex flex-row gap-3 items-center cursor-pointer h-12`,
        value ? tw`border-blue-400` : tw`border-gray-500`,
      ]}
    >
      <input
        type="checkbox"
        css={[checkboxCSS]}
        checked={value}
        onClick={handleCheckboxClick}
      />
      <span css={[tw`text-base text-gray-200`]}>{name}</span>

      {children}
    </div>
  )
}

export default MetaDataCheckbox
