import { Request, Response } from "express";
import { Connection } from 'typeorm';
import { connect } from '../config';
import { User } from '../../entity/index';
import { Firebase } from '../../../firebase';

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({
        code: "auth/name-invalid",
        message: "Enter your full name"
      });
    }

    if (!password) {
      return res.status(400).json({
        code: "auth/password-invalid",
        message: "Enter a valid password"
      });
    }

    const connection: Connection = await connect();

    const userRepository = connection.getRepository(User);

    const newUser = new User();
    newUser.email = email;
    newUser.password = password;
    newUser.hashPassword();
    
    const savedUser = await userRepository.save(newUser);

    const { id, email: savedEmail, credit } = savedUser;

    await Firebase.firestore()
      .collection("users")
      .doc(`${id}:${savedEmail}`)
      .set({
        credit
      });

    return res.status(200).send(savedUser);
  } catch (error) {
    console.log('errror', error);
    if(error && error.message === "ER_DUP_ENTR") {
      return res.status(422).json({
        code: "error",
        "error": "User with email already exist",
      });
    }
    return res.status(422).json({
      code: "error",
      error: "something went wrong"
    });
  }
}

export const getAllUsers = async(req: Request, res: Response) => {
  try{
    const connection: Connection = await connect();

    const userRepository = connection.getRepository(User);
    const users = await userRepository.find({
      select: ["id", "email", "credit" ],
    });

    res.status(200).json({
      users: users
    });
  }catch(error) {
    console.log('error', error);
    res.status(422).json({
      error: 'error',
      message: "something went wrong"
    });
  }
}

export const getUser = (req: Request, res: Response) => {

  try{

  }catch(error) {

  }
}

export const sendToDatabase = async(req: Request, res: Response) => {
  try{
    const { id } = req.params;
    const { amount, beneficiaryId } = req.body;

    if(amount == null) {
      return res.status(422).json({
        error: "error",
        message: "please provide amount"
      });
    }
    const connection: Connection = await connect();

    const userRepository = connection.getRepository(User);

    let currentUser;
    let beneficiary;
    let balance;

    currentUser = await userRepository.findOneOrFail(id, {
      select: ["id", "credit"]
    });

    beneficiary = await userRepository.findOneOrFail(beneficiaryId, {
      select: ["id", "credit"]
    });
    
    const { credit } = currentUser;

    if(amount > parseFloat(credit)) {
      return res.status(422).json({
        error: "error",
        message: "Insufficient balance"
      });
    }

    balance = credit - amount;
    currentUser.credit = balance;

    const beneficiaryCredit = parseFloat(beneficiary.credit) + parseFloat(amount);

    beneficiary.credit = beneficiaryCredit;

    await userRepository.save(beneficiary);
    await userRepository.save(currentUser);

    return res.status(200).json({
      message: "database transfer successful"
    });
  }catch(error) {
    return res.status(422).json({
      error: "error",
      message: "something went wrong"
    });
  }
}

export const sendToFirebase = async(req: Request, res: Response) => {
  try{
    const id = req.params.id;
    const userEmail = req.params.email;

    const { amount, beneficiaryId, email } = req.body;

    const userId = `${id}:${userEmail}`;
    const benUserId = `${beneficiaryId}:${email}`;

    await Firebase.firestore().runTransaction(async (transaction: FirebaseFirestore.Transaction) => {
      const userRef = Firebase.firestore().doc(`/users/${userId}`);

      const benUserRef = Firebase.firestore().doc(`/users/${benUserId}`);

      const userDoc: FirebaseFirestore.DocumentSnapshot = await transaction.get(userRef);
      const benUserDoc: FirebaseFirestore.DocumentSnapshot = await transaction.get(benUserRef);

      const userData = userDoc.data();
      const benUserData = benUserDoc.data();

      const { credit } = userData;
      const benCredit = benUserData.credit;

      let balance;

      if(amount > parseFloat(credit)) {
        return res.status(422).json({
          error: "error",
          message: "Insufficient balance"
        });
      }

      balance = credit - amount;

      await transaction.update(userRef, {
        credit: balance
      });

      await transaction.update(benUserRef, {
        credit: parseFloat(benCredit) + parseFloat(amount)
      });

      return res.status(200).json({
        message: "firestore transfer successful"
      });
    });
  }catch(error) {
    return res.status(422).json({
      error: "something went wrong",
      message: "firestore transfer successful"
    });
  }
}