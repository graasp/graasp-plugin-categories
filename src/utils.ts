export const getItemIdsArray = (objectList) => {
  const itemIdsArray = objectList.map((entry) => entry.id);
  return itemIdsArray;
};
