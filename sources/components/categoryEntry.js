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
              <input class="checkbox" type="checkbox" id="category-check">
              <span class="title" id="category-title">demo</span>
              <button class="cate-button">edit</button>
              <span class="color" id="category-color">demo</span>
            </div>
          </section>
          `;
  
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))
    }
    
    //Get the category information
    get category() {
      let categoryObj = {
        title: this.shadowRoot.getElementById('category-title').innerText,
        color: this.shadowRoot.getElementById('category-color').innerText,
        checked: this.shadowRoot.getElementById('category-check').checked,
      };
      return categoryObj;
    }

    //Set the category information
    set category(newCategory) {
      this.shadowRoot.getElementById('category-title').innerText =newCategory.title;
      this.shadowRoot.getElementById('category-color').innerText =newCategory.color;
      if(newCategory.color=="red"){
        this.shadowRoot.querySelector('.category-inner-entry').style.backgroundColor="rgba(181, 127, 127,0.925)";
      }else if(newCategory.color=="yellow"){
        this.shadowRoot.querySelector('.category-inner-entry').style.backgroundColor="rgba(181, 178, 110,0.925)";
      }

      this.shadowRoot.getElementById('category-check').checked =newCategory.checked;
    }

    //Quickly check if this category is checked
    get checked(){
      return this.shadowRoot.getElementById('category-check').checked;
    }

    set active(flag){
      if(flag == "true"){
        this.shadowRoot.getElementById('category-check').checked =true;
      }else{
        this.shadowRoot.getElementById('category-check').checked =false;
      }
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
  
