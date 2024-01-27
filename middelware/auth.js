const jwt = require('jsonwebtoken')
const {UserModel} = require('../models/User.model')

const auth=  async (req, res, next)=>{
    const token = req.headers.authorization?.split(' ')[1]
    if(token){
        try{
            const decoded = jwt.verify(token,'Masai_School')
            const {userID} = decoded
            console.log(userID)

            // console.log(userID)
            // const user = await UserModel.findOne({_id:userID})
            req.raised_by = userID
            next()
            
        }catch(err){
            res.send({'err':err.message})
        }
    }else{
        res.send('Please Login!')
    }
}

module.exports = {auth}