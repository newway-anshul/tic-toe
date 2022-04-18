// Import stylesheets
console.clear();
import "./style.css";
export enum Player {
  First = "F",
  Last = "L",
}
export enum AllowedValues {
  X = "X",
  O = "O",
}
export interface Move {
  element: number;
  currentValue: AllowedValues | "";
  winninPos: Array<number[]>;
}

const app = document.querySelector("div#app");
const FILLED = "box-filled";
let CURRENT_PLAYER: Player = Player.First;
let totalMoves: number = 0;
let Moves: Move[] = [
  {
    element: 1,
    currentValue: "",
    winninPos: [
      [1, 2, 3],
      [1, 4, 7],
      [1, 5, 9],
    ],
  },
  {
    element: 2,
    currentValue: "",
    winninPos: [
      [1, 2, 3],
      [2, 5, 8],
    ],
  },
  {
    element: 3,
    currentValue: "",
    winninPos: [
      [1, 2, 3],
      [3, 6, 9],
      [3, 5, 7],
    ],
  },
  {
    element: 4,
    currentValue: "",
    winninPos: [
      [4, 5, 6],
      [1, 4, 7],
    ],
  },
  {
    element: 5,
    currentValue: "",
    winninPos: [
      [2, 5, 8],
      [4, 5, 6],
      [1, 5, 9],
      [3, 5, 7],
    ],
  },
  {
    element: 6,
    currentValue: "",
    winninPos: [
      [3, 6, 9],
      [4, 5, 6],
    ],
  },
  {
    element: 7,
    currentValue: "",
    winninPos: [
      [7, 8, 9],
      [7, 5, 3],
      [1, 4, 7],
    ],
  },
  {
    element: 8,
    currentValue: "",
    winninPos: [
      [2, 5, 8],
      [7, 8, 9],
    ],
  },
  {
    element: 9,
    currentValue: "",
    winninPos: [
      [1, 5, 9],
      [3, 6, 9],
      [7, 8, 9],
    ],
  },
];
function reset() {
  let allBox = app.querySelectorAll("div.box");
  allBox.forEach((box) => {
    box.removeAttribute("class");
    box.classList.add("box");
    box.textContent = "";
  });
  Moves.forEach((move: Move) => {
    move.currentValue = "";
  });
  totalMoves = 0;
  CURRENT_PLAYER = Player.First;
}
(window as any).getMoves = () => {
  console.log(`total moves are ${totalMoves}`);
  console.log(Moves);
};
app.addEventListener("click", (e: PointerEvent) => {
  boxClicked(e);
});
app.nextElementSibling
  .querySelector("button.btn")
  .addEventListener("click", reset);

function boxClicked(e: PointerEvent) {
  let box = e.target as HTMLElement;
  let key = +box.getAttribute("key");
  let output;
  let filledValue: AllowedValues =
    CURRENT_PLAYER == Player.First ? AllowedValues.X : AllowedValues.O;
  if (box.classList.contains(FILLED)) {
  } else {
    box.textContent = filledValue;
    box.classList.add(FILLED);
    updateMoves(key, filledValue);
  }
  CURRENT_PLAYER = CURRENT_PLAYER == Player.First ? Player.Last : Player.First;
  totalMoves += 1;
  if (totalMoves >= 5) {
    output = (window as any).makeCalculation();
    if (output.won) {
      (output.winningArry as Array<number>).forEach((number) => {
        app.querySelector(`div[key="${number}"]`).classList.add("won");
      });
    }
  }
}
function updateMoves(key: number, value: AllowedValues) {
  let move: Move = Moves[key - 1];
  move.currentValue = value;
}
function getFilledValues(positions: number[]) {
  let values = "";
  positions.forEach((value) => {
    values += Moves[value - 1].currentValue;
  });
  return values.trim();
}
(window as any).makeCalculation = () => {
  let won: boolean;
  let winningArry: Array<number>[];
  Moves.find((move: Move) => {
    if (move.currentValue.length == 0) {
      return false;
    }
    let isOk = move.winninPos.find((v: Array<number>) => {
      let values = getFilledValues(v);
      return values == "XXX" || values == "OOO";
    });
    if (!!isOk) {
      winningArry = isOk as any;
      won = !!isOk;
    }
    return !!isOk;
  });
  return {
    won,
    winningArry,
  };
};
