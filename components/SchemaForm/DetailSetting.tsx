import Image from 'next/image'
import { useRef, useState } from 'react'
import { useClickAway } from 'react-use'
import tw from 'twin.macro'
import { dotsIcon } from '../../assets/icon'
import { BlockType, useSchemaSelector } from '../../hooks/store/useSchema'
import {
  baseInputCSS,
  darkButtonCSS,
  darkIconWrapperCSS,
} from '../../styles/styles'
import MetaDataCheckbox from '../modals/MetaDataCheckbox'
import { ISchemaFormProps } from './SchemaForm'

interface IDetailSettingProps extends ISchemaFormProps {
  currentBlock: BlockType
}

const DetailSetting = ({ currentBlock, uuid, parent }: IDetailSettingProps) => {
  const [showUI, setShowUI] = useState<boolean>(false)
  const DetailSettingDomRef = useRef<HTMLDivElement>(null)

  const { toggleIsArray, toggleIsObject, setArrayLength, addNewBlock } =
    useSchemaSelector()

  useClickAway(DetailSettingDomRef, () => {
    setShowUI(false)
  })

  return (
    <div
      ref={DetailSettingDomRef}
      css={[tw`flex flex-row gap-2 shrink-0 items-center h-12`]}
    >
      <div
        onClick={() => {
          setShowUI(true)
        }}
        css={[darkIconWrapperCSS]}
      >
        <Image src={dotsIcon} alt="more icon" css={[tw`w-5 h-5`]} />
      </div>

      {showUI && (
        <>
          <MetaDataCheckbox
            name={'배열로 설정하기'}
            value={currentBlock.isArray}
            handleCheckboxClick={() => {
              toggleIsArray(uuid, parent)
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
            name={'객체로 설정하기'}
            value={currentBlock.isObject}
            handleCheckboxClick={() => {
              toggleIsObject(uuid, parent)
            }}
          />
          {currentBlock.isObject && (
            <button
              css={[darkButtonCSS, tw`h-12 px-4`]}
              onClick={() => {
                addNewBlock(uuid, parent)
              }}
            >
              키 추가
            </button>
          )}
        </>
      )}
    </div>
  )
}

export default DetailSetting
