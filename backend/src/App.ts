
import express, { Request, Response } from 'express'

const app = express()
const port = 5000

app.get('/', (req: Request, res: Response) => {
  res.send(`Backend listening on port ${port}`)
})

app.get('/inventories', (req: Request, res: Response) => {
  res.send('/get inventories')
})

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`App listening on port ${port}`)
})