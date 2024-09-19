const joinNs = (element, nsData) => {
    const nsEndpoint = element.getAttribute('ns');
    const clickedNs = nsData.find(ns => ns.endpoint === nsEndpoint);
    const rooms = clickedNs.rooms;

    selectedNsId = clickedNs.id;

    const roomList = document.querySelector('.room-list');
    roomList.innerHTML = ``;

    let firstRoom;

    rooms.forEach((room, index) => {
        if(index === 0) {
            firstRoom = room.roomTitle;
        }

        roomList.innerHTML += `<li class="room" namespaceId=${room.namespaceId}>
                <span class="fa-solid fa-${room.privateRoom ? 'lock' : 'globe'}"></span>
                ${room.roomTitle}
            </li>
        `;
    })

    const currentNamespaceId = clickedNs.id;
    joinRoom(firstRoom, currentNamespaceId);

    const roomNodes = document.querySelectorAll('.room');
    Array.from(roomNodes).forEach(roomNode => {
        roomNode.addEventListener('click', (e) => {
            const roomTitle = e.target.innerText;
            const nameSpaceId = roomNode.getAttribute('namespaceId');

            joinRoom(roomTitle, nameSpaceId);
        })
    })

    localStorage.setItem('lastNs', nsEndpoint);
}