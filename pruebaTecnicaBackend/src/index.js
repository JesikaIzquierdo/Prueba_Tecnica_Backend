import express from 'express'
import cors from 'cors'
import dbConnect from '../src/config/mongo.config.js'

import user from "../src/routes/user.route.js"
import auth from "../src/routes/auth.route.js"
import flight from "../src/routes/flight.route.js"
import reservation from "../src/routes/reservation.route.js"
import purchase from "../src/routes/purchase.route.js"

const app = express()
const PORT = process.env.PORT ?? 3000;

dbConnect()

//* Lanzar el servidor usando express" */ 

app.use(cors ());
app.use(express.json());

app.use ( user );
app.use (auth)
app.use(flight)
app.use(reservation)
app.use (purchase)
app.listen ( PORT, () => {
    console.log ( `Servidor corriendo en http//localhost:${ PORT } ${ process.env.DB_URI}` )

})



