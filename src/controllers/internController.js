const internModel = require('../models/internModel')
const collegeModel = require('../models/collegeModel')
const emailValidator = require('email-validator')


let createIntern = async function (req, res) {
    try {
        let data = req.body
        let { name, email, mobile, collegeName } = data

        let mobileRegex = /^([+]\d{2})?\d{10}$/

        if (Object.keys(data).length == 0)
            return res.status(400).send({ status: false, msg: "Data is required to create an intern." })

        if (!name)
            return res.status(400).send({ status: false, msg: "Name is required." })

        if (!email)
            return res.status(400).send({ status: false, msg: "email is required." })

        if (!emailValidator.validate(email))
            return res.status(400).send({ status: false, msg: "please provide valid email address." })

        let duplicateEmail = await internModel.findOne({ email: email })
        if (duplicateEmail) return res.status(400).send({ status: false, msg: "Email already exists." })

        if (!mobile)
            return res.status(400).send({ status: false, msg: "mobile is required." })

        if (!mobileRegex.test(mobile))
            return res.status(400).send({ status: false, msg: "Please Provide valid Mobile number." })

        let duplicateMobile = await internModel.findOne({ mobile: mobile })
        if (duplicateMobile) return res.status(400).send({ status: false, msg: "Mobile Number already exists." })

        if (!collegeName)
            return res.status(400).send({ status: false, msg: "collegeName is required." })

        let college = await collegeModel.findOne({ name: collegeName, isDeleted: false })

        if (!college) return res.status(404).send({ status: false, msg: "No such college found." })

        let collegeid = college._id
        data.collegeId = collegeid

        let created = await internModel.create(data)
        return res.status(201).send({ status: true, msg: "successfully created.", data: created })
    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }

}


module.exports.createIntern = createIntern