const util = require('./utils');
const auth = require('./auth');

function verify(requestBody){
    if(!requestBody.user || !requestBody.user.username || requestBody.token) {
        return util.buildResponse(401,{ 
            verified :false,
            message: 'incorrect request body'
        })
    }
    const user = requestBody.user;
    const token = requestBody.token;
    const verification = auth.verifyToken(user.username, token);
    if (!verification.verified){
        return util.buildResponse(401,verification);
    }
}