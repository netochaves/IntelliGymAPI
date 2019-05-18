const express = require("express")
const firebase = require("firebase")
const bodyParser = require("body-parser")

const app = express()

app.use(bodyParser.json())

const firebaseConfig = {
  apiKey: "AIzaSyBEoRVkLt1s_-KU_xDeuFc8qpCeK0hO3cI",
  authDomain: "intelligym-7250e.firebaseapp.com",
  databaseURL: "https://intelligym-7250e.firebaseio.com",
  projectId: "intelligym-7250e",
  storageBucket: "intelligym-7250e.appspot.com",
  messagingSenderId: "427804816898",
  appId: "1:427804816898:web:f277bb6ed4217362"
}

firebase.initializeApp(firebaseConfig)

//to handle HTTP get request
app.get("/", function(req, res) {
  console.log("Get Request")
  const ref = firebase.database().ref("/Exercicios/")

  ref.on(
    "value",
    function(snapshot) {
      console.log(snapshot.val())
      res.json(snapshot.val())
      ref.off("value")
    },
    function(errorObject) {
      console.log("The read failed: " + errorObject.code)
      res.send("The read failed: " + errorObject.code)
    }
  )
})

app.post("/", function(req, res) {
  console.log("POST Request")

  const nome = req.body.nome

  const refPath = "/Exercicios/" + nome + "/"
  const ref = firebase.database().ref(refPath)

  ref.update({ nome }, function(error) {
    if (error) {
      res.send("Data could not be saved" + error)
    } else {
      res.send("Data saved successfully")
    }
  })
})

app.put("/", function(req, res) {
  console.log("PUT Request")

  const nome = req.body.nome

  const refPath = "/Exercicios/" + nome + "/"
  const ref = firebase.database().ref(refPath)

  ref.set({ nome }, function(error) {
    if (error) {
      res.send("Data could not be saved" + error)
    } else {
      res.send("Data saved successfully")
    }
  })
})

app.delete("/", function(req, res) {
  console.log("DELETE Request")
  res.send("DELETE Request")
})

//start server on port: 8080
const server = app.listen(8080, function() {
  const host = server.address().address
  const port = server.address().port

  console.log("server listening at http://%s:%s", host, port)
})
