"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.getOne = void 0;
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
const create = {
    params: { $ref: 'http://graasp.org/item-flags/#/definitions/itemIdParam' },
    body: {},
    response: {
        201: {}
    }
};
exports.create = create;
