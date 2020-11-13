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
        CREATE TABLE IF NOT EXISTS Series(
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            details_id INT NOT NULL
        )ENGINE=INNODB; 
        `, []);    
    func(`INSERT INTO Series (details_id)
         VALUES (?)`,
         [1]);                   
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

app.get(`/series`, async (req, res) => {
    try {
        const selectAll = await func(`SELECT * FROM Series`, []);
        res.status(200);
        res.send(selectAll);
    }catch (e) {
        res.status(500)
        res.send('server error')
    }
})

app.get(`/series/:input`, async (req, res) => {
    try {
        const selectAll = await func(`SELECT * FROM Series WHERE id=?`, [req.params.input]);
        res.status(200);
        res.send(selectAll);
    }catch (e) {
        
        res.status(500)
        res.send('server error')
    }
})

app.delete(`/series/:input`, async (req, res) => {
    try {
        const selectAll = await func(`DELETE FROM Series WHERE id=?`, [+req.params.input]);
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
        CREATE TABLE IF NOT EXISTS Series (
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            details_id INT NOT NULL
        )ENGINE=INNODB; 
    `, []);
}) 




app.put(`/series/:input`,[
    body('details_id').isLength({ min: 5 })
], async (req, res) => {
    try {
      
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        const x = await func(`SELECT COUNT(id=?) FROM Series WHERE id=?`, [+req.params.input, +req.params.input]);
        console.log(x);
        if(x > 0){

            const selectAll = await func(`UPDATE Series SET details_id=? WHERE id=? `, 
            [req.body.details_id, +req.params.input]);
        }
        const selectAll = await func(`INSERT INTO Series (details_id) VALUES (?) `, 
        [+req.params.input, req.body.details_id]);
        res.status(200);
        res.send('ok');
    }catch (e) {
            
       
        console.error(e);
        res.status(500)
        res.send('server error')
        
    }
})






















