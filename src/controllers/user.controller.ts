require("dotenv").config();
import express, { Request, Response, NextFunction } from "express";
import User_Schema from "../models/user";
import { GoogleUserResult, JWTLoadData, userResult } from "../Interface/interfaces";
import feedback from "../models/feedback";
import menuTable from "../models/menuTable";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import notifications from "../models/notifications";

export const feedbackHandler = (req: any, res: Response, next: NextFunction) => {
  let data = req.user;
  try {
    let user: userResult = <userResult>(<unknown>User_Schema.findOne({ Email: data.email }));
    if (!user) {
      res.status(404).send("User Not Found");
    } else {
      let userId = user._id;
      let userFeedbacks = feedback.find({ UserID: userId });
      res.send(userFeedbacks).status(200);
    }
  } catch (error) {
    res.status(501).send("Some Error Occured");
    console.log(error);
  }
};

export const timeTableHandler = (req: any, res: Response, next: NextFunction) => {
  let data = req.user;
  try {
    let user: userResult = <userResult>(<unknown>User_Schema.findOne({ Email: data.email }));
    if (!user) {
      res.status(404).send("User Not Found");
    } else {
      let eatMess = user.Eating_Mess;
      let allTimeTable = menuTable.find({ Mess: eatMess });
      res.send(200).send(allTimeTable);
    }
  } catch (error) {
    res.status(501).send("Some Error Occured");
    console.log(error);
  }
};

export const userDetails = (req: any, res: Response, next: NextFunction) => {
  let data = req.user;
  try {
    let user: userResult = <userResult>(<unknown>User_Schema.findOne({ Email: data.email }));
    if (!user) {
      res.status(404).send("User Not Found");
    } else {
      res.send(user).status(200);
    }
  } catch (error) {
    res.status(501).send("Some Error Occured");
    console.log(error);
  }
};

export const userNotifications = (req: any, res: Response, next: NextFunction) => {
  let data = req.user;
  try {
    let user: userResult = <userResult>(<unknown>User_Schema.findOne({ Email: data.email }));
    if (!user) {
      res.status(404).send("User Not Found");
    } else {
      let userMess = user.Eating_Mess;
      let allNotifs = notifications.find({ Mess: userMess });
      res.send(allNotifs).status(200);
    }
  } catch (error) {
    res.status(501).send("Some Error Occured");
    console.log(error);
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let user = await User_Schema.findOne({ Username: req.body.Username });
    if (user) {
      res.status(400);
      res.send({ error: "User Already Exists" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.pass, salt);
      user = await User_Schema.create({
        Username: req.body.Username,
        Password: secPass,
        Email: req.body.Email,
        Phone_Number: req.body.Phone_Number,
        Role: req.body.Role,
        First_Name: req.body.First_Name,
        Last_Name: req.body.Last_Name,
        Last_Login: Date.now(),
      });
      const data: JWTLoadData = {
        user: {
          email: user.Email,
          role: user.Role!,
          time: Date.now(),
        },
      };
      const authToken = jwt.sign(data, process.env.JWT_KEY!);
      res.send({ authToken });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Some Error Occured");
  }
};