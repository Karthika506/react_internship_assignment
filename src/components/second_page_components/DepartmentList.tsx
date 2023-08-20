import { Accordion, AccordionDetails, AccordionSummary, Checkbox } from '@mui/material';
import React, { useEffect, useState } from 'react';
import RemoveSharpIcon from '@mui/icons-material/RemoveSharp';
import AddSharpIcon from '@mui/icons-material/AddSharp';

interface SubDepartment {
    name: string;
}

interface SubDepartmentsChecked {
    [subDeptName: string]: boolean;
  }

interface Department{
    name: string;
    subdepartments: SubDepartment[];
}

interface DepartmentListProps {
    department: Department;
    onDepartmentChange: (departmentName: string, checked: boolean) => void;
    onSubDepartmentChange: (subDepartmentName: string, checked: boolean) => void;
}

const DepartmentList: React.FC<DepartmentListProps> = ({department, onDepartmentChange, onSubDepartmentChange}) => {
    const [isChecked, setIsChecked] = useState(false);
    const [subDepartmentsChecked, setSubDepartmentsChecked] = useState<SubDepartmentsChecked>(
        department.subdepartments.reduce((acc, subDept) => ({ ...acc, [subDept.name]: false }), {})
    );
    const [isExpanded, setIsExpanded] = useState(false)

    useEffect(() => {
        const allSubDepartmentsChecked = Object.values(subDepartmentsChecked).every(Boolean);
        if (isChecked !== allSubDepartmentsChecked){
            setIsChecked(allSubDepartmentsChecked);
            onDepartmentChange(department.name, allSubDepartmentsChecked);
        }
    }, [subDepartmentsChecked, isChecked, onDepartmentChange, department.name]);

    const handleDepartmentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked;
        setIsChecked(checked);
        onDepartmentChange(department.name, checked);
        setSubDepartmentsChecked((prev) => 
            Object.keys(prev).reduce((acc, subDeptName) => ({...acc, [subDeptName]: checked}), {})
        )
    }

    const hanleSubDepartmentChange = (subDeptName: string, checked: boolean) => {
        setSubDepartmentsChecked((prev) => ({...prev, [subDeptName]: checked}));
        onSubDepartmentChange(subDeptName, checked);

        const allSubDepartmentsChecked = Object.values(subDepartmentsChecked).every(Boolean);
        if (allSubDepartmentsChecked !== isChecked){
            setIsChecked(allSubDepartmentsChecked);
            onDepartmentChange(department.name, allSubDepartmentsChecked);
        }
        
    };

    return(
        <div>
            <Accordion expanded={isExpanded}>
                <AccordionSummary expandIcon = {isExpanded ? <RemoveSharpIcon onClick={() => setIsExpanded(false)}/> : <AddSharpIcon onClick={() => setIsExpanded(true)} />} onClick={(e) => {e.stopPropagation()}} aria-controls="panel-content">
                    <label style={{display: 'flex', alignItems: 'center', marginBottom: 10}}>
                        <Checkbox checked={isChecked} onChange={handleDepartmentChange} />
                        <span>{department.name}</span>
                    </label>
                </AccordionSummary>
                <AccordionDetails>
                    <div style = {{marginLeft: 20}}>
                        {department.subdepartments.map((subDept) => (
                            <div key={subDept.name}>
                                <label style={{display: 'flex', alignItems: 'center'}}>
                                    <Checkbox checked={subDepartmentsChecked[subDept.name]} onChange={(e) => hanleSubDepartmentChange(subDept.name, e.target.checked)}/>
                                    <span>{subDept.name}</span>
                                </label>
                            </div>
                        ))}
                    </div>
                </AccordionDetails>
                    
                
            </Accordion>
            
        </div>
    )
}

export default DepartmentList;