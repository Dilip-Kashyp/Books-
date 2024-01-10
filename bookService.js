const createTodo = async (todo) => {
  todo.id = crypto.randomUUID();
  const kv = await Deno.openKv();
  await kv.set(["todos", todo.id], todo);
};

const listbooks = async () => {
  const kv = await Deno.openKv();
  const todoEntries = await kv.list({ prefix: ["todos"] });
  const todos = [];
  for await (const entry of todoEntries) {
    todos.push(entry.value);
  }

  return todos;
};

const getTodo = async (id) => {
  const kv = await Deno.openKv();
  const todo = await kv.get(["todos", id]);
  return todo?.value ?? {};
};

const updateTodo = async (id, todo) => {
  todo.id = id;
  const kv = await Deno.openKv();
  await kv.set(["todos", id], todo);
};

const deleteTodo = async (id) => {
  const kv = await Deno.openKv();
  await kv.delete(["todos", id]);
};

export { createTodo, deleteTodo, getTodo, listbooks, updateTodo };
