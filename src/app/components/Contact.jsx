import axios from 'axios';
import { useState } from 'react';
import { Card, Form, TextInput, TextArea, BudgetDropDown, Button } from './sub_components/subContact.jsx';

import '../styles/contact.scss';

const Contact = () => {
    const [formData, setFormData] = useState({
        email: { label: 'Email', value: '', focus: false }
    });

    const [isLoading, setIsLoading] = useState(false);
    const [isDone, setIsDone] = useState(false);

    const handleFocus = (e) => {
        const name = e.target.name;
        setFormData({
            ...formData,
            [name]: { ...formData[name], focus: true }
        });
    };

    const handleBlur = (e) => {
        const name = e.target.name;
        setFormData({
            ...formData,
            [name]: { ...formData[name], focus: false }
        });
    };

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData({
            ...formData,
            [name]: { ...formData[name], value }
        });
    };

    const dataToSend = {
        email: formData.email.value
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        await sendDataToAPI(dataToSend);
        setIsLoading(false);
        setIsDone(true);

        setTimeout(() => {
            setIsDone(false);
        }, 2000);
    }

    const { name, email, message, company, budget } = formData;

  return (
    <div id='contact'>
        <Card>
            <div className='contact_heading'>
                <p className='contact_title'>Contact Us</p>
                <h2>GET ACCESS TO <span>FREE</span> <br/>AUTOMATION RESOURCES!</h2>
            </div>
            <Form onSubmit={handleSubmit} >
                <TextInput
                    {...email}
                    name="email"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    autocomplete="email"
                />
                <input type="checkbox" name="opt-in" id="newsletter" checked />
                <Button isLoading={isLoading} isDone={isDone} >Send</Button>
            </Form>
        </Card>
    </div>
  );
}

export default Contact;