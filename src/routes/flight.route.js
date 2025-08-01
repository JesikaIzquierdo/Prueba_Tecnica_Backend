import express from 'express' 
import{createFlight, getAllFlight, getFlightById, updateFlightById ,removeFlightById} from '../controllers/flight.controller.js'


const router = express.Router ();

router.get ( '/api/flight', getAllFlight);
router.get('/api/flight/:id', getFlightById); 
router.post('/api/flight', createFlight);
router.put ( '/api/flight/:id',updateFlightById );
router.delete('/api/flight/:id', removeFlightById);




export default router 