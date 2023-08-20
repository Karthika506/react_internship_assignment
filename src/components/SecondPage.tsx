import React from 'react'
import TableData from './second_page_components/TableData';
import Checkboxes from './second_page_components/Checkboxes';

const SecondPage: React.FC = () => {
    const items = JSON.parse(localStorage.getItem('UserDetails') || "")
    return(
        <div className='secondpage'>
            <h1>Hey, {items.name}! Welcome to second page</h1>
            <TableData />
            <h2>Here are the checkboxes</h2>
            <Checkboxes /> 
        </div>
    )
}
export default SecondPage;