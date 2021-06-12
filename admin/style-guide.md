# Styling/Operating Guide 

*for `git/file-names` and `JS/HTML/CSS`*

**Table of Contents**

1. [Github](#Github)
2. [JS](#JS)
3. [HTML/CSS](#HTML/CSS)


## Github
**Branch/commit workflow**
1. Create a new branch in the format of `team/feature` ex: (`team0/feature-thing`)
2. Push all changes to that branch
3. Open pull request when ready
4. Pull request will be reviewed and undergo CI/CD actions

**Pull Requests/Committing**
* Commit messages should be short
* Always make a pull request: never commit to main directly

**Issues**
* When creating issues, tag the people who are working on it
* Describe problems as thoroughly as possible
* Add appropriate tags

**File-naming**
* Spinal casing `file-name`
* Don't change filenames


## JS
* General Rule: favor longer, specific variables (within reason)
* Every variable except iterators should have a comment
* Discuss encapsulation/OOP design with team/admin
* Keep `CSS/HTML` out of JS: do formating with classes (see LE12)
* Space 2 tabbing
* Prefer using template literals over string concatenation for compound strings
* Try to avoid over 80 character lines when possible 

```JavaScript

let a = 3;

// Template Literals
log(`value of a: ${a}`);

// Concatenation 
log("value of a: " + a);
```

* Comment Annotations:
```Javascript
// TODO - Code to complete, indicate details if possible
// HACK - Shortcut or ugly workaround.  Indicate owner, date, and details of the hack
// XXX - Indicates problem code to be fixed ASAP, but you can make your own obviously!
// FIXME - Indicates lower priority problems
// REVIEW - Indicates code needs review
```
* Commenting 
  * avoid code rot: leaving commented out code in the pull request
  * code rot is ok in pushes, just not pull requests 

* Private Attributes: `__prefix`
  * follow the appropriate styling but prefix with double underscore `_`
* Class: Normal Case: `MyClass`
* Functions: Snake Case: `my_fun()`
  * Anonymous functions are classified as varaibles and should follow the variable styling scheme
```JavaScript
// JSDoc Template
/**
 * Description of function purpose
 * @param {type} varName Variable Description
 * @return {type} Variable description
 */
 function my_fun() {
  // code...
 }
```
* Variable: Hungarian Case: `typeVarName`
```JavaScript
let strMyName;
let boolLike;
let numAge;
let arrStooges;
let objConfig; // Object Literals
```
* Constant: Screaming Snake Case: `TYPE_MY_CONST`
```JavaScript
let strMyName;
let boolLike;
let numAge;
let arrStooges;
let objConfig; // Object Literals
```


## HTML/CSS
- [X] Space 2 tabbing
- [X] Keep `JS` out of these
- [X] Indent child elements
- [ ] Every selector in CSS should have a comment explaining what it's for
- [X] Element names should be lower case
- [X] Attribute names should be lower case
- [X] Quote attribute values
- [X] Always specify `alt` width and height dimensions for images

* Class: [BEM "Block Element Modifier"](https://www.freecodecamp.org/news/css-naming-conventions-that-will-save-you-hours-of-debugging-35cea737d849/)
  * Block: general name of the base HTML tag that we're working with: `journal-entry`
  * Element: a sub-attribute of a block: `journal-entry__title`
  * Modifier: a variation of the base HTML block `journal-entry--special`

