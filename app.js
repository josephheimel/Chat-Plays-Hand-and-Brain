const countElement = document.querySelector('#count');
const usersElement = document.querySelector('#users');
const statusElement = document.querySelector('#status');

const params = new URLSearchParams(window.location.search);
const channel = params.get('channel') || 'codinggarden';
const client = new tmi.Client({
  connection: {
    secure: true,
    reconnect: true,
  },
  channels: [channel],
});

client.connect().then(() => {
  statusElement.textContent = `Listening for messages in ${channel}...`;
});

let listeningForCount = false;
let users = {};

client.on('message', (wat, tags, message, self) => {
  const { username } = tags;
  console.log({ username, message })
});
