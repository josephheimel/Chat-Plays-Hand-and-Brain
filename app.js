const countElement = document.querySelector('#count');
const usersElement = document.querySelector('#users');
const statusElement = document.querySelector('#status');

const params = new URLSearchParams(window.location.search);
const channel = params.get('channel') || 'IntSims';
const client = new tmi.Client({
  connection: {
    secure: true,
    reconnect: true,
  },
  channels: [channel],
});

client.connect();

const chess = new Chess();

console.log(chess.moves());

let listeningForCount = true;

// Boolean switch between expecting a piece as input or expecting a move, true == move and false == piece
let moveNotPiece = true;

//Map of chat move/piece votes to number of occurrences
const voteMap = new Map();

client.on('message', (wat, tags, message, self) => {

  if(!listeningForCount) { return; } // Exit if not listening for count

  console.log({ message })
  let vote;

  // Create move vote from message
  if(moveNotPiece) {
    vote = validateMove(message, chess.moves());
    if(vote == undefined) { return; } // Exit if not a valid move
  } else {                          // Create piece vote from message
    vote = validatePiece(message);
    if(vote == undefined) { return; } // Exit if not a valid piece
  }

  // Increment or Initialize vote count
  if(voteMap.has(vote)) {
    voteMap.get(vote).count++;
  } else {
    voteMap.set(vote, {count: 1});
  }

  console.log({ map: voteMap })


});


/**
 * TODO: Function that tracks moves made by player and opponent
 * 
 *        Need to reference chess.com tab html
 * 
 * 
 *

const gameBoard = document.querySelector('#game-board');
console.log("gameBoard", gameBoard);

const target = document.querySelector(CLOCK_CLASS);                              
const observer = new MutationObserver(() => {
if ( target.classList.contains(ACTIVE_CLASS) ){
  }
});

chess.move(move)

 */