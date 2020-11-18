import jwt from 'jsonwebtoken'

// generating token with the id
const generateToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '60d'})
}

export default generateToken