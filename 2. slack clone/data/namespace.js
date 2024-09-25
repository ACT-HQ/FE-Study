const Namespace = require('../classes/Namespace');
const Room = require('../classes/Room');

const wikiNs = new Namespace(0, 'Wikipedia', 'https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/103px-Wikipedia-logo-v2.svg.png', '/wiki');
const mozNs = new Namespace(1, 'Mozilla', 'https://www.mozilla.org/media/img/logos/firefox/logo-quantum.9c5e96634f92.png', '/mozilla');
const linuxNs = new Namespace(2, 'Linux', 'https://upload.wikimedia.org/wikipedia/commons/a/af/Tux.png','linux');

wikiNs.addRoom(new Room(0, '스터디룸', 0));
wikiNs.addRoom(new Room(1, '공부방', 0));
wikiNs.addRoom(new Room(2, '수다방', 0));

mozNs.addRoom(new Room(0, '연설연습방', 1));
mozNs.addRoom(new Room(1, '벙개', 1));
mozNs.addRoom(new Room(2, '주니어', 1));
mozNs.addRoom(new Room(3, '헬로', 1));

linuxNs.addRoom(new Room(0, '1번방', 2));
linuxNs.addRoom(new Room(1, '2번방', 2));
linuxNs.addRoom(new Room(2, '3번방', 2));

const namespaces = [wikiNs, mozNs, linuxNs];

module.exports = namespaces;