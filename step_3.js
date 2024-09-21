// Step 3: Ok, time to have some fun with this!
//
// Feel free to change the "getMadLibsTemplate()"
// method to return whatever you want.
//
//
// If the template says 'Hello {{myVariable}}',
// then you'll need to do something like:
let myVariable = 'something!';
// to make the template work.
//
// If you want, we've also provided a few methods
// to help you randomize the result.
//
// getRandomBoolean() will return a random true/false value
let myRandomBoolean = getRandomBoolean();
//
// getRandomInteger() will return a random integer between 0 and 10
let myRandomInt = getRandomInteger();
//
// getRandomString(['foo', 'bar', 'baz']) will return a random word
//      from the list of words
let myRandomWord = getRandomString(['foo', 'bar', 'baz']);

// This is the method that has been providing the Mad Libs
// template the whole time. If you change the template, it
// will change the message printed on the screen when users
// click the "start" button.
function getMadLibsTemplate() {
    let template = 'My name is {{name}}! I am feeling {{feeling}} about learning to code.';

    if (showSimpleMathProblem == true) {
        template += '\n';
        template += 'Let\'s do a simple math problem:\n';
        template += 'x1 = {{x1}}\n';
        template += 'y1 = {{y1}}\n';
        template += 'so x1 + y1 = {{z1}}'
    }

    if (showHardMathProblem == true) {
        template += '\n';
        template += 'What about a hard math problem?\n';
        template += 'x2 = {{x2}}\n';
        template += 'y2 = {{y2}}\n';
        template += 'so x2 / y2 = {{z2}}'
    }

    return template;
}