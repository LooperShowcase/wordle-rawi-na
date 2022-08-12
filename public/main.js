/** @format */

let numbers_of_chars = 5;
let numbers_of_words = 6;

let gameDiv = document.getElementById("game");

console.log("We are here");
for (let i = 0; i < numbers_of_words; i++) {
  let wordDiv = document.createElement("div");
  wordDiv.className = "word";
  for (let j = 0; j < numbers_of_chars; j++) {
    let charDiv = document.createElement("div");
    charDiv.className = "letter";
    wordDiv.appendChild(charDiv);
  }
  gameDiv.appendChild(wordDiv);
}

let curWord = 0;
let curChar = 0;
document.addEventListener("keydown", async function (event) {
  let wordDiv = gameDiv.children[curWord];
  if (event.code == "Backspace") {
    let charToDel = wordDiv.children[curChar - 1];
    charToDel.innerHTML = "";
    curChar--;
  } else if (curChar < numbers_of_chars && isLetter(event.key)) {
    let charArr = wordDiv.children[curChar];
    charArr.innerHTML = event.key;
    curChar++;
  }
  if (curChar === 5 && event.code == "Enter") {
    const word = getCurrentWord();
    animateCSS(wordDiv, "shaKeY");
    const result = await (await fetch("/wordle/" + word)).json();
    for (let i = 0; i < result.length; i++) {
      wordDiv.children[i].style.background = result[i];
    }
    curWord++;
    curChar = 0;
  }
});

function getCurrentWord() {
  let word = "";
  let wordDiv = gameDiv.children[curWord];
  for (let i = 0; i < numbers_of_chars; i++) {
    let charDiv = wordDiv.children[i];
    word = word + charDiv.innerHTML;
  }
  return word;
}

function isLetter(str) {
  return str.length === 1 && str.match(/[a-z]/i);
}
const element = document.getElementById("my-element");

const animateCSS = (element, animation, prefix = "animate__") =>
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;

    node.classList.add(`${prefix}animated`, animationName);

    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve("Animation ended");
    }

    node.addEventListener("animationend", handleAnimationEnd, { once: true });
  });
