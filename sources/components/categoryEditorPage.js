class categoryEditorPage extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement('template');

    template.innerHTML = `
          <style>
          *{
            background-color: rgb(255, 255, 255); /* make the background white */
          }
          
          /* Add styling to h1 elements */
          h1{
            color: navy; /* make all h1 elements navy colored */
            margin: auto;
            width: auto;
            text-align: center;
            padding-bottom: 40px;
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
            margin-top: 10px;
            margin-bottom: 10px;
            background-color: white;
          }
          /* Add styling to the submit button */
          input[type=submit]{
            background-color: red;
          }
          /* Add styling to the reset button */ 
          input[type=reset]{
            background-color: red;
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
            background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
          }
          
          /* Modal Content */
          .modal-content {
            background-color: #fefefe;
            margin: auto;
            padding: auto;
            border: 1px solid #888;
            width: 50%;
          }
          
          /* The Close Button */
          .close {
            color: #aaaaaa;
            padding-right: 28px;
            float: right;
            font-size: 28px;
            font-weight: bold;
          }
          
          .close:hover,
          .close:focus {
            color: #000;
            text-decoration: none;
            cursor: pointer;
          }
          </style>
          <div id="myModal" class="modal">
          

          <!-- Modal content -->
          <div class="modal-content">
            <span class="close">&times;</span>
            <div class="modal-header">
              <h1 class="modal-title">Category Editor</h4>
            </div>
            <form onsubmit="return false">
              <input type="checkbox" id="name_check_box" class="checkbox" style="display: none">
              <label for="name">Name:</label>
              <input type="text" id="name" name="name"><br>
              <label for="color">Color:</label>
              <select id="color" name="color">
                <option value="red">Red</option>
                <option value="blue">Blue</option>
                <option value="yellow">Yellow</option>
                <option value="green">Green</option>
                <option value="orange">Orange</option>
                <option value="purple">Purple</option>
                <option value="pink">Pink</option>
                <option value="light blue">Light Blue</option>
              </select><br>
              <input type="submit" value="Confirm" id="cateSubmit">
              <input type="reset" id="reset_btn">        
            </form>
            

          <!-- Main Script -->
          <script src="script.js" type="module"></script>  
          </div>
        
        </div>
          `;

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }
  // Store old values in data-old attribute, if editor opened from edit button
  // This is needed if editor is closed w/o submitting
  get old(){
    if(!this.shadowRoot.querySelector(".checkbox").dataset.old){
      return null;
    }
    let categoryForm = {
      'title': this.shadowRoot.getElementById("name").dataset.old,
      'color': this.shadowRoot.getElementById("color").dataset.old,
      'checked': this.shadowRoot.querySelector(".checkbox").dataset.old,
    };
    return categoryForm;
  }

  set old(inputCategory){
    this.shadowRoot.getElementById("name").dataset.old = inputCategory.title;
    this.shadowRoot.getElementById("color").dataset.old = inputCategory.color;
    this.shadowRoot.querySelector(".checkbox").dataset.old = inputCategory.checked;
  }

  get category(){
    let categoryForm = {
      'title': this.shadowRoot.getElementById("name").value,
      'color': this.shadowRoot.getElementById("color").value,
      'checked': this.shadowRoot.querySelector(".checkbox").checked,
    };
    return categoryForm;
  }

  set category(inputCategory){
    this.shadowRoot.getElementById("name").value = inputCategory.title;
    this.shadowRoot.getElementById("color").value = inputCategory.color;
    this.shadowRoot.querySelector(".checkbox").checked = inputCategory.checked;
  }

}

customElements.define('cate-editor-page', categoryEditorPage);

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
