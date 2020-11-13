const express = require('express')
const app = express()
var mysql = require('mysql');
const port = 8001;
app.use(express.json());
const {body, validationResult } = require('express-validator');



var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'mydb'
});




connection.connect(async function (err){
    if(err){
        console.error('error connecting' + err.stack);
        return;
    }

    func(`
        CREATE TABLE IF NOT EXISTS Users(
            email VARCHAR(50) NOT NULL PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            surname VARCHAR(50) NOT NULL,
            birth_date DATE NOT NULL,
            password VARCHAR(50) NOT NULL,
            newsletter TINYINT(1) NOT NULL DEFAULT false
        )ENGINE=INNODB; 
        `, []);    
    func(`INSERT INTO Users (email, name, surname, birth_date, password, newsletter) VALUES (?, ?, ?, ?, ?, ?)`,
            ['prova2', 'prova2', 'prova3', '31/08/1999', 'prova5', true]);                   
    console.log('connection as id ' + connection.threadId);  
});


 function func (query, argomenti){
     return new Promise((resolve, reject) => {       
         connection.query(query, argomenti, function(error, results, fields){
             if(error) reject(error);
             resolve(results);
         });       
    });  
};

app.get(`/users`, async (req, res) => {
    try {
        const selectAll = await func(`SELECT * FROM Users`, []);
        res.status(200);
        res.send(selectAll);
    }catch (e) {
        res.status(500)
        res.send('server error')
    }
})

app.get(`/users/:input`, async (req, res) => {
    try {
        const selectAll = await func(`SELECT * FROM Users WHERE email=?`, [req.params.input]);
        res.status(200);
        res.send(selectAll);
    }catch (e) {
        
        res.status(500)
        res.send('server error')
    }
})

app.delete(`/users/:input`, async (req, res) => {
    try {
        const selectAll = await func(`DELETE FROM Users WHERE email=?`, [+req.params.input]);
        res.status(200);
        res.send(selectAll);
    }catch (e) {
        console.error(e);
        res.status(500)
        res.send('server error')
    }
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
    func(`
        CREATE TABLE IF NOT EXISTS Users (
            email VARCHAR(50) NOT NULL PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            surname VARCHAR(50) NOT NULL,
            birth_date DATE NOT NULL,
            password VARCHAR(50) NOT NULL,
            newsletter TINYINT(1) NOT NULL DEFAULT false
        )ENGINE=INNODB; 
    `, []);
}) 




app.put(`/users/:input`,[
    body('email').isLength({ min: 5 }),
    body('name').isLength({ min: 5}),
    body('surname').isLength({ min: 5}),
    body('birth_date').isLength({ min: 5 }),
    body('password').isLength({ min: 1 }),
    body('newsletter').isLength({ min: 1 })
], async (req, res) => {
    try {
      
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        const x = await func(`SELECT COUNT(email=?) FROM Users WHERE email=?`, [+req.params.input, +req.params.input]);
        console.log(x);
        if(x > 0){

            const selectAll = await func(`UPDATE Users SET  name=?, surname=?, birth_date=?, password=?, newsletter=?, password=? WHERE email=? `, 
            [req.body.name, req.body.surname, req.body.birth_date, req.body.password, req.body.newsletter, +req.params.input]);
        }
        const selectAll = await func(`INSERT INTO Users (email, name, surname, birth_date, password, newsletter) VALUES (?, ?, ?, ?, ?, ?) `, 
        [+req.params.input, req.body.name, req.body.surname, req.body.birth_date, req.body.password, req.body.newsletter]);
        res.status(200);
        res.send('ok');
    }catch (e) {
            
       
        console.error(e);
        res.status(500)
        res.send('server error')
        
    }
})






















