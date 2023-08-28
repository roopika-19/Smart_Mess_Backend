import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface CustomRequest extends Request {
  user: {
    role: Number;
    id: Number;
    email: String;
  };
}

export interface JWTLoadData extends JwtPayload {
  user: {
    id: Number;
    email: String;
    role: Number;
  };
}

export interface UserData {
  id: Number;
  email: String;
  role: Number;
}

export interface MealRequest extends Request {
  body: {
    items: string;
    day: any;
    mealType: any;
  };
}

export interface GoogleOauthToken {
  access_token: string;
  id_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
  scope: string;
}

export interface GuestBody extends Request {
  body: {
    name: String;
    email: String;
    feedback: String;
    image: String;
    mess: String;
  };
}

export interface OngoingMealRequest extends Request {
  body: {
    mess: String;
    date: Date;
  };
}

export interface TimeTableReq extends Request {
  body: {
    mess: String;
  };
}
