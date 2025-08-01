//Esquema de Usuario
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'El correo electrónico es obligatorio'],
        unique: true, 
        trim: true,
        lowercase: true, 
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Por favor, introduce un correo electrónico válido']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
        minlength: [6, 'La contraseña debe tener al menos 6 caracteres']
        // En un entorno real, aquí se usaría un pre-save hook para hashear la contraseña
    },
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true
        },

    lastName: {
        type: String,
        required: [true, 'El apellido es obligatorio'],
        trim: true
        },
    address: {
        type: String,
        trim: true
        },
    phone: {
        type: String,
        required: [true, 'El teléfono es obligatorio'],
        trim: true
        }
    },

{
    timestamps: true 
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;