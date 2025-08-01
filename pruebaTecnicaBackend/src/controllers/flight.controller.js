import FlightModel from "../schemas/flight.schema.js"


const createFlight = async ( req, res ) => {
    const inputData = req.body
          // Extraigo el objeto enviado 
    
    // Try: Controla las excepciones de la consulta a la base de datos 
    try {
        console.log("holaaa", inputData);
        const registeredFlight = (await FlightModel.create(inputData))

        console.log ( registeredFlight )  // Imprime en la consola
        res.send ( registeredFlight )  // Enviando la respuesta al cliente
    }
    catch ( error ) {    // Catch: Captura el error producido por la excepción 
        console.error ( error )
        res.status( 500 ).json ( { msg: 'Error al registrar el vuelo ' } )
    }
} 

const getAllFlight = async ( req, res ) => {
    
    try {
        const data = await FlightModel.find ( {} )
        res.json ( data )     
    } 
    catch (error) {
        console.error ( error )
        res.json ( { msg: 'Error: No se pudo obtener el listado de vuelos' } )        
    }
    
    
}

const getFlightById = async ( req, res ) => {
    const flightId = req.params.id    // El nombre final dependerá del nombre del parámetro en la ruta 
    
    try {
        const data = await FlightModel.findById ( flightId )

        // Verifica si el artista no existe y lanza el respectivo mensaje al cliente
        if ( ! data ) {
            return res.json ( { msg: 'El vuelo no se encuentra registrado' } )
        }
        
        res.json ( data )
    } 
    catch (error) {
        console.error ( error )
        res.json ( { msg: 'Error: No se pudo encontrar el vuelo' } )
    }
}

const removeFlightById = async (req, res) => {
    const flightId = req.params.id;

    try{ 

    const data = await FlightModel.findByIdAndDelete (flightId);

    if(data == null){

            return res.json({msg: 'Error: El vuelo no existe'});
        }

    res.json(data);

    }

    catch (error){
        console.error( error);
        res.json({msg: 'Error: No se pudo encontrar el vuelo'});
    }
}



const updateFlightById = async ( req, res ) => {
    const flightId = req.params.id  // Obtenemo el ID de la parametrización de la ruta
    const inputData = req.body   // Obtenemos el body de la petición
    
    try {
        const data = await FlightModel.findByIdAndUpdate ( flightId, inputData, { new: true } )

        res.json ( data )    
    } 
    catch (error) {
        console.error ( error )
        res.json ( { msg: 'Error: No se pudo actualizar el vuelo' } )
    }
}


// Exponer las funcionalidades para ser usadas por otros archivos
export {
    createFlight,
    getAllFlight,
    getFlightById,
    updateFlightById,
    removeFlightById
}