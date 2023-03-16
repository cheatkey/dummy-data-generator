import tw from 'twin.macro'
import { baseInputCSS, checkboxCSS, selectDarkStyle } from '../../styles/styles'
import Select, { StylesConfig } from 'react-select'
import { css } from '@emotion/react'
import MetaDataCheckbox from '../modals/MetaDataCheckbox'
import { useSchema } from '../../hooks/store/useSchema'

interface ISchemaFormProps {
  index: number
}

const SchemaForm = ({ index }: ISchemaFormProps) => {
  const currentBlock = useSchema(state => state.blocks[index])

  return (
    <div css={[tw`flex flex-col gap-2`]}>
      <div css={[tw`flex justify-between flex-row`]}>
        <div css={[tw`flex flex-row gap-2 items-center`]}>
          <input
            placeholder="key name"
            css={[tw`bg-transparent outline-none font-semibold text-lg w-60`]}
            spellCheck={false}
          />
        </div>

        <div css={[tw`flex flex-row gap-2`]}>
          <MetaDataCheckbox
            children={'isArray'}
            value={currentBlock.isArray}
            handleCheckboxClick={function (): void {}}
          />
          <MetaDataCheckbox
            children={'isObject'}
            value={currentBlock.isObject}
            handleCheckboxClick={function (): void {}}
          />
        </div>
      </div>

      <div css={[tw`flex flex-col gap-2`]}>
        <div css={[tw`flex flex-row items-center gap-6`]}>
          <input
            css={[baseInputCSS, tw`w-full`]}
            placeholder={'field description'}
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  )
}

export default SchemaForm
