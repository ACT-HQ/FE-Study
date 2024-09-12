const joinNs = (element, nsData) => {
    const nsEndpoint = element.getAttribute('ns');
    const clickedNs = nsData.find(ns => ns.endpoint === nsEndpoint);
    const rooms = clickedNs.rooms;

    const roomList = document.querySelector('.room-list');
    roomList.innerHTML = ``;
    rooms.forEach(room => {
        roomList.innerHTML += `<li><span class="glyphicon glyphicon-globe"></span>${room.roomTitle}</li>`;
    })

    localStorage.setItem('lastNs', nsEndpoint);
}