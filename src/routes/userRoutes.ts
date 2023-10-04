import express from "express";
import { giveRating, userTimeTable,submitFeedback,webAddNotificationTokenHandler, makeRead,getAllNotifications } from "../controllers/user.controller";
const userRouter = express.Router();

// router.get("/user/dashboard/feedback", Authenticate, Authorize, feedbackHandler);
// router.get("/user/dashboard/timetabnticate, Authorize, userDetails);
// router.get("/user/notifications", Authenticate, Authorize, userNotifications);
// router.post("/create_user", Authentle", Authenticate, Authorize, timeTableHandler);
// router.get("/user/dashboard", Autheicate, Authorize, createUser);
userRouter.get("/dashboard/timetable", userTimeTable);
userRouter.post("/dashboard/giveRating", giveRating);
userRouter.post("/dashboard/submitFeedback", submitFeedback);
userRouter.get("/dashboard/notifications", getAllNotifications);
userRouter.post("/addNotificationToken/web", webAddNotificationTokenHandler);
userRouter.post("/makeRead", makeRead);


export default userRouter;
