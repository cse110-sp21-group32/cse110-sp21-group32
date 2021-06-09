class categoryEditorPage extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement("template");

    template.innerHTML = `
          <style>
            /* Add styling to h1 elements */
            h1{
              color: (9, 44, 82);  
              margin: auto;
              width: auto;
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
            main{
              display: flex;
              flex-direction: row;
            }
            /* Add styling to select input fields */
            select{
              margin-top: 10px;
              margin-bottom: 10px;
              background-color: white;
            }
            /* Add styling to input elements */
            input{
              padding:10px;
              margin-top: 10px;
              margin-bottom: 10px;
              background-color: white;
              border:0;
              box-shadow:0 0 15px 4px rgba(0,0,0,0.06);
            }
            /* Add styling to the submit button */
            input[type=submit]{
              margin: 1rem;
              width:5rem;
            
              border: none;
              background-color: rgb(75, 164, 220);
              padding: 0.7rem;
            }
            /* Add styling to the reset button */ 
            input[type=reset]{
              margin: 1rem;
              width:5rem;
              border: none;
            
              background-color: rgb(75, 164, 220);
              padding: 0.7rem;
            
            }
            /* Add styling to the dropdown options */ 
            option{
              background-color: white;
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
              background-color: rgb(0,0,0); /* Fallback color */
              background-color: rgba(0,0,0,0.65); /* Black w/ opacity */
            }
            
            /* Modal Content */
            .modal-content {
              background-color: rgb(173, 210, 244); /* make the background white */
              border-radius: 3em; 
              margin: auto;
              padding: 3rem;
              border: 1px solid #888;
              width: 50%;
              height:35%;
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

            .warning {
              display:none;
              background-color: rgb(239,223,222);
              border-radius: 1em; 
              padding: 10px;
              color: rgb(157,74,70);
            }
          </style>
          <div id="my-modal" class="modal">
          

          <!-- Modal content -->
          <div class="modal-content">
            <span class="close">&times;</span>
            <div class="modal-header">
              <h1 class="modal-title">Category Editor</h4>
            </div>
            <form onsubmit="return false">
              <input type="checkbox" id="name-check-box" class="checkbox" style="display: none">
              <input type="text" id="name" name="name" placeholder="Name"><br>
              <select id="color" name="color">
                <option value="Blue">Blue</option>
                <option value="Red">Red</option>
                <option value="Yellow">Yellow</option>
                <option value="Orange">Orange</option>
                <option value="Green">Green</option>

              </select><br>
              <input type="submit" value="Confirm" id="cate-submit">
              <input type="reset" id="reset-btn">    
              
              <div class="warning duplicate"><strong>Error: </strong>New category with duplicate name and color</div> 
              <div class="warning length"><strong>Error: </strong>Category name maximum length is 10 letters</div> 

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
    if (!this.shadowRoot.getElementById("color").dataset.old) {
      return null;
    }
    let categoryForm = {
      title: this.shadowRoot.getElementById("name").dataset.old,
      color: this.shadowRoot.getElementById("color").dataset.old,
      checked: this.shadowRoot.querySelector(".checkbox").dataset.old,
    };
    return categoryForm;
  }

  /**
   * Sets the category to inputCategory
   */
  set old(inputCategory) {
    this.shadowRoot.getElementById("name").dataset.old = inputCategory.title;
    this.shadowRoot.getElementById("color").dataset.old = inputCategory.color;
    this.shadowRoot.querySelector(".checkbox").dataset.old =
      inputCategory.checked;
  }

  /**
   * Return the current category information on the page
   */
  get category() {
    let categoryForm = {
      title: this.shadowRoot.getElementById("name").value,
      color: this.shadowRoot.getElementById("color").value,
      checked: this.shadowRoot.querySelector(".checkbox").checked,
    };
    return categoryForm;
  }

  /**
   * Set the current category information on the page
   */
  set category(inputCategory) {
    this.shadowRoot.getElementById("name").value = inputCategory.title;
    this.shadowRoot.getElementById("color").value = inputCategory.color;
    this.shadowRoot.querySelector(".checkbox").checked = inputCategory.checked;
  }

  //Duplicate warning
  set duplicate(flag) {
    if (flag) {
      this.shadowRoot.querySelector(".duplicate").style.display =
        "grid";
      setTimeout(() => {
        this.shadowRoot.querySelector(".duplicate").style.display =
          "none";
      }, 3000);
    }
  }

  set lengthViolate(flag) {
    if (flag) {
      this.shadowRoot.querySelector(".length").style.display =
        "grid";
      setTimeout(() => {
        this.shadowRoot.querySelector(".length").style.display =
          "none";
      }, 3000);
    }
  }
}

customElements.define("cate-editor-page", categoryEditorPage);

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
