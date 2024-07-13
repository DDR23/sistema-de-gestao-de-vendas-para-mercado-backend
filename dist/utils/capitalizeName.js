"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = capitalize;
//FUNÇÃO QUE FAZ O CAPITALIZE 
function capitalize(str) {
    return str.replace(/\b\w/g, char => char.toUpperCase());
}
