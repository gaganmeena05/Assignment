export interface IUserData {
    name: string;
    phoneNumber: string;
    email: string;
}

export interface IPost {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export interface IDepartmentData {
    department: string;
    sub_departments: string[];
}

export interface IAccordionCompProps {
    item: IDepartmentData,
    parentMarked: string[],
    subDepartmentMarked: string[],
    handleParentDepartmentChange: (department: string) => void,
    handleSubDepartmentChange: (subDepartment: string) => void,
    makeParentMarked: (department: string) => void,
}