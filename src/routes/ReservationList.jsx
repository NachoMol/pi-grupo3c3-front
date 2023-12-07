import React, { useEffect, useState } from 'react';
import axios from 'axios';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useContextGlobal } from '../context/Context';


const ReservationsList = () => {
    const { userData } = useContextGlobal();
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/reservations/availablereservations-user/${userData.user.id}`);
                console.log('Response:', response.data);
                setReservations(response.data.content);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching reservations:', error);
                setLoading(false);
            }
        };

        fetchReservations();
    }, [userData]);

    return (
        <div>
            <h2>My Reservations</h2>
            {loading && <p>Loading...</p>}
            {!loading && reservations.length === 0 && <p>No reservations found.</p>}
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {reservations.map((reservation) => (
                    <React.Fragment key={reservation.id}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt={reservation.product.name} src={reservation.product.image} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={`Reservation for ${reservation.productName}`}
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            From {`${reservation.checkin}  to  ${reservation.checkout}`}
                                        </Typography>
                                        {` -- Price: $${reservation.price}`}
                                        {` --City: ${reservation.city.name}`}
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </React.Fragment>
                ))}
            </List>
        </div>
    );
};

export default ReservationsList;
