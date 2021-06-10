import * as storage from "../scripts/storage.js";

class BulletEntry extends HTMLElement {
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
            @keyframes slide-up {
              0% {
                  opacity: 0;
                  transform: translateY(20px);
              }
              100% {
                  transform: translateY(0);
              }
            }

            @keyframes fade-up {
              0% {
                  opacity: 0;
              }
              100% {
                  opacity: 1;
              }
            }

            .bullet-entry .bullet {
              display: flex;
              align-items: center;
              height: 3em;
              font-size: 1.3em;
              background-color: rgba(167, 200, 220, 0.925);
              border-radius: 0.5em;  
              margin:0.3rem;
              text-align: left;
              padding-left: 0.5rem;
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

            .bullet-entry .bullet:hover{
              -webkit-transform: scale(1.035);
              transform: scale(1.035);
            }

            .bullet-entry .bullet-button {
              display:none;

              border: none;
              margin: 0.5rem;
              line-height: 1rem;
              font-size: 1rem;
              border-radius: 0.5em;  
              padding: 8px;
              background-color: rgb(204, 225, 243);
              

              vertical-align: middle;
              -webkit-transform: perspective(1px) translateZ(0);
              transform: perspective(1px) translateZ(0);
              box-shadow: 0 0 1px rgba(0, 0, 0, 0);
              -webkit-transition-duration: 0.3s;
              transition-duration: 0.3s;
              -webkit-transition-property: transform;
              transition-property: transform;
            }

            .bullet-entry .bullet-button:active {
              box-shadow: 0 5px #336699;
              transform: translateY(4px);
            }

            .bullet-entry .bullet-button:hover {
              background-color: rgb(234, 243, 250);
              filter: brightness(135%);
              -webkit-transform: scale(1.1);
              transform: scale(1.1);
            }
            
            .bullet-entry .title {
              text-align: left;
              padding-left: 1rem;
              width: 90%;
              height: 50%;
              display: flex;
              align-items: center;
            }
            .bullet-entry .des{
              overflow:expand;
              display:none;
              align-items: center;
              height: auto;
          
              background-color: rgba(167, 200, 220, 0.925);
              font-size: 1em;
              border-radius: 0.5em;  
              margin:0.5rem;
              text-align: left;
              margin-left: 2rem;
              padding: 0.5rem;
              padding-left: 1.2rem;
              opacity: 1;
            }
            .bullet-entry .date{
                display:none;
            }
            .bullet-entry .category{
                display:none;
            }
            .bullet-entry .type{
                display:none;
            }
            .bullet-entry .completedCheck{
                display:none;
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

            .dash{
              display:none;
              padding:15px;
            }

            .dot{
              display:none;
              padding:15px;
            }

            .editor{
			        border:solid 1px #ccc;
			        padding: 20px;
			        min-height:200px;
              display: block;
            }
            .sample-toolbar{
			        border:solid 1px #ddd;
			        background:#f4f4f4;
			        padding: 5px;
			        border-radius:3px;
            }

            .bullet-entry .bullet:hover i,
            .bullet-entry .bullet:hover #category{
              opacity:1;
            }


            .sample-toolbar > i{
			        cursor:pointer;
		        }

            .sample-toolbar > i:hover{
              color: #d60e96;
		        }

            .bullet > i{
              opacity:0;
              padding-right:3.5%;
              color: #585a5c;
            }
            .bullet > i:hover{
              color: #272a3b;
            }

            #category{
              opacity:0;
              appearance: none;
              background-color: #d1d7de;
              border-radius: 8px;

              border: none;
              border-color: coral;
              
              margin-left: 3%;
              margin-right: 3%;
              padding:1%;
              width: 20%;
              min-width:80px;

              text-align-last:center;
              padding-right: 5px;
              direction: rtl;

              font-family: inherit;
              font-size: inherit;
              cursor: inherit;
              line-height: inherit;

              bac
            }

            #category:hover{
              background-color:#a7b4c2;
            }

            #category:focus{
              outline: none; 
            }






          </style>
          <section class="bullet-entry">
            <div class="bullet">
                <input class="checkbox" type="checkbox" id="bullet-check">
                <span class="dash">-</span>
                <span class="dot">&#8226;</span>
                <span class="title" id="bullet-title"
                  onkeydown="if(event.key == 'Enter'){event.preventDefault()}">
                </span>
                <select id="category" name="category">
                  <option value='{"title":"Default","color":"blue"}'>Default</option>
                  <option value='{"title":"a","color":"blue"}'>a</option>
                  <option value='{"title":"v","color":"blue"}'>v</option>
                  <option value='{"title":"c","color":"blue"}'>c</option>
                </select><br>
                <i class="fas fa-calendar"></i>
                <i class="fas fa-info-circle bullet-detail-button"></i>
                <i class="fas fa-trash" id ="bullet-delete"></i>


                <button class="bullet-button edit-bullet-button">edit</button>
                <button class="bullet-button bullet-detail-button">detail</button>
                <button class="bullet-button bullet-delete-button" id = "bullet-delete">delete</button>

                <span class="category">demo</span>
                <span class="type">demo</span>
                <span class="date">demo</span>

            </div>
            <div class="des">
            	<div class="sample-toolbar">
                <i class="fas fa-bold fa-fw" onclick="format('bold')"></i>
                <i class="fas fa-italic fa-fw" onclick="format('italic')"></i>
                <i class="fas fa-list fa-fw" onclick="format('insertunorderedlist')"></i>
              </div>

              <div class="editor" id="detail-editor" ondblclick="this.contentEditable = true;">
	            </div>
            </div>
          </section>
          `;
    var script = document.createElement( 'script' )
    script.textContent =
    `
      function format(command, value) {
        document.execCommand(command, false, value);
      }`;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.appendChild(script.cloneNode(true));
    
  }

  //Return the current bullet information
  get bullet() {
    let entryObj = {
      title: this.shadowRoot.querySelector(".title").innerText,
      checked: this.shadowRoot.querySelector(".checkbox").checked,
      description: this.shadowRoot.querySelector(".editor").innerText,
      date: this.shadowRoot.querySelector(".date").innerText,
      category: this.shadowRoot.querySelector(".category").innerText,
      type: this.shadowRoot.querySelector(".type").innerText,
    };
    return entryObj;
  }

  //Set the bullet information
  set bullet(newBullet) {
    this.shadowRoot.querySelector(".title").innerText = newBullet.title;
    this.shadowRoot.querySelector(".checkbox").checked = newBullet.checked;
    this.shadowRoot.querySelector(".editor").innerText = newBullet.description;
    this.shadowRoot.querySelector(".date").innerText = newBullet.date;
    this.shadowRoot.querySelector(".category").innerText = newBullet.category;
    this.shadowRoot.querySelector(".type").innerText = newBullet.type;

    if (newBullet.category != "Default") {
      let category = JSON.parse(newBullet.category);

      if (category.color == "Red") {
        this.shadowRoot.querySelector(".bullet").style.backgroundColor =
          "rgba(224, 90, 70,0.5)";
        this.shadowRoot.querySelector(".des").style.backgroundColor =
          "rgba(224, 90, 70,0.5)";
      } else if (category.color == "Yellow") {
        this.shadowRoot.querySelector(".bullet").style.backgroundColor =
          "rgba(229, 191, 106,0.5)";
        this.shadowRoot.querySelector(".des").style.backgroundColor =
          "rgba(229, 191, 106,0.5)";
      } else if (category.color == "Blue") {
        this.shadowRoot.querySelector(".bullet").style.backgroundColor =
          "rgba(167, 200, 220,0.925)";
        this.shadowRoot.querySelector(".des").style.backgroundColor =
          "rgba(167, 200, 220,0.925)";
      } else if (category.color == "Orange") {
        this.shadowRoot.querySelector(".bullet").style.backgroundColor =
          "rgba(224, 138, 87,0.5)";
        this.shadowRoot.querySelector(".des").style.backgroundColor =
          "rgba(224, 138, 87,0.5)";
      } else if (category.color == "Green") {
        this.shadowRoot.querySelector(".bullet").style.backgroundColor =
          "rgba(42, 157, 143,0.5)";
        this.shadowRoot.querySelector(".des").style.backgroundColor =
          "rgba(42, 157, 143,0.5)";
      }
    }

    //Set the bullet type
    if (newBullet.type == "note") {
      this.shadowRoot.querySelector(".checkbox").style.display = "none";
      this.shadowRoot.querySelector(".dash").style.display = "grid";
      this.shadowRoot.querySelector(".dot").style.display = "none";
    } else if (newBullet.type == "task") {
      this.shadowRoot.querySelector(".checkbox").style.display = "grid";
      this.shadowRoot.querySelector(".dash").style.display = "none";
      this.shadowRoot.querySelector(".dot").style.display = "none";
    } else {
      this.shadowRoot.querySelector(".dot").style.display = "grid";
      this.shadowRoot.querySelector(".checkbox").style.display = "none";
      this.shadowRoot.querySelector(".dash").style.display = "none";
    }
  }

  //Shortcut to return entry category
  get category() {
    return this.shadowRoot.querySelector(".category").innerText;
  }

  set category(newCategory) {
    this.shadowRoot.querySelector(".category").innerText = newCategory;
  }

  set checked(flag) {
    this.shadowRoot.querySelector(".checkbox").checked = flag;
  }

  set opacity(newOpacity) {
    if (this.shadowRoot.querySelector(".checkbox").checked == true) {
      this.shadowRoot.querySelector(".bullet").style.opacity = "0.25";
      this.shadowRoot.querySelector(".des").style.opacity = "0.25";
    } else {
      this.shadowRoot.querySelector(".bullet").style.opacity = "1";
      this.shadowRoot.querySelector(".des").style.opacity = "1";
    }
  }

  set showCategoryList(flag){
    if(flag){
      console.log("Check");
    }
  }
}

customElements.define("bullet-entry", BulletEntry);
