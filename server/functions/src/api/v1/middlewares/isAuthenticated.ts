import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { secret } from '../../utils';

const verifyJwt = token => {
  try {
    const verified = jwt.verify(
      token,
      secret.jwtSecret
    );
    return verified;
  } catch (error) {
    return null;
  }
};

export const isAuthenticated = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  let token = null;
  if (request.headers.authorization) {
    const [bearer, accessToken] = request.headers.authorization.split(" ");
    token = bearer === "Bearer" && accessToken ? accessToken : null;
    const isValid = verifyJwt(token);
    if (isValid) {
      next();
    } else {
      return response.status(401).send({ message: "unauthorized" });
    }
  } else {
    return response.status(401).send({ message: "unauthorized" });
  }
};