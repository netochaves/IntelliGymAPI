const express = require('express')
const firebase = require('firebase')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())

const firebaseConfig = {
  apiKey: 'AIzaSyCx-2FCefvsZ5zRdtk2dgcC6_JSnTUh-sk',
  authDomain: 'iotdot0.firebaseapp.com',
  databaseURL: 'https://iotdot0.firebaseio.com',
  projectId: 'iotdot0',
  storageBucket: 'iotdot0.appspot.com',
  messagingSenderId: '464466356738',
  appId: '1:464466356738:web:38cf500f9fdfa322'
}

firebase.initializeApp(firebaseConfig)

app.get('/time', function(req, res) {
  res.json(new Date().getTime())
})

app.post('/auth', function(req, res) {
  const email = req.body.email
  const ref = firebase.database().ref('Academia/Users/')

  ref.on('value', function(snapshot) {
    snapshot.forEach(function(user) {
      console.log('LOGGGG: ', user.val().email)
      console.log('HAHAA:', email)
      if (user.val().email === email) {
        res.send('true')
      }
    })
  })
})

app.get('/:id', function(req, res) {
  console.log('Get Request')
  const id = req.params.id
  const ref = firebase.database().ref(`Academia/Users/${id}/Exercicios/`)
  ref.on(
    'value',
    function(snapshot) {
      res.json(snapshot.val())
      ref.off('value')
    },
    function(errorObject) {
      console.log('The read failed: ' + errorObject.code)
      res.send('The read failed: ' + errorObject.code)
    }
  )
})

app.get(
  '/users/:userId/exercicios/:nome/repeticoes/:repeticoes/initTime/:initTime/',
  function(req, res) {
    const user = req.params.userId
    const nome = req.params.nome
    const repeticoes = req.params.repeticoes
    const initTime = req.params.initTime
    const endTime = firebase.database.ServerValue.TIMESTAMP
    const refPath = 'Academia/Users/' + user + '/Exercicios/' + nome
    const ref = firebase.database().ref(refPath)
    let serie = 0
    ref.on('value', function(snapshot) {
      snapshot.forEach(function(doc) {
        serie++
      })
    })

    serie++

    ref.push({ repeticoes, initTime, endTime, serie }, function(error) {
      if (error) {
        res.send('Data could not be saved' + error)
      } else {
        res.send('Data saved successfully')
      }
    })
  }
)

app.post('/', function(req, res) {
  console.log('POST Request')

  const nome = req.body.exercicio
  const user = req.body.user
  const time = firebase.database.ServerValue.TIMESTAMP
  const refPath = 'Academia/Users/' + user + '/Exercicios/' + nome
  const ref = firebase.database().ref(refPath)

  ref.push({ time }, function(error) {
    if (error) {
      res.send('Data could not be saved' + error)
    } else {
      res.send('Data saved successfully')
    }
  })
})

app.put('/', function(req, res) {
  console.log('PUT Request')

  const nome = req.body.nome
  const serie = req.body.serie

  const refPath = '/Exercicios/' + nome + '/'
  const ref = firebase.database().ref(refPath)

  ref.update({ serie }, function(error) {
    if (error) {
      res.send('Data could not be saved' + error)
    } else {
      res.send('Data saved successfully')
    }
  })
})

app.delete('/', function(req, res) {
  console.log('DELETE Request')
  res.send('DELETE Request')
})

//start server on port: 8080
const server = app.listen(8080, function() {
  const host = server.address().address
  const port = server.address().port

  console.log('server listening at http://%s:%s', host, port)
})
