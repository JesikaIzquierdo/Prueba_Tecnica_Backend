
import mongoose from 'mongoose';


const purchaseSchema = new mongoose.Schema({
    reservationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reservation', // Referencia al modelo de Reserva
        required: [true, 'El ID de la reserva es obligatorio']
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Referencia al modelo de Usuario
        required: [true, 'El ID de usuario es obligatorio']
    },
    purchaseDate: {
        type: Date,
        default: Date.now // Fecha y hora de la compra
    },
    totalAmount: {
        type: Number,
        required: [true, 'El monto total de la compra es obligatorio'],
        min: [0, 'El monto total debe ser positivo']
    },
    methodPayment: {
        type: { // Por ejemplo, "Tarjeta de Crédito", "Transferencia", etc.
            type: String,
            required: [true, 'El tipo de método de pago es obligatorio']
        },
        details: { // Información simulada de la tarjeta utilizada para la compra
            partialNumber: { // Últimos 4 dígitos para referencia
                type: String,
                trim: true
            },
            holder: {
                type: String,
                trim: true
            }
        }
    },
    tickets: [{ // Array de billetes aéreos generados (pueden ser simples objetos)
        ticketNumber: {
            type: String,
            unique: true,
            required: [true, 'El número de boleto es obligatorio']
        },
        flightId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Flight',
            required: [true, 'El ID del vuelo del boleto es obligatorio']
        },
        passengers: { // Nombre del pasajero asociado a este boleto
            type: String,
            required: [true, 'El nombre del pasajero del boleto es obligatorio']
        },
        seat: {
            type: String,
            trim: true
        }
    }],
    confirmationSent: {
        type: Boolean,
        required: [true, 'La confirmacion del boleto es obligatorio'],
        default: false // Para rastrear si el correo de confirmación fue enviado
    }
}, {
    timestamps: true
});

const PurchaseModel = mongoose.model('Purchase', purchaseSchema);

export default PurchaseModel