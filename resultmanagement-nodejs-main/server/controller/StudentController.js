const mysql = require('mysql');
const Connection = require('mysql/lib/Connection');
require('dotenv').config();


const pool = mysql.createPool({
  connectionLimit: 100,
  host : process.env.DB_HOST,
  user : process.env.DB_USER,
  password : process.env.DB_PASS,
  database : process.env.DB_NAME

});


exports.login =(req, res)=>
{
  res.render('home');     
};
  
//view users
exports.view =(req, res)=>
{ 
    pool.getConnection((err, Connection)=>{
      if(err) throw err;
      console.log('connected as ID'+ Connection.threadId);

      Connection.query('SELECT * FROM student',(err, rows)=>{
        Connection.release();
        if(!err)
        {
          res.render('teachers',{ rows})
        }
        else{
          console.log(err);
        }
        console.log(rows);
      });
    });  
};

//add new 

exports.form =(req, res)=>
{
    res.render('add-user');
};



//add new submit
exports.create =(req, res)=>
{  
  const { Rollnumber,Name,DateOfBirth,Score } = req.body;
  pool.getConnection((err, connection)=> {
    if(err) throw err;
    //console.log('connected from add user '+ connection.threadId);
  
  let searchTerm = req.body.search;

  // User the connection
  connection.query('INSERT INTO student SET Rollnumber = ?, Name = ?, DateOfBirth = ?, Score = ?', [Rollnumber,Name,DateOfBirth, Score], (err, rows) => {
    if (!err) {
      res.render('add-user',{ alert : 'Data added successfully to the result database of students '});
    } else {
      console.log(err);
    }
    //console.log('The data from user table: \n', rows);
  });
});
}

//find student
exports.find =(req, res)=>{
  res.render('students');
}

//found student
exports.found =(req, res)=>
{ 
  
    pool.getConnection((err, Connection)=>{
      if(err) throw err;
      console.log('connected as ID'+ Connection.threadId);
      const {Rollnumber,DateOfBirth} = req.body;    
      Connection.query('SELECT * FROM student where Rollnumber LIKE ? AND DateOfBirth LIKE ?',[Rollnumber,DateOfBirth],(err, rows)=>{
        Connection.release();
        if(!err)
        {
          res.render('studentresult',{ rows})
        }
        else{
          console.log(err);
        }
        console.log(rows);
      });
    });  
};


//delete
exports.delete =(req, res)=>
{ 
  
    pool.getConnection((err, Connection)=>{
      if(err) throw err;   
      Connection.query('DELETE FROM student where Rollnumber=?',[req.params.Rollnumber],(err, rows)=>{
        Connection.release();
        if(!err)
        {
          res.redirect('teachers')
        }
        else{
          console.log(err);
        }
        console.log(rows);
      });
    });  
};

//edit user
exports.edit =(req, res)=>{


pool.getConnection((err, Connection)=>{
  if(err) throw err;
  console.log('connected as ID'+ Connection.threadId);

  Connection.query('SELECT * FROM student WHERE Rollnumber=?',[req.params.Rollnumber],(err, rows)=>{
    Connection.release();
    if(!err)
    {
      res.render('edit-user',{ rows});
    }
    else{
      console.log(err);
    }
    console.log(rows);
  });
});
};

//update user
exports.update =(req, res)=>{

const {Name,DateOfBirth,Score}= req.body;
  pool.getConnection((err, Connection)=>{
    if(err) throw err;
    console.log('connected as ID'+ Connection.threadId);
  
    Connection.query('UPDATE student SET Name=?,DateOfBirth=?,Score=? WHERE Rollnumber=?',[Name,DateOfBirth,Score,req.params.Rollnumber],(err, rows)=>{
      Connection.release();
      if(!err)
      {
          pool.getConnection((err, Connection)=>{
          if(err) throw err;
          console.log('connected as ID'+ Connection.threadId);
        
          Connection.query('SELECT * FROM student WHERE Rollnumber=?',[req.params.Rollnumber],(err, rows)=>{
            Connection.release();
            if(!err)
            {
              res.render('edit-user',{ rows});
            }
            else{
              console.log(err);
            }
            console.log(rows);
          });
        });
      }
      else{
        console.log(err);
      }
      console.log(rows);
    });
  });
  }
  
