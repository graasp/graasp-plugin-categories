"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOne = void 0;
exports.default = {
    $id: 'http://graasp.org/categories/',
    definitions: {
        category: {
            type: 'object',
            properties: {
                id: { type: 'string' },
                name: { type: 'string' },
            },
            additionalProperties: false,
        },
    },
};
// schema for getting a member
const getOne = {
    params: {},
    response: {
        200: {},
    },
};
exports.getOne = getOne;
