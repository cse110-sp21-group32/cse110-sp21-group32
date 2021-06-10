class CategoryEntry extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement("template");

    template.innerHTML = `
          <head>
          <link rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.6.3/css/all.css"
            crossorigin="anonymous">
          </head>
          <style>
          @keyframes fade-up {
            0% {
                opacity: 0;
            }
            100% {
                opacity: 1;
            }
          }
          .cate-entry {
            animation: slide-up 0.4s ease;

            vertical-align: middle;
            -webkit-transform: perspective(1px) translateZ(0);
            transform: perspective(1px) translateZ(0);
            box-shadow: 0 0 1px rgba(0, 0, 0, 0);
            -webkit-transition-duration: 0.3s;
            transition-duration: 0.3s;
            -webkit-transition-property: transform;
            transition-property: transform;
          }

           .cate-entry .category-inner-entry{
              height: 3.5em;
              font-size: 2em;
              background-color:  rgba(167, 200, 220, 0.925);
              border-radius: 0.5em;  
              margin:0.3rem;
              display: flex;
              justify-items: center;
              align-items: center;
              padding: 0.5rem;

              vertical-align: middle;
              -webkit-transform: perspective(1px) translateZ(0);
              transform: perspective(1px) translateZ(0);
              box-shadow: 0 0 1px rgba(0, 0, 0, 0);
              -webkit-transition-duration: 0.3s;
              transition-duration: 0.3s;
              -webkit-transition-property: transform;
              transition-property: transform;
            }

            .cate-entry .category-inner-entry:hover{
              -webkit-transform: scale(1.035);
              transform: scale(1.035);
            }
          
            .cate-entry .cate-button {
              display: none;

              margin: 0.5rem;
              font-size: 1rem;
              border: none;
              margin: 0.5rem;
              line-height: 1rem;
              font-size: 1rem;
              border-radius: 0.5em;  
              padding: 8px;
              background-color: rgb(204, 225, 243);
              line-height: 3rem;

              vertical-align: middle;
              -webkit-transform: perspective(1px) translateZ(0);
              transform: perspective(1px) translateZ(0);
              box-shadow: 0 0 1px rgba(0, 0, 0, 0);
              -webkit-transition-duration: 0.3s;
              transition-duration: 0.3s;
              -webkit-transition-property: transform;
              transition-property: transform;
            }

            .cate-entry .cate-button:hover {
              background-color: rgb(234, 243, 250);
              filter: brightness(135%);
              -webkit-transform: scale(1.1);
              transform: scale(1.1);
            }

            .cate-entry .color {
              display:none
            }
            .cate-entry .title {
              text-align: center;
              width: 70%;
              min-width: 30px;
              min-height: 30px;
            }
            .checkbox {
              -webkit-appearance: none;
              background-color: #fafafa;
              padding: 15px;
              border-radius: 3px;
              display: inline-block;
              position: relative;
            }
            
            .checkbox:checked:after {
              content: "\u2714";
              font-size: 50px;
              position: absolute;
              top: -20px;
              left: 5px;
              color: #0994ff;
              animation: fade-up 0.8s ease;
            }

            .category-inner-entry:hover i,
            .category-inner-entry:hover #color{
              opacity:1;
            }

            .category-inner-entry > i{
              opacity:0;
              padding-right:5%;
              padding-left:1%;
              color: #585a5c;
            }
            .category-inner-entry > i:hover{
              color: #272a3b;
            }

            #color{
              opacity:0;
              appearance: none;
              background-color: #d1d7de;
              border-radius: 8px;

              border: none;
              border-color: coral;
              
              margin-left: 3%;
              margin-right: 3%;
              padding:1%;
              width: 35%;
              height: 50%;
              min-width: 55px;

              text-align-last:center;
              padding-right: 5px;
              direction: rtl;

              font-family: inherit;
              font-size: 15px;
              cursor: inherit;
              line-height: inherit;
            }

            #color:hover{
              background-color:#a7b4c2;
            }

            #color:focus{
              outline: none; 
            }
          </style>
          <section class="cate-entry">
            <div class="category-inner-entry">
              <input class="checkbox" type="checkbox" id="category-check">
              <span class="title" id="category-title" onkeydown="if(event.key == 'Enter'){event.preventDefault()}">demo</span>
              <select id="color" name="color">
                <option value="Blue">Blue</option>
                <option value="Red">Red</option>
                <option value="Yellow">Yellow</option>
                <option value="Orange">Orange</option>
                <option value="Green">Green</option>
              </select><br>
              <i class="fas fa-trash" id="cate-delete"></i>
              <button class="cate-button" id="cate-edit">edit</button>
              <button class="cate-button" id="cate-delete">delete</button>

            </div>
          </section>
          `;

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  /**
   * Get the category information
   */
  get category() {
    let categoryObj = {
      title: this.shadowRoot.getElementById("category-title").innerText,
      color: this.shadowRoot.getElementById("color").value,
      checked: this.shadowRoot.getElementById("category-check").checked,
    };
    return categoryObj;
  }

  /**
   * Set the category information
   */
  set category(newCategory) {
    this.shadowRoot.getElementById("category-title").innerText =
      newCategory.title;
    this.shadowRoot.getElementById("color").value =
      newCategory.color;
    if (newCategory.color == "Red") {
      this.shadowRoot.querySelector(
        ".category-inner-entry"
      ).style.backgroundColor = "rgba(224, 90, 70,0.5)";
      this.shadowRoot.getElementById(
        "cate-edit"
      ).style.backgroundColor = "#ebd8d5";
    } else if (newCategory.color == "Yellow") {
      this.shadowRoot.querySelector(
        ".category-inner-entry"
      ).style.backgroundColor = "rgba(229, 191, 106,0.5)";
      this.shadowRoot.getElementById(
        "cate-edit"
      ).style.backgroundColor = "#ebe5d5";
    } else if (newCategory.color == "Blue") {
      this.shadowRoot.querySelector(
        ".category-inner-entry"
      ).style.backgroundColor = "rgba(167, 200, 220,0.925)";
    } else if (newCategory.color == "Orange") {
      this.shadowRoot.querySelector(
        ".category-inner-entry"
      ).style.backgroundColor = "rgba(224, 138, 87,0.5)";
      this.shadowRoot.getElementById(
        "cate-edit"
      ).style.backgroundColor = "#ebdfd5";
    }else if (newCategory.color == "Green") {
      this.shadowRoot.querySelector(
        ".category-inner-entry"
      ).style.backgroundColor = "rgba(42, 157, 143,0.5)";
      this.shadowRoot.getElementById(
        "cate-edit"
      ).style.backgroundColor = "#d5ebd7";
    }

    this.shadowRoot.getElementById("category-check").checked =
      newCategory.checked;
  }

  /**
   * Quickly check if this category is checked
   */
  get checked() {
    return this.shadowRoot.getElementById("category-check").checked;
  }

  /**
   * Set the the check box
   */
  set checked(flag) {
    this.shadowRoot.getElementById("category-check").checked = flag;
  }

  /**
   * Set the defualt category 
   */
  set default(param) {
    this.shadowRoot.getElementById("color").style.display = "none";
    this.shadowRoot.getElementById("cate-delete").remove();
    this.shadowRoot.getElementById("category-title").name = "default-category";
  }
}

customElements.define("category-entry", CategoryEntry);

/**
 * JSON Format:
 * image and audio will only sometimes be there
 *
 * {
 *   title: 'foo',
 *   date: 'foo',
 *   content: 'foo',
 *   image: {
 *     src: 'foo.com/bar.jpg',
 *     alt: 'foo'
 *   },
 *   audio: 'foo.com/bar.mp3'
 * }
 */
