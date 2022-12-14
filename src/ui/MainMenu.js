import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

// Função que retorna todos os componentes que estarão contidos no Menu da aplicação
export default function MainMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
        <IconButton 
            id="basic-button"
            edge="start" 
            color="inherit" 
            aria-label="menu" 
            sx={{ mr: 2 }}
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}>
                

            <MenuIcon />
        </IconButton>
    
        <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
            'aria-labelledby': 'basic-button',
        }}
        >

        <MenuItem
          component={Link}
          to="/karango"
          onClick={handleClose}
        >
          Listagem de Karangos
        </MenuItem>
        
        <MenuItem
          component={Link}
          to="/karango/novo"
          onClick={handleClose}
        >
          Cadastro de Karangos
        </MenuItem>

        {/*Adicionado o item "Listagem de Clientes" ao menu*/}
        <MenuItem
          component={Link}
          to="/cliente"
          onClick={handleClose}
        >
          Listagem de Clientes
        </MenuItem>

        {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem> */}
        </Menu>


    </div>
  );
}
