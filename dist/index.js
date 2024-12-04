"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const handler = async (event) => {
    return {
        statusCode: 200,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Hello, World!',
    };
};
exports.handler = handler;
