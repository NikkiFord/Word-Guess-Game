

var wrongLetters, correctLetters, wins, guessesRemaining, currentWord, catBreeds;
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
    guessesRemaining = 7;
    currentWord = catBreeds[Math.floor(Math.random() * catBreeds.length)];
    updateHtml();
}

newGame();

document.onkeydown = function(event) {
    for (var correctLettersIndex = 0; correctLettersIndex < correctLetters.length; correctLettersIndex++) {
        var correctLettersLetter = correctLetters[correctLettersIndex];

        if (correctLettersLetter.toLowerCase() === event.key) {
            return;
        }

    }
    for (var wrongLettersIndex = 0; wrongLettersIndex < wrongLetters.length; wrongLettersIndex++) {
        var wrongLettersLetter = wrongLetters[wrongLettersIndex];

        if (wrongLettersLetter.toLowerCase() === event.key) {
            return;
        }
    }
    var matched = false;
    for (var currentWordIndex = 0; currentWordIndex < currentWord.length; currentWordIndex++) {
        var letter = currentWord[currentWordIndex];

        if (letter.toLowerCase() === event.key) {
            correctLetters.push(letter);
            matched = true;
            updateHtml();
        } 
    }
    if (matched === false) {
        wrongLetters.push(event.key);
        guessesRemaining--;
        if (guessesRemaining === 0) {
            alert("You Lost!");
            newGame();
        } else {
            updateHtml();
        }
    } else if (correctLetters.length === currentWord.length) {
        alert("You won!");
        wins++;
        newGame();
    }
};  

function updateHtml() {
    var winsDiv = document.getElementById("wins");
    var currentWordDiv = document.getElementById("currentWord");
    var guessesRemainingDiv = document.getElementById("guessesRemaining");
    var wrongLettersDiv = document.getElementById("wrongLetters");



    var displayWord = "";
    for (var currentWordIndex = 0; currentWordIndex < currentWord.length; currentWordIndex++) {
        var currentWordLetter = currentWord[currentWordIndex];
        if (currentWordLetter === "-") {
            displayWord += "-";
            continue;
        }
        var matched = false;
        for (var correctLettersIndex = 0; correctLettersIndex < correctLetters.length; correctLettersIndex++) {
            var correctLettersLetter = correctLetters[correctLettersIndex];
            if (currentWordLetter === correctLettersLetter) {
                displayWord += currentWordLetter;
                var matched = true;
                break;
            }
        }
        if (matched === false) {
            displayWord += "_";
        }
    }

    winsDiv.textContent = wins;
    currentWordDiv.textContent = displayWord;
    guessesRemainingDiv.textContent = guessesRemaining;
    wrongLettersDiv.textContent = wrongLetters.join(" ");
}

