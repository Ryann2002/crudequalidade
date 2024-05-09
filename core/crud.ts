import { clear } from "console";
import { randomUUID } from "crypto";
import fs from "fs";
import { todo } from "node:test";

const DB_FILE_PATH = "./core/db";
console.log("[CRUD]");

function convertToJSON(content: Object) {
  return JSON.stringify(content, null, 2);
}

type UUID = string;
interface Todo {
  id: UUID;
  date: string;
  content: string;
  done: boolean;
}

function writeOnDB(todos: Array<Todo>) {
  fs.writeFileSync(DB_FILE_PATH, convertToJSON({ todos: todos }));
}

function create(content: string): Todo {
  const todo: Todo = {
    id: randomUUID(),
    content: content,
    done: false,
    date: new Date().toISOString(),
  };

  const todos: Array<Todo> = [...read(), todo];

  writeOnDB(todos);

  return todo;
}

function read(): Array<Todo> {
  const dbString = fs.readFileSync(DB_FILE_PATH, "utf-8");
  const db = JSON.parse(dbString || "{}");

  if (!db.todos) {
    return [];
  }

  return db.todos;
}

function deleteById(id: UUID) {
  const todos = read();

  const filteredTodos = todos.filter((todo) => todo.id != id);

  console.log(filteredTodos);

  if (!filteredTodos) {
    throw new Error("Id not found");
  }
  writeOnDB(filteredTodos);
}

function update(id: UUID, partialTodo: Partial<Todo>): Todo {
  let updatedTodo;
  const todos = read();
  todos.forEach((currentTodo) => {
    const isToUpdate = currentTodo.id == id;
    if (isToUpdate) {
      updatedTodo = Object.assign(currentTodo, partialTodo);
    }
  });

  if (!updatedTodo) {
    throw new Error("Id not found");
  }

  writeOnDB(todos);

  return updatedTodo;
}

function CLEAR_DB() {
  fs.writeFileSync(DB_FILE_PATH, "");
}

function updateContentById(id: string, content: string): Todo {
  return update(id, { content });
}

//SIMULATION
CLEAR_DB();
create("Primeira TODO");
create("Terceira TODO");
const { id: secondId } = create("Segunda TODO");
updateContentById(secondId, "New content");
deleteById(secondId);
console.log(read().length);
