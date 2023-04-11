let mockStorage = [];

export const listObjects = () => {
    return mockStorage;
};

export const getObject = (id) => {
    const found = mockStorage.filter((obj) => obj.id === id);
    return found[0];
};

export const putObject = (id, data) => {
    deleteObject(id);
    data.id = id;
    data.updated = new Date().toJSON();
    mockStorage.push(data);
    return data;
};

export const deleteObject = (id) => {
    mockStorage = mockStorage.filter((obj) => obj.id !== id);
};
