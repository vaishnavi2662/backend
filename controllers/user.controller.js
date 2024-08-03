import { catchayncerror } from "../middlewares/catchasyncerror.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";

export const registerControllers = catchayncerror( async (req, res, next) => {

        const {name, email, password} = req.body;

    

        if(!name || !email || !password){
            return res.status(400).json({
                success: false,
                message: "Please enter All Fields",
            }) 
        }

        let user = await User.findOne({email});

        if(user){
            return res.status(409).json({
                success: false,
                message: "User already Exists",
            });
        }

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);

  

        let newUser = await User.create({
            name, 
            email, 
            password: hashedPassword, 
        });

        return res.status(200).json({
            success: true,
            message: "User Created Successfully",
            user: newUser
        });
  

})
export const loginControllers =catchayncerror( async (req, res, next) => {
   
        const { email, password } = req.body;

        
  
        if (!email || !password){
            return res.status(400).json({
                success: false,
                message: "Please enter All Fields",
            }); 
        }
    
        const user = await User.findOne({ email });
    
        if (!user){
            return res.status(401).json({
                success: false,
                message: "User not found",
            }); 
        }
    
        const isMatch = await bcrypt.compare(password, user.password);
    
        if (!isMatch){
            return res.status(401).json({
                success: false,
                message: "Incorrect Email or Password",
            }); 
        }

        delete user.password;

        return res.status(200).json({
            success: true,
            message: `Welcome back, ${user.name}`,
            user,
        });

  
})



export const allUsers = catchayncerror( async (req, res, next) => {
    
        const user = await User.find({_id: {$ne: req.params.id}}).select([
            "email",
            "username",
       
            "_id",
        ]);

        return res.json(user);
    
   
})