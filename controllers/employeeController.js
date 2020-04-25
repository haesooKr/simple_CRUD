const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render("employee/addOrEdit", {
    viewTitle : "Insert Employee"
  });
})

module.exports = router;