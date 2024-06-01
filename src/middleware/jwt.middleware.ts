
// Imports with ES Modules
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";



// Instantiate the JWT token validation middleware
const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  try {

    if (!req.headers.authorization) {
      throw new Error("No headers in the request");
    }

    // the environment variable TOKEN_SECRET can be undefined
    // (we use a type guard to handle this case)
    const tokenSecret = process.env.TOKEN_SECRET;
    if (tokenSecret === undefined) {
      throw new Error("TOKEN_SECRET environment variable is not defined");
    }

    const token = req.headers.authorization.split(" ")[1]; // get the token from headers "Bearer 123XYZ..."
    const payload = jwt.verify(token, tokenSecret) // the verify method decodes/validates the token and returns the payload
  
    req.payload = payload // this is to pass the decoded payload to the next route as req.payload
    next()

  } catch (error) {
    // the middleware will catch any error in the try and send 401 if:
    // 1. There is no token
    // 2. Token is invalid
    // 3. There is no headers or authorization in req (no token)
    res.status(401).json("token not provided or not valid")
  }
}

// Export with ES Modules
export { isAuthenticated }

