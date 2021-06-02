// router.js

export const router = {};

/**
 * Changes the "page" (state) that your SPA app is currently set to
 * @param {*} inputString - Used to help decide what to set state to
 * @param {*} entry - lets the function know if we are adding or editing
 * @param {*} list - The category list
 */
router.setState = function (inputString,entry,list) {

  if (inputString.startsWith('BulletEditor') && entry==null) {
    document.querySelector("body").classList.remove("default-view");
    document.querySelector("body").classList.remove("cateEditor");
    document.querySelector("body").classList.add("bulletEditor");

    let entryPageOld = document.querySelector('bullet-editor-page');
    entryPageOld.parentNode.removeChild(entryPageOld);
    let entryPage = document.createElement('bullet-editor-page');
    entryPage.catagoryList=list;
    document.querySelector("body").appendChild(entryPage);

  }else if (inputString.startsWith('backMain')) {
    document.querySelector("body").classList.remove("bulletEditor");
    document.querySelector("body").classList.remove("cateEditor");
    document.querySelector("body").classList.add("default-view");

  }else if (inputString.startsWith('CateEditor')&& entry==null) {
    document.querySelector("body").classList.remove("bulletEditor");
    document.querySelector("body").classList.remove("default-view");
    document.querySelector("body").classList.add("cateEditor");

    let entryPageOld = document.querySelector('cate-editor-page');
    entryPageOld.parentNode.removeChild(entryPageOld);
    let entryPage = document.createElement('cate-editor-page');
    document.querySelector("body").appendChild(entryPage);
    
  }else if (inputString.startsWith('BulletEditor') && entry!=null) {
    document.querySelector("body").classList.remove("default-view");
    document.querySelector("body").classList.remove("cateEditor");
    document.querySelector("body").classList.add("bulletEditor");

    let entryPageOld = document.querySelector('bullet-editor-page');
    entryPageOld.parentNode.removeChild(entryPageOld);
    let entryPage = document.createElement('bullet-editor-page');
    entryPage.catagoryList=list;
    entryPage.bullet=entry.bullet;
    entryPage.old=entry.bullet;
    document.querySelector("body").appendChild(entryPage);
  }else if (inputString.startsWith('CateEditor') && entry!=null) {
    document.querySelector("body").classList.remove("default-view");
    document.querySelector("body").classList.add("cateEditor");
    document.querySelector("body").classList.remove("bulletEditor");

    let entryPageOld = document.querySelector('cate-editor-page');
    entryPageOld.parentNode.removeChild(entryPageOld);
    let entryPage = document.createElement('cate-editor-page');
    entryPage.category=entry.category;
    entryPage.old=entry.category;
    document.querySelector("body").appendChild(entryPage);
  }
}
