class CategoryEntry extends HTMLElement {
    constructor() {
      super();
  
      const template = document.createElement('template');
  
      template.innerHTML = `
          <style>
           .cate-entry .category-inner-entry{
              height: 3.5em;
              font-size: 2em;
              background-color:  rgba(167, 200, 220, 0.925);
              border-radius: 0.5em;  
              margin:0.3rem;
          
              display: flex;
              justify-items: center;
              align-items: center;
          
              padding: 0.5rem;
          
            }
          
            .cate-entry .cate-button {
              margin: 0.5rem;
              font-size: 1rem;
              border: none;
              margin: 0.5rem;
              line-height: 1rem;
              font-size: 1rem;
              border-radius: 0.5em;  
              padding: 8px;
              background-color: rgb(204, 225, 243);
              line-height: 3rem;
            }
            .cate-entry .color {
              display:none
            }
            .cate-entry .title {
              text-align: center;
              width: 90%;
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
          </style>
          <section class="cate-entry">
            <div class="category-inner-entry">
              <input class="checkbox" type="checkbox">
              <span class="title">demo</span>
              <button class="cate-button">edit</button>
              <span class="color">demo</span>
            </div>
          </section>
          `;
  
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))
    }
  
    get category() {
      let categoryObj = {
        'title': this.shadowRoot.querySelector('.title').innerText,
        'color': this.shadowRoot.querySelector('.color').innerText,
        'checked': this.shadowRoot.querySelector('.checkbox').checked,
      };
      return categoryObj;
    }
  
    set category(newCategory) {
      this.shadowRoot.querySelector('.title').innerText =newCategory.title;
      this.shadowRoot.querySelector('.color').innerText =newCategory.color;

      //Set the default showing option to true
      this.shadowRoot.querySelector('.checkbox').checked =true;
    }

    get checked(){
      return this.shadowRoot.querySelector('.checkbox').checked;
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
  
