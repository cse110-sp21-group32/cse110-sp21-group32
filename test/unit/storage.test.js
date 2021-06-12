import { bulletArr, categoryArr, addCategory, activeCategories, editCategory,deleteCategory,addBullet,editBullet,deleteBullet } from "../../sources/scripts/storage.js";

/**
 * This test will emulate adding a category to local storage
 * by mocking our DB with an array
 */
test("Adding 1 category to local storage", () => {
  let categorylist = categoryArr;
  let category = {
    checked: false,
    color: "Blue",
    title: "first"
  };
  let obj = {
    category: category
  };
  addCategory(obj);
  expect(categorylist[0]["title"]).toBe("first");
  expect(categorylist[0]["color"]).toBe("Blue");
});

/**
 * This test will emulate adding a second category to local storage
 * by mocking our DB with an array
 */
test("Adding a second category to local storage", () => {
  let categorylist = categoryArr;
  let category = {
    checked: false,
    color: "Red",
    title: "second"
  };
  let obj = {
    category: category
  };
  addCategory(obj);
  expect(categorylist[1]["title"]).toBe("second");
  expect(categorylist[1]["color"]).toBe("Red");

});

/**
 * This test will emulate adding multiple categories to local storage
 * by mocking our DB with an array and checking the length of current array
 */
test("Adding multiple categories", () => {
  let categorylist = categoryArr;
  let category1 = {
    checked: false,
    color: "Red",
    title: "fird"
  };
  let obj1 = {
    category: category1
  };
  addCategory(obj1);


  let category2 = {
    checked: false,
    color: "Orrange",
    title: "fourth"
  };
  let obj2 = {
    category: category2
  };
  addCategory(obj2);

  let category3 = {
    checked: false,
    color: "Green",
    title: "Fifth"
  };
  let obj3 = {
    category: category3
  };
  addCategory(obj3);

  //Check the size of the array
  expect(categorylist.length).toBe(5);
});


/**
 * This test will emulate editing a category from local storage
 * by mocking our DB with an array and checking that the length
 * of current array doesn't change
 */
test("Editing a category name and color", () => {
  let categorylist = categoryArr;

  let oldCategory = {
    checked: false,
    color: "Red",
    title: "second"
  };

  let newCategory = {
    checked: false,
    color: "Blue",
    title: "newSecond"
  }
  
  editCategory(newCategory, oldCategory);
  expect(categorylist[1]["title"]).toBe("newSecond");
  expect(categorylist[1]["color"]).toBe("Blue");

  //Size should not be changed
  expect(categorylist.length).toBe(5);
});

/**
 * This test will make sure that active
 * categories are being displayed properly
 */
test("Checking active categories", () => {

  //So far there is only one active category
  expect(activeCategories.size).toBe(0);

  //Modify one category to active 
  let bullet3 = {
    checked: false,
    color: "Green",
    title: "Fifth"
  };
  let bullet3New = {
    checked: true,
    color: "Green",
    title: "Fifth"
  };
  editCategory(bullet3New, bullet3);

  //Check the active categories again
  expect(activeCategories.size).toBe(1);
});

/**
 * This test will emulate removing a category from local storage
 * by mocking our DB with an array and checking that the length
 * of current array doesn't change
 */
test("Removing a category", () => {

  let categorylist = categoryArr;
  let category = {
    checked: false,
    color: "Blue",
    title: "first"
  };
  let obj = {
    category: category
  };
  deleteCategory(obj);

  let category2 = {
    checked: false,
    color: "Blue",
    title: "newSecond"
  }
  let obj2 = {
    category: category2
  };
  deleteCategory(obj2);

  //First check the size
  expect(categorylist.length).toBe(3);
  expect(categorylist[1]["title"]).toBe("fourth");
});

/**
 * Simulates adding a bullet by adding it directly into local storage
 * then calling add_bullet to see if it works appropriately
 */
test("Adding 1 bullet to local storage", () => {
  let bulletList = bulletArr;
  let bullet = {
    category: "{\"title\":\"Default\",\"color\":\"Blue\"}",
    checked: false,
    date: "2021-06-12",
    description: "",
    title: "firstBullet",
    type: "task"
  };
  let obj = {
    bullet: bullet
  };
  addBullet(obj);
  expect(bulletList[0]["title"]).toBe("firstBullet");
  expect(bulletList[0]["category"]).toBe("{\"title\":\"Default\",\"color\":\"Blue\"}");
  expect(bulletList[0]["date"]).toBe("2021-06-12");
});


/**
 * Directly adds a bullet to local storage, then calls the editBullet function
 * to test for appropriate behavior
 */
test("Editing a bullet in local storage", () => {
  let bulletList = bulletArr;
  let oldBullet = {
    category: "{\"title\":\"Default\",\"color\":\"Blue\"}",
    checked: false,
    date: "2021-06-12",
    description: "",
    title: "firstBullet",
    type: "task"
  };
  let newBullet = {
    category: "{\"title\":\"Default\",\"color\":\"Blue\"}",
    checked: true,
    date: "2021-01-12",
    description: "",
    title: "newFirstBullet",
    type: "task"
  };


  editBullet(newBullet,oldBullet);
  expect(bulletList[0]["title"]).toBe("newFirstBullet");
  expect(bulletList[0]["date"]).toBe("2021-01-12");
  expect(bulletList.length).toBe(1);
});

/**
 * Adds a bullet directly to local storage, then calls the deleteBullet function
 * to test for appropriate behavior
 */
test("Deleting a bullet from local storage", () => {
  let bulletList = bulletArr;
  let oldbullet = {
    category: "{\"title\":\"Default\",\"color\":\"Blue\"}",
    checked: true,
    date: "2021-01-12",
    description: "",
    title: "newFirstBullet",
    type: "task"
  };
  
  //Delete bullete
  deleteBullet(oldbullet);
  //Check the size
  expect(bulletList.length).toBe(0);
});


