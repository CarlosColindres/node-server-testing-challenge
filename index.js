const express = require('express')
const generate = require('shortid').generate

const app = express()
app.use(express.json()) 

const PORT = 5000


let dogs = [
  { id: generate(), name: 'Bicho', breed: 'Maltese' },
]


app.get('/dogs', (req, res) => {
  res.status(200).json(dogs)
})


app.get('/dogs/:id', (req, res) => {

  const { id } = req.params

  const dog = dogs.find(dog => dog.id === id)

  if (!dog) {
    res.status(404).json({
      message: `No dog with id ${id}`,
    })
  } else {
    res.status(200).json(dog)
  }
})


app.post('/dogs', (req, res) => {
 
  const { name, breed } = req.body

  if (!name || !breed) {
    res.status(400).json({
      message: 'Name and breed are required'
    })
  } else {
   
    const newDog = { id: generate(), name, breed }

    dogs.push(newDog)
  
    res.status(201).json(newDog) 
  }
})


app.put('/dogs/:id', (req, res) => {
 
  const { id } = req.params
 
  const { name, breed } = req.body
  const indexOfDog = dogs.findIndex(dog => dog.id === id)
  if (indexOfDog !== -1) {
    dogs[indexOfDog] = { id, name, breed }
    res.status(200).json({ id, name, breed })
  } else {
    res.status(404).json({
      message: `No dog with id ${id}`,
    })
  }
})

app.delete('/dogs/:id', (req, res) => {

  const { id } = req.params
  try {
    if (!dogs.find(dog => dog.id === id)) {
      res.status(404).json({ message : 'Not found'})
    } else {
      dogs = dogs.filter(dog => dog.id !== id)
      res.status(200).json({ message: `Dog with id ${id} got deleted!`})
    }
  
  } catch (error) {
    res.status(500).json({ message: 'Somethign went really bad' })
  }
})
app.get('/', (req, res) => {
    res.status(200).json({ api: 'up' })
  })
app.all('*', (req, res) => {
  res.status(404).json({ message: 'Not found!' })
})

app.listen(PORT, () => {
  console.log(`LISTENING ON PORT ${PORT}`)
})