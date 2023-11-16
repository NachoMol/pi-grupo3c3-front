import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import LogoImage from "../assets/menu/logoExp-bgB.png";

import { AppBar, Container, Box, Toolbar, IconButton, Typography, Menu, Button, MenuItem, styled, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import getInitialStrings from '../helpers/getInitialStrings';
import { useContextGlobal } from '../context/Context';
// colores #371957 morado #000000 negro #FFFFFF blanco #898989 gris menu

const UserIcon = styled(PersonIcon)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    width: 39,
    height: 31,
  },
}));

const UserTitle = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    margin: '0',
  },
}));

const itemMenu = [
  {
    id: 1,
    name: 'Admin',
    link: '/admin',
  }
];

const Header = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElAvatar, setAnchorElAvatar] = useState(null);

  const { userData, authUser } = useContextGlobal();
  const { name, lastname } = userData.user;
  const { isLogged } = authUser.auth;
  const avatar = getInitialStrings(name, lastname);

  const { handleLogout } = useContextGlobal()

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleClickAvatar = (event) => {
    setAnchorElAvatar(event.currentTarget);
  };

  const handleCloseAvatarMenu = () => {
    setAnchorElAvatar(null); // Cierra el menú antes de realizar otras acciones
  };

  const handleLogoutClick = () => {
    handleLogout(); // Desloguea al hacer clic en el elemento "Logout" del menú del avatar
    handleCloseAvatarMenu(); // Cierra el menú después del deslogueo
  };


  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#5C4D6B', zIndex: 10 }}>
      <Container maxWidth={false}>
        <Toolbar disableGutters sx={{ maxHeight: 90 }}>
          <Box disableGutters sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, maxWidth: 135 }}>
            <Link to={'/'}>
              <img
                src={LogoImage}
                alt="Logo"
                style={{
                  height: 65,
                  filter: 'invert(1)',
                  marginTop: '2%',
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
                    <Typography textAlign="center" color={'#898989'}>
                      {page.name}
                    </Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'none' } }}>
            <Link to={'/'}>
              <img
                src={LogoImage}
                alt="Logo"
                style={{
                  width: 105,
                  height: 65,
                  filter: 'invert(1)',
                  marginTop: '3%',
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
                    padding: 0,
                  }}
                >
                  {page.name}
                </Button>
              </Link>
            ))}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box>
              {isLogged ? (
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', maxWidth: 240 }}>
                  <UserTitle
                    variant="h5"
                    sx={{
                      fontFamily: 'Spinnaker, sans-serif',
                      color: '#FFF',
                      textDecoration: 'none',
                      fontSize: 24,
                      cursor: 'pointer',
                      alignSelf: 'center',
                      margin: '7px 0 0 0',
                    }}
                  >
                    {/* Add user name here */}
                  </UserTitle>
                  <Avatar sx={{ bgcolor: '#A3A3A3', mb: '6px', '&:hover': { cursor: 'pointer' } }} onClick={handleClickAvatar}>
                    {avatar}
                  </Avatar>

                  <Menu
                    id="avatar-menu"
                    anchorEl={anchorElAvatar}
                    open={Boolean(anchorElAvatar)}
                    onClose={handleCloseAvatarMenu}
                  >
                    <Link to={'/UserProfile'} style={{textDecoration: 'none'}}>
                      <MenuItem style={{ fontFamily: 'Spinnaker, sans-serif', color: 'black', fontSize: 15 }} onClick={handleCloseAvatarMenu}>My Profile</MenuItem>
                    </Link>
                    <Link to={''} style={{textDecoration: 'none'}}>
                      <MenuItem style={{ fontFamily: 'Spinnaker, sans-serif', color: 'black', fontSize: 15 }} onClick={handleCloseAvatarMenu}>Favorites</MenuItem>
                    </Link>
                    <Link to={'/admin'} style={{textDecoration: 'none'}}>
                      <MenuItem style={{ fontFamily: 'Spinnaker, sans-serif', color: 'black',fontSize: 15 }} onClick={handleCloseAvatarMenu}>Admin Panel</MenuItem>
                    </Link>
                      <MenuItem style={{ fontFamily: 'Spinnaker, sans-serif', color: 'black', fontSize: 15 }} onClick={handleLogoutClick}>Logout</MenuItem>
                  </Menu>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontFamily: 'Spinnaker, sans-serif',
                      color: '#FFF',
                      textDecoration: 'none',
                      fontSize: 24,
                      cursor: 'pointer',
                    }}
                  >
                    <Link
                      to={'/login'}
                      style={{
                        fontFamily: 'Spinnaker, sans-serif',
                        color: '#FFF',
                        textDecoration: 'none',
                        fontSize: 18,
                      }}
                    >
                      Sign In
                    </Link>
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      fontFamily: 'Spinnaker, sans-serif',
                      fontSize: 24,
                      color: '#FFF',
                      textDecoration: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    <Link to={'/register/'} style={{ fontFamily: 'Spinnaker, sans-serif', color: '#FFF', textDecoration: 'none', fontSize: 18 }}>
                      Sign Up
                    </Link>
                  </Typography>
                </div>
              )}
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;