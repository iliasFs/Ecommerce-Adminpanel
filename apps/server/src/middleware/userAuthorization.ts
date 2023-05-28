import {Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../lib/constant";
import User from "../models/User";


function userAuthorizationMiddleware(req: Request, _: Response, next: NextFunction){
    // get the credentials from the headers
    const authHeader = req.headers.authorization
    const authParts = authHeader?.split(' ')
    // if this authparts does not exist just return, dont proceed
    if(authParts===undefined)return
    if(!authHeader || authParts[0] !== 'Bearer') throw new Error('Missing Bearer Authentication')
    // If everything is fine, get the user token
    const token = authParts[1]
    // now, check if this token is correct
    const payload = jwt.verify(token,JWT_SECRET)
    
    if (typeof payload === 'string' || !('user' in payload)) {
        throw new Error('Invalid token')
    }
    // if yes, add it to th Request object
    req.user = payload.user as User
    console.log(req.user)
   next()
}

export default userAuthorizationMiddleware
