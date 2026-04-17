function changeText(selector, newText) {
    var element = document.querySelector(selector);
    element.textContent = newText;
}

function changeHTML(selector, newHTML) {
    var element = document.querySelector(selector);
    element.innerHTML = newHTML;
}
function updateElement(selector, text, color) {
    var element = document.querySelector(selector);
    element.innerHTML = text;
    element.style.color = color;
}

// 기존 예제 실행
changeText("#greeting", "Welcome to class!");
changeText("#counter", "Count: 42");
changeHTML("#bio", "My name is <strong>Hanjun</strong> and I study <em>Communication design</em>.");

// 과제 실행
updateElement("#greeting", "Hello <strong>again</strong>!", "blue");