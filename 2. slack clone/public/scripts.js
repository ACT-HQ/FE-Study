const socket = io('http://localhost:9000');

socket.on('connect', (message) => {
    console.log('connected!!');
    socket.emit('clientConnected');
})

socket.on('nsList', (nsData) => {
    const lastNs = localStorage.getItem('lastNs');

    const nameSpacesDiv = document.querySelector('.namespaces');
    nameSpacesDiv.innerHTML = '';
    nsData.forEach((ns) => {
        nameSpacesDiv.innerHTML += `<div class="namespace" ns="${ns.endpoint}"><img src="${ns.image}"></div>`;
    })

    /**
     * 페이지 최초 진입시, namespace 및 namespace의 room 세팅
     */
    joinNs(document.getElementsByClassName('namespace')[0], nsData);

    Array.from(document.getElementsByClassName('namespace')).forEach((element) => {
        element.addEventListener('click', (e) => {
            joinNs(element, nsData);
        })
    })


})