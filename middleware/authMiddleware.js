import jwt, { decode } from 'jsonwebtoken';
import User from '../models/User.js';

export const requireAuth = (req, res, next) => {
	const token = req.cookies.jwt;

	//Check jwt exists and verified
	if (token) {
		jwt.verify(token, 'kioshi secret', (err, decodedToken) => {
			if (err) {
				console.log(err.message);
				res.redirect('/login');
			} else {
				console.log(decodedToken);
				next();
			}
		});
	} else {
		res.redirect('/login');
	}
};
//export default requireAuth;

//Check the current user
export const checkUser =  (req, res, next) => {
	const token = req.cookies.jwt;
	if (token) {
		jwt.verify(token, 'kioshi secret', async (err, decodedToken) => {
			if (err) {
				//console.log(err.message);
                res.locals.user = null;
				next(); 
			} else {
				//console.log(decodedToken);
                let user = await User.findById(decodedToken.id);
                res.locals.user =  user;
				next();
			}
		});
	} else {
        res.locals.user = null;
        next();
	}
};
//export default checkUser;