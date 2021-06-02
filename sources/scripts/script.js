// script.js
import * as storage from "./storage.js";
import { router } from "./router.js"; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Use to handle editBullet and editCategory events
var lastReferencedElement;

// We can move these to other event listener if we want
var bulletAddButton = document.getElementById("add-bullet-button");
bulletAddButton.addEventListener("click", addBulletHandler);

/**
 * When the add bullet button is clicked, this function is called to set the state so that the add
 * bullet modal pops up
 */
function addBulletHandler() {
  setState("BulletEditor", null, storage.categoryArr);
}

var cateAddButton = document.getElementById("add-cate-button");
cateAddButton.addEventListener("click", addCateHandler);

/**
 * When the add category button is clicked, this function is called to set the state so that the add
 * category modal pops up
 */
function addCateHandler() {
  setState("CateEditor");
}

// TODO build from local storage
addEventListener("DOMContentLoaded", () => {
  setState("backMain", false);
  storage.buildDefault();

});

/**
 * Will check for click events in entire document
 * Note that submit events also register as clicks
 */
document.addEventListener("click", (e) => {
  // composedPath allows us to interact with shadowDom elements
  // console.log(e.composedPath());

  // Click showDetail button
  if (e.composedPath()[0].className == "bullet-button bullet-detail-button") {
    showDetail(e.composedPath()[0]);
  }

  // Click editBullet button
  if (e.composedPath()[0].className == "bullet-button edit-bullet-button") {
    let bulletObj = e.composedPath()[0].getRootNode().host;
    setState("BulletEditor", bulletObj, storage.categoryArr);
    lastReferencedElement = bulletObj;
  }
  // Click editCategory button
  if (e.composedPath()[0].id == "cate-edit") {
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

  // Select all categories
  if (e.composedPath()[0].id == "select-all") {
    let categoryElements = document.querySelectorAll("category-entry");
    categoryElements.forEach(element => {
      element.active="true";
      storage.updateActiveCategories(element);
    });
  }

    // Deselect all categories
    if (e.composedPath()[0].id == "deselect-all") {
      let categoryElements = document.querySelectorAll("category-entry");
      categoryElements.forEach(element => {
        element.active="false";
        storage.updateActiveCategories(element);
      });
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

/**
 * Helper function for passing right parameters to edit bullet form
 * @param {*} editButton - the edit button on the selected entry
 */
function editBullet(editButton) {
  let bullet = editButton.getRootNode().host.bullet;
  let categoryList = [];
  let catagories = document.querySelectorAll("category-entry");
  for (let i = 0; i < catagories.length; i++) {
    categoryList.push(catagories[i].category.title);
  }
  setState("BulletEditor", bullet, categoryList);
  editButton.getRootNode().host.remove();
}

/**
 * Helper function for bullet showDetail button
 * @param {*} detailButton - detail button from selected entry
 */
function showDetail(detailButton) {
  var des = detailButton.getRootNode().querySelector(".des");
  if (des.style.display == "block") {
    des.style.display = "none";
  } else {
    des.style.display = "block";
  }
}

/**
 * Helper function for passing right parameters to edit category form
 * @param {*} editButton - edit button from selected category
 */
function editCategory(editButton) {
  let category = editButton.getRootNode().host.category;
  setState("CateEditor", category);
  editButton.getRootNode().host.remove();
}

/**
 * Helper function for submitting new/edited bullet entry
 * Function creates new entry and populates its feilds then sets its color and refreshes the Date selector
 * It then resetes the active date and refilters the entries 
 * @param {*} formObj 
 */
function submitBullet(formObj) {
  let bulletEdit = formObj.getRootNode().host;
  setState("backMain");
  // If not called from editBullet, create new bullet
  if (!bulletEdit.old) {
    let newEntry = document.createElement("bullet-entry");
    let mainPane = document.querySelector(".entry-list");
    newEntry.bullet = bulletEdit.bullet;
    mainPane.appendChild(newEntry);
    // add bullet storage
    storage.addBullet(newEntry);

    //Update category storage if needed
    let currentCate = JSON.parse(bulletEdit.bullet.category);
    if(currentCate.title=="Default"){
      let noDefault = true;
      storage.categoryArr.forEach(element => {
        if(element.title=="Default"){
          noDefault = false;
        }
      });
      if(noDefault){
        let newCategory = document.createElement("category-entry");
        let defaultCategory={
          title: "Default",
          color: "blue",
          checked: true
        }
        newCategory.category=defaultCategory;
        let mainPane = document.querySelector(".category-box");
        mainPane.appendChild(newCategory);
        storage.addCategory(newCategory);
      }

    }

    // TODO maybe shouldnt always be appended??
  }
  // Else if called from editBullet, edit
  else {
    storage.editBullet(bulletEdit.bullet, lastReferencedElement.bullet);
    lastReferencedElement.bullet = bulletEdit.bullet;
  }
}

/**
 * Helper function for submitting new/edited category entry
 * Gets the category from the formObj, sets state to "backMain" and then adds the new category to the category box
 * @param {*} formObj 
 */
function submitCategory(formObj) {
  let category = formObj.getRootNode().host.category;
  setState("backMain");

  let newEntry = document.createElement("category-entry");
  let mainPane = document.querySelector(".category-box");
  newEntry.category = category;
  mainPane.appendChild(newEntry);
}

/**
 * This function is used to close the modal, it first checks if the modal appeared from clicking an edit button
 * if it has then it recreates the old entry and adds it
 * @param {*} editorObj 
 */
function closeModal(editorObj) {
  setState("backMain");

  // If not called from editBullet, create new bullet
  if (!categoryEdit.old) {
    let newEntry = document.createElement("category-entry");
    let mainPane = document.querySelector(".category-box");
    newEntry.category = categoryEdit.category;
    mainPane.appendChild(newEntry);
    storage.addCategory(newEntry);
  }
}

/**
 * This function filters Entries
 * It first filters by the selected categories and then filters by the selected date
 */
function filterEntries() {
  let activeCatrgories = [];
  let catagories = document.querySelectorAll("category-entry");

  //Filter on category
  if (catagories.length != 0) {
    for (let i = 0; i < catagories.length; i++) {
      if (catagories[i].checked) {
        activeCatrgories.push(catagories[i].category.title);
      }
    }

    let entryList = document.querySelectorAll("bullet-entry");
    for (let i = 0; i < entryList.length; i++) {
      if (!activeCatrgories.includes(entryList[i].category)) {
        entryList[i].style.display = "none";
      } else {
        entryList[i].style.display = "grid";
      }
    }
  }

  //Filter on date
  let dayEntryiesRaw = document.querySelectorAll("date-entry");
  let activeDate;

  for (let i = 0; i < dayEntryiesRaw.length; i++) {
    if (dayEntryiesRaw[i].checkActive) {
      activeDate = dayEntryiesRaw[i].date;
    }
  }

  let entryList = document.querySelectorAll("bullet-entry");
  for (let i = 0; i < entryList.length; i++) {
    if (activeDate != entryList[i].bullet.date) {
      entryList[i].style.display = "none";
    } else {
      if (activeCatrgories.includes(entryList[i].category)) {
        entryList[i].style.display = "grid";
      }
    }
  }
}

/**
 * This function checks to see if there is a date-entry for every date from the bullet-entries
 * If there is a date associated with a bullet-entry that is not contained in date-entry, then a 
 * new date entry is created and added 
 */
function refreshDateSelector() {
  let dayEntryiesRaw = document.querySelectorAll("date-entry");
  let dayEntryies = [];

  for (let i = 0; i < dayEntryiesRaw.length; i++) {
    dayEntryies.push(dayEntryiesRaw[i].date);
  }

  let entryList = document.querySelectorAll("bullet-entry");
  for (let i = 0; i < entryList.length; i++) {
    if (!dayEntryies.includes(entryList[i].bullet.date)) {
      let newDateEntry = document.createElement("date-entry");
      newDateEntry.date = entryList[i].bullet.date;
      let historyBox = document.querySelector(".jornal-box-history");
      historyBox.insertBefore(newDateEntry, historyBox.firstChild);
    }
  }
}

/**
 * This function filters the entries shown so that only the ones with the selected date are active
 * @param {*} date - The date we want to set as active
 */
function changeActiveDate(date) {
  let dayEntryiesRaw = document.querySelectorAll("date-entry");

  for (let i = 0; i < dayEntryiesRaw.length; i++) {
    let currentDate = dayEntryiesRaw[i].date;
    let targetDate = date.date;
    if (dayEntryiesRaw[i].date == date.date) {
      dayEntryiesRaw[i].active = true;
    } else {
      dayEntryiesRaw[i].active = false;
    }
  }
}
