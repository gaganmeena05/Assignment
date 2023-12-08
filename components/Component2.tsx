import { useCallback, useState} from 'react'
import { sidebarDataJson } from '../src/assets/sidebarData'
import { IDepartmentData } from '../types'
import AccordionComp from './AccordionComp';
import { Card } from '@mui/material';

function Component2() {
    const sidebarData: IDepartmentData[] = JSON.parse(sidebarDataJson)
    const [parentMarked, setParentMarked] = useState<string[]>([]);
    const [subDepartmentMarked, setSubDepartmentMarked] = useState<string[]>([]);

    const handleParentDepartmentChange = useCallback((department: string) => {
        const isDepartmentSelected = parentMarked.includes(department);
        let updatedParentMarked: string[] = [];
        let updatedSubDepartmentMarked: string[] = [];
        console.log(parentMarked, isDepartmentSelected)

        if (isDepartmentSelected) {
            updatedParentMarked = parentMarked.filter((item) => item !== department);
            updatedSubDepartmentMarked = subDepartmentMarked.filter((item) => !sidebarData.find((item) => item.department === department)?.sub_departments.includes(item));
        } else {
            updatedParentMarked = [...parentMarked, department];
            updatedSubDepartmentMarked = [...subDepartmentMarked, ...sidebarData.find((item) => item.department === department)?.sub_departments || []];
        }

        setParentMarked(updatedParentMarked);
        setSubDepartmentMarked(updatedSubDepartmentMarked);
    }, [parentMarked, subDepartmentMarked, sidebarData]);

    const handleSubDepartmentChange = useCallback((subDepartment: string) => {
        const isSubDepartmentSelected = subDepartmentMarked.includes(subDepartment);
        let updatedSubDepartmentMarked: string[] = [];
        let updatedParentMarked: string[] = [];


        if (isSubDepartmentSelected) {
            updatedSubDepartmentMarked = subDepartmentMarked.filter((item) => item !== subDepartment);
            const parentDepartment = sidebarData.find((item) => item.sub_departments.includes(subDepartment))?.department;
            const isParentDepartmentSelected = parentMarked.includes(parentDepartment || "");
            if (isParentDepartmentSelected) {
                updatedParentMarked = parentMarked.filter((item) => item !== parentDepartment);
            }
        } else {
            updatedSubDepartmentMarked = [...subDepartmentMarked, subDepartment];
        }

        setSubDepartmentMarked(updatedSubDepartmentMarked);
        setParentMarked(updatedParentMarked);
    }, [subDepartmentMarked, parentMarked, sidebarData]);

    //add parent marked if not added
    const makeParentMarked = useCallback((department: string) => {
        if (!parentMarked.includes(department)) {
            setParentMarked([...parentMarked, department])
        }
    }, [parentMarked])

    return (
        <Card>
            {sidebarData.map((item: IDepartmentData) => {
                return (
                    <AccordionComp
                        key={item.department}
                        item={item}
                        parentMarked={parentMarked}
                        subDepartmentMarked={subDepartmentMarked}
                        handleParentDepartmentChange={handleParentDepartmentChange}
                        handleSubDepartmentChange={handleSubDepartmentChange}
                        makeParentMarked={makeParentMarked}
                    />
                )
            })}
        </Card>
    )
}

export { Component2 }






//     return (
//         <Card>
//             {sidebarData.map((item: IDepartmentData) => {
//                 return (
//                     <Accordion key={item.department} disableGutters>
//                         <AccordionSummary disableRipple sx={{ marginY: "0rem" }}>
//                             <Typography textTransform={"capitalize"}>
//                                 <Checkbox size="small" />
//                                 {item.department.split('_').join(' ')}
//                                 {item.sub_departments.length > 0 &&
//                                     <Typography variant="caption" component="span" sx={{ marginLeft: "0.5rem" }} color="gray" fontWeight={600}>
//                                         {`(${item.sub_departments.length})`}
//                                     </Typography>
//                                 }
//                             </Typography>
//                         </AccordionSummary>
//                         <AccordionDetails sx={{ marginLeft: "1.5rem" }}>
//                             {item.sub_departments.map((sub_department: string) => {
//                                 return (
//                                     <Typography
//                                         key={sub_department}
//                                         textTransform={"capitalize"}
//                                         sx={{ margin: "0.5rem" }}
//                                     >
//                                         <Checkbox size="small" />
//                                         {sub_department.split('_').join(' ')}
//                                     </Typography>
//                                 )
//                             })}
//                         </AccordionDetails>
//                     </Accordion>
//                 )
//             })}
//         </Card>
//     )
// }

// export { Component2 }