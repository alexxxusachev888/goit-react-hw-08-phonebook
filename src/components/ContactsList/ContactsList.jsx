import { ContactElem } from 'components/ContactElem/ContactElem';
import { ListOfContacts } from './ContactsList.styled';
import { useSelector, useDispatch  } from "react-redux";
import { useEffect } from "react";
import { fetchContacts } from '../../redux/operations';
import { getIsLoading, getError, contactsToRender } from '../../redux/selectors'


export function ContactsList() {
    const isLoading = useSelector(getIsLoading);
    const error = useSelector(getError);
    const contacts = useSelector(contactsToRender);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchContacts());
    }, [dispatch]);

    return (
        <ListOfContacts>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}    
            {contacts.map(({id, contact: {name, number}}) => {
                return (<ContactElem id={id} name={name} number={number}/>)
            })}
        </ListOfContacts>
    )
}
