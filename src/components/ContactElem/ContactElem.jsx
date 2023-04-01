import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  ListItem,
  ListItemText,
  IconButton,
  ListItemSecondaryAction,
  ListItemButton,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { deleteContact } from 'redux/operations';
import { createPortal } from 'react-dom';
import { EditForm } from 'components/Modal/Modal';
import { editContact } from '../../redux/contactsSlice';

import PhoneIcon from '@mui/icons-material/Phone';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';

const rootModalRef = document.querySelector('#modal');

export function ContactElem({ id, name, number }) {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const handleEditClick = () => {
    dispatch(editContact({ id, name, number }));
    setShowModal(true);
  };

  return (
    <>
      <ListItem
        disableGutters
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'space-between',
          borderRadius: '8px',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
          },
        }}
      >
        <ListItemButton sx={{ '&:hover': { backgroundColor: 'transparent' } }}>
          <IconButton edge="start" aria-label="phone">
            <PhoneIcon />
          </IconButton>
          <ListItemText
            sx={{ marginLeft: '10px', 
            display: 'flex',
            alignItems: 'center',
            gap: '20px' }}
            primary={name}
            secondary={number}
          />
        </ListItemButton>
        <ListItemSecondaryAction sx={{display: 'flex',
          gap: '10px',}}>
          <Button 
                edge="end" 
                aria-label="edit" 
                onClick={handleEditClick}
                variant="outlined" 
                startIcon={<EditIcon />}>
            Edit
            </Button>
          <Button 
                edge="end"
                aria-label="delete"
                onClick={() => dispatch(deleteContact(id))}
                variant="outlined" 
                startIcon={<DeleteIcon />}>
            Delete
            </Button>
        </ListItemSecondaryAction>
      </ListItem>
      {showModal &&
        createPortal(<EditForm onClose={() => setShowModal(false)} />, rootModalRef)}
    </>
  );
}

ContactElem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};
