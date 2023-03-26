const jwtKey = process.env.jwtKey
const Jwt = require('jsonwebtoken');

function verifyToken(req, resp, next) {
    let token = req.headers['authorization'];
    
    if (token) {
        token = token.split(' ')[1];
        // console.warn("middleware called", token);
         
        Jwt.verify(token, jwtKey, (err, valid) => {
            if (err) {
                resp.status(401).send({ result: "Please provide valid token" })
            }
            else {
                next();
            }
        })
    }
    else {
        resp.status(403).send({ result: "Please add token with header" })

    }


}
module.exports=verifyToken