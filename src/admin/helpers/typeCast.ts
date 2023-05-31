import { Option } from '@common/components/select/types'

export const optionsToString = (items?: Option[]) => {
  if(!items) {
    return
  }
  let value = ''
  items.forEach(item => {value += item.label + ', '})
  return value.length ? value.substring(0, value.length - 2) : '-'

}
