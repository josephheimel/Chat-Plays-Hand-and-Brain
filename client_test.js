
const moves = [
    "e4",
    "e5",
    "f3",
    "d6",
    "d4",
    "g4",
    "dxe5",
    "xf3",
    "xf3",
    "dxe5",
    "c4",
    "f6",
    "b3",
    "e7",
    "c3",
    "c6",
    "g5",
    "b5",
    "xb5",
    "cxb5",
    "xb5+",
    "bd7",
    "O-O-O",
    "d8",
    "xd7",
    "xd7",
    "d1",
    "e6",
    "xd7+",
    "xd7",
    "b8+",
    "xb8",
    "d8#"
]
const users = [
    "Dino",
    "Fred Flintstone",
    "Pebbles Flintstone",
    "Wilma Flintstone",
    "The Frankenstones",
    "The Great Gazoo",
    "Mr. Slate",
    "Bamm-Bamm Rubble",
    "Barney Rubble",
    "Betty Rubble",
    "Schleprock",
    "Shmoo"
]
const sample = xs => xs[Math.floor(Math.random() * xs.length)]

const createMsgEvent = () => [
    null,
    { username: sample(users) },
    sample(moves),
    null
]

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

const msgCallback = (wat, tags, message, self) => {
  const { username } = tags;
  const payload = { username, message }
  state = createNewState(state, payload)
}
const mockedMessageCallback = (...args) => msgCallback(...createMsgEvent())
client.on('message', mockedMessageCallback);
    