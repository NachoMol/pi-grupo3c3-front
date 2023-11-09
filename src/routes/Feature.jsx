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
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

export default function Feature({ carId }) {


  const[details, setDetails] = useState([]);

  useEffect(() => {
      const fetchDetails = async () => {
      try{
          const response = await axios.get(`http://localhost:8080/products/${carId}/get-details`)
          setDetails(response.data)
      }catch(error){
          console.error("Error fetching cars", error)
          }
      }
      fetchDetails();
  },[carId])


  const selectedDetailsAsNumbers = details.map(Number);

  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
      }}
    >
      {selectedDetailsAsNumbers.map((detail) => (
        <div key={detail.id}>
          <ListItem>
            <ListItemAvatar>
              <Avatar sx={{ background: blueGrey[500] }}>
                {/* Aquí puedes renderizar el icono adecuado para cada detalle */}
                {/* Por ejemplo, si 'detail.icon' contiene el nombre del icono, podrías usar un switch o un objeto de mapeo para seleccionar el icono adecuado. */}
                {/* Ejemplo de uso de un objeto de mapeo: */}
                {detail.icon === 'usb' && <UsbIcon />}
                {detail.icon === 'automode' && <AutoModeIcon />}
                {detail.icon === 'bluetooth' && <BluetoothIcon />}
                {/* Añade más casos según los iconos que necesites */}
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={detail.name} secondary={detail.description} />
          </ListItem>
          {details.indexOf(detail) !== details.length - 1 && (
            <Divider variant="inset" component="li" />
          )}
        </div>
      ))}
    </List>
  );
}