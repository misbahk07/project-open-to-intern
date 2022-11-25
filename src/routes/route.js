const express = require('express');
const router = express.Router();

const collegeController=require('../controllers/collegeController')
const internController=require('../controllers/internController')

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

// ****************************** Post API to create a College ***************************************** 
router.post('/functionup/colleges',collegeController.createCollege)

// ****************************** Post API to create an intern *****************************************
router.post('/functionup/interns',internController.createIntern)

// ****************************** Get API to fetch College Details ************************************* 
router.get('/functionup/collegeDetails',collegeController.getDetails)





module.exports=router;  