import PurchaseModel from '../schemas/purchase.schema.js'
import ReservationModel from '../schemas/reservation.schema.js'

// Función para generar número aleatorio de ticket
const generateTicketNumber = () => {
    return 'TK' + Math.floor(100000 + Math.random() * 900000)
}

// Crear una nueva compra
const createPurchase = async (req, res) => {
    const inputData = req.body

   try {
        console.log("holaaa", inputData);
        const registeredPurchase = await (await PurchaseModel.create(inputData)).populate(['userId', "tickets.flightId", 'reservationId'])

        console.log ( registeredPurchase )  // Imprime en la consola
        res.send ( registeredPurchase)  // Enviando la respuesta al cliente
    }
    catch ( error ) {    // Catch: Captura el error producido por la excepción 
        console.error ( error )
        res.status( 500 ).json ( { msg: 'Error al registrar la reservación ' } )
    }
}

// Obtener todas las compras
const getAllPurchases = async (req, res) => {
    try {
        const data = await PurchaseModel.find({}).populate(['reservationId', 'userId', 'tickets.flightId'])
        res.json(data)
    } catch (error) {
        console.error(error)
        res.json({ msg: 'Error: No se pudo obtener el listado de compras' })
    }
}

// Obtener compra por ID
const getPurchaseById = async (req, res) => {
    const purchaseId = req.params.id

    try {
        const data = await PurchaseModel.findById(purchaseId).populate(['reservationId', 'userId', 'tickets.flightId'])

        if (!data) {
            return res.json({ msg: 'La compra no se encuentra registrada' })
        }

        res.json(data)
    } catch (error) {
        console.error(error)
        res.json({ msg: 'Error: No se pudo encontrar la compra' })
    }
}

// Eliminar compra por ID
const removePurchaseById = async (req, res) => {
    const purchaseId = req.params.id

    try {
        const data = await PurchaseModel.findByIdAndDelete(purchaseId)

        if (!data) {
            return res.json({ msg: 'La compra no existe' })
        }

        res.json(data)
    } catch (error) {
        console.error(error)
        res.json({ msg: 'Error: No se pudo eliminar la compra' })
    }
}

// Actualizar compra por ID
const updatePurchaseById = async (req, res) => {
    const purchaseId = req.params.id
    const inputData = req.body

    try {
        const data = await PurchaseModel.findByIdAndUpdate(purchaseId, inputData, { new: true }).populate(['reservationId', 'userId', 'tickets.flightId'])

        res.json(data)
    } catch (error) {
        console.error(error)
        res.json({ msg: 'Error: No se pudo actualizar la compra' })
    }
}

// Exportar todas las funciones
export {
    createPurchase,
    getAllPurchases,
    getPurchaseById,
    removePurchaseById,
    updatePurchaseById
}
