import { Eta } from "https://deno.land/x/eta@v3.1.0/src/index.ts";
import * as bookService from "./bookService.js";

const eta = new Eta({ views: `${Deno.cwd()}/templates/` });

const showForm = async (c) => {
  return c.html(
    eta.render("books.eta", { books: await bookService.listbooks() }),
  );
};

const createTodo = async (c) => {
  const body = await c.req.parseBody();
  await bookService.createTodo(body);
  console.log(body);
  return c.redirect("/books");
};

const showTodo = async (c) => {
  const id = c.req.param("id");
  return c.html(
    eta.render("book.eta", { todo: await bookService.getTodo(id) }),
  );
};

const updateTodo = async (c) => {
  const id = c.req.param("id");
  const body = await c.req.parseBody();
  await bookService.updateTodo(id, body);
  return c.redirect(`/books/${id}`);
};

const deleteTodo = async (c) => {
  const id = c.req.param("id");
  await bookService.deleteTodo(id);
  return c.redirect("/books");
};

export { createTodo, deleteTodo, showForm, showTodo, updateTodo };
