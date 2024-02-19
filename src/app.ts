// require('dotenv').config()
import express from 'express'
import config from 'config'
import { connect } from 'mongoose'
import connectToDb from './utils/connectToDb'
import log from './utils/logger'
import router from './routes/index'


const app = express()
app.use(express.json())

app.use(router)


const port = config.get('port')

app.listen(port, () => {
    log.info( `Server is running on http://localhost${port}` )
    connectToDb()
})
