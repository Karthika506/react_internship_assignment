import { Button, TextField } from '@mui/material';
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom';

interface FormData {
    name: string;
    email: string;
    phoneNumber: String;
}

const FirstPage: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>({
        name:'',
        email:'',
        phoneNumber:''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value})
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.phoneNumber){
            alert('Please fill all the provided fields.')
            return;
        }
        localStorage.setItem('UserDetails', JSON.stringify(formData));
        navigate('/second', {replace: true})
    }
    return (
        <div className="fist--container">
            <fieldset className='form'>
                <legend>User Details</legend><br></br>
                <form className='form--data' onSubmit={handleSubmit}>
                    <TextField className='form--details' label='Name' variant="outlined" name='name' value={formData.name} onChange={handleChange}/><br></br><br></br>
                    <TextField className='form--details' label='Email' variant="outlined" name='email' value={formData.email} onChange={handleChange}/><br></br><br></br>
                    <TextField className='form--details' label='Phone Number' variant="outlined" name='phoneNumber' value={formData.phoneNumber} onChange={handleChange}/><br></br><br></br>
                    <Button className='button' type = 'submit' variant='contained' color='primary'>Submit</Button>
                </form>
            </fieldset>
        </div>
    )
}

export default FirstPage;