console.log("it works");
document.querySelector('.generate-story').addEventListener('click', function() {
  var noun = document.querySelector('.noun').value;
  var verb = document.querySelector('.verb').value;
  var adjective = document.querySelector('.adjective').value;
  var storyText = `The ${adjective} ${noun} decided to ${verb} at the worst possible time.`;
  document.querySelector('.story').textContent = storyText;
});
