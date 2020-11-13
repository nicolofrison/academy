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
        CREATE TABLE IF NOT EXISTS Favorites(
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(50) NOT NULL,
            movies_id INT,
            series_id INT
        )ENGINE=INNODB; 
        `, []);    
    func(`INSERT INTO Favorites (email, movies_id, series_id) VALUES (?, ?, ?)`,
            ['prova1', 1, 1]);                   
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

app.get(`/favorites`, async (req, res) => {
    try {
        const selectAll = await func(`SELECT * FROM Favorites`, []);
        res.status(200);
        res.send(selectAll);
    }catch (e) {
        res.status(500)
        res.send('server error')
    }
})

app.get(`/favorites/:input`, async (req, res) => {
    try {
        const selectAll = await func(`SELECT * FROM Favorites WHERE id=?`, [req.params.input]);
        res.status(200);
        res.send(selectAll);
    }catch (e) {
        
        res.status(500)
        res.send('server error')
    }
})

app.delete(`/favorites/:input`, async (req, res) => {
    try {
        const selectAll = await func(`DELETE FROM Favorites WHERE id=?`, [+req.params.input]);
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
        CREATE TABLE IF NOT EXISTS Favorites (
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(50) NOT NULL,
            movies_id INT,
            series_id INT
        )ENGINE=INNODB; 
    `, []);
}) 




app.put(`/favorites/:input`,[
    body('email').isLength({ min: 5 }),
    body('movies_id').isLength({ min: 1}),
    body('series_id').isLength({ min: 1})
], async (req, res) => {
    try {
      
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        const x = await func(`SELECT COUNT(id=?) FROM Favorites WHERE id=?`, [+req.params.input, +req.params.input]);
        console.log(x);
        if(x > 0){

            const selectAll = await func(`UPDATE Favorites SET email=?, movies_id=?, series_id=? WHERE id=? `, 
            [ req.body.email, req.body.movies_id, req.body.series_id,  +req.params.input]);
        }
        const selectAll = await func(`INSERT INTO Favorites (id, email, movies_id, series_id) VALUES (?, ?, ?) `, 
        [+req.params.input, req.body.email, req.body.movies_id, req.body.series_id]);
        res.status(200);
        res.send('ok');
    }catch (e) {
            
       
        console.error(e);
        res.status(500)
        res.send('server error')
        
    }
})






















