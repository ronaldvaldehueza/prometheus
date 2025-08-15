const path       = require('path')
const express    = require('express')
const exphbs     = require('express-handlebars')
const cors       = require('cors')
const bodyParser = require('body-parser')

const config     = require('./config/connection.server.js')
const initDB     = require('./db/init.sequelize.js')
const testRoute  = require('./routes/test')
// const apiRoutes  = require('./routes/api')
const uiRoutes   = require('./routes/routes')   //  hbs‐rendered views

const app = express()

// 1. View engine  
app.set('views', path.join(__dirname, 'views'))
app.engine('hbs', exphbs({
  extname: 'hbs',
  defaultLayout: 'mainLayout',
  layoutsDir: path.join(__dirname, 'views', 'layout')
}))
app.set('view engine', 'hbs')

// 2. CORS & body parsing — *before* any routes
const allowedOrigins = [
  'http://proma.worldcloud9.com',
  'https://proma.worldcloud9.com',
  'http://nodejs.worldcloud9.com',
  'https://nodejs.worldcloud9.com'
]

const corsOptionsDelegate = function (req, callback) {
  let corsOptions
  if (allowedOrigins.indexOf(req.header('Origin')) !== -1) {
    corsOptions = {
      origin: true,
      credentials: true
    }
  } else {
    corsOptions = { origin: false }
  }
  callback(null, corsOptions)
}

app.use(cors(corsOptionsDelegate))
app.options('*', cors(corsOptionsDelegate)) // Handle preflight

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// 3. Mount API endpoints
app.use('/api/test', testRoute)
// app.use('/api', apiRoutes)

// 4. Serve static assets for React app or any other frontend
app.use(express.static(path.join(__dirname, 'views', 'assets')))

// 5. Mount server-side rendered routes (Handlebars) last
app.use('/', uiRoutes)

// 6. Sync DB & then start listening
initDB
  .sync({ force: false })
  .then(() => {
    const port = process.env.PORT || config.port
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`)
    })
  })
  .catch(err => {
    console.error('Failed to sync DB:', err)
    process.exit(1)
  })
