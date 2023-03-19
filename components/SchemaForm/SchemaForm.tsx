import tw from 'twin.macro'
import {
  baseInputCSS,
  checkboxCSS,
  darkButtonCSS,
  selectDarkStyle,
} from '../../styles/styles'
import Select, { StylesConfig } from 'react-select'
import { css } from '@emotion/react'
import MetaDataCheckbox from '../modals/MetaDataCheckbox'
import {
  useSchema,
  useSchemaSelector,
  BlockType,
  findSchemaBlock,
} from '../../hooks/store/useSchema'
import { shallow } from 'zustand/shallow'
import DetailSetting from './DetailSetting'

export interface ISchemaFormProps {
  parent?: string[]
  uuid: string
}

const SchemaForm = ({ uuid, parent }: ISchemaFormProps) => {
  const currentBlock = useSchema(
    state =>
      findSchemaBlock({
        parent,
        uuid,
        blocks: state.blocks,
      }),
    shallow,
  )

  const { setKeyName, setDescription } = useSchemaSelector()

  if (!currentBlock) return <></>

  return (
    <div css={[tw`flex flex-col gap-2`]}>
      <div css={[tw`flex gap-4 flex-row`]}>
        <div css={[tw`flex flex-row gap-4 items-center`]}>
          <DetailSetting
            currentBlock={currentBlock}
            uuid={uuid}
            parent={parent}
          />

          <input
            placeholder="key name"
            css={[tw`bg-transparent outline-none font-semibold text-lg w-60`]}
            spellCheck={false}
            onChange={event => {
              setKeyName({ uuid, parent, keyName: event.target.value })
            }}
          />
        </div>
      </div>

      <div
        css={[
          tw`flex flex-col gap-2 pl-8`,
          currentBlock.isObject && tw`border-l-2 border-solid border-gray-500`,
        ]}
      >
        {currentBlock.isObject ? (
          <>
            {currentBlock.children.map(item => (
              <SchemaForm
                uuid={item.uuid}
                key={item.uuid}
                parent={!!parent ? [...parent, uuid] : [uuid]}
              />
            ))}
          </>
        ) : (
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
        )}
      </div>
    </div>
  )
}

export default SchemaForm
