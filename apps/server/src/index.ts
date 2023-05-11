import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import { Request, Response, NextFunction } from 'express'

import router from './router'
const app = express()
const PORT = process.env.SERVER_PORT

app.use(express.json())
app.use(cors())

app.use(router)

app.listen(PORT, () => {
  console.log(`🚀 Server running and listening on http://localhost:${PORT}`)
})
