/**
 * default path로 항상 main namespace에 join한다.
 * client가 main namespace를 통해 다른 namespace를 가져올 수 있기 때문에.
  */
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
        // io()를 이용해 ns에 동적으로 join한다.
        io(`http://localhost:9000/${ns.endpoint}`, (data) => {})
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