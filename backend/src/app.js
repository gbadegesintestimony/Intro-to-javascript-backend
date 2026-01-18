import express from "express";
import userRouter from "./routes/user_routes.js";
import postRouter from "./routes/post_routes.js";

const app = express();

app.use(express.json());

// routes import

// routes declaration

app.use(userRouter);
app.use(postRouter);

//example route: http://localhost:8080/api/v1/users/register

export default app;
