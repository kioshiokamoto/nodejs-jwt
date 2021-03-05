import User from '../models/User.js';
import jwt from 'jsonwebtoken';

//handle errors
const handleErrors = (err) => {
	//console.log(err.message,err.code);
	let error = { email: '', password: '' };
	//Incorrect email
	if (err.message === 'incorrect email') {
		error.email = 'That email is not registered';
	}
	//Incorrect pass
	if (err.message === 'incorrect password') {
		error.email = 'That password is incorrect';
	}

	//duplicate error code
	if (err.code === 11000) {
		error.email = 'That email is already registered';
		return error;
	}

	//Validate errors
	if (err.message.includes('user validation failed')) {
		Object.values(err.errors).forEach(({ properties }) => {
			error[properties.path] = properties.message;
		});
	}
	return error;
};

const MAX_AGE = 3 * 24 * 60 * 60;
const createToken = (id) => {
	return jwt.sign({ id }, 'kioshi secret', {
		expiresIn: MAX_AGE,
	});
};

export const signup_get = (req, res) => {
	res.render('signup');
};
export const login_get = (req, res) => {
	res.render('login');
};
export const signup_post = async (req, res) => {
	const { email, password } = req.body;
	// console.log(email,password);
	try {
		const user = await User.create({ email, password });
		const token = createToken(user._id);
		res.cookie('jwt', token, { httpOnly: true, maxAge: MAX_AGE * 1000 });
		res.status(201).json({ user: user._id });
	} catch (error) {
		const errors = handleErrors(error);
		res.status(400).json({ errors });
	}
};
export const login_post = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.login(email, password);
		const token = createToken(user._id);
		res.cookie('jwt', token, { httpOnly: true, maxAge: MAX_AGE * 1000 });
		res.status(200).json({ user: user._id });
	} catch (error) {
		const errors = handleErrors(error);
		res.status(400).json({ errors });
	}
};
export const logout_get = (req, res) => {
	res.cookie('jwt','',{maxAge:1});
    res.redirect('/');
};