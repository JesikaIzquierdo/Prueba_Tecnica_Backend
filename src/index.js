import express from 'express'
import cors from 'cors'
import dbConnect from '../src/config/mongo.config.js'

import user from "../src/routes/user.route.js"

const app = express()
const PORT = process.env.PORT ?? 3000;

dbConnect()

//* Lanzar el servidor usando express" */ 

app.use(cors ());
app.use(express.json());

app.use ( user );

app.listen ( PORT, () => {
    console.log ( `Servidor corriendo en http//localhost:${ PORT } ${ process.env.DB_URI}` )

})



