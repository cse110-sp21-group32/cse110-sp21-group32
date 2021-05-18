// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;
let index = 1;
var form;

var bulletAddButton = document.getElementById("addBulletButton");
bulletAddButton.addEventListener('click', addBulletHandler);
function addBulletHandler() {
  setState("BulletEditor");

}

document.addEventListener('click', (e) => {
  var check = document.getElementsByClassName('bulletEditor')
  if (check.length != 0) {
    const searchModule = document.querySelector('bullet-editor-page');
    const searchModuleRoot = searchModule && searchModule.shadowRoot;
    form = searchModuleRoot.querySelector("form");
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      setState("backMain");
    });
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


