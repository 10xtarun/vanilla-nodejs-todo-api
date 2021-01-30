// import core http module of nodejs
const http = require("http")

//create basic server 
/**
 * @param {Object} req :  request
 * @param {Object} res : response
 */
const server = http.createServer(function (req, res) {
    res.end("Hello World!!!")
})

//make server run on some PORT 
/** here we select port number 3000 */
server.listen(3000, function () {
    console.log("Server is running on port number 3000.")
})