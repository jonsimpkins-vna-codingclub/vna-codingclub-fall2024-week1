/**
 * This file contains a bunch of helper methods.
 * 
 * These are things that help the examples work,
 * but you as a a student aren't expected to modify.
 * 
 * If you're really interested, feel free to change
 * things here, and see what the result is.
 */

// Step 0 helper to say hello.
function sayHello() {
    let helloElement = document.createElement('div');
    helloElement.innerText = 'Hello World';
    helloElement.classList.add('hello-msg');

    let mainApp = document.getElementById('main-app')
    mainApp.innerHTML = '';
    mainApp.appendChild(helloElement);
}
