const socket = io('http://localhost:9000');

socket.on('connect', (message) => {
    console.log('connected!!');
    socket.emit('clientConnected');
})

socket.on('nsList', (nsData) => {
    console.log(nsData);
    const nameSpacesDiv = document.querySelector('.namespaces');
    nsData.forEach((ns) => {
        nameSpacesDiv.innerHTML += `<div class="namespace" ns="${ns.name}"><img src="${ns.image}"></div>`;
    })
})