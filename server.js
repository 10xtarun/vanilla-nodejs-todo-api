// import core http module of nodejs
const http = require("http")
const url = require("url")
const qs = require("querystring")

let TODO = [
    {
        name: "Task 1",
        completed: false
    },
    {
        name: "Task 2",
        completed: false
    },
    {
        name: "Task 3",
        completed: false
    }
];

//create basic server 
/**
 * @param {Object} req :  request
 * @param {Object} res : response
 */
const server = http.createServer(function (req, res) {
    if (req.method === 'GET') {
        return getTodos(req, res)
    }
    else if (req.method === 'POST') {
        return addTodo(req, res)
    }
})

//to get all todos
function getTodos(req, res) {
    const req_url = url.parse(req.url);
    if (req_url.pathname != '/todos') {
        return handleError(res, 404)
    }
    res.setHeader('Content-Type', 'application/json;charset=utf-8')
    return res.end(JSON.stringify(TODO));
}

//to add a todo in the array
function addTodo(req, res) {
    const req_url = url.parse(req.url)
    if (req_url.pathname != '/todos') {
        return handleError(res, 404)
    }
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        let parsed_body = qs.parse(body)
        if (parsed_body.completed == "false") {
            parsed_body.completed = false;
        }
        else {
            parsed_body.completed = true;
        }
        TODO.push(parsed_body);
    })
    res.setHeader('Content-Type', 'application/json;charset=utf-8')
    return res.end("Data added successfully.");
}

//to handle wrong routes
function handleError(res, code) {
    res.statusCode = code
    res.end(`404 Not Found!!!`)
}

//make server run on some PORT 
/** here we select port number 3000 */
server.listen(3000, function () {
    console.log("Server is running on port number 3000.")
})