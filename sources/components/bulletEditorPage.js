class bulletEditorPage extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement("template");

    template.innerHTML = `
          <style>
            /* Add styling to h1 elements */
            h1 {
              color: (9, 44, 82); /* make all h1 elements navy colored */
              margin: auto;
              width: 300px;
              text-align: center;
              padding-bottom: 1rem;
              padding-top: 40px;
            }
            
            /* Add styling to form element */
            form {
            
              text-align: center;
              width: 100%;
              flex: 1;
            }
            
            /* Add styling to main element */
            main {
              display: flex;
              flex-direction: row;
            }
            /* Add styling to input elements */
            input {
              padding:10px;
              margin-top: 10px;
              margin-bottom: 10px;
              background-color: white;
              border:0;
              box-shadow:0 0 15px 4px rgba(0,0,0,0.06);
            }
            
            /* Add styling to the submit button */
            input[type="submit"] {
            
              margin: 0.5rem;
              width: 5rem;
              border: none;
              font-size: 1rem;
              background-color: rgb(75, 164, 220);
              padding: 0.7rem;
            }
            /* Add styling to the reset button */
            input[type="reset"] {
              margin: 1rem;
              width: 5rem;
              border: none;
              font-size: 1rem;
              background-color: rgb(75, 164, 220);
              padding: 0.7rem;
            }
            /* Add styling to the dropdown options */
            option {
              background-color: white;
            }
            /* Add styling to the star option */
            p {
              /*font-size: 30;*/
              font: larger;
            }
            
            /* Styling for star checkbox */
            .star {
              visibility: hidden;
              font-size: 25px;
              cursor: pointer;
            }
            /* The Modal (background) */
            .modal {
              display: block; /* Hidden by default */
              position: fixed; /* Stay in place */
              z-index: 1; /* Sit on top */
              padding-top: 100px; /* Location of the box */
              left: 0;
              top: 0;
              width: 100%; /* Full width */
              height: 100%; /* Full height */
              overflow: auto; /* Enable scroll if needed */
              background-color: rgb(255, 255, 255); /* Fallback color */
              background-color: rgba(0, 0, 0, 0.65); /* Black w/ opacity */
            }
            
            /* Modal Content */
            .modal-content {
              background-color: rgb(173, 210, 244); /* make the background white */
              border-radius: 3em;
              margin: auto;
              padding: 2rem;
              width: 50%;
            }
            
            /* The Close Button */
            .close {
              display: none;
            }
            
            .close:hover,
            .close:focus {
              color: #000;
              text-decoration: none;
              cursor: pointer;
            }
            
            /* Add styling to select input fields */
            select {
              padding: 10px;
              width: 10.5rem;
              height: 3rem;
              box-shadow:0 0 15px 4px rgba(0,0,0,0.06);
              margin-top: 10px;
              margin-bottom: 10px;
              background-color: white;
              color: rgb(130, 130, 130);
            
            }

            #name-check-box {
              display:none;
            }
            
          </style>
          <!-- The Modal -->
          <div id="myModal" class="modal">
          
            <!-- Modal content -->
            <div class="modal-content">
            <span class="close">&times;</span>    
            <div class="modal-header">
              <h1 class="modal-title">Bullet Editor</h4>
                <form onsubmit="return false">
                  <input type="checkbox" id="name-check-box" name="name-check-box">
                  <input type="text" id="name" name="name" placeholder="Title"><br>
                  <input type="text" id="description" name="description" placeholder="Detail"><br>
        
        
                  <select id="category" name="category">
                    <option value="placeholder">Select a category</option>
                    <option value="Category1">Category1</option>
                    <option value="Category2">Category2</option>
                    <option value="Category3">Category3</option>
                    <option value="Category4">Category4</option>
                  </select><br>
            
                  <select id="type" name="type">
                    <option value="placeholder">Select a type</option>
                    <option value="note">Note</option>
                    <option value="event">Event</option>
                    <option value="task">Task</option>
                  </select><br>
        
            
                  <input type="submit" value="Confirm" id="bulletSubmit">
                  <input type="reset" id="reset-btn">
                </form>
            
              <!-- Main Script -->
              <script src="script.js" type="module"></script>
            
          </div>
          
          </div>
          `;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  /**
   * Store old values in data-old attribute, if editor opened from edit button
   * This is needed if editor is closed w/o submitting
   */
  get old() {
    let bulletForm = {
      description: this.shadowRoot.getElementById("description").dataset.old,
      title: this.shadowRoot.getElementById("name").dataset.old,
      category: this.shadowRoot.getElementById("category").dataset.old,
      type: this.shadowRoot.getElementById("type").dataset.old,
      // date: this.shadowRoot.getElementById("due-date").dataset.old,
      // checked: this.shadowRoot.getElementById("name-check-box").dataset.old,
    };
    return bulletForm;
  }
  
  /**
   * Sets the values in the old bullet entry to the values of inputBullet
   */
  set old(inputBullet) {
    this.shadowRoot.getElementById("description").dataset.old =
      inputBullet.description;
    this.shadowRoot.getElementById("name").dataset.old = inputBullet.title;
    this.shadowRoot.getElementById("category").dataset.old =
      inputBullet.category;
    this.shadowRoot.getElementById("type").dataset.old = inputBullet.type;
    // this.shadowRoot.getElementById("due-date").dataset.old = inputBullet.date;
    // this.shadowRoot.getElementById("name-check-box").dataset.old =
    // inputBullet.checked;
  }

  /**
   * Gets and returns a bulletForm
   */
  get bullet() {
    let current = new Date();
    let min = current.getMinutes();
    let bulletForm = {
      description: this.shadowRoot.getElementById("description").value,
      title: this.shadowRoot.getElementById("name").value,
      category: this.shadowRoot.getElementById("category").value,
      type: this.shadowRoot.getElementById("type").value,
      // date: this.shadowRoot.getElementById("due-date").value,
      // checked: this.shadowRoot.getElementById("name-check-box").checked,
      date: min
    };
    return bulletForm;
  }

  /**
   * Sets this to inputBullet
   */
  set bullet(inputBullet) {
    this.shadowRoot.getElementById("description").value =
      inputBullet.description;
    this.shadowRoot.getElementById("name").value = inputBullet.title;

    //Set the correct category
    let sel = this.shadowRoot.getElementById("category");
    let opts = sel.options;
    for (var opt, j = 0; (opt = opts[j]); j++) {
      if (opt.value == inputBullet.category) {
        sel.selectedIndex = j;
        break;
      }
    }
    
    this.shadowRoot.getElementById("type").value = inputBullet.type;
    // this.shadowRoot.getElementById("due-date").value = inputBullet.date;
    // this.shadowRoot.getElementById("name-check-box").checked =
    //   inputBullet.checked;
  }

  /**
   *  Set the category list of the editor page
   */
  set catagoryList(inputList) {
    let categorySelect = this.shadowRoot.getElementById("category");
    var length = categorySelect.options.length;
    for (let i = length - 1; i >= 0; i--) {
      categorySelect.options[i] = null;
    }

    inputList.forEach((cateName) => {
      // create new option element
      var opt = document.createElement("option");

      // create text node to add to option element (opt)
      opt.appendChild(document.createTextNode(cateName));

      // set value property of opt
      opt.value = cateName;

      // add opt to end of select box (sel)
      categorySelect.appendChild(opt);
    });
  }
}

customElements.define("bullet-editor-page", bulletEditorPage);

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
