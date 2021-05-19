// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;
let index = 1;
var form;
var button;

var bulletAddButton = document.getElementById("addBulletButton");
bulletAddButton.addEventListener('click', addBulletHandler);
function addBulletHandler() {
  setState("BulletEditor");
}

var cateAddButton = document.getElementById("addCateButton");
cateAddButton.addEventListener('click', addCateHandler);
function addCateHandler() {
  setState("CateEditor");
}


addEventListener('DOMContentLoaded', () => {
  setState("backMain", false);
});


var haveCalledSubmit = 0;
document.addEventListener('click', (e) => {
  haveCalledSubmit = 0;

  //Action only in bullet ediot page
  var checkBullet = document.getElementsByClassName('bulletEditor')
  if (checkBullet.length != 0) {
    const searchModule = document.querySelector('bullet-editor-page');
    const searchModuleRoot = searchModule && searchModule.shadowRoot;
    form = searchModuleRoot.querySelector("form");
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (haveCalledSubmit == 1) {
        return;
      } else {
        haveCalledSubmit = 1;
      }
      let name = searchModuleRoot.getElementById("name").value;
      let description = searchModuleRoot.getElementById("description").value;
      let category = searchModuleRoot.getElementById("category").value;
      let type = searchModuleRoot.getElementById("type").value;
      let date = searchModuleRoot.getElementById("dueDate").value;

      setState("backMain");
      let newEntry = document.createElement("bullet-entry");
      let mainPane = document.querySelector(".jornalMainBox");
      let bullet = { title: name, description: description, category: category, type: type, date: date }
      newEntry.bullet = bullet;
      mainPane.appendChild(newEntry);

      detailButtonHelper();
      editButtonHelper();
      completeBoxHelper();
    });

  }

  //Action only in category editor page
  var checkBullet = document.getElementsByClassName('cateEditor');
  if (checkBullet.length != 0) {
    const searchModule = document.querySelector('cate-editor-page');
    const searchModuleRoot = searchModule && searchModule.shadowRoot;
    form = searchModuleRoot.querySelector("form");
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      setState("backMain");
    });
  }

  // Add eventListener for detial buttons
  function detailButtonHelper() {
    let checkBullet = document.querySelector('bullet-entry');
    if (checkBullet != null) {

      const searchModules = document.querySelectorAll('bullet-entry');


      let searchModule = searchModules.item(searchModules.length-1);
      const searchModuleRoot = searchModule && searchModule.shadowRoot;
      let detailButton = searchModuleRoot.querySelector(".bulletDetailButton");
      detailButton.addEventListener('click', () => {
        var des = detailButton.parentElement.parentElement.querySelector(".des");
        if(des.style.display == "block"){
          des.style.display = "none";
        }else{
          des.style.display = "block";
        }
        
      });
    }
  }

  // Add eventListener for edit buttons
  function editButtonHelper() {
    let checkBullet = document.querySelector('bullet-entry');
    if (checkBullet != null) {

      const searchModules = document.querySelectorAll('bullet-entry');

      let searchModule = searchModules.item(searchModules.length-1);
      const searchModuleRoot = searchModule && searchModule.shadowRoot;
      let detailButton = searchModuleRoot.querySelector(".editBulletButton");
      detailButton.addEventListener('click', () => {
        var des = detailButton.parentElement.parentElement.querySelector(".des").innerHTML;
        var title = detailButton.parentElement.querySelector(".title").innerHTML;
        var date = detailButton.parentElement.querySelector(".date").innerHTML;
        var category = detailButton.parentElement.querySelector(".category").innerHTML;
        var completedCheck = detailButton.parentElement.querySelector(".completedCheck").innerHTML;
        var type = detailButton.parentElement.querySelector(".type").innerHTML;
        let bullet = {  title: title,
                        category: category, type: type, date: date,
                        completedCheck:completedCheck, description:des  };
        setState("BulletEditor",bullet);
        detailButton.parentElement.parentElement.remove();
      });
    }
  }  

    // Add eventListener for edit buttons
    function completeBoxHelper() {
      let checkBullet = document.querySelector('bullet-entry');
      if (checkBullet != null) {
  
        const searchModules = document.querySelectorAll('bullet-entry');
  
        let searchModule = searchModules.item(searchModules.length-1);
        const searchModuleRoot = searchModule && searchModule.shadowRoot;
        let completeBox = searchModuleRoot.querySelector(".checkbox");
        completeBox.addEventListener('change', () => {
          if(completeBox.checked){
            completeBox.parentElement.querySelector(".completedCheck").innerHTML = 1;
          }else{
            completeBox.parentElement.querySelector(".completedCheck").innerHTML = 0;
          }
        });
      }
    }  

});





// if(document.getElementsByClassName('bulletEditor')){
//   console.log("Check");
// }


// var backMain = document.querySelector("backMain");
// backMain.addEventListener('click', () => {
//   // setState("backMain");
//   console.log("Check");
// });


