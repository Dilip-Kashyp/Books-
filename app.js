import { Hono } from "https://deno.land/x/hono@v3.7.4/mod.ts";
import * as bookController from "./bookController.js";

const app = new Hono();

app.get("/books", bookController.showForm);
app.get("/books/:id", bookController.showTodo);
app.post("/books", bookController.createTodo);
app.post("/books/:id", bookController.updateTodo);
app.post("/books/:id/delete", bookController.deleteTodo);

export default app;
