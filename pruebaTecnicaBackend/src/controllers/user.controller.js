import bcrypt from 'bcrypt';

import UserModel from "../schemas/user.schema.js";

const createUser = async ( req, res ) => {
    const inputData = req.body;

    try {
        // Paso 1: Verificar si el usuario existe
        const userFound = await UserModel.findOne({ 
            username: inputData.username,
            email: inputData.email
        });

        if( userFound ) {
            return res.status( 404 ).json({ msg: 'No se pudo registrar porque el usuario ya existe.' });
        }

        //paso 2 encriptar la contrasena

        const salt = bcrypt.genSaltSync();
        console.log('salt', salt);           //genero una cadena aleatoria
        
        //mezclar y generar el hash
        const hashPassword = bcrypt.hashSync(
            inputData.password,               
            salt
        );
        console.log('hashPassword',hashPassword);
        inputData.password = hashPassword;
        
        // Paso 3: Registrar el usuario
        const data = await UserModel.create( inputData );

        // Paso 4: Responder al cliente que se registro existosamente
        res.status( 201 ).json( data );
    } 
    catch ( error ) {
        console.error( error );
        res.status( 500 ).json({ msg: 'Error: No se pudo crear el usuario' });
    }

}

export {
    createUser
}