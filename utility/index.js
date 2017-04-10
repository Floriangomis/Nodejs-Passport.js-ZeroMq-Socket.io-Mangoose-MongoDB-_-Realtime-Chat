let findObjectInArray = (arrayOfObject, valueSearch) => {
    return arrayOfObject.findIndex( (x) => {
        return (x.id === valueSearch);
    });
};

let isNameAlreadyInUse = (arrayOfObject, nameSearched) => {
    return arrayOfObject.findIndex( (x) => {
        return (x.name === nameSearched);
    });
}

module.exports = {
    findObjectInArray: findObjectInArray,
    isNameAlreadyInUse: isNameAlreadyInUse
}