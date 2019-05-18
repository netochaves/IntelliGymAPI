const express = require("express")
const app = express()

//to handle HTTP get request
app.get("/", function(req, res) {
  console.log("Get Request")
  res.send("Get Request")
})

app.post("/", function(req, res) {
  console.log("POST Request")
  res.send("POST Request")
})

app.put("/", function(req, res) {
  console.log("PUT Request")
  res.send("PUT Request")
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
