import bcrypt from 'bcrypt';

import UserModel from '../schemas/user.schema.js';
import { generateToken } from '../helpers/jwt.helper.js';

const loginUser = async (req, res) => {
    // paso 1:obtener los datos del body
    const inputdata = req.body;

    // paso 2:vamos a verificar si el usuario existe (por favor registrese)
    const userFound = await UserModel.findOne({ email: inputdata.email });

    if (!userFound) {
        return res.json({ msg: 'El usuario no exite. Por favor registrese' })
    }
    // paso 3: verificar la contraseña (si cohincide)
    const isAuthenticated = bcrypt.compareSync(
        inputdata.password,
        userFound.password
    );

    if (!isAuthenticated) {
        return res.json({ msg: 'contrasenia invalida' })
    }

    // paso 4:generar una credencial digital (token)
    const payload = {
        _id: userFound._id,
        name: userFound.name,
        email: userFound.email,
        
    };

    const token = generateToken(payload);

    //paso 5: eliminar algunas propiedad que taren datos sensibles
    const objsUser = userFound.toObject();

    delete objsUser.password;
    delete objsUser.createdAt;
    delete objsUser.updatedAt;


    // paso 6:la respuesta al cliente
    res.json({
        token: token,
        user: objsUser
    });
}

const reNewToken = (req, res) => {
    const payload = req.authUser

    const token = generateToken(payload);

    res.json({
        token,
        user: payload
    });
}

// const registerUser = async (req, res) => {
//     const inputData = req.body;

//     try {
//         // Verificar si ya existe un usuario con el mismo correo
//         const existingUser = await UserModel.findOne({ email: inputData.email });
//         if (existingUser) {
//             return res.status(400).json({ msg: 'El correo ya está registrado.' });
//         }

//         // Hashear la contraseña antes de guardar
//         const salt = bcrypt.genSaltSync(10);
//         const hashedPassword = bcrypt.hashSync(inputData.password, salt);

//         const newUser = new UserModel({
//             name: inputData.name,
//             email: inputData.email,
//             password: hashedPassword
//         });

//         await newUser.save();

//         // Generar token con los datos del nuevo usuario
//         const payload = {
//             _id: newUser._id,
//             name: newUser.name,
//             email: newUser.email
//         };

//         const token = generateToken(payload);

//         // Limpiar datos sensibles
//         const userObject = newUser.toObject();
//         delete userObject.password;
//         delete userObject.createdAt;
//         delete userObject.updatedAt;

//         res.status(201).json({
//             token,
//             user: userObject
//         });

//     } catch (error) {
//         console.error('Error en registro:', error);
//         res.status(500).json({ msg: 'Error al registrar el usuario.' });
//     }
// };


export {
    loginUser,
    reNewToken,
    // registerUser
}