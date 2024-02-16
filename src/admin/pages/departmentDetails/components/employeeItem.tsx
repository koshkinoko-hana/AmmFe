import { EmployeePositionShort } from '@admin/ducks/types/employee'
import { EmployeeItemProps } from '@admin/pages/departmentDetails/types'
import Select from '@common/components/select'
import { Option } from '@common/components/select/types'
import React, { useCallback, useState } from 'react'
import { FaEdit, FaSave, FaTrashAlt } from 'react-icons/fa'

const EmployeeItem: React.FC<EmployeeItemProps> = ({
  employee,
  employeeOptions,
  positionOptions,
  onSave,
  onDelete,
  duplicated
}) => {
  const [ draftEmployee, setDraftEmployee ] = useState<Partial<EmployeePositionShort>>(employee || {})
  const [ isEdit, setIsEdit ] = useState(!employee)

  const onEmployeeChange = useCallback((value: Option) => {
    setDraftEmployee({ ...draftEmployee, id: value.value as number, name: value.label })
  }, [draftEmployee])

  const onPositionChange = useCallback((value: Option) => {
    setDraftEmployee({ ...draftEmployee, positionId: value.value as number, positionName: value.label })
  }, [draftEmployee])


  const save = () => {
    setIsEdit(false)
    if (draftEmployee.id && draftEmployee.positionId)
      onSave(draftEmployee as EmployeePositionShort)
  }

  return (
    <div className="item">
      {isEdit ?
        <>
          <Select
            options={employeeOptions}
            isMulti={false}
            classList="full-width"
            value={draftEmployee.id && draftEmployee.name ? {
              value: draftEmployee.id,
              label: draftEmployee.name
            } : undefined}
            onChange={onEmployeeChange}
          />
          <Select
            options={positionOptions}
            isMulti={false}
            classList="full-width"
            value={draftEmployee.positionId && draftEmployee.positionName ? {
              value: draftEmployee.positionId!,
              label: draftEmployee.positionName
            } : undefined}
            onChange={onPositionChange}
          />
          <FaSave onClick={save} className="svg-dark svg-base-size"/>
        </> :
        <>
          <span>{draftEmployee.name}</span>
          <span>{draftEmployee.positionName}</span>
          <FaEdit onClick={() => setIsEdit(true)} className="svg-dark svg-base-size"/>
        </>
      }
      <FaTrashAlt onClick={onDelete} className="svg-dark svg-base-size"/>
      {
        duplicated &&
       <div className="item__error">Эта запись дублирует другую из списка, сохранить невозможно</div>
      }
    </div>
  )
}

export default EmployeeItem
