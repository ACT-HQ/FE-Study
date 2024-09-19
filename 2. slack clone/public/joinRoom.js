const joinRoom = (roomTitle, namespaceId) => {
    console.log('roomTitle', roomTitle);
    console.log('namespaceId', namespaceId);
    nameSpaceSockets[namespaceId].emit('joinRoom', roomTitle);
};