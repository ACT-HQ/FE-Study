const joinRoom = async (roomTitle, namespaceId) => {
    console.log('roomTitle', roomTitle);
    console.log('namespaceId', namespaceId);
    const ackResp = await nameSpaceSockets[namespaceId].emitWithAck('joinRoom', roomTitle);

    const numUsersDom = document.querySelector('.curr-room-num-users');
    numUsersDom.innerHTML = `${ackResp.numUsers}<span class="fa-solid fa-user"></span>`

    const roomTitleDom = document.querySelector('.curr-room-text');
    roomTitleDom.innerHTML = roomTitle;
};