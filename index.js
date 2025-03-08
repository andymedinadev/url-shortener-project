const app = require('./app')

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(3000, () => {
  console.log('Server running in port 3000')
  console.log('http://localhost:3000/')
})
