import React, { useEffect, useState } from 'react';
import axios from 'axios';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useContextGlobal } from '../context/Context';

const ReservationsList = () => {
    const { userData } = useContextGlobal();
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);

    const isCancelAllowed = (checkinDate) => {
        const currentDateTime = new Date();
        const checkinDateTime = new Date(checkinDate);
        const tomorrowDateTime = new Date();
        tomorrowDateTime.setDate(currentDateTime.getDate() + 1);

        return checkinDateTime > tomorrowDateTime;
    };

    // Ordenar reservas por fecha (de más próxima a más lejana)
    const sortedReservations = [...reservations].sort((a, b) => {
        const dateA = new Date(a.checkin);
        const dateB = new Date(b.checkin);
        return dateB - dateA;  // Cambio de dateA - dateB a dateB - dateA
    });

    const handleCancelReservation = async (reservationId) => {
        try {
            const response = await axios.put(`http://localhost:8080/reservations/cancel/${reservationId}`);
            console.log('Cancel Reservation Response:', response.data);
            // Actualizar la lista de reservas después de la cancelación
            fetchReservations();
        } catch (error) {
            console.error('Error canceling reservation:', error);
            alert(error.response.data); // Muestra el mensaje de error del backend
        }
    };

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

    useEffect(() => {
        fetchReservations();
    }, [userData]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', height: '100vh' }}>
            <div style={{ width: '80vw' }}>
                <h2 style={{ textAlign: 'center' }}>My Reservations</h2>
                {loading && <p>Loading...</p>}
                {!loading && sortedReservations.length === 0 && <p>No reservations found.</p>}
                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    {sortedReservations.map((reservation) => (
                        <React.Fragment key={reservation.id}>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar style={{ width: '60px', height: '60px', objectFit: 'cover', marginRight: '10px' }} alt={reservation.product.name} src={reservation.product.images.length > 0 ? reservation.product.images[0].url : ''} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={`${reservation.product.name}`}
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
                                            {` -- City: ${reservation.city.city}`}
                                        </React.Fragment>
                                    }
                                />
                                {isCancelAllowed(reservation.checkin) && (
                                    <Button variant="contained" color="secondary" onClick={() => handleCancelReservation(reservation.id)} style={{ margin: 'auto' }}>
                                        Cancel
                                    </Button>
                                )}
                            </ListItem>
                        </React.Fragment>
                    ))}
                </List>
            </div>
        </div>
    );
};

export default ReservationsList;