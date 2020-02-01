import { Request, Response } from 'express';
import { Connection } from 'typeorm';
import * as jwt from "jsonwebtoken";
import { connect } from '../config';
import { User } from '../../entity';
import { secret } from '../../utils';

export const login = async (req: Request, res: Response) => {

  try{
    const { email, password } = req.body;

    if(!(email && password)) {
      return res.status(400).json({
        error: "auth/email-password-invalid",
        message: "Enter your email and password"
      });
    }

    let user: User;

    const connection: Connection = await connect();

    const userRepository = connection.getRepository(User);

    user = await userRepository.findOneOrFail({ where: { email } });
    
    if(!user.isPlainPasswordValid(password)) {
      return res.status(401).json({
        error: "error",
        message: "invalid password"
      });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      secret.jwtSecret,
      { expiresIn: "1h" }
    );
    
    return res.status(200).json({
      token: token,
      id: user.id,
      email: user.email,
      credit: user.credit
    });

  }catch(error) {
    console.log('authError', error);
    if(error && error.name === "EntityNotFound") {
      res.status(401).json({
        error: "error",
        message: "User not found, please signup"
      });
    }
    return res.status(422).json({
      error: "error",
      message: "something went wrong"
    });
  }
}