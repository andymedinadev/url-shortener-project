require('dotenv').config()

const app = require('./app')

let displayAddress

const PROTOCOL = process.env.PROTOCOL || 'http'
const DOMAIN_NAME = process.env.DOMAIN_NAME || 'localhost'
const PORT = process.env.PORT || 3000

const USE_STANDARD_HTTP_PORTS = process.env.USE_STANDARD_HTTP_PORTS === 'true'

if (USE_STANDARD_HTTP_PORTS) {
  displayAddress = `${PROTOCOL}://${DOMAIN_NAME}/`
} else {
  displayAddress = `${PROTOCOL}://${DOMAIN_NAME}:${PORT}/`
}

app.get('/', (req, res) => {
  res.send('The server is running!')
})

app.listen(PORT, () => {
  console.log(`Server running in:  ${displayAddress}`)
})
