import User from '../models/User.js';

//handle errors
const handleErrors = (err)=>{
    //console.log(err.message,err.code);
    let error = {email:'', password:''};


    //duplicate error code
    if (err.code === 11000){
        error.email = 'That email is already registered';
        return error;
    }

    //Validate errors
    if(err.message.includes('user validation failed')){
       Object.values(err.errors).forEach(({properties})=>{
            error[properties.path] = properties.message;
       })
    }
    return error;
}


export const signup_get = (req,res)=>{
    res.render('signup')
}
export const login_get = (req,res)=>{
    res.render('login')
}
export const signup_post = async (req,res)=>{
    const {email, password} = req.body;
    try {
        const user = await User.create({email, password});
        res.status(201).json(user);
    } catch (error) {
        const errors = handleErrors(error);
        res.status(400).json({errors});
    }
}
export const login_post = async (req,res)=>{
    const {email, password} = req.body;
    
    
    res.send('login')
}