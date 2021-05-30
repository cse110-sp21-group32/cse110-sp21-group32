var myStorage = window.localStorage;
var bulletArr;
export var categoryArr;
var dateArr;

// Only store actives in current session
var activeCategories = new Map();
var activeDates = new Map();

if (myStorage.getItem("bulletArr")) {
  bulletArr = JSON.parse(myStorage.getItem("bulletArr"));
  console.log(bulletArr);
} else {
  bulletArr = [];
}
if (myStorage.getItem("categoryArr")) {
  categoryArr = JSON.parse(myStorage.getItem("categoryArr"));
  console.log(categoryArr);
} else {
  categoryArr = [];
}
if (myStorage.getItem("dateArr")) {
  dateArr = JSON.parse(myStorage.getItem("dateArr"));
  console.log(dateArr);
} else {
  dateArr = [];
}

export function updateBullet() {
  myStorage.setItem("bulletArr", JSON.stringify(bulletArr));
}
export function updateCategory() {
  myStorage.setItem("categoryArr", JSON.stringify(categoryArr));
}
export function updateDate() {
  myStorage.setItem("dateArr", JSON.stringify(dateArr));
}

// Delete bullet from storage
export function deleteBullet(obj) {
  let dateEntryCount = 0;
  let hasBeenDeleted = false;
  bulletArr.forEach(function (item, index, arr) {
    if (obj.bullet.date == item.date) {
      dateEntryCount++;
    }
    if (JSON.stringify(obj.bullet) == JSON.stringify(item) && !hasBeenDeleted) {
      arr.splice(index, 1);
      hasBeenDeleted = true;
    }
  });
  updateBullet();

  // If last entry in date, delete date
  if (dateEntryCount == 1) {
    let i = 0;
    for (let dateItem of dateArr) {
      if (dateItem.date == obj.bullet.date) {
        dateArr.splice(i, 1);
        updateDate();
        activeDates.delete(dateItem.date);
        break;
      }
      i++;
    }
    defaultCurrent();
  }
}
// Delete category from storage
export function deleteCategory(obj) {
  // Default all bullets with category to be deleted
  let categoryKey = JSON.stringify(
    { title: obj.category.title, color: obj.category.color });

  // Change old bullets of the deleted category to defualt
  // Can not delete default
  if(obj.category.title == "Default"){
    return
  }
  bulletArr.forEach(function (item, index) {
    if (categoryKey == item.category) {
      bulletArr[index].category = "default";
    }
  });
  
  updateBullet();

  let index = 0;
  for (let item of categoryArr) {
    if (JSON.stringify(obj.category) == JSON.stringify(item)) {
      categoryArr.splice(index, 1);
      let categoryKey = JSON.stringify(
        { title: obj.category.title, color: obj.category.color });
      activeCategories.delete(categoryKey);
      break;
    }
    index++;
  }
  updateCategory();
  buildCurrent();
}

// Edit bullet in storage
export function editBullet(newBullet, oldBullet) {
  let dateEntryCount = 0;
  let hasBeenDeleted = false;
  oldBullet.checked = false;
  newBullet.checked = false;
  bulletArr.forEach(function (item, index) {
    if (oldBullet.date == item.date) {
      dateEntryCount++;
    }
    if (JSON.stringify(oldBullet) == JSON.stringify(item) && !hasBeenDeleted) {
      bulletArr[index] = newBullet;
      hasBeenDeleted = true;
    }
  });
  updateBullet();

  // Handle date edit event TODO DELETE IN FINAL VERSION?
  if (newBullet.date != oldBullet.date) {
    // If last entry in date, delete date
    if (dateEntryCount == 1) {
      let i = 0;
      for (let dateItem of dateArr) {
        if (dateItem.date == oldBullet.date) {
          dateArr.splice(i, 1);
          activeDates.delete(dateItem.date);
          break;
        }
        i++;
      }
    }

    // Add new date if it does not exist
    let dateExists = false;
    dateArr.forEach(function (item) {
      if (item.date == newBullet.date) {
        dateExists = true;
      }
    });
    if (!dateExists) {
      let newDateObj = { date: newBullet.date, active: 'false' };
      dateArr.push(newDateObj);

      // Update historyPane with new date
      let historyPane = document.querySelector(".jornal-box-history");
      let newDate = document.createElement("date-entry");
      newDate.date = newBullet.date;
      newDate.active = 'false';
      historyPane.appendChild(newDate);
    }
    updateDate();
    buildCurrent();
  } else if (newBullet.category != oldBullet.category){
    buildCurrent();
  }
}
// Edit category in storage
export function editCategory(newCategory, oldCategory) {
  // Edit all bullets with category
  let oldKey = { title: oldCategory.title, color: oldCategory.color };
  let newKey = null;
  bulletArr.forEach(function (item, index) {
    if (JSON.stringify(oldKey) == item.category) {
      let edit = { title: newCategory.title, color: newCategory.color };
      bulletArr[index].category = JSON.stringify(edit);
    }
  });
  updateBullet();

  // If active, stay active
  if (newCategory.checked == true) {
    newKey = { title: newCategory.title, color: newCategory.color };
  }
  oldCategory.checked = false;
  newCategory.checked = false;
  let index = 0;
  for (let item of categoryArr) {
    if (JSON.stringify(oldCategory) == JSON.stringify(item)) {
      categoryArr[index] = newCategory;
      activeCategories.delete(JSON.stringify(oldKey));
      if (newKey) {
        activeCategories.set(JSON.stringify(newKey));
      }
      break;
    }
    index++;
  }
  updateCategory();
  buildCurrent();
}

export function addBullet(obj) {
  const newBullet = obj.bullet;
  bulletArr.push(newBullet);
  updateBullet();

  // Add new date if it does not exist
  let dateExists = false;
  dateArr.forEach(function (item) {
    if (item.date == newBullet.date) {
      dateExists = true;
    }
  });
  if (!dateExists) {
    let newDateObj = { date: newBullet.date, active: "false" };
    dateArr.push(newDateObj);
    updateDate();
    // Update historyPane with new date
    let historyPane = document.querySelector(".jornal-box-history");
    let newDate = document.createElement("date-entry");
    newDate.date = newBullet.date;
    newDate.active = "false";
    historyPane.appendChild(newDate);
  }
}
export function addCategory(obj) {
  const newCategory = obj.category;
  obj.active="true"
  categoryArr.push(newCategory);
  updateCategory();
  // If category is active update activeCategories
  if (obj.checked) {
    let categoryKey = JSON.stringify(
      { title: newCategory.title, color: newCategory.color });
    activeCategories.set(categoryKey);
  }
}

// Build initial screen
export function buildDefault() {
  const categoryPane = document.querySelector(".category-box");
  const historyPane = document.querySelector(".jornal-box-history");
  activeCategories.clear();
  activeDates.clear();

  let noDefault=true;
  categoryArr.forEach(function (item, index) {
    let newCategory = document.createElement("category-entry");
    categoryArr[index].checked = true;
    item.checked = true;
    newCategory.category = item;
    categoryPane.appendChild(newCategory);
    updateActiveCategories(newCategory);
    if(item.title == "Default"){
      noDefault = false;
    }
  });


  dateArr.forEach(function (item, index) {
    let newDate = document.createElement("date-entry");
    dateArr[index].active = "false";
    newDate.date = item.date;
    newDate.active = "false";
    historyPane.appendChild(newDate);
  });

  // default build all from today
  buildCurrent();
}

// Build current selection of dates and categories
export function buildCurrent() {
  // Purge all bullet elements
  const mainPane = document.querySelector(".entry-list");
  while (mainPane.firstChild) {
    mainPane.firstChild.remove();
  }

  //If no day and category select no entry showup
  //If only no day select, show all day with the category
  //If no category select, show no entry
  //Categroy as hard filter, day as soft filter

  // all/today
  if (activeCategories.size == 0 && activeDates.size == 0) {

    // let today = new Date();
    // let date;
    // if (today.getMonth() + 1 < 10) {
    //   date = today.getFullYear() + '-' + '0' + (today.getMonth() + 1) + '-'
    //     + today.getDate();
    // } else {
    //   date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-'
    //     + today.getDate();
    // }
    // bulletArr.forEach(function (item) {
    //   if (item.date == date) {
    //     let newBullet = document.createElement('bullet-entry');
    //     newBullet.bullet = item;
    //     mainPane.appendChild(newBullet);
    //   }
    // });
  }
  // all/selected days (TODO PUT SORT FUNCTION HERE)
  else if (activeCategories.size == 0) {
    bulletArr.forEach(function (item) {
      if (activeDates.has(item.date)) {
        let newBullet = document.createElement("bullet-entry");
        newBullet.bullet = item;
        mainPane.appendChild(newBullet);
      }
    });
  }
  // all/selected categories
  else if (activeDates.size == 0) {
    bulletArr.forEach(function (item) {
      if (activeCategories.has(item.category)) {
        let newBullet = document.createElement("bullet-entry");
        newBullet.bullet = item;
        mainPane.appendChild(newBullet);
      }
    });
  }
  // Get selected intersection of categories/date (TODO SORT)
  else {
    bulletArr.forEach(function (item) {
      if (activeDates.has(item.date) && activeCategories.has(item.category)) {
        let newBullet = document.createElement("bullet-entry");
        newBullet.bullet = item;
        mainPane.appendChild(newBullet);
      }
    });
  }
}

// Update storage when toggling active categories
export function updateActiveCategories(categoryObj) {
  let categoryKey = JSON.stringify(
    { title: categoryObj.category.title, color: categoryObj.category.color });
  if (categoryObj.checked) {
    activeCategories.set(categoryKey);
  } else {
    activeCategories.delete(categoryKey);
  }
  buildCurrent();
}

// Update storage when toggling active dates
export function updateActiveDates(dateObj) {
  if (dateObj.active == "true") {
    activeDates.delete(dateObj.date);
    dateObj.active = "false";
  } else {
    activeDates.set(dateObj.date);
    dateObj.active = "true";
  }
  buildCurrent();
}
