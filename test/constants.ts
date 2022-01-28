import { Actor, Item, ItemMembership, Member } from 'graasp';
import { v4 } from 'uuid';
import { ItemCategory } from '../src';
import { Category } from '../src/interfaces/category';

export const CATEGORY_TYPES = [
  {
    id: v4(),
    name: 'category-1',
  },
  {
    id: v4(),
    name: 'category-2',
  },
];

export const CATEGORIES: Category[] = [
  {
    id: v4(),
    name: 'public-item-folder',
    type: CATEGORY_TYPES[0].id,
  },
  {
    id: v4(),
    name: 'published-item-folder',
    type: CATEGORY_TYPES[1].id,
  },
];

export const buildItemCategory = (args?): ItemCategory => {
  const { itemId = v4(), categoryId = v4() } = args ?? {};
  return {
    id: v4(),
    itemId,
    categoryId,
  };
};

export const buildMember = (): Partial<Member> => ({
  id: v4(),
  name: 'member',
  email: 'member@email.com',
  extra: {},
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
});

export const buildItemMembership = (): Partial<ItemMembership> => ({
  id: v4(),
  memberId: buildMember().id,
  itemPath: v4().replace(/-/g, '_'),
  creator: v4(),
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
});

export const DEFAULT_GRAASP_ACTOR = {
  id: v4(),
};

export const PUBLIC_TAG_ID = v4();
export const PUBLISHED_TAG_ID = v4();

export const buildItem = (): Item => {
  const id = v4();
  return {
    id,
    path: id.replace(/-/g, '_'),
    name: id,
    description: 'description',
    type: 'folder',
    extra: {},
    creator: v4(),
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    settings: {
      isPinned: false,
      showChatBox: false,
    },
  };
};

export const GRAASP_ACTOR: Actor = {
  id: 'actorid',
};

export const CATEGORY_IDS_LIST = [
  `${v4()},${v4()}`,
  v4()
];

export const MOCK_ITEM_IDS_LIST = [
  [
    {id: 'id1'},
    {id: 'id2'},
  ],
  [ 
    {id: 'id3'},
    {id: 'id2'},
  ],
];

export const MOCK_ITEM_IDS_LIST_INTERSECTION = [
  {id: 'id2'}
];

