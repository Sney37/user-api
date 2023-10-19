const jwt = require('jsonwebtoken')

async function auth(req,res,next){
    try {
        const token = req.header('auth-token')
        if(!token) return res.status(400).json({errors:true,message:"token doesn't exist"})

        const verifyToken = await jwt.verify(token,process.env.SEC)
        if(!token)return res.status(400).json({errors:true,message:"token is invalid"})

        next()
    } catch (error) {
        return res.status(400).json({errors:true,message:error.message})
    }
}

module.exports = auth