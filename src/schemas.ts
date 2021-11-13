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

export { getOne };
