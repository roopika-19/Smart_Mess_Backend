import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/.env" });
import createHttpError, { CreateHttpError } from "http-errors";
import express, { Express, Request, Response, NextFunction } from "express";
import logger from "morgan";
import path from "path";
// import { defaultRouter } from "./routes";
// import userRouter from "./routes/userRoutes";
import authRouter from "./routes/authRoutes";
import guestRouter from "./routes/guestRoutes";
import managerRoutes from "./routes/managerRoutes";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoutes"
import { Authenticate } from "./middlewares/Authenticate";
import { Authorize } from "./middlewares/Authorize";
import connectDB from "./config/connectDB";
import notifications from "./models/notifications";



import schedule from 'node-schedule';
import backup from "./config/backupTimeSeriesData";

const job = schedule.scheduleJob('59  * * *', function () {
  backup();
});

var app = express();

// view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "jade");

//connect to database
connectDB();


app.use(cors());
app.use(cookieParser());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(createHttpError);
//serve files of path /static
app.use("/static", express.static(path.join(__dirname, "..", "public")));



// app.use("/", defaultRouter);
app.use("api/auth", authRouter);
app.use("api/guest", guestRouter);

app.use(Authenticate()); //all the routes below this will be authenticated
//app.use(Authorize()); //only the below routes have to be authorized

app.use("api/user", userRouter);
app.use("api/manager", managerRoutes);





// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createHttpError(404));
});

// error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

//exporting app to be used in test
export default app;
