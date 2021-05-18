var submit_btn = document.getElementById("submit_btn").addEventListener("click", submit_data);

function submit_data() {
  var name = document.getElementById("name").value; 
  var color = document.getElementById("color").value; 
  alert("New category: " + name + " with color: " + color + " Submitted");
}

var reset_btn = document.getElementById("reset_btn").addEventListener("click", reset_data);

function reset_data() {
  alert("Category Reset");
}