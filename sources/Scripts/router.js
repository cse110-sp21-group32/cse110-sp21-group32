// router.js

export const router = {};



//Change the state of html
router.setState = function (inputString, entry) {

  if (inputString.startsWith("BulletEditor") && entry == null) {
    //Bullet editor page for new entry
    history.pushState({ page: "bulletEditor" }, "MainPage", "http://127.0.0.1:5501/sources/#bulletEditor");
    document.querySelector("body").classList.remove("mainView");
    document.querySelector("body").classList.remove("cateEditor");
    document.querySelector("body").classList.add("bulletEditor");

    let entryPageOld = document.querySelector("bullet-editor-page");
    entryPageOld.parentNode.removeChild(entryPageOld);
    let entryPage = document.createElement("bullet-editor-page");
    document.querySelector("body").appendChild(entryPage);

  }else if (inputString.startsWith("backMain")) {
    //Main Page
    history.pushState({ page: "MainPage" }, "MainPage", "http://127.0.0.1:5501/sources/#mainpage");
    document.querySelector("body").classList.remove("bulletEditor");
    document.querySelector("body").classList.remove("cateEditor");
    document.querySelector("body").classList.add("mainView");

  }else if (inputString.startsWith("CateEditor")&& entry==null) {
    //Category page for new entry
    history.pushState({ page: "CateEditor" }, "MainPage", "http://127.0.0.1:5501/sources/#cateEditor");
    document.querySelector("body").classList.remove("bulletEditor");
    document.querySelector("body").classList.remove("mainView");
    document.querySelector("body").classList.add("cateEditor");

    let entryPageOld = document.querySelector("cate-editor-page");
    entryPageOld.parentNode.removeChild(entryPageOld);
    let entryPage = document.createElement("cate-editor-page");
    document.querySelector("body").appendChild(entryPage);

  }else if (inputString.startsWith("BulletEditor") && entry!=null) {
    //Bullet editor page to change existing bullet
    history.pushState({ page: "bulletEditor" }, "MainPage", "http://127.0.0.1:5501/sources/#bulletEditor");
    document.querySelector("body").classList.remove("mainView");
    document.querySelector("body").classList.remove("cateEditor");
    document.querySelector("body").classList.add("bulletEditor");

    let entryPageOld = document.querySelector("bullet-editor-page");
    entryPageOld.parentNode.removeChild(entryPageOld);
    let entryPage = document.createElement("bullet-editor-page");
    entryPage.bullet = entry;
    document.querySelector("body").appendChild(entryPage);
  }else if (inputString.startsWith("CateEditor") && entry!=null) {
    //Category editor page to change existing category
    history.pushState({ page: "CateEditor" }, "MainPage", "http://127.0.0.1:5501/sources/#CateEditor");
    document.querySelector("body").classList.remove("mainView");
    document.querySelector("body").classList.add("cateEditor");
    document.querySelector("body").classList.remove("bulletEditor");

    let entryPageOld = document.querySelector("cate-editor-page");
    entryPageOld.parentNode.removeChild(entryPageOld);
    let entryPage = document.createElement("cate-editor-page");
    entryPage.category = entry;
    document.querySelector("body").appendChild(entryPage);
  }

}
