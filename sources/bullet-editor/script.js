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