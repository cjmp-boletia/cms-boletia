import React from 'react'
import { ListItemIcon, MenuItem, MenuList } from '@mui/material';
import Logout from '@mui/icons-material/Logout';
import DropdownFC from './dropdown'
import { useNavigate } from 'react-router-dom';

function MunuItems() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear()
        navigate('/');
    }

    return (
        <MenuList>
            <MenuItem onClick={logout}>
                <ListItemIcon>
                    <Logout />
                </ListItemIcon>
                Logout
            </MenuItem>
        </MenuList>
    );
}

const Dropdown = () => (
    <DropdownFC>
        <MunuItems />
    </DropdownFC>
)


export default Dropdown