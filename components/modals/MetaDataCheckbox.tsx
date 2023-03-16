import tw from 'twin.macro'
import { checkboxCSS } from '../../styles/styles'

interface IMetaDataCheckboxProps {
  children: React.ReactNode
  value: boolean
  handleCheckboxClick: () => void
}

const MetaDataCheckbox = ({
  children,
  value,
  handleCheckboxClick,
}: IMetaDataCheckboxProps) => {
  return (
    <div
      onClick={handleCheckboxClick}
      css={[
        tw`border-[1px] border-solid border-gray-500 rounded-xl py-2 px-3 flex flex-row gap-3 items-center cursor-pointer`,
      ]}
    >
      <input type="checkbox" css={[checkboxCSS, tw``]} checked={value} />
      <span css={[tw`text-base text-gray-200`]}>{children}</span>
    </div>
  )
}

export default MetaDataCheckbox
