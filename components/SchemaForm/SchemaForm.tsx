import tw from 'twin.macro'
import { baseInputCSS, selectDarkStyle } from '../../styles/styles'
import Select, { StylesConfig } from 'react-select'

interface ISchemaFormProps {
  name: string
}

const SchemaForm = ({ name }: ISchemaFormProps) => {
  return (
    <div css={[tw`flex flex-col gap-2 `]}>
      <div css={[tw`flex flex-row gap-2 items-center`]}>
        <div css={[tw`w-56`]}>
          <Select
            styles={selectDarkStyle}
            options={[{ value: 'test', label: 'test' }]}
          />
        </div>
        <input
          placeholder="field name"
          css={[tw`bg-transparent outline-none font-semibold text-lg w-60`]}
          spellCheck={false}
        />
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
