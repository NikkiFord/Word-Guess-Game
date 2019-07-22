
//global variables
var wrongLetters, correctLetters, wins = 0, guessesRemaining, currentWord, catBreeds;

//function that sets global variables for a new game and updates HTML
function newGame() {
    catBreeds = [
        "Abyssinian",
        "Aegean",
        "American Curl",
        "American Bobtail",
        "American Shorthair",
        "American Wirehair",
        "Arabian Mau",
        "Australian Mist",
        "Asian",
        "Balinese",
        "Bambino",
        "Bengal",
        "Birman",
        "Bombay",
        "Brazilian Shorthair",
        "British Shorthair",
        "British Longhair",
        "Burmese",
        "Burmilla",
        "California Spangled",
        "Chantilly-Tiffany",
        "Chartreux",
        "Chausie",
        "Cheetoh",
        "Colorpoint Shorthair",
        "Cornish Rex",
        "Cymric",
        "Cyprus",
        "Devon Rex",
        "Donskoy",
        "Dragon Li",
        "Dwarf cat",
        "Egyptian Mau",
        "European Shorthair",
        "Exotic Shorthair",
        "Foldex",
        "German Rex",
        "Havana Brown",
        "Highlander",
        "Himalayan",
        "Japanese Bobtail",
        "Javanese",
        "Karelian Bobtail",
        "Khao Manee",
        "Korat",
        "Korean Bobtail",
        "Korn Ja",
        "Kurilian Bobtail",
        "LaPerm",
        "Lykoi",
        "Maine Coon",
        "Manx",
        "Mekong Bobtail",
        "Minskin",
        "Munchkin",
        "Nebelung",
        "Napoleon",
        "Norwegian Forest cat",
        "Ocicat",
        "Ojos Azules",
        "Oregon Rex",
        "Oriental Bicolor",
        "Oriental Shorthair",
        "Oriental Longhair",
        "PerFold",
        "Persian",
        "Peterbald",
        "Pixie-bob",
        "Raas",
        "Ragamuffin",
        "Ragdoll",
        "Russian Blue",
        "Russian White",
        "Sam Sawet",
        "Savannah",
        "Scottish Fold",
        "Selkirk Rex",
        "Serengeti",
        "Serrade petit",
        "Siamese",
        "Siberian",
        "Singapura",
        "Snowshoe",
        "Sokoke",
        "Somali",
        "Sphynx",
        "Suphalak",
        "Thai",
        "Thai Lilac",
        "Tonkinese",
        "Toyger",
        "Turkish Angora",
        "Turkish Van",
        "Ukrainian Levkoy"
    ];

    wrongLetters = [];
    correctLetters = [];
    wins = 0;
    guessesRemaining = 10;
    currentWord = catBreeds[Math.floor(Math.random() * catBreeds.length)];
    updateHtml();
}

//sets up very first game
newGame();

//when the user hit a key, it compares to the correctword variable, and records guess as correct or wrong, accordingly.
//did names for "index", because I was getting confused with just single letters
document.onkeypress = function (event) {
    var key = event.key.toLowerCase();
    //if they guess a letter they already have gotten correct, it leaves the function, so they can't guess the same letter twice
    for (var correctLettersIndex = 0; correctLettersIndex < correctLetters.length; correctLettersIndex++) {
        var correctLettersLetter = correctLetters[correctLettersIndex];

        if (correctLettersLetter.toLowerCase() === key) {
            return;
        }

    }
    //same as above, but checks it against letters they have already guessed wrong
    for (var wrongLettersIndex = 0; wrongLettersIndex < wrongLetters.length; wrongLettersIndex++) {
        var wrongLettersLetter = wrongLetters[wrongLettersIndex];

        if (wrongLettersLetter.toLowerCase() === key) {
            return;
        }
    }
    var matched = false;
    //checks the user's guess against the current word
    for (var currentWordIndex = 0; currentWordIndex < currentWord.length; currentWordIndex++) {
        var letter = currentWord[currentWordIndex];

        //if the user guesses a right letter in the word, it adds it to the correct guesses array
        if (letter.toLowerCase() === key) {
            correctLetters.push(letter);
            matched = true;
            updateHtml();
        }
    }

    var currentWordLength = currentWord.length;
    //calculates the word length without spaces or hyphens, so the user doesn't have to guess them
    for (var currentWordIndex = 0; currentWordIndex < currentWord.length; currentWordIndex++) {
        var currentWordLetter = currentWord[currentWordIndex];
        if (currentWordLetter === "-") {
            currentWordLength--;
        } else if (currentWordLetter === " ") {
            currentWordLength--;
        }
    }

    //if they guess a wrong letter, it adds to the wrongLetters array, and takes away a guess
    if (matched === false) {
        wrongLetters.push(key);
        guessesRemaining--;
        //if they guess wrong and there is no more guessesRemaining, they will get an alert that they lost, and the game resets
        if (guessesRemaining === 0) {
            alert("You Lost! The word was: " + currentWord);
            newGame();
        } else {
            updateHtml();
        }
    } 
    //if they guess all of the letters in the currentword, then they get an alert saying they won, and resets the game
    //had to add a timeout function, because the alert was popping up before the UI could update to show the last letter
    else if (correctLetters.length === currentWordLength) {
        updateHtml();
        setTimeout(function () {
            alert("You won!");
            wins++;
            newGame();
        }, 300);
    }
};

//this function updates the HTML data on the page, based on the user's guesses
function updateHtml() {
    var winsDiv = document.getElementById("wins");
    var displayWordDiv = document.getElementById("displayWord");
    var guessesRemainingDiv = document.getElementById("guessesRemaining");
    var wrongLettersDiv = document.getElementById("wrongLetters");



    var displayWord = "";
    //this builds the string of the currentword to display to the user
    for (var currentWordIndex = 0; currentWordIndex < currentWord.length; currentWordIndex++) {
        var currentWordLetter = currentWord[currentWordIndex];
        //this shows the user the hyphen or space, by adding it to the string displayword, and jumping to the next iteration of the loop, by adding "continue"
        if (currentWordLetter === "-") {
            displayWord += "-";
            continue;
        } else if (currentWordLetter === " ") {
            displayWord += " ";
            continue;
        }
        var matched = false;
        //if the current letter of the word exists in the array of correct letters, then add that letter to the display word
        for (var correctLettersIndex = 0; correctLettersIndex < correctLetters.length; correctLettersIndex++) {
            var correctLettersLetter = correctLetters[correctLettersIndex];
            if (currentWordLetter === correctLettersLetter) {
                displayWord += currentWordLetter;
                var matched = true;
                break;
            }
        }
        //otherwise, add an underscore to the display word. Will add the underscores at the beginning of each game too
        if (matched === false) {
            displayWord += "_";
        }
    }

    //sets the HTML to display our variables
    winsDiv.textContent = wins;
    displayWordDiv.textContent = displayWord;
    guessesRemainingDiv.textContent = guessesRemaining;
    wrongLettersDiv.textContent = wrongLetters.join(" ");
}

