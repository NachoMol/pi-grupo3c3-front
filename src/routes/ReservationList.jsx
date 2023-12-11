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
import { urlReservation } from '../config/config';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import DefaultButton from '../components/DefaultButton';

const ReservationsList = () => {
    const [open, setOpen] = useState(false);
    const [reservations, setReservations] = useState([]);
    const [idReservation, setIdReservation] = useState(null);
    const [loading, setLoading] = useState(true);

    const { userData } = useContextGlobal();

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

    const handleCancelReservation = async (id) => {
        try {
            const { token } = JSON.parse(localStorage.getItem('auth'));
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            };
            const response = await axios.put(`${urlReservation}/cancel/${id}`, null, config);
            console.log('Cancel Reservation Response:', response.data);
            fetchReservations();

        } catch (error) {
            console.error('Error canceling reservation:', error);
            alert(error.response.data); // Muestra el mensaje de error del backend
        }
    };

    /**
    * Fetches reservations from a server based on the user's ID and updates the state with the available reservations.
    * @returns {void}
    */
    const fetchReservations = async () => {
        try {
            const response = await axios.get(`${urlReservation}/availablereservations-user/${userData.user.id}`);
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

    /**
   * Handles the click event and opens the modal.
   * @param {number} id - The ID of the reservation.
   */
    const handleClickOpen = (id) => {
        setOpen(true);
        setIdReservation(id)
    };

    /**
    * Closes the component.
    */
    const handleClose = () => {
        setOpen(false);
    };

    /**
   * Handles the confirmation action.
   * @return {undefined} No return value.
   */
    const handleConfirm = () => {
        handleClose();
        handleCancelReservation(idReservation);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '80vw', marginBottom:'100px' }}>
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
                                {(isCancelAllowed(reservation.checkin) && reservation.state === true) && (
                                    <Button variant="contained" color="secondary" onClick={() => handleClickOpen(reservation.id)} style={{ margin: 'auto' }}>
                                        Cancel
                                    </Button>
                                )}
                            </ListItem>
                        </React.Fragment>
                    ))}
                </List>
            </div>
            
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Do you want to cancel this reservation?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {`If you cancel the reservation keep in mind you may not find the same option.`}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <DefaultButton name={'No'} type={'button'} callback={handleClose} />
                    <DefaultButton name={'Yes'} type={'button'} callback={handleConfirm} />
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ReservationsList;