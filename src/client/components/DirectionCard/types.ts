import { Direction } from '~/common/types/direction'

export type directionCard = {
    img: string
    backgroundColor: string
    direction: Direction
    isActive: boolean
    onClick: () => void
}