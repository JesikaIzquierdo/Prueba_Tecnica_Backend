// 2. Esquema de Vuelo (Flight)

import mongoose from 'mongoose';

const flightSchema = new mongoose.Schema({
    flightNumber: {
        type: String,
        required: [true, 'El número de vuelo es obligatorio'],
        unique: true,
        trim: true
    },
    airline: {
        type: String,
        required: [true, 'La aerolínea es obligatoria'],
        trim: true
    },
    origin: {
        type: String,
        required: [true, 'El origen es obligatorio'],
        trim: true
    },
    destination: {
        type: String,
        required: [true, 'El destino es obligatorio'],
        trim: true
    },
    departureDate: {
        type: Date,
        required: [true, 'La fecha y hora de salida son obligatorias']
    },
    arrivalDate: {
        type: Date,
        required: [true, 'La fecha y hora de llegada son obligatorias']
    },
    duration: { 
        type: Number,
        min: [0, 'La duración debe ser en formato tiempo'],
        required: [true, 'La duración del vuelo es obligatoria']
    },
    state: {
        type: String,
        enum: ['En hora', 'Retrasado', 'Cancelado', 'Aterrizado', 'Programado'],
        default: 'Programado'
    },
    classes: [{ 
        className: {
            type: String,
            required: [true, 'El nombre de la clase es obligatorio'],
            enum: ['Economy', 'Business', 'First Class'] 
        },
        atotalSeats: {
            type: Number,
            required: [true, 'El número total de asientos para esta clase es obligatorio'],
            min: [0, 'El número de asientos debe ser positivo']
        },
        seatsAvailable: {
            type: Number,
            required: [true, 'El número de asientos disponibles para esta clase es obligatorio'],
            min: [0, 'El número de asientos disponibles no puede ser negativo']
        },
        price: {
            type: Number,
            required: [true, 'El precio para esta clase es obligatorio'],
            min: [0, 'El precio debe ser positivo']
        }
    }]
}, {
    timestamps: true
});

const FlightModel = mongoose.model('Flight', flightSchema);

export default FlightModel