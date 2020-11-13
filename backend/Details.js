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
        CREATE TABLE IF NOT EXISTS Details(
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
            title VARCHAR(20) NOT NULL,
            description TEXT NOT NULL,
            genre VARCHAR(50) NOT NULL,
            duration TIME NOT NULL,
            actors TEXT NOT NULL,
            release_date DATE,
            creation_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        )ENGINE=INNODB; 
        `, []);    
    func(`INSERT INTO Details (title, description, genre, duration, actors, release_date, creation_date) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            ['title', 'prova1', 'prova2', 'prova3', 'prova4', 'prova5', 'prova6']);                   
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

app.get(`/details`, async (req, res) => {
    try {
        const selectAll = await func(`SELECT * FROM details`, []);
        res.status(200);
        res.send(selectAll);
    }catch (e) {
        res.status(500)
        res.send('server error')
    }
})

app.get(`/details/:input`, async (req, res) => {
    try {
        const selectAll = await func(`SELECT * FROM Details WHERE id=?`, [req.params.input]);
        res.status(200);
        res.send(selectAll);
    }catch (e) {
        
        res.status(500)
        res.send('server error')
    }
})

app.delete(`/details/:input`, async (req, res) => {
    try {
        const selectAll = await func(`DELETE FROM Details WHERE id=?`, [+req.params.input]);
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
        CREATE TABLE IF NOT EXISTS Details(
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
            title VARCHAR(20) NOT NULL,
            description TEXT NOT NULL,
            genre VARCHAR(50) NOT NULL,
            duration TIME NOT NULL,
            actors TEXT NOT NULL,
            release_date DATE,
            creation_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        )ENGINE=INNODB; 
    `, []);
}) 




app.put(`/details/:input`,[
    body('title').isLength({ min: 5 }),
    body('description').isLength({ min: 5 }),
    body('genre').isLength({ min: 5}),
    body('duration').isLength({ min: 1}),
    body('actors').isLength({ min: 5 }),
    body('release_date').isLength({ min: 1 }),
    body('creation_date').isLength({ min: 5 })
], async (req, res) => {
    try {
      
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        const x = await func(`SELECT COUNT(id=?) FROM Details WHERE id=?`, [+req.params.input, +req.params.input]);
        console.log(x);
        if(x > 0){

            const selectAll = await func(`UPDATE Details SET title=?, description=?, genre=?, duration=?, actors=?, release_date=?, creation_date=? WHERE id=? `, 
            [req.body.title, req.body.description, req.body.genre, req.body.duration, req.body.actors, req.body.release_date, req.body.creation_date, +req.params.input]);
        }
        const selectAll = await func(`INSERT INTO Details (id, title, description, genre, duration, actors, release_date, creation_date) VALUES (?, ?, ?, ?, ?, ?, ?) `, 
        [+req.params.input, req.body.title, req.body.description, req.body.genre, req.body.duration, req.body.actors, req.body.release_date, req.body.creation_date]);
        res.status(200);
        res.send('ok');
    }catch (e) {
            
       
        console.error(e);
        res.status(500)
        res.send('server error')
        
    }
})






















