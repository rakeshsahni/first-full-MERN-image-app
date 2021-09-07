import { Button, Menu, MenuItem } from '@material-ui/core'
import { AccountCircle, KeyboardArrowDown } from '@material-ui/icons';
import React, { useState } from 'react'
import {Link,useHistory} from "react-router-dom"
import { useDispatch } from 'react-redux';
import logoutAction from './redux/actions/logoutAction';
function Afterlogin() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [open,setOpen] = useState(false);
    const handleOpen = (e) => {
        setOpen(e.currentTarget);
    }
    const handleClose = () => {
        setOpen(false);
    }
    const handleLogout = () => {
        handleClose();
        dispatch(logoutAction(history));
    }
    return (
        <div>
            <Button 
                onClick={handleOpen}
                color="inherit"
                endIcon={<KeyboardArrowDown/>}
            >
                <AccountCircle/>
            </Button>
            <Menu open={Boolean(open)} anchorEl={open} onClose={handleClose}>
                <MenuItem onClick={handleClose} component={Link} to="/profile">My Profile</MenuItem>
                <MenuItem onClick={handleClose} component={Link} to="/contact">About Developer</MenuItem>
                <MenuItem onClick={() => {handleLogout()}}>Logout</MenuItem>
            </Menu>
        </div>
    )
}

export default Afterlogin;
