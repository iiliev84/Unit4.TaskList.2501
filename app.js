import express from "express";
const app = express();
export default app;
import usersRouter from "#api/users";
import tasksRouter from "#api/tasks";

app.use(express.json())

app.use("/users", usersRouter);
app.use("/tasks", tasksRouter);

app.get('/', async( req, res, next ) => {
  res.send('Welcome to the Tasks API!')
})

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong.");
});
