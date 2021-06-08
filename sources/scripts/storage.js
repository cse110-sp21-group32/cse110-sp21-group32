var myStorage = window.localStorage;
var bulletArr;
export var categoryArr;
var dateArr;

// Only store actives in current session
var activeCategories = new Map();
export var activeDates = new Map();

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

// Today's date
let today = new Date();
var todayDate;
if (today.getMonth() + 1 < 10) {
  todayDate =
    today.getFullYear() +
    "-" +
    "0" +
    (today.getMonth() + 1) +
    "-" +
    today.getDate();
} else {
  todayDate =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
}
if (today.getDate() < 10) {
  todayDate =
    today.getFullYear() +
    "-" +
    "0" +
    (today.getMonth() + 1) +
    "-" +
    "0" +
    today.getDate();
} else {
  todayDate =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
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
  let bullet = obj.bullet;
  bullet.checked = false;

  // Don't change this, for loop needs to look like this to work with splice
  let i;
  for (i = bulletArr.length - 1; i >= 0; i -= 1) {
    if (obj.bullet.date == bulletArr[i].date) {
      dateEntryCount++;
    }
    let item = JSON.parse(JSON.stringify(bulletArr[i]));
    item.checked = false;
    if (JSON.stringify(bullet) == JSON.stringify(item) && !hasBeenDeleted) {
      bulletArr.splice(i, 1);
      hasBeenDeleted = true;
    }
  }
  updateBullet();

  // If last entry in date, delete date
  if (dateEntryCount == 1) {
    let i = 0;
    for (let dateItem of dateArr) {
      if (dateItem.date == obj.bullet.date) {
        dateArr.splice(i, 1);
        updateDate();
        activeDates.delete(dateItem.date);
        buildDate();
        break;
      }
      i++;
    }
    buildCurrent();
  }
}
// Delete category from storage
export function deleteCategory(obj) {
  // Default all bullets with category to be deleted
  let categoryKey = JSON.stringify({
    title: obj.category.title,
    color: obj.category.color,
  });

  bulletArr.forEach(function (item, index) {
    if (categoryKey == item.category) {
      bulletArr[index].category = '{"title":"Default","color":"blue"}';
    }
  });

  updateBullet();

  let index = 0;
  for (let item of categoryArr) {
    //Check title and color for equality
    //May be different in check
    if (
      JSON.stringify(obj.category.title) == JSON.stringify(item.title) &&
      JSON.stringify(obj.category.color) == JSON.stringify(item.color)
    ) {
      categoryArr.splice(index, 1);
      let categoryKey = JSON.stringify({
        title: obj.category.title,
        color: obj.category.color,
      });
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
  bulletArr.forEach(function (item, index) {
    let bulletStr = JSON.parse(JSON.stringify(item));
    bulletStr.checked = false;
    if (oldBullet.date == item.date) {
      dateEntryCount++;
    }
    if (
      JSON.stringify(oldBullet) == JSON.stringify(bulletStr) &&
      !hasBeenDeleted
    ) {
      bulletArr[index] = newBullet;
      hasBeenDeleted = true;
    }
  });
  updateBullet();

  // Handle date edit event
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
      let newDateObj = { date: newBullet.date, active: "false" };
      dateArr.push(newDateObj);
    }
    updateDate();
    buildCurrent();
    buildDate();
  } else if (newBullet.category != oldBullet.category) {
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
    //Check title and color equality
    //Their check may be different
    if (
      JSON.stringify(oldCategory.title) == JSON.stringify(item.title) &&
      JSON.stringify(oldCategory.color) == JSON.stringify(item.color)
    ) {
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
    buildDate();
  }
  buildCurrent();
}
export function addCategory(obj) {
  const newCategory = obj.category;
  categoryArr.push(newCategory);
  updateCategory();
  // If category is active update activeCategories
  if (obj.checked) {
    let categoryKey = JSON.stringify({
      title: newCategory.title,
      color: newCategory.color,
    });
    activeCategories.set(categoryKey);
  }
}

// Build initial screen
export function buildDefault() {
  const historyPane = document.querySelector(".journal-box-history");
  const categoryPane = document.querySelector(".category-box");
  activeCategories.clear();
  activeDates.clear();

  // Build default category
  let defaultCategory = document.createElement("category-entry");
  defaultCategory.category = { title: "Default", color: "blue", checked: true };
  defaultCategory.default = 0;
  categoryPane.appendChild(defaultCategory);
  updateActiveCategories(defaultCategory, false);

  // Create each category from storage
  categoryArr.forEach(function (item, index) {
    let newCategory = document.createElement("category-entry");
    categoryArr[index].checked = false;
    newCategory.category = {
      title: item.title,
      color: item.color,
      checked: true,
    };
    categoryPane.appendChild(newCategory);
    console.log(newCategory.category);
    updateActiveCategories(newCategory, false);
  });

  activeDates.set(todayDate);
  buildDate();

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

  // Sort lmao
  const sortedBullets = bulletArr.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  //If no day and category select Today date entry show up
  //If only no day select, show all day with the category
  //If no category select, show no entry
  //Categroy as hard filter, day as soft filter

  if (activeCategories.size == 0) {
    // nothing
  }
  // all/selected categories
  else if (activeDates.size == 0) {
    sortedBullets.forEach(function (item) {
      if (activeCategories.has(item.category)) {
        let newBullet = document.createElement("bullet-entry");
        newBullet.bullet = item;
        if (newBullet.checked == true) {
          newBullet.opacity = true;
        } else {
          newBullet.opacity = false;
        }
        mainPane.appendChild(newBullet);
      }
    });
  }
  // Get selected intersection of categories/date (TODO SORT)
  else {
    sortedBullets.forEach(function (item) {
      if (activeDates.has(item.date) && activeCategories.has(item.category)) {
        let newBullet = document.createElement("bullet-entry");
        newBullet.bullet = item;
        if (newBullet.checked == true) {
          newBullet.opacity = true;
        } else {
          newBullet.opacity = false;
        }
        mainPane.appendChild(newBullet);
      }
    });
  }
}

// Call to update date viewer in real time
function buildDate() {
  const historyPane = document.querySelector(".journal-box-history");
  while (historyPane.firstChild) {
    historyPane.firstChild.remove();
  }

  // Sort lmao
  const sortedDates = dateArr.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  // Create each date from sorted date arr
  let builtDefault = false;
  sortedDates.forEach(function (item) {
    // Put default today Date in correct order
    if (new Date(item.date) <= new Date(todayDate) && !builtDefault) {
      let defaultDate = document.createElement("date-entry");
      defaultDate.date = todayDate;
      if (activeDates.has(todayDate)) {
        defaultDate.active = "true";
      } else {
        defaultDate.active = "false";
      }
      historyPane.appendChild(defaultDate);
      builtDefault = true;
    }
    // Create all dates from sortedDate
    if (item.date != todayDate) {
      let newDate = document.createElement("date-entry");
      if (activeDates.has(item.date)) {
        newDate.active = "true";
      } else {
        newDate.active = "false";
      }
      newDate.date = item.date;
      historyPane.appendChild(newDate);
    }
  });
  // Build default Today date if not built yet
  if (!builtDefault) {
    let defaultDate = document.createElement("date-entry");
    defaultDate.date = todayDate;
    if (activeDates.has(todayDate)) {
      defaultDate.active = "true";
    } else {
      defaultDate.active = "false";
    }
    historyPane.appendChild(defaultDate);
  }
}

// Update storage when toggling active categories
export function updateActiveCategories(categoryObj, build) {
  let categoryKey = JSON.stringify({
    title: categoryObj.category.title,
    color: categoryObj.category.color,
  });
  if (categoryObj.checked) {
    activeCategories.set(categoryKey);
  } else {
    activeCategories.delete(categoryKey);
  }
  if (build) {
    buildCurrent();
  }
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
