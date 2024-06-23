// letters

const letters = "abcdefghijllmnopqrstuvwxyz";

//Get Array From Letters

let lettersArray = Array.from(letters);

//Select letters container

let lettersContainer = document.querySelector(".letters");

// Generate Letters

lettersArray.forEach((letter) => {
  // Create Span

  let span = document.createElement("span");

  // Create letter Text Node

  let theLetter = document.createTextNode(letter);

  // Append the letter to span

  span.appendChild(theLetter);

  // add Class On Span

  span.className = "letter-box";

  // Append span to the letters Container

  lettersContainer.appendChild(span);
});

/* ##########################################  */

// object of Words + Categories

// const words = {
//   programming: [
//     "php",
//     "javascript",
//     "go",
//     "scala",
//     "fortran",
//     "r",
//     "mysql",
//     "python",
//   ],
//   movies: [
//     "Prestige",
//     "Inception",
//     "Parasite",
//     "Interstellar",
//     "Whiplash",
//     "Memento",
//     "Coco",
//     "Up",
//   ],
//   people: [
//     "Albert Einstein",
//     "Hitchcock",
//     "Alexander",
//     "Cleopatra",
//     "Mahatma Ghandi",
//   ],
//   countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"],
// };

let myRequest = new XMLHttpRequest();

myRequest.open("GET", "words.json");

myRequest.send();

myRequest.onreadystatechange = function () {
  if (this.readyState === 4 && this.status === 200) {
    try {
      const lettersToChooseFrom = JSON.parse(myRequest.responseText);


// Get Random Property

let allKeys = Object.keys(lettersToChooseFrom);
// random number depend on keys lenght
console.log(allKeys)

let randomPropNumber = Math.floor(Math.random() * allKeys.length); // number of properties 0 for proggramming

/* Math.random() generates a random floating-point number between 0 and 1. */

// category
let randomPropName = allKeys[randomPropNumber]; //like programming

let randomPropValue = lettersToChooseFrom[randomPropName]; // like array of programming

// Random Number Depend On Words
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length); // like lenght of array of programming

//The chosen word
let randomValueValue = randomPropValue[randomValueNumber]; // random value like js php in a random key like programming in the object words

// set category info
document.querySelector(".game-info .category span").innerHTML = randomPropName;

// Select Letters Guess Element
let lettersGuessContainer = document.querySelector(".letters-guess");

// Convert Chosen word to array

let lettersAndSpace = Array.from(randomValueValue);

// Create Spans Depend On Word

lettersAndSpace.forEach((letter) => {
  // Create Empty Span

  let emptySpan = document.createElement("span");
  //if letter is space

  if (letter === " ") {
    //Add class To The span

    emptySpan.className = "with-space";
  }

  // Append Span to the letters Guess Container
  lettersGuessContainer.appendChild(emptySpan);
});

// Select Guess Spans
let guessSpans = document.querySelectorAll(".letters-guess span");

//Set Wrong Attempts
let wrongAttempts = 0;

//Set right Attempts
let trueAttempts = 0;

//Select the Draw Elememt
let theDraw = document.querySelector(".hangman-draw");

// handleClicking on letters
document.addEventListener("click", (e) => {
  // Set The Choose Status
  let theStatus = false;

  if (e.target.className === "letter-box") {
    e.target.classList.add("clicked");

    // get Clicked letter
    let theClickedLetter = e.target.innerHTML.toLowerCase();
    // the chosen Word  lettersAndSpace

    let theChosenWord = Array.from(randomValueValue.toLowerCase());

    theChosenWord.forEach((wordLetterChosen, wordIndex, ArrayChosenWord) => {
      // if the clicked letter equals to one of the chosen word letter
      if (theClickedLetter === wordLetterChosen) {
        // Set Status To Correct
        theStatus = true;

        // Loop  On All Guess Spans
        guessSpans.forEach((span, spanIndex, array) => {
          if (wordIndex === spanIndex) {
            span.innerHTML = theClickedLetter;
trueAttempts++;
          }

        });

        /* ⁡⁣⁢⁣Focus on succes Condition⁡ */
        if (trueAttempts <= (ArrayChosenWord.length)  && trueAttempts > ArrayChosenWord.length-1) {
          succesGame();
          lettersContainer.classList.add("finished");
        }
        // } else {
        //   /* Cause u are insode loop when u type a false value it will be printing false or do the incorrect efect as mutch ass the chosen word lenght  */
        //    theStatus =false;
        //    console.log(theStatus)
      }
    });

    // Outside The the chosen word loop

    // if letter is wrong
    if (theStatus !== true) {
      // increase the wrong Attempts
      wrongAttempts++;

      // Add Class Wrong on the Draw Element
      theDraw.classList.add(`wrong-${wrongAttempts}`);

      // Play Fail Sound
      document.getElementById("fail").play();

      if (wrongAttempts === 8) {
        endGame();

        lettersContainer.classList.add("finished");
      }
    } else {
      // play success Sound
      document.getElementById("success").play();
    }
  }
});

// End Game Function
function endGame() {
  Swal.fire({
    title: "You lose!",
    text: "reload the page to play again ",
    icon: "error",
    confirmButtonColor: "#009688",
  });
}
//Succes Game Function
function succesGame() {
  Swal.fire({
    title: "You win!",
    text: "reload the page to play again",
    icon: "success",
    confirmButtonColor: "#009688",
  });

}
function isNotDivEmpty(divElement) {
  // Get a list of all child elements of the div element
  const childElements = divElement.children;

  // Iterate over the list of child elements and check if each element is empty
  for (const childElement of childElements) {
    if (childElement.textContent.trim() === " ") {
      return false;
    }
  }

  // If all of the child elements are not empty, return true
  return true;
}

} catch(error) {
    }
  }
}