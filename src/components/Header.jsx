import React from 'react'
import { Link } from 'react-router-dom';
import LogoImage from "../assets/menu/logoExp-bgB.png";

import { AppBar , Container, Box, Toolbar, IconButton, Typography, Menu, Button, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
// colores #371957 morado #000000 negro #FFFFFF blanco #898989 gris menu

const itemMenu = [
  {
    id: 1,
    name: "Home",
    link: "/"
  },
  {
    id: 2,
    name: "Galery",
    link: "/carGallery"
  }
];

const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  /**
   * Función para abrir el menu responsive
   */
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  /**
   * Función para cerrar el menu responsive
   */
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#371957' }}>
      <Container maxWidth={false}>
        <Toolbar disableGutters>
          <Box maxWidth={false} sx={{ mr: 24, flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Link to={'/'}>
              <img src={LogoImage}
                alt="Logo"
                style={{
                  mr: 2,
                  width: 180,
                  height: 126.923,
                }}
                href="#app-bar-with-responsive-menu"
              />
            </Link>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {itemMenu.map((page) => (
                <Link to={page.link} key={page.id} style={{ textDecoration: 'none' }}>
                  <MenuItem key={page.id} onClick={handleCloseNavMenu}>
                    <Typography
                      textAlign="center"
                      color={'#898989'}
                    >
                      {page.name}
                    </Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <Link to={'/'}>
              <img src={LogoImage}
                alt="Logo"
                style={{
                  mr: 2,
                  width: 180,
                  height: 126.923,
                }}
                href="#app-bar-with-responsive-menu"
              />
            </Link>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'space-evenly' }}>
            {itemMenu.map((page) => (
              <Link to={page.link} key={page.id} style={{ textDecoration: 'none' }}>
                <Button
                  key={page.id}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2, display: 'block', color: '#898989',
                    fontFamily: 'Spinnaker, sans-serif',
                    fontSize: 36,
                    fontWeight: 400,
                    fontStyle: 'normal',
                    textDecoration: 'none'
                  }}
                >
                  {page.name}
                </Button>
              </Link>
            ))}
          </Box>
          <Box sx={{ display: 'Flex' }}>
            <PersonIcon sx={{
              width: 62,
              height: 60,
              color: '#000',
            }} />
            <Box>
              <Typography
                variant="h5"
                sx={{
                  fontFamily: 'Spinnaker, sans-serif',
                  color: '#FFF',
                  textDecoration: 'none',
                  fontSize: 24,
                  cursor: 'pointer'
                }}
              >
                Login
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  fontFamily: 'Spinnaker, sans-serif',
                  fontSize: 24,
                  color: '#FFF',
                  textDecoration: 'none',
                  cursor: 'pointer'
                }}
              >
                Sign Up
              </Typography>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header