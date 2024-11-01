
import express from 'express'
import router from './routes/index'

require('dotenv').config()

const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const storeRouter = require('./routes/storeRouter')

const port = process.env.PORT || 5000
const corsOptions = {
  origin: [process.env.BASE_URL],
  credentials: true,
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
}

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB database Connected...'))
  .catch((err: any) => console.log('Error connecting to MongoDB', err))

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// Routers
app.use('/', router())

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`App listening on port ${port}`)
})