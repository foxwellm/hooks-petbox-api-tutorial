const express = require('express')
const app = express()
const cors = require('cors')

app.set('port', 3001)

// this will parse request.body to JavaScript
app.use(express.json())

// this will allow requests from any website
app.use(cors())

app.listen(app.get('port'), () => console.log(`Magic happens on http://localhost:${app.get('port')}`))

app.locals.title = 'Pet Box'
app.locals.pets = []
app.locals.pets = [
  { id: 1, name: 'Brooklyn', breed: 'Great Dane' },
  { id: 2, name: 'Ace', breed: 'Pug' },
  { id: 3, name: 'Bella', breed: 'Pug'},
  { id: 4, name: 'Ollie', breed: 'Springer Spaniel' }
]

app.get('/', (req, res) => {
  res.status(200).send('Shit works!')
})

app.get('/api/v1/pets', (req, res) => {
  res.status(200).json(app.locals.pets)
})

app.get('/api/v1/pets/:id', (req, res) => {
  // body needs name and type
  const {name, type} = req.body
  if(!name || !type) return res.status(422).json('Please provide a name and a type')
  const { id } = req.params
  const pet = app.locals.pets.find(pet => pet.id == id)
  if(!pet) return res.status(404).json('Pet not found')
  return res.status(200).json(pet)
})

app.post('/api/v1/pets', (req, res) => {
  const newPet = { id: Date.now(), ...req.body }
  app.locals.pets.push(newPet)
  req.status(201).json(newPet) 
})


