import express from 'express' 
import { createReservation, getAllReservation, getReservationById, removeReservationById, updateReservationById } from '../controllers/reservation.controller.js';


const router = express.Router ();

router.get ( '/api/reservation', getAllReservation);
router.get('/api/reservation/:id', getReservationById); 
router.post('/api/reservation', createReservation);
router.put ( '/api/reservation/:id',updateReservationById );
router.delete('/api/reservation/:id', removeReservationById);




export default router 