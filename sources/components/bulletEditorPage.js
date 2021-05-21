// Class for the bullet Editor Page
class bulletEditorPage extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement("template");

    template.innerHTML = `
          <style>
              /* Add styling to h1 elements */
              .editor-section h1 {
                  color: navy;
                  /* make all h1 elements navy colored */
                  margin: auto;
                  width: 120px;
                  text-align: center;
                  padding-bottom: 40px;
                  padding-top: 40px;
              }

              /* Add styling to form element */
              .editor-section form {
                  text-align: center;
                  width: 20%;
                  flex: 1;
              }

              /* Add styling to main element */
              .editor-section main {
                  display: flex;
                  flex-direction: row;
              }

              /* Add styling to input elements */
              .editor-section input {
                  margin-top: 10px;
                  margin-bottom: 10px;
                  background-color: white;
              }

              /* Add styling to select input fields */
              .editor-section select {
                  margin-top: 10px;
                  margin-bottom: 10px;
                  background-color: white;
              }

              /* Add styling to the submit button */
              .editor-section input[type=submit] {
                  background-color: red;
              }

              /* Add styling to the reset button */
              .editor-section input[type=reset] {
                  background-color: red;
              }

              /* Add styling to the dropdown options */
              .editor-section option {
                  background-color: white;
              }

              /* Add styling to the star option */
              .editor-section p {
                  /*font-size: 30;*/
                  font: larger;
              }

              /* Styling for star checkbox */
              .editor-section .star {
                  visibility: hidden;
                  font-size: 25px;
                  cursor: pointer;
              }
          </style>
          <section class="editor-section">
            <header>
              <h1>
                Bullet Editor
              </h1>
            </header>

            <main>
              <form>
                <input type="checkbox" id="name-check-box" name="name-check-box" value="checked">
                <label for="name">Name:</label>
                <input type="text" id="name" name="name"><br>
                <label for="category">Category:</label>
                <select id="category" name="category">
                  <option value="Category1">Category1</option>
                  <option value="Category2">Category2</option>
                  <option value="Category3">Category3</option>
                  <option value="Category4">Category4</option>
                </select><br>
            
                <label for="type">Type of Item:</label>
                <select id="type" name="type">
                  <option value="note">Note</option>
                  <option value="event">Event</option>
                  <option value="task">Task</option>
                </select><br>
            
                <label for="due-date">Due Date:</label>
                <input type="date" id="due-date" name="due-date"><br>
            
                <!-- Star Checkbox -->            
                <label for="description">Description:</label>
                <input type="text" id="description" name="description"><br>
            
                <input type="submit" value="confirm" id="submit-btn" class="back-main">
                <input type="reset" id="reset-btn" class="back-main">
              </form>
            </main>
          </section>
          `;
    this.attachShadow({ mode: "open" })
    this.shadowRoot.appendChild(template.content.cloneNode(true))

  }

  get bullet(){
    //Return the obeject whith variable settup
    let currentBullet ={
      "title":this.shadowRoot.getElementById("name").value,
      "description":this.shadowRoot.getElementById("description").value,
      "category":this.shadowRoot.getElementById("category").value,
      "type":this.shadowRoot.getElementById("type").value,
      "due-date":this.shadowRoot.getElementById("due-date").value,
      "checked":this.shadowRoot.getElementById("name-check-box").checked

    };
    return currentBullet;
  }

  set bullet(inputBullet){
    //Set up the bullet Editor page if edit an existing bullet
    this.shadowRoot.getElementById("description").value = inputBullet.description;
    this.shadowRoot.getElementById("name").value = inputBullet.title;
    this.shadowRoot.getElementById("category").value = inputBullet.category;
    this.shadowRoot.getElementById("type").value = inputBullet.type;
    this.shadowRoot.getElementById("due-date").value = inputBullet.date;
    if(inputBullet.completedCheck == 0){
      this.shadowRoot.getElementById("name-check-box").checked = false;
    }else{
      this.shadowRoot.getElementById("name-check-box").checked = true;
    }

    //Update variable properties
    this.description = inputBullet.description;
    this.title = inputBullet.title;
    this.category = inputBullet.category;
    this.type = inputBullet.type;
    this.date = inputBullet.date;

    if(inputBullet.completedCheck == 0){
      this.checked = false;
    }else{
      this.checked = true;
    }
  }


}

customElements.define("bullet-editor-page", bulletEditorPage);

/**
 * JSON Format:
 * image and audio will only sometimes be there
 *
 * {
 *   title: "foo",
 *   date: "foo",
 *   content: "foo",
 *   image: {
 *     src: "foo.com/bar.jpg",
 *     alt: "foo"
 *   },
 *   audio: "foo.com/bar.mp3"
 * }
 */
