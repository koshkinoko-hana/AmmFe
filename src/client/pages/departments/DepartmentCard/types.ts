export type DepartmentCardBack = {
    img: string
    backgroundColor: string
}

export type DepartmentCard = {
    back: DepartmentCardBack
    title: string
    link: string
}

export type EmployeeCard = {
    img: string
    name: string
    positions: string[]
}

export type HeadDepartmentCard = {
    img: string
    name: string
    description: string
}
