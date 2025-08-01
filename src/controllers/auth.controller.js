import bcrypt from 'bcrypt'
import UserModel from '../schemas/user.schema.js'
import { generateToken } from '../helpers/jwt.helper.js'

// Registro de usuario
const registerUser = async (req, res) => {
    const inputData = req.body

    try {
        // Validar si ya existe el correo
        const existingUser = await UserModel.findOne({ email: inputData.email })
        if (existingUser) {
            return res.status(400).json({ msg: 'El correo ya está registrado.' })
        }

        // Hashear contraseña
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(inputData.password, salt)

        const newUser = new UserModel({
            name: inputData.name,
            lastName: inputData.lastName,
            email: inputData.email,
            address: inputData.address,
            phone: inputData.phone,
            password: hashedPassword
        })

        await newUser.save()

        const payload = {
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email
        }

        const token = generateToken(payload)

        const userObject = newUser.toObject()
        delete userObject.password
        delete userObject.createdAt
        delete userObject.updatedAt

        res.status(201).json({
            token,
            user: userObject
        })
    } catch (error) {
        console.error('Error en registro:', error)
        res.status(500).json({ msg: 'Error al registrar el usuario.' })
    }
}

// Inicio de sesión
const loginUser = async (req, res) => {
    const inputData = req.body

    const userFound = await UserModel.findOne({ email: inputData.email })
    if (!userFound) {
        return res.status(400).json({ msg: 'El usuario no existe. Por favor regístrese.' })
    }

    const isAuthenticated = bcrypt.compareSync(inputData.password, userFound.password)
    if (!isAuthenticated) {
        return res.status(401).json({ msg: 'Contraseña inválida' })
    }

    const payload = {
        _id: userFound._id,
        name: userFound.name,
        email: userFound.email
    }

    const token = generateToken(payload)

    const userObject = userFound.toObject()
    delete userObject.password
    delete userObject.createdAt
    delete userObject.updatedAt

    res.json({
        token,
        user: userObject
    })
}

// Renovar token (requiere middleware)
const reNewToken = (req, res) => {
    const payload = req.authUser
    const token = generateToken(payload)

    res.json({
        token,
        user: payload
    })
}

export {
    registerUser,
    loginUser,
    reNewToken
}
