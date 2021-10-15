function tableCreate() {
  let body = document.body;
  let tbl = document.createElement("table");

  for (let i = 0; i < 20; i++) {
    let tr = tbl.insertRow();
    for (var j = 0; j < 20; j++) {
      if (i == 20 && j == 20) {
        break;
      } else {
        let td = tr.insertCell();

        td.innerHTML = "<div draggable = 'true' class = 'myDiv' ></div>";
      }
    }
  }
  body.appendChild(tbl);
}
tableCreate();

handleClick = (e) => {
  console.log(e.target);
};

const timeClick = () => {
  document.querySelectorAll("td").forEach((cell) => {
    cell.addEventListener("click", handleClick, false);
  });
};

const timeBody = () => {
  document
    .querySelectorAll("body")[0]
    .addEventListener("click", handleClick, false);
};

const checkTime = () => {
  let t1 = performance.now();
  timeClick();
  let t2 = performance.now();
  console(t2 - t1);

  t1 = performance.now();
  timeBody();
  t2 = performance.now();
  console(t2 - t1);
};

checkTime()

let dragAndDrop = (() => {
  let myX = "";
  let myY = "";
  let whichCell = "";

  moveStart = (e) => {
    whichCell = e.target;
    myX = e.offSetX === undefined ? e.layerX : e.offSetX;
    myY = e.offSetY === undefined ? e.layerY : e.offSetY;
  };

  moveDragOver = (e) => {
    e.preventDefault();
  };

  moveDrop = (e) => {
    e.preventDefault();
    whichCell.style.left = e.pageX - 14 + "px";
    whichCell.style.top = e.pageY - 14 + "px";
    whichCell.style.zIndex = 10;
    whichCell.style.position = "absolute";
  };

  document
    .querySelector("body")
    .addEventListener("dragstart", moveStart, false);

  document
    .querySelector("body")
    .addEventListener("dragover", moveDragOver, false);
  document.querySelector("body").addEventListener("drop", moveDrop, false);
})();
