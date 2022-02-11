export const groupBy = (xs, key) => {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

export const getItemIdsArray = (objectList) => {
  const itemIdsArray = objectList.map((entry) => entry.id);
  return itemIdsArray;
};
