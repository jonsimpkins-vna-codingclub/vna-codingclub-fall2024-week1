/**
 * This file contains a bunch of helper methods.
 * 
 * These are things that help the examples work,
 * but you as a student aren't expected to modify.
 * 
 * If you're really interested, feel free to change
 * things here, and see what the result is.
 */

// Let's define the ID of the "main app" section
// on the page. You can find this in `index.html`
//
// The name is ALL_CAPITALIZED to let us know that
// we don't expect it to change.
let MAIN_APP_ID = 'main-app';

// Step 0 helper to say hello.
function sayHello() {
    let helloElement = document.createElement('div');
    helloElement.innerText = 'Hello World';
    helloElement.classList.add('hello-msg');

    let mainApp = document.getElementById(MAIN_APP_ID)
    mainApp.innerHTML = '';
    mainApp.appendChild(helloElement);
}


// Let's define what the ID of the section
// is for the mad libs section
let MAD_LIBS_SECTION_ID = 'mad-libs-section';

// Step 1 helper to add a "start" button.
function initStartBtn() {
    let startBtn = document.createElement('button');
    startBtn.innerText = 'Start Mad Libs';
    startBtn.classList.add('start-btn');
    // Tell the button that whenever a user clicks
    // it, call the "startMadLibs()" method.
    startBtn.onclick = startMadLibs;

    let mainApp = document.getElementById(MAIN_APP_ID)
    mainApp.innerHTML = '';
    mainApp.appendChild(startBtn);

    // Also add a blank section for the mad libs,
    // we'll erase that and re-fill every time
    // the user clicks the button.
    let madLibsSection = document.createElement('div');
    madLibsSection.classList.add('mad-libs-section');
    madLibsSection.id = MAD_LIBS_SECTION_ID;
    mainApp.appendChild(madLibsSection);
}

// Helper method called every time the user
// clicks the "start" button.
function startMadLibs() {

    // Start off clearing the section
    let madLibsSection = document.getElementById(MAD_LIBS_SECTION_ID);
    madLibsSection.innerHTML = '';

    // Split up the mad lib into lines,
    // so we can do a cool animation.
    let templateLines = getMadLibsTemplate().split('\n');

    showNextLine(madLibsSection, templateLines);
}

function showNextLine(madLibsSection, lines) {
    // Add a section for the next line
    let madLibsLine = document.createElement('div');
    madLibsLine.classList.add('mad-libs-line');
    madLibsSection.appendChild(madLibsLine);

    let wordsInLine = splitMadLibsTemplate(lines[0]);

    // Show all the words in the line, then draw the next line
    showNextWord(madLibsLine, wordsInLine, () => {
        if (lines.length == 1) {
            // That was the last line, all done!
            return;
        }

        let remainingLines = lines.slice(1);
        showNextLine(madLibsSection, remainingLines);
    });
}

// Helper method to show the next word in the list.
//
// This lets us sort of animate the words onto the page.
function showNextWord(madLibsSection, remainingWords, finalCallback) {
    // Create a span for the word
    let nextWord = document.createElement('span');
    nextWord.classList.add('mad-libs-word');

    let parsedWord = parseWordTextAndTooltip(remainingWords[0]);
    nextWord.innerText = parsedWord['text'];
    if (!!parsedWord['tooltip']) {
        nextWord.title = parsedWord['tooltip'];
        nextWord.classList.add('mad-lib-variable');

        if (!!parsedWord['missingValue']) {
            nextWord.classList.add('invalid');
            nextWord.onclick = () => {
                alert('Set the "' + parsedWord['tooltip'] + '" variable');
            };
        } else {
            nextWord.classList.add('valid');
        }
    }
    madLibsSection.appendChild(nextWord);

    // Wait 200 ms, to get an animated effect
    setTimeout(() => {

        if (remainingWords.length == 1) {
            // That was the last word! 
            // Return early.
            finalCallback();
            return;
        }

        // This makes a copy of the remaining words,
        // skipping the first one (since we just showed
        // that one).
        let newRemainingWords = remainingWords.slice(1);

        // Hey, the `showNextWord` method is calling
        // itself! This is called "Recursion", we'll
        // cover it later in the semester.
        showNextWord(madLibsSection, newRemainingWords, finalCallback);
    }, 200);
}

// Helper method to replace words in the Mad Lib
// with values from variables.
function parseWordTextAndTooltip(word) {
    // This is using regex
    // Regex can be really powerful for
    // finding common patterns in text,
    // we might cover it in the "one cool thing"
    // some week.
    let templateRegex = /{{([^}]+)}}/;

    let match = word.match(templateRegex);
    
    if (!match) {
        // Nope, just a normal word
        return {
            'text': word,
        };
    }

    let populatedVariable = null;
    let missingValue = false;
    try {
        populatedVariable = eval(match[1]);
    } catch (e) {
        console.log(e);
        alert(e);
    }

    if (populatedVariable == null || populatedVariable == undefined) {
        populatedVariable = '<null>';
        missingValue = true;
    }

    return {
        'text': populatedVariable,
        'tooltip': match[1],
        'missingValue': missingValue,
    };
}


// Helper method to split the mad libs string up into
// individual words we want to animate onto the screen
function splitMadLibsTemplate(madLibsTemplate) {
    // First, split on {{ }} using regex
    let initialSplit = madLibsTemplate.split(/({{[^}]+}})/)

    let finalSplit = [];
    // We'll cover for loops in a few weeks
    for (let i = 0; i < initialSplit.length; i++) {
        if (!initialSplit[i]) {
            // Empty word, skip
            continue;
        }

        if (initialSplit[i].startsWith('{{')) {
            // This is template bit, just add as-is
            finalSplit.push(initialSplit[i]);
        } else {
            // Might be a string with spaces, split on those spaces.
            finalSplit = finalSplit.concat(initialSplit[i].trim().split(' '));
        }
    }

    return finalSplit;
}


// Helper method to load the step 0 - step N scripts
// dynamically on the page, after the DOM is ready.
function documentReady() {
    for (let step = 0; step < 4; step++) {
        let scriptEl = document.createElement( 'script' );
        scriptEl.setAttribute( 'src', 'step_' + step + '.js' );
        document.body.appendChild( scriptEl );
    }
}


// Helpers for getting random values
function getRandomBoolean() {
    return Math.random() > 0.5;
}

function getRandomInteger() {
    return Math.round(Math.random * 10);
}

function getRandomString(stringList) {
    let randomIndex = Math.floor(Math.random() * stringList.length);
    return stringList[randomIndex];
}