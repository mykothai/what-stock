
import express from 'express'
import OAuthMiddleware from './auth/OAuthMiddleware'

const cors = require('cors')
const app = express()
const port = 5000

const storeRouter = require('./routes/storeRouter')

const corsOptions = {
  origin: ['http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// Routers
app.use('/api/store', storeRouter)

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`App listening on port ${port}`)
})