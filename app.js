const express = require('express');
const bodyParser = require('body-parser')
const mysql = require('mysql')

const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.urlencoded({ extended: false}))

app.use(bodyParser.json())

// MySQL
const pool = mysql.createPool({
    connectionLimit : 10, 
    host            : 'localhost',
    user            : 'root',
    password        : '',
    database        : 'node_js'
})

// Get all users
app.get('', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query('SELECT * from users', (err, rows) => {
            connection.release() 

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

            console.log('The data from user table are: \n', rows)
        })
    })
})

// Get a user by ID
app.get('/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        connection.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, rows) => {
            connection.release() 
            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
            
            console.log('The data from user table are: \n', rows)
        })
    })
});

// Delete a user ( to delete multiple users, you should separate them in comma )
app.delete('/:id', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        connection.query('DELETE FROM users WHERE id IN ('+[req.params.id]+')', (err, rows) => {
            connection.release() 
            if (!err) {
                res.send(`user with the record ID ${[req.params.id]} has been removed.`)
            } else {
                console.log(err)
            }
            
            console.log('The data from user table are: \n', rows)
        })
    })
});

// Add user
app.post('', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        
        const params = req.body
        connection.query('INSERT INTO users SET ?', params, (err, rows) => {
        connection.release() 
        if (!err) {
            res.send(`user has been added.`)
        } else {
            console.log(err)
        }
        
        console.log('The data from user table are:11 \n', rows)

        })
    })
});

// Update a record / user
app.put('/:id', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        const { first_name, last_name, address, post_code, phone_number, email, username, password } = req.body

        connection.query('UPDATE users SET first_name = ?, last_name = ?, address = ?, post_code = ?, phone_number = ?, email = ?,  username = ?, password = ? WHERE id = ?', [first_name, last_name, address, post_code, phone_number, email, username, password, req.params.id] , (err, rows) => {
            connection.release() 

            if(!err) {
                res.send(`user with the name: ${first_name} has been updated.`)
            } else {
                console.log(err)
            }

        })

        console.log(req.body)
    })
})


// Listen on environment port or 5000
app.listen(port, () => console.log(`Listen on port ${port}`))