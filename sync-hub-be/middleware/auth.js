import { Users } from "../models/usersModel.js";
import jwt from "jsonwebtoken";

export async function protectedRoute(req, res, next) {
    // console.log(1)
    try {
        if (req.headers.authorization || req.headers.authorization.startsWith("Bearer")) {
            let token = req.headers.authorization.split(" ")[1];
            if (token) {
                // console.log(1.1)
                let decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY)
                if (decoded.email){
                    // console.log(2)
                    let user = await Users.findOne({email: decoded.email})
                    if (user) {
                        // console.log(3)
                        req.user = user;
                        next();
                        return
                    } else {
                        res.status(202).send({message: "Authorization Denied!"})
                    }
                } else {
                    res.status(202).send({message: "This user credentials no longer exists!"})
                }
            }
        } else {
            res.status(202).send({message: "You are not logged in!"})
        }
    } catch (error) {
        next();
    }
}