const jwt = require('jsonwebtoken')
const JWT_SECRET = "MitIsAGoodB@@@@iiHALLO"

const fetchUser = (req, res, next)=>{
    const token = req.header('auth-token')
    if(!token){
        return res.status(401).json({error: 'please authenticate a valid token'})
    }
    try {
        const data = jwt.verify(token, JWT_SECRET)
        req.user = data.user
        next()
    } catch (error) {
        console.log(error);
        res.status(500).send("internal server error", error.message)
    }
}

module.exports = fetchUser
