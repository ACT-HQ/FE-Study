const joinRoom = (roomTitle, namespaceId) => {
    console.log('roomTitle', roomTitle);
    console.log('namespaceId', namespaceId);
    nameSpaceSockets[namespaceId].emit('joinRoom', roomTitle, (ackResp) => {
        const numUsersDom = document.querySelector('.curr-room-num-users');
        numUsersDom.innerHTML = `${ackResp.numUsers}<span class="fa-solid fa-user"></span>`

        const roomTitleDom = document.querySelector('.curr-room-text');
        roomTitleDom.innerHTML = roomTitle;
    });
};