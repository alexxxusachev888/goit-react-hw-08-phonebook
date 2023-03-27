import { Input, Label } from './Filter.styled';
import { useDispatch, useSelector } from "react-redux";
import { searchContact } from '../../redux/contactsSlice';
import { getFilter } from '../../redux/selectors';

export function Filter() { 
    const dispatch = useDispatch();
    const filter = useSelector(getFilter);

    return (
        <Label>
            Find contact by name: 
            <Input 
            type="text" 
            value={filter} 
            onChange={(evt)=> dispatch(searchContact(evt.target.value))}>
            </Input>
        </Label>
        
    )
}