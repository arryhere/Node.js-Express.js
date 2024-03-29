const express = require('express')
let { people } = require('./public/data')
const path = require('path')

const app = express()

//static assets 
app.use(express.static(path.join(__dirname, '/public')))
// parse form data
app.use(express.urlencoded({ extended: false }))
// parse json
app.use(express.json())

app.get('/api/people', (req, res) => {
    res.status(200).json({
        success: true,
        data: people
    })
})

app.post('/api/people', (req, res) => {
    const { name } = req.body
    if (!name) {
        return res.status(400).json({ success: false, message: 'please provide name value' })
    }
    res.status(201).send({ success: true, person: name })
})

app.post('/login', (req, res) => {
    console.log(req.body);
    // res.send('POST')
    // req.body.name === '' ? res.send('error') : res.status(200).send('post')
    const { name } = req.body
    name === '' ? res.status(404).send('Please provide credentials') : res.status(200).send(`Welcome ${name}`)
})

app.put('/api/people/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const person = people.find((e) => {
        return e.id === Number(id);
    })

    if (!person) {
        res.status(404).json({ success: false, message: 'Person not found' });
    } else {
        // res.status(200).json({ success: true, data: {...person, name} });
        const newPeople = people.map((e) => {
            if (e.id === Number(id)) {
                e.name = name;
                return e;
            } else {
                return e;
            }
        })
        res.status(200).json({ success: true, data: newPeople });
    }
})

app.delete('/api/people/:id', (req, res) => {
    const { id } = req.params;
    const person = people.find((e) => {
        return e.id === Number(id);
    });
    if (!person) {
        res.status(404).json({ success: false, message: 'Person not found' });
    } else {
        const newPeople = people.filter((e) => {
            return e.id !== Number(id)
        })
        res.status(200).json({ success: true, data: newPeople });
    }
})

app.listen(port = 3000, hostname = '127.0.0.1', () => { console.log(`Server is lintening at: http://${hostname}:${port}`); })