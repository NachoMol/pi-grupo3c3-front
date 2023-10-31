import { useState } from 'react'
import { Link } from 'react-router-dom';
import LogoImage from "../assets/menu/logoExp-bgB.png";

import { AppBar, Container, Box, Toolbar, IconButton, Typography, Menu, Button, MenuItem, styled } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
// colores #371957 morado #000000 negro #FFFFFF blanco #898989 gris menu

const UserIcon = styled(PersonIcon)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    width: 39,
    height: 31,
  },
}));

const UserTitle = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    margin: '0'
  },
}));

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
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [admin, setAdmin] = useState(true);

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
      <Container maxWidth={false} >
        <Toolbar disableGutters sx={{ maxHeight: 90 }}>
          <Box disableGutters sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, maxWidth: 135 }}>
            <Link to={'/'}>
              <img src={LogoImage}
                alt="Logo"
                style={{
                  width: 130,
                  height: 83,
                  filter: 'invert(1)',
                  marginTop: '2%'
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
              sx={{ display: { xs: 'block', md: 'none' } }}
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
                  width: 105,
                  height: 65,
                  filter: 'invert(1)',
                  marginTop: '3%'
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
                    my: 2,
                    display: 'block',
                    color: '#d9d9d9',
                    fontFamily: 'Spinnaker, sans-serif',
                    fontSize: 28,
                    fontWeight: 400,
                    fontStyle: 'normal',
                    textDecoration: 'none',
                    margin: 0,
                    padding: 0
                  }}
                >
                  {/* {page.name} */}
                </Button>
              </Link>
            ))}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <UserIcon sx={{
              width: 40,
              height: 40,
              color: '#000',
            }} />
            <Box >
              {admin ? <UserTitle
                variant="h5"
                sx={{
                  fontFamily: 'Spinnaker, sans-serif',
                  color: '#FFF',
                  textDecoration: 'none',
                  fontSize: 24,
                  cursor: 'pointer',
                  alignSelf: 'center',
                  margin: '7px 0 0 0'
                }}
              >
                                <Link to={'/admin'}>
                    <p>Admin</p>
                </Link>
              </UserTitle> : (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
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
                </div>
              )}
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header