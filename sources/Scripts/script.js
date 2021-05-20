// script.js

import { router } from "./router.js"; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;
var form;

//Event handler for add button of new bullet entry
var bulletAddButton = document.getElementById("addBulletButton");
bulletAddButton.addEventListener("click", add_bullet_handler);
function add_bullet_handler() {
  setState("BulletEditor");
}

//Event handler for add button of new category entry
var cateAddButton = document.getElementById("addCateButton");
cateAddButton.addEventListener("click", add_cate_handler);
function add_cate_handler() {
  setState("CateEditor");
}

//Set the main page url when the page is loaded
addEventListener("DOMContentLoaded", () => {
  setState("backMain", false);
});

//Variables to prevent multiple submit fires from form 
var haveCalledSubmitBullet = 0;
var haveCalledSubmitCate = 0;

//Add event handler for each button in side category entry and bullet entry
document.addEventListener("click", (e) => {
  haveCalledSubmitBullet = 0;
  haveCalledSubmitCate = 0;


  //Action after leaving bullet editor
  var checkBullet = document.getElementsByClassName("bulletEditor");
  if (checkBullet.length != 0) {
    //Dive into the shadow root of bullet editor page
    const searchModule = document.querySelector("bullet-editor-page");
    const searchModuleRoot = searchModule && searchModule.shadowRoot;
    form = searchModuleRoot.querySelector("form");

    //Look for the submit event
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (haveCalledSubmitBullet == 1) {
        return;
      } else {
        haveCalledSubmitBullet = 1;
      }

      //Get values from input form
      let name = searchModuleRoot.getElementById("name").value;
      let description = searchModuleRoot.getElementById("description").value;
      let category = searchModuleRoot.getElementById("category").value;
      let type = searchModuleRoot.getElementById("type").value;
      let date = searchModuleRoot.getElementById("dueDate").value;

      //Go back to main page
      setState("backMain");

      //Add bullet to main page
      let newEntry = document.createElement("bullet-entry");
      let mainPane = document.querySelector(".jornalMainBox");
      let bullet = { title: name, description, category, type: type, date: date }
      newEntry.bullet = bullet;
      mainPane.appendChild(newEntry);

      //Add event listeners for the buttons inside the new added bullet
      detail_button_helper();
      edit_bullet_button_helper();
      complete_box_helper();
    });

  }

  //Action after leaving category editor
  var checkBullet = document.getElementsByClassName("cateEditor");
  if (checkBullet.length != 0) {
    const searchModule = document.querySelector("cate-editor-page");
    const searchModuleRoot = searchModule && searchModule.shadowRoot;

    //Look for the submit event
    form = searchModuleRoot.querySelector("form");
    form.addEventListener("submit", (e) => {
      if (haveCalledSubmitCate == 1) {
        return;
      } else {
        haveCalledSubmitCate = 1;
      }
      e.preventDefault();

      //Record the information from input 
      let tile = searchModuleRoot.getElementById("name").value;
      let color = searchModuleRoot.getElementById("color").value;
      let category = { title: tile, color }
      setState("backMain");

      //Add the information to the entry 
      let newEntry = document.createElement("category-entry");
      let mainPane = document.querySelector(".categoryBox");
      newEntry.category = category;

      //Add to main page
      mainPane.appendChild(newEntry);

      //Add handler to the editor button in category item entry 
      edit_category_button_helper();
    });
  }

  // Add eventListener for detial buttons of bullet 
  function detail_button_helper() {
    let checkBullet = document.querySelector("bullet-entry");
    if (checkBullet != null) {
      const searchModules = document.querySelectorAll("bullet-entry");
      //Only add event listeners to the newly added bullet
      let searchModule = searchModules.item(searchModules.length - 1);
      const searchModuleRoot = searchModule && searchModule.shadowRoot;
      let detailButton = searchModuleRoot.querySelector(".bulletDetailButton");

      //Add listeners
      detailButton.addEventListener("click", () => {
        var des = detailButton.parentElement.parentElement.querySelector(".des");

        // Toggle detial box
        if (des.style.display == "block") {
          des.style.display = "none";
        } else {
          des.style.display = "block";
        }

      });
    }
  }

  // Add eventListener for edit buttons of bullet
  function edit_bullet_button_helper() {
    let checkBullet = document.querySelector("bullet-entry");
    if (checkBullet != null) {

      const searchModules = document.querySelectorAll("bullet-entry");

      //Only add event listeners to the newly added bullet
      let searchModule = searchModules.item(searchModules.length - 1);
      const searchModuleRoot = searchModule && searchModule.shadowRoot;
      let detailButton = searchModuleRoot.querySelector(".editBulletButton");

      //Add listeners
      detailButton.addEventListener("click", () => {
        var des = detailButton.parentElement.parentElement.querySelector(".des").innerHTML;
        var title = detailButton.parentElement.querySelector(".title").innerHTML;
        var date = detailButton.parentElement.querySelector(".date").innerHTML;
        var category = detailButton.parentElement.querySelector(".category").innerHTML;
        var completedCheck = detailButton.parentElement.querySelector(".completedCheck").innerHTML;
        var type = detailButton.parentElement.querySelector(".type").innerHTML;
        let bullet = {
          title,
          category: category, type: type, date: date,
          completedCheck, description: des
        };

        //Go to editor page with the current bullet information
        setState("BulletEditor", bullet);

        //Remove the orginal bullet 
        //Not optimal solution
        detailButton.parentElement.parentElement.remove();
      });
    }
  }

  // Add eventListener for edit buttons of bullet
  function complete_box_helper() {
    let checkBullet = document.querySelector("bullet-entry");
    if (checkBullet != null) {

      const searchModules = document.querySelectorAll("bullet-entry");

      //Only add event listeners to the newly added bullet
      let searchModule = searchModules.item(searchModules.length - 1);
      const searchModuleRoot = searchModule && searchModule.shadowRoot;
      let completeBox = searchModuleRoot.querySelector(".checkbox");

      //Update the inner hidden html element when toggle the check box
      completeBox.addEventListener("change", () => {
        if (completeBox.checked) {
          completeBox.parentElement.querySelector(".completedCheck").innerHTML = 1;
        } else {
          completeBox.parentElement.querySelector(".completedCheck").innerHTML = 0;
        }
      });
    }
  }

  // Add eventListener for edit buttons of category
  function edit_category_button_helper() {
    let checkCate = document.querySelector("category-entry");
    if (checkCate != null) {

      const searchModules = document.querySelectorAll("category-entry");

      //Only add listener to the newly added category entry
      let searchModule = searchModules.item(searchModules.length - 1);
      const searchModuleRoot = searchModule && searchModule.shadowRoot;
      
      //Locate the button
      let detailButton = searchModuleRoot.querySelector(".CateButton");
      detailButton.addEventListener("click", () => {
        //Record information of the current category
        var title = detailButton.parentElement.querySelector(".title").innerHTML;
        var color = detailButton.parentElement.querySelector(".color").innerHTML;;
        let category = {
          title,
          color: color
        };

        //Go to category editor page
        setState("CateEditor", category);
        
        //Remove the old category entry
        //Not optimal 
        detailButton.parentElement.parentElement.remove();
      });
    }
  }

});
