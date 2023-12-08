import { useEffect, useState, useMemo } from 'react'
import { Accordion, Typography, AccordionDetails } from '@mui/material'
import MuiAccordionSummary, {
    AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import RemoveIcon from '@mui/icons-material/Remove';
import styled from 'styled-components';
import { Checkbox } from '@mui/material'
import { IAccordionCompProps } from "../types"

const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
        {...props}
    />
))(() => ({
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        marginRight: "1rem"
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: "1rem",
    },
}));


function AccordionComp({ item, parentMarked, subDepartmentMarked, handleParentDepartmentChange, handleSubDepartmentChange, makeParentMarked }: IAccordionCompProps) {
    const [expanded, setExpanded] = useState<boolean>(false);

    const isAllSubDepartmentsSelected = useMemo(() => {
        return item.sub_departments.every((subDepartment) => subDepartmentMarked.includes(subDepartment))
    }, [item.sub_departments, subDepartmentMarked]);

    const isDepartmentSelected = useMemo(() => {
        return parentMarked.includes(item.department) || isAllSubDepartmentsSelected
    }, [parentMarked, item.department, isAllSubDepartmentsSelected])

    useEffect(() => {
        if (isAllSubDepartmentsSelected) {
            makeParentMarked(item.department);
        }
    }, [isAllSubDepartmentsSelected, makeParentMarked, item.department])
    
    return (
        <Accordion
            key={item.department}
            expanded={expanded}
            disableGutters
        >
            <AccordionSummary
                expandIcon={<RemoveIcon onClick={() => setExpanded((prev) => !prev)} sx={{ fontSize: '0.9rem' }} color="primary" />}
                disableRipple
                sx={{ marginY: "0rem" }}
            >
                <Typography textTransform={"capitalize"}>
                    <Checkbox
                        size="small"
                        checked={isDepartmentSelected}
                        onChange={() => handleParentDepartmentChange(item.department)}
                    />
                    {item.department.split('_').join(' ')}
                    {item.sub_departments.length > 0 &&
                        <Typography variant="caption" component="span" sx={{ marginLeft: "0.5rem" }} color="gray" fontWeight={600}>
                            {`(${item.sub_departments.length})`}
                        </Typography>
                    }
                </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ marginLeft: "1.5rem" }}>
                {item.sub_departments.map((sub_department: string) => {
                    const isSubDepartmentSelected = subDepartmentMarked.includes(sub_department);

                    return (
                        <Typography
                            key={sub_department}
                            textTransform={"capitalize"}
                            sx={{ margin: "0.5rem" }}
                        >
                            <Checkbox
                                size="small"
                                checked={isSubDepartmentSelected}
                                onChange={() => handleSubDepartmentChange(sub_department)}
                            />
                            {sub_department.split('_').join(' ')}
                        </Typography>
                    )
                })}
            </AccordionDetails>
        </Accordion>
    )
}

export default AccordionComp