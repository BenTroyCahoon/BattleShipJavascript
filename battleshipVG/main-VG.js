/*
Det här dokumentet tjänar som en guide för att implementera spelet 
battleship i inlämningsuppgiften för "Grundläggande JS" på VG nivå. 
Några funktioner är redan implementerade åt er, andra är delvis 
implementerade och resterande saknar implementation helt. Er uppgift är 
att fylla i det som saknas i detta dokument.

Om ni kikar i index.html kan ni se att ett skrip test.js laddas in i 
dokumentet. Detta skript kör bl.a tester för några av funktioner som ni
ska implementera i denna uppgift. Ni kan se resultatet av testerna om ni 
öppnar index.html i webbläsaren och tittar i konsollen. Ni kan se att 
många tester just nu är röda (passerar inte). Jag rekommenderar att ni 
inte kommenterar bort test.js från index.html förrän alla tester är 
gröna (passerar). Börja med att implementera de nödvändiga funktionerna 
för att få testerna att passera:

* isValidShip
* markCoord
* hasLost
* registerHitOrBom
* switchPlayer

Ni skall alltså inte modifiera test.js filen utan modifiera bara i
main-VG.js. Ni får naturligtvis skapa hjälp funktioner och annat som ni 
kan tänkas behöva, men ändra helst inte för mycket i de redan 
färdigimplementerade funktionerna, annars kan det bli ganska stökigt för 
er, såvida ni inte vill ha en riktig utmaning :-D. 

När testerna passerar så kan ni kommentera bort test.js i index.html, 
gå längst ned i main-VG.js (detta dokument) och ta bort kommentaren 
framför "runGame()" så att huvudfunktionen kör. Därefter börja
implementera följande variabler (ni ska hämta rätt DOM element med 
docuement.querySelector):

* display
* playerDisplay
* tiles (använd querySelectorAll tillsammans med Array.from metoden)
* announcer
* button

och följande funktioner:

* announce
* clearAnnounce
* displayTurn
* getCoordinates
* clearTile
* clearGrid
* removeShip

*/

///////////////////// Globala variabler //////////////////////////

const rows = 10;
const cols = 10;
const nrOfShips = 1;

const player1 = {
  mark: 1,
  boms: [], // coordinates [{ row: nr, col: nr }, ...] for missed shots
  hits: [], // coordinates [{ row: nr, col: nr }, ...] for hit shots
  ships: [], // coordinates [{ row: nr, col: nr }, ...] for all ships
};

const player2 = {
  mark: 2,
  boms: [],
  hits: [],
  ships: [],
};

// object to easily switch players
let players = { current: player1, enemy: player2 };

// DOM elements to manipulate
const display = document.querySelector("section.display");
const playerDisplay = document.querySelector(".display-player");
const tiles = Array.from(document.querySelectorAll(".tile"));
const announcer = document.querySelector(".announcer");
const button = document.querySelector("button");

///////////////////// Helper functions //////////////////////////

// determine if val is primitive value (true/false)
function isPrimitive(val) {
  return ["number", "boolean", "string", "undefined"].includes(typeof val);
}

// determine if val is object value (true/false)
function isObject(val) {
  return typeof val === "object";
}



// Helper method added to Object prototype to determine equality
// Example usage:
//
// const obj = { name: "Pelle" age: 17 }
// obj.equals({ name: "Pelle", age: 17 }) => true
// obj.equals({ name: "Patrik", age: 18 }) => false
Object.prototype.equals = function (otherObj) {
  const thisKeys = Object.keys(this);
  const otherKeys = Object.keys(otherObj);
  if (thisKeys.length !== otherKeys.length) {
    return false;
  }
  for (let key of thisKeys) {
    const thisVal = this[key];
    const otherVal = otherObj[key];
    if (typeof thisVal !== "object") {
      if (thisVal !== otherVal) {
        return false;
      }
    } else {
      if (!thisVal.equals(otherVal)) {
        return false;
      }
    }
  }
  return true;
};

// Helper method added to Array prototype to determine if value exist in array
// Example usage:
//
// const arr = [{ age: 1 }, { age: 2 }]
// arr.contains({ age: 2 }) => true
// arr.contains({ age: 3 }) => false
Array.prototype.contains = function (value) {
  if (isObject(value) && value.length === undefined) {
    for (let i = 0; i < this.length; i++) {
      if (value.equals(this[i])) {
        // we found an equal element
        return true;
      }
    }
  }
  if (isPrimitive(value)) {
    return this.includes(value); // see if array has primitive value inside
  }
  return false;
};

///////////////////// DOM functions /////////////////////////////

// displays in DOM node announcer a text message and removes .hide
// class
function announce(message) {
  announcer.innerHTML = message;
  announcer.classList.remove("hide");
  //document.getElementById("displayText").innerHTML=Bolt Thrower;
  
  
  /* TODO */
}



// // clears DOM node announcer (removes innerHTML) and removes it
// by adding .hide class
function clearAnnounce() {
  announcer.innerHTML = "";
  announcer.classList.add("hide");
  /* TODO */
}

//clearAnnounce();

//displays in DOM node playerDisplay the current players turn
//


function displayTurn(player) {
  /* TODO */
  playerDisplay.innerHTML = player.mark;
  playerDisplay.classList.remove("player1");
  playerDisplay.classList.remove("player2");
  playerDisplay.classList.add(`player${player.mark}`)

}


displayTurn(player2);


// displays in DOM node playerDisplay the winner and loser of the game
function displayGameOver(winner, loser) {
  const winnerStr = `Player <span class="display-player player${winner.mark}">${winner.mark}</span>`;
  const loserStr = ` wins over player <span class="display-player player${loser.mark}">${loser.mark}</span>`;
  display.innerHTML = winnerStr + loserStr;
  announce("Game Over");
}

// given a tile (DOM node) returns that tiles row and col position in grid
// ex: <div class="tile" data-row="1" data-col="2"></div> => { row: 1, col: 2 }
function getCoordinates(tile) {
  const r = parseInt(tile.getAttribute("data-row")); //0
  const c = parseInt(tile.getAttribute("data-col"));
  return { row: r, col: c }
 
  

}

// const coord = getCoordinates(tiles[0]);
// console.log(coord);

// given a tile (DOM node) clears that tile in grid
// gets rid of .player1 and .player2 classes as well as clears innerHTML
function clearTile(tile) {
  tile.classList.remove(`player1`);
  tile.classList.remove(`player2`);
  tile.innerHTML = "";



  /* TODO */
}

//clearTile(tiles[0]);


// clears the whole grid of with help of clearTile
function clearGrid() {
  for (let i = 0; i < tiles.length; i++)
    clearTile(tiles[i])
}
  


// clears all coordinates of ship in grid
// (tip: use getCoordinates, contains and clearTile)
function removeShip(ship) {
  for (const tile of tiles) {
     const coord = getCoordinates(tile)
    if (ship.contains(coord)) { 
      clearTile(tile)
    }
  }
}
    
  
function hasLost(player) {
  

  if (player.hits >= player.ships) {
    return true
  }
  else return false
}
 

function isValidCoord(coord) {

  /* TODO */ //kolla typeof och jämför med "spelplan"
  // return (typeof coord.row === "number" && typeof coord.col === "number" && coord.row >= 0 && coord.row < rows && coord.col >= 0 && coord.col < cols)
   if (typeof coord.row === "number" && coord.row >= 0 && coord.row < rows && coord.col >= 0 && coord.col < cols) {
      return true
    } else {
      return false
    }
}

// given a tile an mark (1, 2 or X) adds the mark on the tile
function addMark(tile, mark) {
  tile.innerHTML = mark;
  if (mark === player1.mark || mark === player2.mark) {
    tile.classList.add(`player${mark}`);
  } else if (mark === "X") {
    tile.classList.add(`bom`);
  }
}

// displays an array of markers on the grid. The markers coorinates
// tells where to mark and the marker what to display on the grid
//
// Example input markers
// [{ row: 1, col: 2, marker: 1 }, { row: 1, col: 3, marker: "X" }]
//
// displays 1 on position (1, 2) and X on position (1, 3) in grid
// (tip: use addMark)
function displayMarkersOnGrid(markers) {
  tiles.forEach((tile) => {

    const { row, col } = getCoordinates(tile) 

    for (let marker of markers) {
      if (marker.row === row && marker.col === col) {
        addMark(tile, marker.mark);
      }
     }
  });
}

// given a player, display that players hits and boms array with help of
// displayMarkersOnGrid
function displayHitsAndBoms(player) {
  clearGrid();
  const markedHits = player.hits.map((coord) => ({
    ...coord,
    mark: player.mark,
  }));
  const markedBoms = player.boms.map((coord) => ({
    ...coord,
    mark: "X",
  }));
  displayMarkersOnGrid([...markedHits, ...markedBoms]);
}

function glowShip(ship, ms) {
  tiles
    .filter((tile) => {
      const tileCoord = getCoordinates(tile);
      return ship.contains(tileCoord);
    })
    .forEach((tile) => {
      tile.classList.add("glow");
      setTimeout(() => {
        tile.classList.remove("glow");
      }, ms);
    });
}

///////////////////// Initialize ships //////////////////////////

// determines if a ship is a valid or not considering length and coordinates
// Check test.js for specification of how it should work
function isValidShip(ship) {

  if (ship.length < 2 || ship.length > 5){
  return false
} else if (!ship.every(isValidCoord)) {
  return false
} else {
  const { row, col} = ship[0]
  return(ship.every((coord) => coord.row == row) || ship.every((coord) => coord.col === col))
}
}


// Ask both users for all their ships positions
//    player: one of the players
//    callback: function to be called when all ships have been placed by player
function initializeShips(player, callback) {
  let shipCount = 0;
  let currentShip = [];
  displayTurn(player);
  announce(`Choose your remaining ${nrOfShips} ships!`);

  // event listener function
  function handleTileClick(evt) {
    const tile = evt.target;
    const coords = getCoordinates(tile);
    currentShip.push(coords);
    addMark(tile, player.mark);
  }

  // event listener function
  function handleAddShipClick() {
    if (isValidShip(currentShip)) {
      // let the ship glow for 1 sec in grid to mark that it is added
      glowShip(currentShip, 1200);

      // register ship coordinates in players ships array
      player.ships = [...currentShip, ...player.ships];
      currentShip = []; // reset currentShip
      shipCount++; // increase count of ships
      announce(`Choose your remaining ${nrOfShips - shipCount} ships!`);

      // if all 5 ships have been registered
      if (shipCount === nrOfShips) {
        // recover grid and remove all added event listeners
        clearGrid();
        button.removeEventListener("click", handleAddShipClick);
        tiles.forEach((tile) =>
          tile.removeEventListener("click", handleTileClick)
        );
        callback(); // now we can execute the callback when button has been clicked for the last time
      }
    } else {
      alert(`
      * Ships must be straigh lines
      * Each ship must be larger than 2 coordinates
      * Each ship must not be longer than 5 coordinates
      `);
      removeShip(currentShip); // remove the last ship since it was not valid
      currentShip = []; // reset ship
    }
  }

  // add event listeners
  button.addEventListener("click", handleAddShipClick);
  tiles.forEach((tile) => tile.addEventListener("click", handleTileClick));
}

//////////////////////// Game loop ////////////////////////////////

// adds mark (1, 2 or X) to coordinate object { row, col } => { row, col, mark }
// Check test.js for specification of how it should work

function markCoord(coord, mark) {
  const Nycoord = { ...coord }
  Nycoord.mark = mark;
  return Nycoord;

  /* TODO */
}

// determines if player has lost (true/false)
// tip: check out player.ships and player.hits ;-)
// Check test.js for specification of how it should wor

// adds guess coordinates { row, col } to either players hits or boms array
// depending on whether it hit or missed any of the players ships coordinates
// Check test.js for specification of how it should work
  function registerHitOrBom(guess, player) {
  
  
    let isHit = false;

  // Loopa igenom spelarens skepp
  for (let i = 0; i < player.ships.length; i++) {
    
      if (guess.row === player.ships[i].row || guess.col === player.ships[i].row) {
        // Gissningen träffade ett skepp
        isHit = true;
        player.hits.push(guess);
        break; // Ingen anledning att fortsätta loopa om vi redan har en träff
      }
    }
 if (!isHit) {
    player.boms.push(guess);
  }
  }

// switch players object around so that
// { current: p1, enemy: p2 } => { current: p2, enemy: p1 }
// Check test.js for specification of how it should work
function switchPlayers(players) {
  /* TODO */    // Skapa ett nytt objekt med omvända värden för nycklarna 'current' och 'enemy'
    const switchedPlayers = {
      current: players.enemy,
      enemy: players.current
    };
  
    return switchedPlayers;
  }


let targetChoosen = false; // flag to determine if user has clicked at a tile

// event listener function for "Next player" button
function handleNextPlayerClick() {
  // if user has clicked tile allow to run next loop
  if (targetChoosen) {
    targetChoosen = false; // reset flag
    gameLoop(); // runs another turn of game loop
  } else {
    alert("You must choose a tile to shoot first");
  }
}

// stops game
function stopGame() {
  displayGameOver(players.current, players.enemy);
  button.innerHTML = "Restart";
  button.removeEventListener("click", handleNextPlayerClick);
  button.addEventListener("click", () => location.reload());
}

// event listener function for when tile is clicked by user
function handleTileClick(evt) {
  const guess = getCoordinates(evt.target); // what tile was clicked?
  registerHitOrBom(guess, players.enemy); // add guess to either enemy hits or boms array
  displayHitsAndBoms(players.enemy); // display all enemys hits and boms array
  // remove event listener from all tiles, so player cannot click any more tiles
  tiles.forEach((tile) => tile.removeEventListener("click", handleTileClick));
  if (hasLost(players.enemy)) {
    stopGame(); // current is winner, stop running game loop
  } else {
    players = switchPlayers(players);
    targetChoosen = true; // mark flag so that we know user has clicked on tile
  }
}

// game loop, main parts are
// * displays turn of current player
// * displays in grid enemys hits and boms,
// * adds evenlistener handleTileClick to each tile so that user kan guess
function gameLoop() {
  displayTurn(players.current);
  displayHitsAndBoms(players.enemy);
  // add event listeners
  tiles.forEach((tile) => tile.addEventListener("click", handleTileClick));
}

///////////////////// Game start //////////////////////////

function runGame() {
  // initializeShips uses a player object to set up all ships, and when done calls the callback
  // function given as second argument. We have to do this since the JavaScript engine is an
  // asynchrounous (i.e does not wait for a function to finish). To learn more check out this
  // video on youtube: "What the heck is the eventloop anyway?"
  initializeShips(player1, () => {
    initializeShips(player2, () => {
      button.innerHTML = "Next player";
      button.addEventListener("click", handleNextPlayerClick);
      clearAnnounce();
      gameLoop();
    });
  });
}

runGame();
