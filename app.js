import express from 'express';
import mongoose from 'mongoose';
import authRouter from './routes/authRouter.js';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser'
import {requireAuth, checkUser} from './middleware/authMiddleware.js';
const app = express();



// middleware
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI =
	'mongodb+srv://jwt-kioshi:enHsp940VJF7Pn1Q@cluster0.b2wqw.mongodb.net/jwt-kioshi?retryWrites=true&w=majority';

mongoose
	.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
	.then((result) => app.listen(3000, () => console.log('Servidor corriendo en puerto 3000')))
	.catch((err) => console.log(err));

// routes
app.get('*',checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.use(authRouter);
