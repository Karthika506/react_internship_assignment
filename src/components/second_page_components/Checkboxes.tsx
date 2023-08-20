import React, { useState } from "react";
import DepartmentList from "./DepartmentList";
import { FormLabel } from "@mui/material";

interface SubDepartment{
    name: string;
}

interface Department{
    name: string;
    subdepartments: SubDepartment[];
}

const departments: Department[] = [
	{
  	name: "customer_service",
  	subdepartments: [
        {name: "support"}, 
        {name: "customer_success"}
  	]
	},
    {
    name: "design",
    subdepartments: [
        {name: "graphic_design"}, 
        {name: "product_design"},
        {name: "web_design"}
    ]  
    }
]
const createInitialSubDepartmentState = (subdepartments: SubDepartment[]) =>
  subdepartments.reduce((acc, subDept) => ({ ...acc, [subDept.name]: false }), {});


const Checkboxes: React.FC = () =>{
    const [, setDepartmentStates] = useState<Record<string, boolean>> (() => 
        departments.reduce((acc, dept) => ({ ...acc, [dept.name]: false}), {})
    );

    const [subDepartmentStates, setSubDepartmentStates] = useState<Record<string, Record<string, boolean>>>(
        departments.reduce((acc, dept) => {
          acc[dept.name] = createInitialSubDepartmentState(dept.subdepartments);
          return acc;
        }, {} as Record<string, Record<string, boolean>>)
      );

      const handleDepartmentChange = (departmentName: string, checked: boolean) => {
        setDepartmentStates((prev) => ({ ...prev, [departmentName]: checked }));
    
        if (checked) {
          setSubDepartmentStates((prev) => ({
            ...prev,
            [departmentName]: Object.fromEntries(
              Object.entries(prev[departmentName] || {}).map(([subDeptName, _]) => [subDeptName, true])
            ),
          }));
        } else {
          setSubDepartmentStates((prev) => ({
            ...prev,
            [departmentName]: Object.fromEntries(
              Object.entries(prev[departmentName] || {}).map(([subDeptName, _]) => [subDeptName, false])
            ),
          }));
        }
      };

  const handleSubDepartmentChange = (departmentName: string, subDepartmentName: string, checked: boolean) => {
    setSubDepartmentStates((prev) => ({
      ...prev,
      [departmentName]: {
        ...prev[departmentName],
        [subDepartmentName]: checked,
      },
    }));

    const allSubDepartmentsChecked = Object.values(subDepartmentStates[departmentName] || {}).every(Boolean);
    setDepartmentStates((prev) => ({ ...prev, [departmentName]: allSubDepartmentsChecked }));
  };

    return(
        <div>
            <FormLabel component="legend">Label Placement</FormLabel>
            {departments.map((department) => (
                <DepartmentList
                    key={department.name}
                    department={department}
                    onDepartmentChange={handleDepartmentChange}
                    onSubDepartmentChange={(subDeptName, checked) =>
                        handleSubDepartmentChange(department.name, subDeptName, checked)
                    }
                />
            ))}
        </div>
    )
} 

export default Checkboxes;