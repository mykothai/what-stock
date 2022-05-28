
import express, { Request, Response } from 'express'

const cors = require('cors')
const app = express()
const port = 5000

const corsOptions = {
  origin: ['http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.get('/', (req: Request, res: Response) => {
  res.send(`Backend listening on port ${port}`)
})

app.get('/inventories', (req: Request, res: Response) => {
  console.log("/inventories")
  res.send('/get inventories')
})

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`App listening on port ${port}`)
})