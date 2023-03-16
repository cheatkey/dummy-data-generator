import tw from 'twin.macro'
import { baseInputCSS, checkboxCSS, selectDarkStyle } from '../../styles/styles'
import Select, { StylesConfig } from 'react-select'
import { css } from '@emotion/react'
import MetaDataCheckbox from '../modals/MetaDataCheckbox'
import { useSchema, useSchemaSelector } from '../../hooks/store/useSchema'
import { shallow } from 'zustand/shallow'

interface ISchemaFormProps {
  uuid: string
}

const SchemaForm = ({ uuid }: ISchemaFormProps) => {
  const currentBlock = useSchema(
    state => state.blocks.find(item => item.uuid === uuid),
    shallow,
  )

  const {
    toggleIsArray,
    toggleIsObject,
    setKeyName,
    setDescription,
    setArrayLength,
  } = useSchemaSelector()

  if (!currentBlock) return <></>

  return (
    <div css={[tw`flex flex-col gap-2`]}>
      <div css={[tw`flex justify-between flex-row`]}>
        <div css={[tw`flex flex-row gap-2 items-center`]}>
          <input
            placeholder="key name"
            css={[tw`bg-transparent outline-none font-semibold text-lg w-60`]}
            spellCheck={false}
            onChange={event => {
              setKeyName(uuid, event.target.value)
            }}
          />
        </div>

        <div css={[tw`flex flex-row gap-2`]}>
          <MetaDataCheckbox
            name={'isArray'}
            value={currentBlock.isArray}
            handleCheckboxClick={() => {
              toggleIsArray(uuid)
            }}
            children={
              currentBlock.isArray ? (
                <input
                  value={currentBlock.arrayLength}
                  onChange={event => {
                    const value = Number(event.target.value)
                    if (Number.isSafeInteger(value)) {
                      setArrayLength(uuid, value)
                    }
                  }}
                  css={[baseInputCSS, tw`w-16`]}
                />
              ) : undefined
            }
          />
          <MetaDataCheckbox
            name={'isObject'}
            value={currentBlock.isObject}
            handleCheckboxClick={() => {
              toggleIsObject(uuid)
            }}
          />
        </div>
      </div>

      <div css={[tw`flex flex-col gap-2`]}>
        <div css={[tw`flex flex-row items-center gap-6`]}>
          <input
            css={[baseInputCSS, tw`w-full`]}
            placeholder={'field description'}
            spellCheck={false}
            onChange={event => {
              setDescription(uuid, event.target.value)
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default SchemaForm
