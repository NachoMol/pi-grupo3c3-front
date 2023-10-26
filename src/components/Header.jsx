import React from 'react'
import LogoImage from "../assets/menu/logoExp-bgB.png";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';
// import AdbIcon from '@mui/icons-material/Adb';
// import { AppBar, Box, Toolbar } from '@mui/material';

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

  console.log(itemMenu)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#371957' }}>
      <Container maxWidth={false}>
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          {/* <img src={LogoImage} alt="Logo" style={{ height: '60px', marginRight: '10px'}} /> */}
          {/* <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <img src={LogoImage} alt="Logo" style={{ height: '80px', mr: '10px',  display: { xs: 'none', md: 'flex' } }} />
          </Typography> */}

          <Box maxWidth={false} sx={{ mr: 24, flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Link to={'/'}>
              <img src={LogoImage}
                alt="Logo"
                style={{
                  mr: 2,
                  // display: { xs: 'flex', md: 'none' },
                  width: 180,
                  height: 126.923,
                }}
                href="#app-bar-with-responsive-menu"
              />
            </Link>
          </Box>

          {/* <img src={LogoImage} alt="Logo" style={{ height: '80px', mr: '10px', display: { xs: 'none', md: 'flex' } }} /> */}

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
            {/* Si se colocá acá la imagen queda en el menú hamburguesa */}
            {/* <img src={LogoImage}
              alt="Logo"
              style={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                width: 180,
                height: 126.923,
              }}
              href="#app-bar-with-responsive-menu"
            /> */}
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
                <Link to={page.link} key={page.id} style={{textDecoration: 'none'}}>
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
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <img src={LogoImage} alt="Logo" style={{ height: '60px', marginRight: '10px'}} />
          </Typography> */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <Link to={'/'}>
              <img src={LogoImage}
                alt="Logo"
                style={{
                  mr: 2,
                  // display: { xs: 'flex', md: 'none' },
                  width: 180,
                  height: 126.923,
                }}
                href="#app-bar-with-responsive-menu"
              />
            </Link>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'space-evenly' }}>
            {itemMenu.map((page) => (
              <Link to={page.link} key={page.id} style={{textDecoration: 'none'}}>
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
                }}
              >
                INICIAR SESION
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  fontFamily: 'Spinnaker, sans-serif',
                  fontSize: 24,
                  color: '#FFF',
                  textDecoration: 'none',
                }}
              >
                CREAR CUENTA
              </Typography>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header