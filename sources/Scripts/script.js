// script.js
import * as storage from './storage.js';
import { router } from "./router.js"; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Use to handle editBullet and editCategory events
var lastReferencedElement;

// We can move these to other event listener if we want
var bulletAddButton = document.getElementById("add-bullet-button");
bulletAddButton.addEventListener("click", addBulletHandler);
function addBulletHandler() {
  setState("BulletEditor", null, storage.categoryArr);
}
var cateAddButton = document.getElementById("add-cate-button");
cateAddButton.addEventListener("click", addCateHandler);
function addCateHandler() {
  setState("CateEditor");
}

// TODO build from local storage
addEventListener("DOMContentLoaded", () => {
  setState("backMain", false);
  storage.buildDefault();
});

// Will check for click events in entire document
// Note that submit events also register as clicks
document.addEventListener("click", (e) => {
  // composedPath allows us to interact with shadowDom elements
  console.log(e.composedPath());

  // Click showDetail button
  if (e.composedPath()[0].className == "bullet-button bullet-detail-button") {
    showDetail(e.composedPath()[0]);
  }

  // Click editBullet button
  if (e.composedPath()[0].className == "bullet-button edit-bullet-button") {
    let bulletObj = e.composedPath()[0].getRootNode().host
    setState("BulletEditor", bulletObj, storage.categoryArr);
    lastReferencedElement = bulletObj;
  }
  // Click editCategory button
  if (e.composedPath()[0].className == "cate-button") {
    let categoryObj = e.composedPath()[0].getRootNode().host;
    setState("CateEditor", categoryObj, null);
    lastReferencedElement = categoryObj;
  }

  // Submit bullet editor event
  if (e.composedPath()[0].id == "bulletSubmit") {
    submitBullet(e.composedPath()[1]);
  }
  // Submit category editor event
  if (e.composedPath()[0].id == "cate-submit") {
    submitCategory(e.composedPath()[1]);
  }

  // Delete bullet event
  if (e.composedPath()[0].id == "bullet-delete") {
    deleteBullet(e.composedPath()[0].getRootNode().host);
  }
  // Delete category event
  if (e.composedPath()[0].id == "cate-delete") {
    deleteCategory(e.composedPath()[0].getRootNode().host);
  }

  // Close bulletEditor or categoryEditor modal
  if (
    e.composedPath()[0].className == "modal" ||
    e.composedPath()[0].className == "close"
  ) {
    setState("backMain");
  }

  // Check category event
  if (e.composedPath()[0].id == "category-check") {
    let categoryElement = e.composedPath()[0].getRootNode().host;
    storage.updateActiveCategories(categoryElement);
  }
  // Select date event
  if (e.composedPath()[0].className == "date") {
    let dateElement = e.composedPath()[0].getRootNode().host;
    storage.updateActiveDates(dateElement);
  }
});

// Helper function for bullet showDetail button
function showDetail(detailButton) {
  var des = detailButton.getRootNode().querySelector(".des");
  if (des.style.display == "block") {
    des.style.display = "none";
  } else {
    des.style.display = "block";
  }
}

// Helper function for submitting new/edited bullet entry
function submitBullet(formObj) {
  let bulletEdit = formObj.getRootNode().host;
  setState("backMain");
  // If not called from editBullet, create new bullet
  if(!bulletEdit.old){
    let newEntry = document.createElement("bullet-entry");
    let mainPane = document.querySelector(".entry-list");
    newEntry.bullet = bulletEdit.bullet;
    mainPane.appendChild(newEntry);
    // add bullet storage
    storage.addBullet(newEntry);
    // TODO maybe shouldnt always be appended??
  }
  // Else if called from editBullet, edit 
  else{
    storage.editBullet(bulletEdit.bullet, lastReferencedElement.bullet);
    lastReferencedElement.bullet = bulletEdit.bullet;
  }
}

// Helper function for submitting new/edited category entry
function submitCategory(formObj) {
  let categoryEdit = formObj.getRootNode().host;
  setState("backMain");

  // If not called from editBullet, create new bullet
  if(!categoryEdit.old){
    let newEntry = document.createElement("category-entry");
    let mainPane = document.querySelector(".category-box");
    newEntry.category = categoryEdit.category;
    mainPane.appendChild(newEntry);
    storage.addCategory(newEntry);
  }
  // Else if called from editCategory, edit
  else{
    storage.editCategory(categoryEdit.category,lastReferencedElement.category);
    lastReferencedElement.category = categoryEdit.category;
  }
}

function deleteBullet(bulletObj){
  storage.deleteBullet(bulletObj);
  bulletObj.remove();
}
function deleteCategory(categoryObj){
  storage.deleteCategory(categoryObj);
  categoryObj.remove();
}