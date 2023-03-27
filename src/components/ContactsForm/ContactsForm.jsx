import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { addContact } from '../../redux/operations';
import { Form, Label, Input, Button } from './ContactsForm.styled';
import { getContacts } from '../../redux/selectors';
import { toast } from 'react-toastify';

export function ContactForm () {
    const dispatch = useDispatch();
    const currentContacts = useSelector(getContacts)

    const handleSubmitForm = (evt) => {
        evt.preventDefault();
        const form = evt.target.elements;
        const isDuplicate = () => {
            return currentContacts.some(({contact}) => contact.name === form.name.value);
        }

        const newContact = {
            id: nanoid(),
            name: form.name.value,
            number: form.number.value,
          }        

        if(!isDuplicate()) {
            dispatch(addContact(newContact))
        } else {
            toast.warn('That contact is on the list!')
        }
        evt.target.reset();
    }

    return (
            <Form onSubmit={handleSubmitForm}>
                <Label htmlFor={'nameInput'}>Name</Label>
                <Input
                    id={'nameInput'}
                    type="text"
                    name="name"
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                    />
                <Label htmlFor={'phoneInput'}>Number</Label>
                <Input
                    id={'phoneInput'}
                    type="tel"
                    name="number"
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                    />
                <Button type='submit'> Add contact</Button>
            </Form>
        )
}
