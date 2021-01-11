import jwt from 'jsonwebtoken';
import properties from './properties'

const getToken = (user) => {
    return jwt.sign({ _id: user._id, 
        name: user.name, 
        email: user.email, 
        isContentManager: user.isContentManager }, properties.JWT_SECRET, { expiresIn: '48h' })
}

const isAuth = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        const onlyToken = token.slice(6, token.length);
        // console.log(onlyToken);
        jwt.verify(onlyToken, properties.JWT_SECRET, (err, decode) => {
            if (err) {
                console.log(err);
                return res.status(401).send({ msg: 'Invalid Token' });
            }
            req.user = decode;
            next();
            return

        })
    } else {
        return res.status(401).send({ msg: 'Token was not supplied.' });
    }

}
const isContentManager = (req, res, next) => {
    if (req.user && req.user.isContentManager) {
        return next();
    }
    return res.status(401).send({ msg: 'Content Manager token is not valid.' })
}
export {
    getToken, isAuth, isContentManager
}