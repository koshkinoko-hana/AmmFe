import './photoInput.scss'
import 'react-tabs/style/react-tabs.css'
import { Props } from '@admin/components/photoInput/types'
import { Image } from '@admin/pages/album/types'
import React, { ChangeEvent, useRef, useState } from 'react'
import { FaEdit, FaPlus, FaSave } from 'react-icons/fa'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'

const PhotoInput: React.FC<Props> = ({
  label,
  disableChooseTab,
  edit,
  close,
  onClose,
  saveImage,
  setIsEdit,
  currentImage
}) => {

  const [ tempImage, setTempImage ] = useState<Image>(currentImage || {})
  const [ tempFile, setTempFile ] = useState<string | null>(
    currentImage?.file ? URL.createObjectURL(currentImage.file) : null
  )

  const fileInputRef = useRef<HTMLInputElement>(null)

  const onFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTempFile(URL.createObjectURL(event.target.files![0]))
    setTempImage({ file: event.target.files![0] })
  }

  const onLinkChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTempImage({ link: event.target.value })
  }

  const save = () => {
    debugger
    console.log('Saved')
    if(tempImage.file || tempImage.link)
      saveImage(tempImage)
    else if (currentImage)
      saveImage(currentImage)
  }

  const clear = () => {
    setTempFile(null)
  }

  return (
    <div className="admin-photo-input">
      <div>
        {label && <p className="p3-label">{label}</p>}
        {
          edit ?
            <Tabs onSelect={clear}>
              <TabList>
                <Tab>Загрузить</Tab>
                <Tab>Прикрепить ссылку</Tab>
                <Tab disabled={disableChooseTab}>Выбрать из загруженных</Tab>
              </TabList>

              <TabPanel>
                <p className="p3-label">Загрузите изображение</p>
                <div className="tab-content">
                  <input
                    onChange={onFileInputChange}
                    ref={fileInputRef}
                    type="file"
                  />
                  {tempFile && <img src={tempFile} className="image"/>}
                </div>
              </TabPanel>
              <TabPanel>
                <p className="p3-label">Укажите ссылку на изображение</p>
                <div className="tab-content">
                  <input type="text" onChange={onLinkChange}/>
                  {
                    tempImage.link &&
                    <>
                      <img src={tempImage.link} className="image"/>
                    </>
                  }
                </div>
              </TabPanel>
              <TabPanel>
                <p className="p3-label">Выберите из загруженных</p>
                <div className="tab-content">
                  <button>Выбрать</button>
                </div>
              </TabPanel>
            </Tabs> :
            (
              tempFile && <img src={tempFile} className="image"/> ||
              tempImage.link && <img src={tempImage.link} className="image"/>
            )
        }
      </div>
      <div className="buttons-block">
        {
          edit &&
          <button
            className={`button-svg ${!tempImage.file && !tempImage.link && 'disabled'}`}
            onClick={save}
            disabled={!tempImage.file && !tempImage.link}
          >
            <FaSave className="svg-base-size"/>
          </button>
        }
        {
          !edit &&
          <FaEdit onClick={setIsEdit} className="svg-dark svg-base-size"/>
        }
        {
          close && onClose &&
          <button
            className="button-svg"
            onClick={onClose}><FaPlus className="svg-base-size close"/></button>
        }
      </div>
    </div>
  )
}

export default PhotoInput
