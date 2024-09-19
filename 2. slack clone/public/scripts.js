const userName = 'den';

/**
 * default path로 항상 main namespace에 join한다.
 * client가 main namespace를 통해 다른 namespace를 가져올 수 있기 때문에.
  */
const socket = io('http://localhost:9000');

const nameSpaceSockets = [];
const listeners = {
    nsChange: [],
    messageToRoom: [],
}

/**
 * Global 변수인 현재 namespace Id
 * -> namespace를 클릭하면 app 전반에 걸쳐 broadcast 하기 위한 변수
 */
let selectedNsId = 0;

document.querySelector('#message-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const newMessage = document.querySelector('#user-message').value;
    nameSpaceSockets[selectedNsId].emit('newMessageToRoom', {
        newMessage,
        data: Date.now(),
        avatar: 'https://via.placeholder.com/30',
        userName,
    })
})

const addListeners = (nsId) => {
    if(!listeners.nsChange[nsId]){
        nameSpaceSockets[nsId].on('nsChange', (data) => {
            console.log('Namespace changed');
            console.log(data);
        })
        listeners.nsChange[nsId] = true;
    }
    if(!listeners.messageToRoom[nsId]){
        nameSpaceSockets[nsId].on('messageToRoom', (messageObj) => {
            console.log(messageObj);
        })
        listeners.messageToRoom[nsId] = true;
    }
};

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
        //const thisNs = io(`http://localhost:9000${ns.endpoint}`);
        // 서버에서 namespace 정보가 바뀌면(nsChange 이벤트가 emit되면), 자동으로 client에도 변경사항이 전달된다.

        if(!nameSpaceSockets[ns.id]){
            nameSpaceSockets[ns.id] = io(`http://localhost:9000${ns.endpoint}`);
        }
        addListeners(ns.id);
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