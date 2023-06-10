import React, { useEffect, useState } from 'react'

interface CustomImgProps {
  src: string;
  alt: string;
  size: number;
}

const CustomImg: React.FC<CustomImgProps> = ({ src, alt, size }) => {
  const [imageUrl, setImageUrl] = useState<string>('')

  useEffect(() => {
    const resizeImageToSize = async (imageUrl: string, size: number): Promise<string> => {
      const response = await fetch(imageUrl)
      const blob = await response.blob()

      return new Promise<string>((resolve) => {
        const img = new Image()

        img.onload = () => {
          const aspectRatio = img.width / img.height
          let width, height

          if (img.width > img.height) {
            width = size
            height = size / aspectRatio
          } else {
            width = size * aspectRatio
            height = size
          }

          const canvas = document.createElement('canvas')
          const context = canvas.getContext('2d')

          if (context) {
            canvas.width = size
            canvas.height = size

            context.clearRect(0, 0, canvas.width, canvas.height)

            context.beginPath()
            context.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI)
            context.closePath()
            context.clip()

            context.drawImage(img, (size - width) / 2, (size - height) / 2, width, height)
            const outerRadius = size / 2
            context.beginPath()
            context.arc(size / 2, size / 2, outerRadius, 0, 2 * Math.PI)
            context.closePath()
            context.lineWidth = 5
            context.strokeStyle = '#ff00ff'
            context.stroke()

            const resizedImageUrl = canvas.toDataURL()
            resolve(resizedImageUrl)
          } else {
            throw new Error('Canvas context is null')
          }
        }

        img.src = URL.createObjectURL(blob)
      })
    }

    const fetchImage = async () => {
      const resizedImageUrl = await resizeImageToSize(src, size)
      setImageUrl(resizedImageUrl)
    }

    fetchImage()
  }, [src, size])

  return <img src={imageUrl} alt={alt} style={{ borderRadius: '50%' }} />
}

export default CustomImg
