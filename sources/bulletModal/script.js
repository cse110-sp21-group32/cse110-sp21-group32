var submit_btn = document.getElementById("submit_btn").addEventListener("click", submit_data);

function submit_data() {
  var name = document.getElementById("name").value; 
  var category = document.getElementById("category").value; 
  var type = document.getElementById("type").value; 
  var dueDate = document.getElementById("dueDate").value;
  var description = document.getElementById("description").value; 

  alert("Bullet named: " + name + ", with category: " + category + ", tpye: " + type + ", dueDate: " + dueDate + ", and description: " + description + " submitted");
}

var reset_btn = document.getElementById("reset_btn").addEventListener("click", reset_data);

function reset_data() {
  alert("Data Reset");
}

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}