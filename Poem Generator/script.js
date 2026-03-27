const writing1 = "a quiet garden under a wide blue sky, flowers breathing in silence";
const writing2 = "soft white blossoms floating in shadow, delicate and still";
const writing3 = "the city far away, framed by wind and light, almost unreachable";

const phrases = [
  "quiet garden under blue sky",
  "flowers breathing in silence",
  "soft white blossoms in shadow",
  "delicate and still",
  "city far away in light"
];

let counter = 0;

const bodyTag = document.querySelector("body");
const pTag = document.querySelector("#poem");


bodyTag.addEventListener("click", function () {
  pTag.classList.add("fade");

  setTimeout(function () {
    pTag.innerHTML = phrases[counter];

    counter = counter + 1;

    if (counter > phrases.length - 1) {
      counter = 0;
    }

    pTag.classList.remove("fade");
  }, 200);
});
