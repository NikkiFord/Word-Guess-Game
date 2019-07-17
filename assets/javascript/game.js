

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
        "Asian Semi-longhair",
        "Balinese",
        "Bambino",
        "Bengal",
        "Birman",
        "Bombay",
        "Brazilian Shorthair",
        "British Semi-longhair",
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
        "Persian (Modern Persian Cat)",
        "Persian (Traditional Persian Cat)",
        "Peterbald",
        "Pixie-bob",
        "Raas",
        "Ragamuffin",
        "Ragdoll",
        "Russian Blue",
        "Russian White, Black and Tabby",
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
    var matched = false;
    for (var i = 0; i < currentWord.length; i++) {
        var letter = currentWord[i];

        if (letter === event.key) {
            correctLetters.push(letter);
            matched = true;
        }
    }
    if (matched === false) {
        wrongLetters.push(event.key);
        guessesRemaining--;
        if (guessesRemaining === 0) {
            alert("You Lost!");
            newGame();
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
    var lettersGuessedDiv = document.getElementById("lettersGuessed");

    winsDiv.textContent = wins;

    var displayWord = "";
    for (var currentWordIndex = 0; currentWordIndex < currentWord.length; currentWordIndex++) {
        var currentWordLetter = currentWord[currentWordIndex];
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

    currentWordDiv.textContent = displayWord;
}

