var sourceCode = ""
var sourceContainer, sourceElement, accessMessageElement;

var startIndex = 0;
var endIndex = 0;
var cursorChar = "|";

var locked = false;

const CHARS_PER_STROKE = 5;
const load_source_code = () => {
    var client = new XMLHttpRequest();
    client.open('GET', './code.txt');
    client.onreadystatechange = function () {
        sourceCode = client.responseText;
    }
    client.send();
}

const getElements = () => {
    sourceContainer = document.getElementById("container");
    sourceElement = document.getElementById("source");
    accessMessageElement = document.getElementById("access-msg")
}

const update_screen = () => {
    if (!locked) {
        endIndex += CHARS_PER_STROKE;
        sourceElement.textContent = sourceCode.substring(startIndex, endIndex);

        //scroll position
        window.scrollTo(0, sourceContainer.scrollHeight);

        //update_cursor
        sourceElement.textContent += cursorChar;

        // update access message
        if (endIndex !== 0 && endIndex % 300 === 0) {
            sourceContainer.classList.add('blurred')
            locked = true;
            accessMessageElement.classList.add("denied")
            accessMessageElement.textContent = "Access Denied"

        }
        if (endIndex !== 0 && endIndex % 750 === 0) {
            sourceContainer.classList.add('blurred')
            locked = true;
            accessMessageElement.classList.add("success")
            accessMessageElement.textContent = "Access Granted"
        }
    }

}

function update_cursor() {
    //var text = sourceElement.textContent;
    // var lastChar = text.charAt(text.length - 1);
    // if (lastChar === cursorChar) {
    //     sourceElement.textContent = text.substring(0, text.length - 1);
    // }
    // else {
    sourceElement.textContent += cursorChar;
    // }
}

const remove_message = () => {
    locked = false;
    accessMessageElement.removeAttribute('class')
    sourceContainer.removeAttribute('class')
}

const init = () => {
    load_source_code()
    getElements()
    window.setTimeout(update_cursor, 500);
}

init()

window.onkeydown = (e) => {
    if (e.key === "Escape")
        remove_message()
    else
        update_screen()
};
