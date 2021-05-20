//Custom class for each category entry
class CategoryEntry extends HTMLElement {
    constructor() {
      super();
  
      const template = document.createElement('template');
  
      template.innerHTML = `
          <style>
           .cateEntry .categotyDemo{
              height: 3.5em;
              font-size: 2em;
              background-color: antiquewhite;
              border-width: 0.5px;
              border-style: solid;
              border-radius: 0.5em;  
              margin:0.3rem;
          
              display: flex;
              justify-items: center;
              align-items: center;
          
              padding: 0.5rem;
          
            }
          
            .cateEntry .CateButton {
              margin: 0.5rem;
              line-height: 3rem;
              font-size: 1rem;
              background-color: aquamarine;
            }
            .cateEntry .color {
              display:none
            }
            .cateEntry .title {
              text-align: center;
              width: 90%;
          }
          </style>
          <section class="cateEntry">
            <div class="categotyDemo">
              <input class="checkbox" type="checkbox">
              <span class="title">demo</span>
              <button class="CateButton">edit</button>
              <span class="color">demo</span>
            </div>
          </section>
          `;
  
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))
    }
  
    get category() {
      let category ={
        'title':this.shadowRoot.querySelector('.title').innerText,
        'color':this.shadowRoot.querySelector('.color').innerText
      };
    }
  
    set category(newCategory) {
      //Set up the new category html element
      this.shadowRoot.querySelector(".title").innerText =newCategory.title;
      this.shadowRoot.querySelector('.color').innerText =newCategory.color;

      //Set up the variable property
      this.title=newCategory.tile;
      this.color=newCategory.color;
      
    }



  
  }
  
  customElements.define('category-entry', CategoryEntry);
  
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
  
