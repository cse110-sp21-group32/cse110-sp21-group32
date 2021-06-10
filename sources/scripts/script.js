// script.js
import * as storage from "./storage.js";
import { router } from "./router.js"; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Use to handle editBullet and editCategory events
var lastReferencedElement;

// Use to handle edit inline Title category/bullet
var activeTitle;

// Use to handle inline editBullet and editCategory
var oldElement;

//Date of today
let today = new Date();
var todayDate = today.getFullYear();
if (today.getMonth() + 1 < 10) {
  todayDate += "-0" + (today.getMonth()+1);
} else {
  todayDate += "-" + (today.getMonth()+1);
}
if (today.getDate() < 10) {
  todayDate += "-0" + today.getDate();
} else {
  todayDate += "-" + today.getDate();
}

// We can move these to other event listener if we want
var bulletAddButton = document.getElementById("add-bullet-button");
bulletAddButton.addEventListener("click", addBulletHandler);

/**
 * When the add bullet button is clicked, this function is called to set the state so that the add
 * bullet modal pops up
 */
function addBulletHandler() {
  let defaultCategory = {
    title: "Default",
    color: "Blue",
  };
  let newBullet = {
    title: "",
    checked: false,
    description: "",
    date: todayDate,
    category: JSON.stringify(defaultCategory),
    type: "task",
  };
  let newObj = {
    bullet: newBullet,
  };
  storage.addBullet(newObj);
}
var cateAddButton = document.getElementById("add-cate-button");
cateAddButton.addEventListener("click", addCateHandler);

/**
 * When the add category button is clicked, this function is called to set the state so that the add
 * category modal pops up
 */
function addCateHandler() {
  let defaultCategory = {
    title: "",
    color: "Blue",
    checked: false
  };
  let mainPane = document.querySelector(".category-box");
  let newEntry = document.createElement("category-entry");
  newEntry.category=defaultCategory;
  storage.addCategory(newEntry);
  mainPane.appendChild(newEntry);
  // setState("CateEditor");
}

/**
 * build from local storage
 */
addEventListener("DOMContentLoaded", () => {
  setState("backMain", false);
  storage.buildDefault();
});

/**
 * Will check for click events in entire document
 * Note that submit events also register as clicks
 */
document.addEventListener("click", (e) => {
  // Handle inline edit category/bullet title event
  console.log(e.composedPath()[0]);
  if (
    activeTitle &&
    e.composedPath()[0].id != "bullet-title" &&
    e.composedPath()[0].id != "category-title"
  ) {
    let entry = activeTitle.getRootNode().host;
    activeTitle.contentEditable = false;

    // editBullet storage
    if (activeTitle.id == "bullet-title") {
      let newElement = entry.bullet;
      if (entry.oldDetail !== undefined) {
        newElement.description = entry.oldDetail;
      }
      storage.editBullet(newElement, oldElement);
    }
    // editCategory storage
    else {
      storage.editCategory(entry.category, oldElement);
    }
    activeTitle = null;
  }

  //Show category
  if (e.composedPath()[0].id == "category-toggle") {
    let bullet = e.composedPath()[0].getRootNode().host;
    bullet.showCategoryList = true;
  }

  // Click showDetail button
  if (
    e.composedPath()[0].className == "fas fa-info-circle bullet-detail-button"
  ) {
    showDetail(e.composedPath()[0]);
  }

  // Click editBullet button
  if (e.composedPath()[0].className == "bullet-button edit-bullet-button") {
    let bulletObj = e.composedPath()[0].getRootNode().host;
    setState("BulletEditor", bulletObj, storage.categoryArr);
    lastReferencedElement = bulletObj;
  }

  //Swtich the type of bullet
  if (e.composedPath()[0].className == "fas fa-chevron-down fa-xs") {
    let bulletObj = e.composedPath()[0].getRootNode().host;
    let oldBullet = bulletObj.bullet;
    let newBullet = bulletObj.bullet;
    if (oldBullet.type == "note") {
      newBullet.type = "event";
    } else if (oldBullet.type == "event") {
      newBullet.type = "task";
    } else {
      newBullet.type = "note";
    }
    bulletObj.bullet = newBullet;

    // Handle when detail has been changed w/o saving
    if (bulletObj.oldDetail !== undefined) {
      newBullet.description = bulletObj.oldDetail;
      oldBullet.description = bulletObj.oldDetail;
    }
    storage.editBullet(newBullet, oldBullet);
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
    categoryElements.forEach((element) => {
      element.checked = true;
      storage.updateActiveCategories(element, false);
    });
    storage.buildCurrent();
  }

  // Deselect all categories
  if (e.composedPath()[0].id == "deselect-all") {
    let categoryElements = document.querySelectorAll("category-entry");
    categoryElements.forEach((element) => {
      element.checked = false;
      storage.updateActiveCategories(element, false);
    });
    storage.buildCurrent();
  }

  // Check category event
  if (e.composedPath()[0].id == "category-check") {
    let categoryElement = e.composedPath()[0].getRootNode().host;
    storage.updateActiveCategories(categoryElement, true);
  }
  // Select date event
  if (e.composedPath()[0].className == "date") {
    let dateElement = e.composedPath()[0].getRootNode().host;
    storage.updateActiveDates(dateElement);
    //Add diabled interface for date selector if no date is selected
    checkDateSelector();
  }
  // Check bullet event
  if (e.composedPath()[0].id == "bullet-check") {
    fadeBullet(e.composedPath()[0]);
    let entry = e.composedPath()[0].getRootNode().host;
    let newElement = entry.bullet;
    if (entry.oldDetail !== undefined) {
      newElement.description = entry.oldDetail;
    }
    storage.editBullet(newElement, newElement);
  }

  // Handle bullet/category edit attempt by saving element
  if (
    e.composedPath()[0].id == "bullet-category" ||
    e.composedPath()[0].id == "bullet-date"
  ) {
    let entry = e.composedPath()[0].getRootNode().host;
    oldElement = entry.bullet;
    if (entry.oldDetail !== undefined) {
      oldElement.description = entry.oldDetail;
    }
  }
  if (e.composedPath()[0].id == "color") {
    oldElement = e.composedPath()[0].getRootNode().host.category;
  }

  // Inline edit category/color event for Firefox
  if (e.composedPath()[0].tagName == "OPTION") {
    let entry = e.composedPath()[0].getRootNode().host;
    // Inline edit bullet category
    if (entry.tagName == "BULLET-ENTRY") {
      let newElement = entry.bullet;
      newElement.category = e.composedPath()[1].value;
      if (entry.oldDetail !== undefined) {
        newElement.description = entry.oldDetail;
      }
      storage.editBullet(newElement, oldElement);
    }
    // Inline edit category color
    else {
      let newElement = entry.category;
      newElement.color = e.composedPath()[1].value;
      entry.category = newElement;
      storage.editCategory(newElement, oldElement);
    }
  }

  // Inline edit bullet description save button event
  if (e.composedPath()[0].id == "detail-save") {
    let entry = e.composedPath()[0].getRootNode().host;
    let oldBullet = entry.bullet;
    oldBullet.description = entry.oldDetail;
    storage.editBullet(entry.bullet, oldBullet);
    entry.oldDetail = entry.bullet.description;
    let detailEdit = entry.shadowRoot.querySelector("#detail-editor");
    detailEdit.contentEditable = false;
  }
});

document.addEventListener("dblclick", (e) => {
  // Handle edit inline bullet title event
  if (e.composedPath()[0].id == "bullet-title") {
    // If reached after editing another title
    if (activeTitle) {
      activeTitle.contentEditable = false;
      let entry = activeTitle.getRootNode().host;
      if (activeTitle.id == "bullet-title") {
        editBullet(entry);
      } else {
        storage.editCategory(entry.category, oldElement);
      }
    }
    // Set reference to activeTitle element and store pre-edited data
    e.composedPath()[0].contentEditable = true;
    activeTitle = e.composedPath()[0];
    let entry = e.composedPath()[0].getRootNode().host;
    oldElement = entry.bullet;
    if (entry.oldDetail !== undefined) {
      oldElement.description = entry.oldDetail;
    }
  }

  // Handle edit inline category title event
  if (
    e.composedPath()[0].id == "category-title" &&
    e.composedPath()[0].name != "default-category"
  ) {
    // If reached after editing another title
    if (activeTitle) {
      activeTitle.contentEditable = false;
      let entry = activeTitle.getRootNode().host;
      if (activeTitle.id == "bullet-title") {
        editBullet(entry);
      } else {
        storage.editCategory(entry.category, oldElement);
      }
    }
    // Set reference to activeTitle element and store pre-edited data
    e.composedPath()[0].contentEditable = true;
    activeTitle = e.composedPath()[0];
    oldElement = e.composedPath()[0].getRootNode().host.category;
  }
});

document.addEventListener("input", (e) => {
  // Inline edit bullet date
  if (e.composedPath()[0].id == "bullet-date") {
    let entry = e.composedPath()[0].getRootNode().host;
    editBullet(entry);
  }

  // Inline edit bullet category/color for Chrome
  if (e.composedPath()[0].tagName == "SELECT") {
    let entry = e.composedPath()[0].getRootNode().host;
    // Inline edit bullet category
    if (entry.tagName == "BULLET-ENTRY") {
      let newElement = entry.bullet;
      newElement.category = e.composedPath()[0].value;
      if (entry.oldDetail !== undefined) {
        newElement.description = entry.oldDetail;
      }
      storage.editBullet(newElement, oldElement);
    }
    // Inline edit category color
    else {
      let newElement = entry.category;
      newElement.color = e.composedPath()[0].value;
      entry.category = newElement;
      storage.editCategory(newElement, oldElement);
    }
  }
});

/**
 * Checks if any dates are selected and colors them accordingly
 */
function checkDateSelector() {
  let dates = document.querySelectorAll("date-entry");
  let historyBox = document.querySelector(".journal-box-history");
  if (storage.activeDates.size == 0) {
    historyBox.style.backgroundColor = "rgb(202, 207, 210)";
    dates.forEach((date) => {
      date.disabled = true;
    });
  } else {
    historyBox.style.backgroundColor = "rgb(210, 221, 232)";
    dates.forEach((date) => {
      if (storage.activeDates.has(date.date)) {
        date.active = "true";
      } else {
        date.active = "false";
      }
    });
  }
}

/**
 * Helper function for bullet to fade if completed
 * @param {*} check  - Check whether or not the box has been checked
 */
function fadeBullet(check) {
  let see = check.getRootNode().querySelector(".bullet");
  let des = check.getRootNode().querySelector(".des");
  if (check.checked == true) {
    see.style.opacity = "0.25";
    des.style.opacity = "0.25";
  } else {
    see.style.opacity = "1";
    des.style.opacity = "1";
  }
}

/**
 * Helper function for bullet showDetail button
 * @param {*} detailButton  - The detail button clicked on 
 */
function showDetail(detailButton) {
  let detailEdit = detailButton.getRootNode().getElementById("detail-editor");
  let bulletEntry = detailButton.getRootNode().host;
  let des = detailButton.getRootNode().querySelector(".des");
  detailEdit.contentEditable = false;
  if (bulletEntry.oldDetail === undefined) {
    bulletEntry.oldDetail = bulletEntry.bullet.description;
  }
  if (des.style.display == "block") {
    des.style.display = "none";
  } else {
    des.style.display = "block";
  }
}

/**
 * Helper function for submitting new/edited bullet entry
 * @param {*} formObj - The form from the new/edited bullet enrty that is being submited
 */
function submitBullet(formObj) {
  let bulletEdit = formObj.getRootNode().host;
  let cateEditor = document.querySelector("bullet-editor-page");

  //Check the length of new title
  let tooLong = false;
  let legnth = bulletEdit.bullet.title.length;
  if (legnth > 20) {
    tooLong = true;
  }

  if (!tooLong) {
    setState("backMain");
    // If not called from editBullet, create new bullet
    if (!bulletEdit.old) {
      storage.addBullet(bulletEdit);
    }
    // Else if called from editBullet, edit
    else {
      storage.editBullet(bulletEdit.bullet, lastReferencedElement.bullet);
      lastReferencedElement.bullet = bulletEdit.bullet;
    }
  } else {
    cateEditor.lengthViolate = true;
  }
}

/**
 * Helper function for submitting new/edited category entry
 * @param {*} formObj - The form from the new/edited category enrty that is being submited
 * Composed path allows access to shadow dom
 */
function submitCategory(formObj) {
  let categoryEdit = formObj.getRootNode().host;
  //Check if the new category is duplicate
  let newCategory = categoryEdit.category;
  let duplicate = false;
  storage.categoryArr.forEach((category) => {
    if (
      newCategory.title == category.title &&
      newCategory.color == category.color
    ) {
      duplicate = true;
    }
  });

  //Check if new category name is too long
  let tooLong = false;
  let length = newCategory.title.length;
  if (length > 10) {
    tooLong = true;
  }
  let cateEditor = document.querySelector("cate-editor-page");

  //Proceed if not duplicate
  //Stop and show error if one constraint is violated
  if (!duplicate && !tooLong) {
    setState("backMain");

    // If not called from editBullet, create new bullet
    if (!categoryEdit.old) {
      let newEntry = document.createElement("category-entry");
      let mainPane = document.querySelector(".category-box");
      newEntry.category = categoryEdit.category;
      mainPane.appendChild(newEntry);
      storage.addCategory(newEntry);
    }
    // Else if called from editCategory, edit
    else {
      console.log(1);
      storage.editCategory(
        categoryEdit.category,
        lastReferencedElement.category
      );
      lastReferencedElement.category = categoryEdit.category;
    }
  } else if (duplicate && tooLong) {
    cateEditor.duplicate = true;
    cateEditor.lengthViolate = true;
  } else if (duplicate) {
    cateEditor.duplicate = true;
  } else {
    cateEditor.lengthViolate = true;
  }
}

/**
 * Edit bullet from page
 * @param {*} entry - the bullet to be edited
 */
function editBullet(entry) {
  let newElement = entry.bullet;
  if (entry.oldDetail !== undefined) {
    newElement.description = entry.oldDetail;
  }
  storage.editBullet(newElement, oldElement);
}

/**
 * Delete bullet from page
 * @param {*} bulletObj - the bullet to be deleted
 */
function deleteBullet(bulletObj) {
  let bullet = bulletObj.bullet;
  if (bulletObj.oldDetail !== undefined) {
    bullet.description = bulletObj.oldDetail;
  }
  storage.deleteBullet(bullet);
  bulletObj.remove();
}

/**
 * Delete category from page
 * @param {*} categoryObj - the category to be deleted
 */
function deleteCategory(categoryObj) {
  storage.deleteCategory(categoryObj);
  categoryObj.remove();
}

export { checkDateSelector, fadeBullet, showDetail, submitBullet, submitCategory, deleteBullet, deleteCategory };