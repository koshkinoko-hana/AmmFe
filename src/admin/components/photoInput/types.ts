import { Image } from '@admin/pages/album/types'

export interface Props {
  label?: string
  saveImage: (image: Image) => void
  disableChooseTab?: boolean
  edit?: boolean
  close?: boolean
  onClose?: () => void
  setIsEdit: () => void
  currentImage?: Image
}
