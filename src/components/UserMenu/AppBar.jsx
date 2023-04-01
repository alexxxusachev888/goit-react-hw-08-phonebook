import { AppBar as MuiAppBar, Toolbar } from '@mui/material';
import { Navigation } from './Navigation';
import { UserMenu } from './UserMenu';
import { AuthNav } from './AuthNav';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { useSelector } from 'react-redux';

export const AppBar = ({ onLogout }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <MuiAppBar position="static" sx={{ backgroundColor: 'primary.main', color: 'white'}}>
      <Toolbar sx={{dispaly: 'flex', justifyContent: 'space-between'}}>
        <Navigation />
        {isLoggedIn ? <UserMenu onLogout={onLogout} /> : <AuthNav />}
      </Toolbar>
    </MuiAppBar>
  );
};
