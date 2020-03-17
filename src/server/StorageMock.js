let mockStorage = [];

const listObjects = userId => {
  const output = [];
  mockStorage
    .filter(obj => obj.userId === userId)
    .forEach(obj => {
      output.push({
        userId: obj.userId,
        objectId: obj.objectId
      });
    });
  return output;
};

const getObject = (userId, objectId) => {
  const found = mockStorage.filter(
    obj => obj.userId === userId && obj.objectId === objectId
  );
  return found[0];
};

const putObject = (userId, objectId, data) => {
  deleteObject(userId, objectId);
  data.userId = userId;
  data.objectId = objectId;
  data.updated = new Date().toJSON();
  mockStorage.push(data);
  return data;
};

const deleteObject = (userId, objectId) => {
  mockStorage = mockStorage.filter(
    obj => obj.userId !== userId && obj.objectId !== objectId
  );
};

module.exports = {
  listObjects,
  getObject,
  putObject,
  deleteObject
};
