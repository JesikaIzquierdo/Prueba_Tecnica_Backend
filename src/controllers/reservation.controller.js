import ReservationModel from "../schemas/reservation.schema.js"


const createReservation = async ( req, res ) => {
    const inputData = req.body
          // Extraigo el objeto enviado 
    
    // Try: Controla las excepciones de la consulta a la base de datos 
    try {
        console.log("holaaa", inputData);
        const registeredReservation = await (await ReservationModel.create(inputData)).populate(['userId', 'flights.flightId'])

        console.log ( registeredReservation )  // Imprime en la consola
        res.send ( registeredReservation)  // Enviando la respuesta al cliente
    }
    catch ( error ) {    // Catch: Captura el error producido por la excepción 
        console.error ( error )
        res.status( 500 ).json ( { msg: 'Error al registrar la reservación ' } )
    }
} 

const getAllReservation = async ( req, res ) => {
    
    try {
        const data = await ReservationModel.find ( {} ).populate(['userId', 'flights.flightId'])

        res.json ( data )     
    } 
    catch (error) {
        console.error ( error )
        res.json ( { msg: 'Error: No se pudo obtener el listado de reservaciones' } )        
    }
    
    
}

const getReservationById = async ( req, res ) => {
    const reservationId = req.params.id    // El nombre final dependerá del nombre del parámetro en la ruta 
    
    try {
        const data = await ReservationModel.findById ( reservationId ).populate(['userId', 'flights.flightId'])


        // Verifica si el artista no existe y lanza el respectivo mensaje al cliente
        if ( ! data ) {
            return res.json ( { msg: 'La reservacion no se encuentra registrado' } )
        }
        
        res.json ( data )
    } 
    catch (error) {
        console.error ( error )
        res.json ( { msg: 'Error: No se pudo encontrar la reservacion' } )
    }
}

const removeReservationById = async (req, res) => {
    const reservationId = req.params.id;

    try{ 

    const data = await ReservationModel.findByIdAndDelete (reservationId);

    if(data == null){

            return res.json({msg: 'Error: La reservacion no existe'});
        }

    res.json(data);

    }

    catch (error){
        console.error( error);
        res.json({msg: 'Error: No se pudo encontrar la reservacion'});
    }
}



const updateReservationById = async ( req, res ) => {
    const reservationId = req.params.id  // Obtenemo el ID de la parametrización de la ruta
    const inputData = req.body   // Obtenemos el body de la petición
    
    try {
        const data = await ReservationModel.findByIdAndUpdate ( reservationId, inputData, { new: true } ).populate(['userId', 'flights.flightId'])


        res.json ( data )    
    } 
    catch (error) {
        console.error ( error )
        res.json ( { msg: 'Error: No se pudo actualizar la reservacion' } )
    }
}


// Exponer las funcionalidades para ser usadas por otros archivos
export {
    createReservation,
    getAllReservation,
    getReservationById,
    updateReservationById,
    removeReservationById
}