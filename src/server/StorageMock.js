let mockStorage = [];

const listObjects = () => {
    /*
  const output = [];
  mockStorage.forEach(obj => {
    output.push({
      id: obj.id
    });
  });
   */
    return mockStorage;
};

const getObject = id => {
    const found = mockStorage.filter(obj => obj.id === id);
    return found[0];
};

const putObject = (id, data) => {
    deleteObject(id);
    data.id = id;
    data.updated = new Date().toJSON();
    mockStorage.push(data);
    return data;
};

const deleteObject = id => {
    mockStorage = mockStorage.filter(obj => obj.id !== id);
};

module.exports = {
    listObjects,
    getObject,
    putObject,
    deleteObject,
};
