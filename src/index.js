const express = require('express')
const app = express()
const path = require('path')
const convertorService = require('./util/convertor')

const PORT = process.env.PORT
const viewsPath = path.join(__dirname, '../templates/views')
const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))

app.set('view engine', 'hbs')
app.set('views', viewsPath)

app.use(express.urlencoded({ extended: false }))

app.get('/available-currencies', (req, res) => {
  res.send({ USD: 'USD', INR: 'INR' })
})

app.post('/currency-convert', async (req, res) => {
  const to = req.body.to
  const from = req.body.from
  const fromAmount = req.body.fromAmount
  const fromTo = from + '_' + to
  convertorService.currencyConvertor(fromTo, fromAmount).then((success) => {
    res.send({ to, from, fromAmount, status: true, success })
  }).catch((error) => {
    res.send({ to, from, fromAmount, status: false, error })
  })
})

app.get('/', (req, res) => {
  res.render('homepage')
})

app.get('*', (req, res) => {
  res.send('Page Not Found')
})

app.listen(PORT, () => {
  console.log('Server Listening at ' + PORT)
})
