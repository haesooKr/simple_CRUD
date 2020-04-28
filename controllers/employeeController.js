const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee')

mongoose.set('useFindAndModify', false);

router.get("/", (req, res) => {
  res.render("employee/addOrEdit", {
    viewTitle: "Insert Employee",
    style: "/css/employee"
  });
});

router.post("/", (req, res) => {
  if(req.body._id == ''){
    insertRecord(req, res);
  } else {
    modifyRecord(req, res);
  }
  
});

function insertRecord(req, res){
  let employee = new Employee();
  employee.fullName = req.body.fullName;
  employee.email = req.body.email;
  employee.mobile = req.body.mobile;
  employee.city = req.body.city;
  employee.save((err, doc) => {
    if(!err){
      res.redirect('employee/list');
    }
    else {
      if(err.name == "ValidationError"){
        handleValidationError(err, req.body);
        res.render("employee/addOrEdit", {
          viewTitle: "Insert Employee",
          employee: req.body,
          style: "/css/employee"
        });
      } else {
        console.log('Error during record insertion : ' + err)
      }
    }
  })
}

function modifyRecord(req, res){
  Employee.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
    if (!err) { res.redirect('employee/list'); }
    else {
      if(err.name == "ValidationError"){
        handleValidationError(err, req.body);
        res.render("employee/addOrEdit", {
          viewTitle: "Insert Employee",
          employee: req.body,
          style: "/css/employee"
        });
      } else {
        console.log('Error during record insertion : ' + err)
      }
    }
  })
}

router.get("/list", (req, res) => {
  Employee.find((err, docs) => {
    if(!err){
      res.render("employee/list", {
        list: docs,
        style: "/css/employee"
      });
    } else {
      console.log("Error in retrieving employee list : " + err);
    }
  })
});

function handleValidationError(err, body){
  for(field in err.errors){
    switch(err.errors[field].path){
      case 'fullName':
        body['fullNameError'] = err.errors[field].message;
        break;
      case 'email':
        body['emailError'] = err.errors[field].message;
        break;
      default:
        break;
    }
  }
}

router.get('/:id', (req, res) => {
  Employee.findById(req.params.id, (err, doc) => {
    if(!err){
      res.render("employee/addOrEdit", {
        viewTitle: "Update Employee",
        employee: doc,
        style: '/css/employee'
      })
    } else {
      console.log('error');
    }
  })
})

router.get('/delete/:id', (req, res) => {
  Employee.findByIdAndDelete(req.params.id, (err, doc) => {
    if(!err){
      res.redirect("/employee/list");
    } else {
      console.log("Error in employee delete : " + err);
    }
  })
})

module.exports = router;
