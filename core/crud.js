"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var DB_FILE_PATH = "./core/db";
function create(content) {
    fs_1.default.writeFileSync(DB_FILE_PATH, content);
}
//SIMULATION
create("Gravar a aula");
