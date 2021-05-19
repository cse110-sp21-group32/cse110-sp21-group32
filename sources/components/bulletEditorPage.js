class bulletEditorPage extends HTMLElement {
  constructor() {
    super();

    const template = document.createElement('template');

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
          </style>
          <section class="editorSection">
            <header>
              <h1>
                Bullet Editor
              </h1>
            </header>

            <main>
              <form>
                <input type="checkbox" id="name_check_box" name="name_check_box" value="checked">
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
            
                <label for="dueDate">Due Date:</label>
                <input type="date" id="dueDate" name="dueDate"><br>
            
                <!-- Star Checkbox -->            
                <label for="description">Description:</label>
                <input type="text" id="description" name="description"><br>
            
                <input type="submit" value="Confirm" id="submit_btn" class="backMain">
                <input type="reset" id="reset_btn" class="backMain">
              </form>
            </main>
          </section>
          `;
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))

  }


}

customElements.define('bullet-editor-page', bulletEditorPage);

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
