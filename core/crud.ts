import { clear } from "console";
import fs from "fs";

const DB_FILE_PATH = "./core/db";
console.log("[CRUD]");

function convertToJSON(content: Object) {
  return JSON.stringify(content, null, 2);
}

interface Todo {
  date: string;
  content: string;
  done: boolean;
}

function create(content: string) {
  const todo: Todo = {
    content: content,
    done: false,
    date: new Date().toISOString(),
  };

  const todos: Array<Todo> = [...read(), todo];

  fs.writeFileSync(DB_FILE_PATH, convertToJSON({ todos: todos }));
}

function read(): Array<Todo> {
  const dbString = fs.readFileSync(DB_FILE_PATH, "utf-8");
  const db = JSON.parse(dbString || "{}");

  if (!db.todos) {
    return [];
  }

  return db.todos;

  return db;
}

function clearDB() {
  fs.writeFileSync(DB_FILE_PATH, "");
}

//SIMULATION
clearDB();
create("Segunda TODO");
create("Terceira TODO");
console.log(read());
