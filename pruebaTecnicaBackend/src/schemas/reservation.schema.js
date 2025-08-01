// 3. Esquema de Reserva (Reservation)

import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: [true, 'El ID de usuario es obligatorio']
    },
    flights: [{ 
        flightId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Flight', 
            required: [true, 'El ID del vuelo es obligatorio']
        },
        reservedseats: [{ 
            type: String,
            trim: true
        }]
    }],
    passengers: [{ 
        name: {
            type: String,
            required: [true, 'El nombre del pasajero es obligatorio'],
            trim: true
        },
        lastName: {
            type: String,
            required: [true, 'El apellido del pasajero es obligatorio'],
            trim: true
        },
        identityDocument: {
            type: String,
            trim: true
        }
    }],
    reservationDate: {
        type: Date,
        default: Date.now // Fecha y hora de creación de la reserva
    },
    total: {
        type: Number,
        required: [true, 'El monto total de la reserva es obligatorio'],
        min: [0, 'El monto total debe ser positivo']
    },
    state: {
        type: String,
        enum: ['Pendiente', 'Confirmada', 'Cancelada', 'Comprada'],
        default: 'Pendiente'
    }
}, {
    timestamps: true
});

const ReservationModel = mongoose.model('Reservation', reservationSchema);

export default ReservationModel