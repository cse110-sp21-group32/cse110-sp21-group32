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

            .sample-toolbar > i{
			        cursor:pointer;
		        }

            .sample-toolbar > i:hover{
              color: #d60e96;
		        }

            .bullet > i{
              padding-right:3.5%;
              color: #585a5c;
            }
            .bullet > i:hover{
              color: #272a3b;
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
                <select id="type" name="type">
                  <option value="task">Task</option>
                  <option value="note">Note</option>
                  <option value="event">Event</option>
                </select><br>
                <i class="fas fa-tags"></i>
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
                <i class="fas fa-bold fa-fw" onmousedown="event.preventDefault();" onclick="document.execCommand('bold', false);"></i>
                <i class="fas fa-italic fa-fw" onmousedown="event.preventDefault();" onclick="document.execCommand('italic', false);"></i>
                <i class="fas fa-list fa-fw" onmousedown="event.preventDefault();" onclick="document.execCommand('insertunorderedlist', false);"></i>
              </div>

              <div class="editor" id="detail-editor" ondblclick="this.contentEditable = true;">
	            </div>
            </div>
          </section>
          `;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  //Return the current bullet information
  get bullet() {
    let entryObj = {
      title: this.shadowRoot.querySelector(".title").innerText,
      checked: this.shadowRoot.querySelector(".checkbox").checked,
      description: this.shadowRoot.querySelector(".editor").innerHTML,
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
    this.shadowRoot.querySelector(".editor").innerHTML = newBullet.description;
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
}

customElements.define("bullet-entry", BulletEntry);
