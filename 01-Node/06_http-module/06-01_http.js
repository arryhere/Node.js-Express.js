const http = require('http');

const server_1 = http.createServer((req, res) => {              // req - incomming request; res - reponse
    console.log(req.url);
    res.write('Hello World', 'utf-8', () => { console.log('sending Hello World'); });
    res.end();
})
server_1.listen(port = 5000, hostname = '127.0.0.1', () => {
    console.log(`Server is listening at: http://${hostname}:${port}`);
})

const server_2 = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/plain');

    if (req.url === '/') {
        res.end('Home Page')
    }
    else if (req.url === '/about') {
        res.end('About Page')
    }
    else if (req.url === '/contact') {
        res.end('Contact Page')
    }
    else {
        res.statusCode = 404;
        res.end('Error 404: Page does not exist')
    }
})
server_2.listen(port = 5001, hostname = '127.0.0.1', () => {
    console.log(`Server is listening at: http://${hostname}:${port}`);
})




/*
• Explore -

• https://github.com/nodejs/node/issues/26005       // res.write(data) followed by res.end() is not actually equivalent to res.end(data)
• 
*/