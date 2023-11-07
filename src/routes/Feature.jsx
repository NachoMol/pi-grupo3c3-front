import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import Divider from '@mui/material/Divider';
import BluetoothIcon from '@mui/icons-material/Bluetooth';
import AutoModeIcon from '@mui/icons-material/AutoMode';
import UsbIcon from '@mui/icons-material/Usb';
import { blueGrey } from '@mui/material/colors';

export default function Feature() {
  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
      }}
    >
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <UsbIcon   sx={{ background: blueGrey[500] }} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="USB PORT" secondary="USB" />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <AutoModeIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Manual" secondary="Transmission" />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <AutoModeIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Automatic" secondary="Transmission" /> 
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <BluetoothIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Bluetooth" secondary="Bluetooth" /> 
      </ListItem>
    </List>
  );
}