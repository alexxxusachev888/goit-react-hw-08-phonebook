import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/operations';
import { TextField, Button } from '@mui/material';
import { styled } from '@mui/system';

const Form = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

export const ContactForm = () => {
  const dispatch = useDispatch();

  const handleSubmitForm = (evt) => {
    evt.preventDefault();
    const form = evt.target.elements;
    dispatch(
      addContact({
        name: form.name.value,
        number: form.number.value,
      }),
    );
    evt.target.reset();
  };

  return (
    <Form onSubmit={handleSubmitForm}>
      <TextField label="Name" name="name" required />
      <TextField label="Number" name="number" required />
      <Button type="submit" variant="contained" color="primary">
        Add contact
      </Button>
    </Form>
  );
}
