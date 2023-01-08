// Importing Modules
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
// const bodyParser = require('body-parser')


const propertyRoutes = require('./routes/propertyRoutes')
const employeeRoutes = require('./routes/employeeRoutes')
const adminRoutes = require('./routes/adminRoutes')
const loginRoutes = require('./routes/loginRoutes')

// Application
const app = express()

app.use(express.json())

// DB
mongoose
    .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() =>
    console.log("DB Connected")
).catch((err) =>
    console.log("DB Connection Error", err)
)

// middleware
app.use(morgan('dev'))
app.use(cors({origin:true, credentials: true}))

// routes
app.use('/property', propertyRoutes)
app.use('/employee', employeeRoutes)
app.use('/admin', adminRoutes)
app.use('/login', loginRoutes)


// port
const port = process.env.PORT || 8080

// Listeners
const server = app.listen(port, () => {
    console.log(`Server is Running ${port}`)
})