const collegeModel = require('../models/collegeModel')
const internModel = require('../models/internModel')

let createCollege = async function (req, res) {
    try {
        let data = req.body
        let { name, fullName, logoLink } = data

        if (Object.keys(data).length == 0)
            return res.status(400).send({ status: false, msg: "Data is required to create a college. " })

        if (!name)
            return res.status(400).send({ status: false, msg: "Name is required." })

        if (!fullName)
            return res.status(400).send({ status: false, msg: "fullName is required." })

        if (!logoLink)
            return res.status(400).send({ status: false, msg: "logoLink is required." })

        let findWithName = await collegeModel.findOne({ name: name })
        if (findWithName) return res.status(400).send({ status: false, msg: "college name already exists." })

        let saveData = await collegeModel.create(data)
        return res.status(201).send({ status: true, msg: "Successfully created.", data: saveData })
    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }

}

let getDetails = async function (req, res) {
    try {
        res.setHeader('Access-Control-Allow-Origin','*')
        let data=req.query
         if(Object.keys(data).length==0)
         return res.status(400).send({status:false,msg:"please provide query parameter."})

        let collegeName = req.query.collegeName
        if (!collegeName)
            return res.status(400).send({ status: false, msg: "please provide college name in query parameter." })

        let college=await collegeModel.findOne({name:collegeName,isDeleted:false})
        if(!college)
        return res.status(404).send({status:false,msg:"No such college exists."})   

        let collegeData={
            name:college.name,
            fullName:college.fullName,
            logoLink:college.logoLink

        }

        let interns=await internModel.find({collegeId:college._id,isDeleted:false})
        if(!interns)
        return res.status(404).send({status:false,msg:"No such interns found."})

        collegeData.interns=interns
        return res.status(200).send({status:true,data:collegeData})
    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }

}


module.exports.createCollege = createCollege
module.exports.getDetails = getDetails
