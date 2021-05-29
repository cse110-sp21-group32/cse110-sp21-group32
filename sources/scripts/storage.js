var myStorage = window.localStorage;
var bulletArr;
export var categoryArr;
var dateArr;

// Only store actives in current session
var activeCategories = new Map();
var activeDates = new Map();

if (myStorage.getItem('bulletArr')) {
  bulletArr = JSON.parse(myStorage.getItem('bulletArr'));
  console.log(bulletArr);
} else {
  bulletArr = [];
}
if (myStorage.getItem('categoryArr')) {
  categoryArr = JSON.parse(myStorage.getItem('categoryArr'));
  console.log(categoryArr);
} else {
  categoryArr = [];
}
if (myStorage.getItem('dateArr')) {
  dateArr = JSON.parse(myStorage.getItem('dateArr'));
  console.log(dateArr);
} else {
  dateArr = [];
}

export function updateBullet() {
  myStorage.setItem('bulletArr', JSON.stringify(bulletArr));
}
export function updateCategory() {
  myStorage.setItem('categoryArr', JSON.stringify(categoryArr));
}
export function updateDate() {
  myStorage.setItem('dateArr', JSON.stringify(dateArr));
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
      if (dateItem.date == item.date) {
        dateArr.splice(i, 1);
        updateDate();
        if(activeDates.has(dateItem.date)){
          activeDates.delete(dateItem.date);
          defaultCurrent()
        }
        break;
      }
      i++;
    }
  }
}
// Delete category from storage
export function deleteCategory(obj) {
  // Default all bullets with category to be deleted
  let categoryKey = JSON.stringify(
    {title: obj.category.title, color: obj.category.color});
  bulletArr.forEach(function (item) {
    if (categoryKey == item.category) {
      item.category = "";
    }
  });
  updateBullet();

  let index = 0;
  for (let item of categoryArr) {
    if (JSON.stringify(obj.category) == JSON.stringify(item)) {
      categoryArr.splice(index, 1);
      let categoryKey = JSON.stringify(
        {title: obj.category.title, color: obj.category.color});
      activeCategories.delete(categoryKey);
      break;
    }
    index++
  }
  updateCategory();
}

// Edit bullet in storage
export function editBullet(newBullet, oldBullet) {
  let index = 0;
  oldBullet.checked = false;
  for (let item of bulletArr) {
    if (JSON.stringify(oldBullet) == JSON.stringify(item)) {
      newBullet.checked = false;
      bulletArr[index] = newBullet;
      //console.log(bulletArr[index]);
      break;
    }
    index++;
  }
  updateBullet();
}
// Edit category in storage
export function editCategory(newCategory, oldCategory) {
  let index = 0;
  oldCategory.checked = false;
  for (let item of categoryArr) {
    if (JSON.stringify(oldCategory) == JSON.stringify(item)) {
      newCategory.checked = false;
      categoryArr[index].category = newCategory;
      break;
    }
    index++
  }
  updateCategory();
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
    let newDateObj = { date: newBullet.date, active: 'false' };
    dateArr.push(newDateObj);
    updateDate();
    // Update historyPane with new date
    let historyPane = document.querySelector(".jornal-box-history");
    let newDate = document.createElement("date-entry");
    newDate.date = newBullet.date;
    newDate.active = 'false';
    historyPane.appendChild(newDate);
  }
}
export function addCategory(obj) {
  const newCategory = obj.category;
  categoryArr.push(newCategory);
  updateCategory();
  // If category is active update activeCategories
  if (obj.checked) {
    let categoryKey = JSON.stringify(
      {title: newCategory.title, color: newCategory.color});
    activeCategories.set(categoryKey);
  }
}

// Build initial screen
export function buildDefault() {
  const categoryPane = document.querySelector(".category-box");
  const historyPane = document.querySelector(".jornal-box-history");
  activeCategories.clear();
  activeDates.clear();
  categoryArr.forEach(function (item, index) {
    let newCategory = document.createElement("category-entry");
    categoryArr[index].checked = false;
    item.checked = false;
    newCategory.category = item;
    categoryPane.appendChild(newCategory);
  });
  dateArr.forEach(function (item, index) {
    let newDate = document.createElement("date-entry");
    dateArr[index].active = 'false';
    newDate.date = item.date;
    newDate.active = 'false';
    historyPane.appendChild(newDate);
  });

  // default build all from today
  buildCurrent();
}

// Build current selection of dates and categories
export function buildCurrent() {
  purge();
  const mainPane = document.querySelector(".entry-list");
  // all/today
  if (activeCategories.size == 0 && activeDates.size == 0) {
    let today = new Date();
    let date;
    if(today.getMonth() +1 < 10) {
      date = today.getFullYear() + '-' +'0'+(today.getMonth() + 1) + '-'
        + today.getDate();
    } else{
      date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-'
        + today.getDate();
    }
    bulletArr.forEach(function (item) {
      console.log(item.date);
      console.log(date);
      if (item.date == date) {
        let newBullet = document.createElement('bullet-entry');
        newBullet.bullet = item;
        mainPane.appendChild(newBullet);
      }
    });
  }
  // all/selected days (TODO PUT SORT FUNCTION HERE)
  else if (activeCategories.size == 0) {
    bulletArr.forEach(function (item) {
      if (activeDates.has(item.date)) {
        let newBullet = document.createElement('bullet-entry');
        newBullet.bullet = item;
        mainPane.appendChild(newBullet);
      }
    });
  }
  // all/selected categories
  else if (activeDates.size == 0) {
    bulletArr.forEach(function (item) {
      if (activeCategories.has(item.category)) {
        let newBullet = document.createElement('bullet-entry');
        newBullet.bullet = item;
        mainPane.appendChild(newBullet);
      }
    });
  }
  // Get selected intersection of categories/date (TODO SORT)
  else {
    bulletArr.forEach(function (item) {
      if (activeDates.has(item.date) && activeCategories.has(item.category)) {
        let newBullet = document.createElement('bullet-entry');
        newBullet.bullet = item;
        mainPane.appendChild(newBullet);
      }
    });
  }
}

// Update storage when toggling active categories
export function updateActiveCategories(categoryObj) {
  let categoryKey = JSON.stringify(
    {title: categoryObj.category.title, color: categoryObj.category.color});
  if (categoryObj.checked) {
    // TODO MIGHT BE CRINGE
    activeCategories.set(categoryKey);
  } else {
    activeCategories.delete(categoryKey);
  }
  buildCurrent();
}
// Update storage when toggling active dates
export function updateActiveDates(dateObj) {
  if (dateObj.active == 'true') {
    activeDates.delete(dateObj.date);
    dateObj.active = 'false'
  } else {
    activeDates.set(dateObj.date);
    dateObj.active = 'true';
  }
  buildCurrent();
}
// KILL EVERYTHING
// CALL EVERYTIME ACTIVE CHANGED
// YES I KNOW ITS STUPID
function purge(){
  const mainPane = document.querySelector(".entry-list");
  while (mainPane.firstChild) {
    mainPane.firstChild.remove();
  }
}