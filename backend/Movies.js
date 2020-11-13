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
        CREATE TABLE IF NOT EXISTS Movies(
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            details_id INT NOT NULL,
            quality VARCHAR(5) NOT NULL
        )ENGINE=INNODB; 
        `, []);    
    func(`INSERT INTO Movies (details_id, quality)
         VALUES (?, ?)`,
         [1, 'pra8']);                   
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

app.get(`/movies`, async (req, res) => {
    try {
        const selectAll = await func(`SELECT * FROM Movies`, []);
        res.status(200);
        res.send(selectAll);
    }catch (e) {
        res.status(500)
        res.send('server error')
    }
})

app.get(`/movies/:input`, async (req, res) => {
    try {
        const selectAll = await func(`SELECT * FROM Movies WHERE id=?`, [req.params.input]);
        res.status(200);
        res.send(selectAll);
    }catch (e) {
        
        res.status(500)
        res.send('server error')
    }
})

app.delete(`/movies/:input`, async (req, res) => {
    try {
        const selectAll = await func(`DELETE FROM Movies WHERE id=?`, [+req.params.input]);
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
        CREATE TABLE IF NOT EXISTS Movies (
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            details_id INT NOT NULL,
            quality VARCHAR(5) NOT NULL
        )ENGINE=INNODB; 
    `, []);
}) 




app.put(`/movies/:input`,[
    body('details_id').isLength({ min: 1 }),
    body('quality').isLength({ min: 1})
], async (req, res) => {
    try {
      
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        const x = await func(`SELECT COUNT(id=?) FROM Movies WHERE id=?`, [+req.params.input, +req.params.input]);
        console.log(x);
        if(x > 0){

            const selectAll = await func(`UPDATE Movies SET details_id=?, quality=? WHERE id=? `, 
            [req.body.details_id, req.body.quality, +req.params.input]);
        }
        const selectAll = await func(`INSERT INTO Movies (details_id, quality) VALUES (?, ?) `, 
        [+req.params.input, req.body.details_id, req.body.quality]);
        res.status(200);
        res.send('ok');
    }catch (e) {
            
       
        console.error(e);
        res.status(500)
        res.send('server error')
        
    }
})






















