import * as storage from "../scripts/storage.js";

class BulletEntry extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement("template");

    template.innerHTML = `
          <style>

            .bullet-entry .bullet{
              display: flex;
              align-items: center;
              height: 3em;
              font-size: 1.3em;
              background-color: rgba(167, 200, 220, 0.925);
              border-radius: 0.5em;  
              margin:0.3rem;
              text-align: left;
              padding-left: 0.5rem;
            
            }
            
            .bullet-entry .bullet-button {
              border: none;
              margin: 0.5rem;
              line-height: 1rem;
              font-size: 1rem;
              border-radius: 0.5em;  
              padding: 8px;
              background-color: rgb(204, 225, 243)
            }

            .bullet-entry .bullet-button:hover {
              background-color: rgb(234, 243, 250)
            }
            
            .bullet-entry .title {
              text-align: left;
              padding-left: 1rem;
              width: 90%;
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
            }
            .dash{
              display:none;
              padding:15px;
            }

            .dot{
              display:none;
              padding:15px;
            }
            
          </style>
          <section class="bullet-entry">
            <div class="bullet">
                <input class="checkbox" type="checkbox" id="bullet-check">
                <span class="dash">-</span>
                <span class="dot">&#8226;</span>
                <span class="title">demo</span>
                <button class="bullet-button edit-bullet-button">edit</button>
                <button class="bullet-button bullet-detail-button">detail</button>
                <button class="bullet-button bullet-delete-button" id = "bullet-delete">delete</button>

                <span class="category">demo</span>
                <span class="type">demo</span>
                <span class="date">demo</span>

            </div>
            <div class="des">
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
      description: this.shadowRoot.querySelector(".des").innerText,
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
    this.shadowRoot.querySelector(".des").innerText = newBullet.description;
    this.shadowRoot.querySelector(".date").innerText = newBullet.date;
    this.shadowRoot.querySelector(".category").innerText = newBullet.category;
    this.shadowRoot.querySelector(".type").innerText = newBullet.type;

    if (newBullet.category != "Default") {
      let category = JSON.parse(newBullet.category);

      if (category.color == "Red") {
        this.shadowRoot.querySelector(
          ".bullet"
        ).style.backgroundColor = "rgba(224, 90, 70,0.8)";
        this.shadowRoot.querySelector('.des').style.backgroundColor = "rgba(224, 90, 70,0.8)";
        this.shadowRoot.querySelector('.edit-bullet-button').style.backgroundColor="#ebd8d5";
        this.shadowRoot.querySelector('.bullet-detail-button').style.backgroundColor="#ebd8d5";
        this.shadowRoot.querySelector('.bullet-delete-button').style.backgroundColor="#ebd8d5";

      } else if (category.color == "Yellow") {
        this.shadowRoot.querySelector(
          ".bullet"
        ).style.backgroundColor = "rgba(229, 191, 106,0.8)";
        this.shadowRoot.querySelector('.des').style.backgroundColor = "rgba(229, 191, 106,0.8)";
        this.shadowRoot.querySelector('.edit-bullet-button').style.backgroundColor="#ebe5d5";
        this.shadowRoot.querySelector('.bullet-detail-button').style.backgroundColor="#ebe5d5";
        this.shadowRoot.querySelector('.bullet-delete-button').style.backgroundColor="#ebe5d5";
      } else if (category.color == "Blue") {
        this.shadowRoot.querySelector(
          ".bullet"
        ).style.backgroundColor = "rgba(167, 200, 220,0.925)";
        this.shadowRoot.querySelector('.des').style.backgroundColor = "rgba(167, 200, 220,0.925)";

      } else if (category.color == "Orange") {
        this.shadowRoot.querySelector(
          ".bullet"
        ).style.backgroundColor = "rgba(224, 138, 87,0.8)";
        this.shadowRoot.querySelector('.des').style.backgroundColor = "rgba(224, 138, 87,0.8)";
        this.shadowRoot.querySelector('.edit-bullet-button').style.backgroundColor="#ebdfd5";
        this.shadowRoot.querySelector('.bullet-detail-button').style.backgroundColor="#ebdfd5";
        this.shadowRoot.querySelector('.bullet-delete-button').style.backgroundColor="#ebdfd5";
      }else if (category.color == "Green") {
        this.shadowRoot.querySelector(
          ".bullet"
        ).style.backgroundColor = "rgba(42, 157, 143,0.8)";
        this.shadowRoot.querySelector('.des').style.backgroundColor = "rgba(42, 157, 143,0.8)";
        this.shadowRoot.querySelector('.edit-bullet-button').style.backgroundColor="#d5ebd7";
        this.shadowRoot.querySelector('.bullet-detail-button').style.backgroundColor="#d5ebd7";
        this.shadowRoot.querySelector('.bullet-delete-button').style.backgroundColor="#d5ebd7";
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
}

customElements.define("bullet-entry", BulletEntry);
