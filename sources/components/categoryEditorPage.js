// Class for the category editor page
class categoryEditorPage extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement("template");

    template.innerHTML = `
          <style>
              /* Add styling to h1 elements */
              .editorSection h1 {
                  color: navy;
                  /* make all h1 elements navy colored */
                  margin: auto;
                  width: 120px;
                  text-align: center;
                  padding-bottom: 40px;
                  padding-top: 40px;
              }

              /* Add styling to form element */
              .editorSection form {
                  text-align: center;
                  width: 20%;
                  flex: 1;
              }

              /* Add styling to main element */
              .editorSection main {
                  display: flex;
                  flex-direction: row;
              }

              /* Add styling to input elements */
              .editorSection input {
                  margin-top: 10px;
                  margin-bottom: 10px;
                  background-color: white;
              }

              /* Add styling to select input fields */
              .editorSection select {
                  margin-top: 10px;
                  margin-bottom: 10px;
                  background-color: white;
              }

              /* Add styling to the submit button */
              .editorSection input[type=submit] {
                  background-color: red;
              }

              /* Add styling to the reset button */
              .editorSection input[type=reset] {
                  background-color: red;
              }

              /* Add styling to the dropdown options */
              .editorSection option {
                  background-color: white;
              }

              /* Add styling to the star option */
              .editorSection p {
                  /*font-size: 30;*/
                  font: larger;
              }

              /* Styling for star checkbox */
              .editorSection .star {
                  visibility: hidden;
                  font-size: 25px;
                  cursor: pointer;
              }

              .editorSection .star:before {
                  content: "1️⃣";
                  position: absolute;
                  visibility: visible;
                  margin-top: -11px;
                  margin-left: -5px;

              }

              .editorSection .star:checked:before {
                  content: "0️⃣";
                  position: absolute;

              }
          </style>
          <section class="editorSection">
              
            <header>
              <h1>
                Category Editor
              </h1>
              </header>

            <main>
              <form >  
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
                <input type="submit" value="Confirm" id="submit_btn" class="backMain">
                <input type="reset" id="reset_btn" class="backMain">       
              </form>
            </main>

          </section>
          `;

    this.attachShadow({ mode: "open" })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
  }

  get category() {  
    let category={
      "name": this.shadowRoot.getElementById("name").value,
      "color": this.shadowRoot.getElementById("color").value
    };

    return category;
  }

  set category(inputCategory) {
    //Set up the Category Editor page if edit an existing bullet
    this.shadowRoot.getElementById("name").value = inputCategory.title;
    this.shadowRoot.getElementById("color").value = inputCategory.color;

    //Update variable property
    this.name = inputCategory.title;
    this.color = inputCategory.color;
  }

}

customElements.define("cate-editor-page", categoryEditorPage);

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
