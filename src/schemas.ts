export default {
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
  params: { },
  response: {
    200: {  },
  },
};

const create = {
  params: { $ref: 'http://graasp.org/item-flags/#/definitions/itemIdParam' },
  body: { },
  response: {
    201: { }
  }
};
export { getOne, create };
