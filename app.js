let board = document.querySelector(".board");
let players = document.querySelectorAll('.score span');
let cursor = document.querySelector('.cursor');
let r = document.querySelector(":root");
let rs = getComputedStyle(r);
let sizeDivision;
let smallPlan = [
  [" ", " ", " ", " ", " ", "H", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", "V", "b", "V", " ", " ", " ", " "],
  [" ", " ", " ", "H", " ", "h", " ", "H", " ", " ", " "],
  [" ", " ", "V", "b", "v", "b", "v", "b", "V", " ", " "],
  [" ", "H", " ", "h", " ", "h", " ", "h", " ", "H", " "],
  ["V", "b", "v", "b", "v", "b", "v", "b", "v", "b", "V"],
  [" ", "H", " ", "h", " ", "h", " ", "h", " ", "H", " "],
  [" ", " ", "V", "b", "v", "b", "v", "b", "V", " ", " "],
  [" ", " ", " ", "H", " ", "h", " ", "H", " ", " ", " "],
  [" ", " ", " ", " ", "V", "b", "V", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", "H", " ", " ", " ", " ", " "],
];

let bigPlan = [
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", "H", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", "V", "b", "V", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", "H", " ", "h", " ", "H", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", "V", "b", "v", "b", "v", "b", "V", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", "H", " ", "h", " ", "h", " ", "h", " ", "H", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", "V", "b", "v", "b", "v", "b", "v", "b", "v", "b", "V", " ", " ", " ", " "],
  [" ", " ", " ", "H", " ", "h", " ", "h", " ", "h", " ", "h", " ", "h", " ", "H", " ", " ", " "],
  [" ", " ", "V", "b", "v", "b", "v", "b", "v", "b", "v", "b", "v", "b", "v", "b", "V", " ", " "],
  [" ", "H", " ", "h", " ", "h", " ", "h", " ", "h", " ", "h", " ", "h", " ", "h", " ", "H", " "],
  ["V", "b", "v", "b", "v", "b", "v", "b", "v", "b", "v", "b", "v", "b", "v", "b", "v", "b", "V"],
  [" ", "H", " ", "h", " ", "h", " ", "h", " ", "h", " ", "h", " ", "h", " ", "h", " ", "H", " "],
  [" ", " ", "V", "b", "v", "b", "v", "b", "v", "b", "v", "b", "v", "b", "v", "b", "V", " ", " "],
  [" ", " ", " ", "H", " ", "h", " ", "h", " ", "h", " ", "h", " ", "h", " ", "H", " ", " ", " "],
  [" ", " ", " ", " ", "V", "b", "v", "b", "v", "b", "v", "b", "v", "b", "V", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", "H", " ", "h", " ", "h", " ", "h", " ", "H", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", "V", "b", "v", "b", "v", "b", "V", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", "H", " ", "h", " ", "H", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", "V", "b", "V", " ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " ", " ", "H", " ", " ", " ", " ", " ", " ", " ", " ", " "],
];

function boardSize(num){
  r.style.setProperty("--sizeDivision", `${num}`);
  sizeDivision = rs.getPropertyValue('--sizeDivision');
  thickness = num == 9 ? 7 : 10;
  r.style.setProperty("--sideThickness", `${thickness}px`)
}


let box,
    boxuid,
    sideh,
    sidehuid,
    sidev,
    sidevuid;

let renderBoard = (plan)=>{
    boardSize((plan[0].length - 1)/2);
    plan.map((row, index0) => {
      row.map((cell, index1) => {
        let condition1 = index0 % 2 == 0 ? index0 / 2 : (index0 - 1) / 2,
            condition2 = index1 % 2 == 0 ? index1 / 2 : (index1 - 1) / 2;
    
        // BOXES
        boxuid = `R${condition1}C${condition2}`;
        box = `<div class="box" data-box-name="${boxuid}" data-sides="0" 
        style="top:${condition1 * (board.clientWidth / +sizeDivision)}px;
        left:${condition2 * (board.clientHeight / +sizeDivision)}px;"></div>`;
    
        //HORIZONTAL SIDES
        sidehuid = `R${condition1}C${condition2}1${condition1 - 1 >= 0 ? `R${condition1 - 1}C${condition2}4` : ""}`;
    
        sideh =(checked,edges)=>{
          return `<div class='side sideh ${edges}' data-side-name="${sidehuid}" data-checked='${checked}' 
          style="top:${condition1 * (board.clientWidth / +sizeDivision) - thickness/2}px;
          left:${condition2 * (board.clientHeight / +sizeDivision)}px;"></div>`;
        } 
    
        //VERTICALE SIDES
        sidevuid = `R${condition1}C${condition2}3${condition2 - 1 >= 0 ? `R${condition1}C${condition2 - 1}2`:''}`;
    
        sidev = (checked,edges)=>{
          return `<div class='side sidev ${edges}' data-side-name="${sidevuid}" data-checked='${checked}' 
          style="top:${condition1 * (board.clientWidth / +sizeDivision)}px;
          left:${condition2 * (board.clientHeight / +sizeDivision) - thickness/2}px;"></div>`;
        }
    
    
        if (cell === "b") {
          board.innerHTML += box;
        } else if (cell === "h") {
          board.innerHTML += sideh("false",'');
        } else if (cell === "v") {
          board.innerHTML += sidev('false','');
        } else if (cell === "H"){
          board.innerHTML += sideh("true",'edges');
        } else if(cell === "V"){
          board.innerHTML += sidev('true','edges');
        }
      });
    });
  }
  
renderBoard(bigPlan);
  

// pieces of the game

let piece = (frontcolor,sidecolor)=>{
  return `
  <svg id="piece" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 -8 200 200" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" width="80%" height="80%">
  <g id="piece-g1" transform="translate(-150-162.939148)">
      <ellipse id="piece-ellipse1" rx="50" ry="50" transform="translate(250 274.105218)" fill="none" stroke="${sidecolor}" stroke-width="40" />
      <rect id="piece-rect1" width="100" height="130" rx="50" ry="50" transform="translate(200 195.93915)" fill="none" stroke="${sidecolor}" stroke-width="40" stroke-linecap="round" stroke-miterlimit="1" />
      <ellipse id="piece-copy-of-ellipse" rx="50" ry="50" transform="translate(250 245.93915)" fill="none" stroke="${frontcolor}" stroke-width="40" />
  </g>
  </svg>
  `
};


// boxes around the side
let boxes = document.querySelectorAll('.box'),
box1,
box2;

// players

let users = [{
  id: "player 1",
  name: "red",
  frontcolor: '#750000',
  sidecolor: '#400101',
  points: 0
},
{
  id: "player 2",
  name: "blue",
  frontcolor: '#00008f',
  sidecolor: '#00005a',
  points: 0
}
];
let user = 0;


//function to check the sides around the box

let relations = (boxname)=>{
  box1 = boxname.slice(0, 4);
  box2 = boxname.slice(5, 9);

  for (let x = 0; x < boxes.length; x++) {
    if (boxes[x].getAttribute('data-box-name') == box1) {
        boxes[x].dataset.sides = `${parseInt(boxes[x].getAttribute('data-sides'))+1}`;
        if (boxes[x].getAttribute('data-sides') == '4') {
            //fullBoxSound.play();
            users[user].points += 1;
            boxes[x].innerHTML = piece(users[user].frontcolor,users[user].sidecolor);
            ////////
            players[user].innerHTML = users[user].points;
        }
    } else if (boxes[x].getAttribute('data-box-name') == box2) {
      boxes[x].dataset.sides = `${parseInt(boxes[x].getAttribute('data-sides'))+1}`;
        if (boxes[x].getAttribute('data-sides') == '4') {
            //fullBoxSound.play();
            users[user].points += 1;
            boxes[x].innerHTML = piece(users[user].frontcolor,users[user].sidecolor);
            ////////
            players[user].innerHTML = users[user].points;
        }
    }
};
};

///// preseclect the edges ////
let edges = document.querySelectorAll('.edges');
edges.forEach(edge => {
  relations(edge.getAttribute('data-side-name'));
});

//// cursor colors /////
function cursorColors(playerColor, borderColor){
  r.style.setProperty('--playerColor', `${playerColor}`);
  r.style.setProperty('--borderColor', `${borderColor}`);
}


window.addEventListener('touchstart', (e)=>{
  if (e.target.className.includes("side") && e.target.getAttribute('data-checked') == "false"){
    e.target.classList.add(users[user].name);
    e.target.dataset.checked = "true";
    relations(e.target.getAttribute('data-side-name'));
    user == 1? user=0:user=1;
    cursorColors(users[user].sidecolor,users[user].frontcolor);
    console.log(e)
  }
});


/// dragable cursor ///
/* 
let mouseDown;

cursor.addEventListener("touchstart", () => {
    mouseDown = true;
    console.log(mouseDown)

    window.addEventListener("touchmove", (e) => {

        if (mouseDown == true) {
          console.log(e.touches[0].clientY)
            cursor.style.top = `${e.touches[0].clientY - (cursor.clientHeight/2)}px`;
            cursor.style.left = `${e.touches[0].clientX - (cursor.clientWidth/2)}px`;

        }
    })
})


window.addEventListener('touchend', () => {
  if (mouseDown == true) {
    mouseDown = false;
    console.log(mouseDown)
  }
}) */
