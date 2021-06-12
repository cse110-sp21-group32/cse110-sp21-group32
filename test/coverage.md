# Coverage of tests

## E2E Category
```bash
$ npm test category.test.js

> cse110-sp21-group32@1.0.0 test /Users/gtierrez_andres/Desktop/cse110-sp21-group32
> jest --coverage "category.test.js"

 PASS  test/e2e/category.test.js (39.963 s)
  Adding categories
    ✓ test 1: Add category opens up inline-editor (6096 ms)
    ✓ test 2: Options to edit are Name and Color (5587 ms)
    ✓ test 3: Check for existence by checking category count (1013 ms)
  Display categories
    ✓ test 4: Name of category correctly displayed (1011 ms)
    ✓ test 5: Category displays proper color
  Selecting categories
    ✓ test 6: Selected categories show in Focus (3796 ms)
    ✓ test 7: Select all button functions appropriately (3027 ms)
    ✓ test 8: Deselect all button functions appropriately (3031 ms)
  Category storage
    ✓ test 9: Categories persist after refresh (2116 ms)
  Deleting categories
    ✓ test 10: Deleted category disappears from right side list (4055 ms)
  Editing categories
    ✓ test 11: Category with edited color changes color (3055 ms)

----------|---------|----------|---------|---------|-------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------|---------|----------|---------|---------|-------------------
All files |       0 |        0 |       0 |       0 |
----------|---------|----------|---------|---------|-------------------
Test Suites: 1 passed, 1 total
Tests:       11 passed, 11 total
Snapshots:   0 total
Time:        41.861 s
Ran all test suites matching /category.test.js/i.
```

## E2E Bullet
```bash
$ npm test bullet.test.js

> cse110-sp21-group32@1.0.0 test /Users/gtierrez_andres/Desktop/cse110-sp21-group32
> jest --coverage "bullet.test.js"

 PASS  test/e2e/bullet.test.js (13.886 s)
  Text Layout Loaded
    ✓ test 1: Read Day header (2531 ms)
    ✓ test 2: Read Focus header (2021 ms)
    ✓ test 3: Read Categories header (2029 ms)
  Bullet Editor
    ✓ test 4: Title can be entered (1 ms)
    ✓ test 5: Description can be entered
    ✓ test 6: Category choices reflect categories available
    ✓ test 7: Tests type inputs
  Viewing bullets
    ✓ test 8: Title shows correctly
    ✓ test 9: Description shows under details
    ✓ test 10: Correctly tagged with category
    ✓ test 11: Correctly colored by category
    ✓ test 12: Type of bullet correctly marked

----------|---------|----------|---------|---------|-------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------|---------|----------|---------|---------|-------------------
All files |       0 |        0 |       0 |       0 |
----------|---------|----------|---------|---------|-------------------
Test Suites: 1 passed, 1 total
Tests:       12 passed, 12 total
Snapshots:   0 total
Time:        14.692 s
Ran all test suites matching /bullet.test.js/i.

```

## Unit Storage
```
% npm test storage.test.js                                                                                 12:05:55 AM

> cse110-sp21-group32@1.0.0 test /Users/gtierrez_andres/Desktop/cse110-sp21-group32
> jest --coverage "storage.test.js"

 PASS  test/unit/storage.test.js
  ✓ Adding 1 category to local storage (8 ms)
  ✓ Adding a second category to local storage
  ✓ Adding multiple categories (1 ms)
  ✓ Editing a category name and color (1 ms)
  ✓ Checking active categories (1 ms)
  ✓ Removing a category (1 ms)
  ✓ Adding 1 bullet to local storage (2 ms)
  ✓ Editing a bullet in local storage (1 ms)
  ✓ Deleting a bullet from local storage (1 ms)

------------|---------|----------|---------|---------|------------------------------------------------------------------------------------------------
File        | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
------------|---------|----------|---------|---------|------------------------------------------------------------------------------------------------
All files   |   50.89 |    36.46 |   39.29 |   50.89 |
 storage.js |   50.89 |    36.46 |   39.29 |   50.89 | 11-12,17-18,23-24,35,38,88,107-108,130,173,180-181,191,206-208,256,263-264,286-455,471,476-492
------------|---------|----------|---------|---------|------------------------------------------------------------------------------------------------
Test Suites: 1 passed, 1 total
Tests:       9 passed, 9 total
Snapshots:   0 total
Time:        2.877 s
Ran all test suites matching /storage.test.js/i.
```