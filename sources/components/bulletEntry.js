// Custom class for each Bullet entry
class BulletEntry extends HTMLElement {
    constructor() {
      super();
  
      const template = document.createElement('template');
  
      template.innerHTML = `
          <style>

            .bulletEntry .bullet{
                display: flex;
                align-items: center;
                height: 2em;
                font-size: 1.4em;
                background-color: antiquewhite;
                border-width: 0.5px;
                border-style: solid;
                border-radius: 0.5em;  
                margin:0.3rem;
                text-align: left;
                padding-left: 0.5rem;
            
            }
            
            .bulletEntry .BulletButton {
                margin: 0.5rem;
                line-height: 1rem;
                font-size: 1rem;
                background-color: aquamarine;
            }
            
            .bulletEntry .title {
                text-align: center;
                width: 90%;
            }
            .bulletEntry .des{
                overflow:expand;
                display:none;
                align-items: center;
                height: auto;

                background-color: rgb(136, 123, 105);
                font-size: 0.9em;
                border-width: 0.5px;
                border-style: solid;
                border-radius: 0.5em;  
                margin:0.5rem;
                text-align: center;
                padding: 0.5rem;
            }
            .bulletEntry .date{
                display:none;
            }
            .bulletEntry .category{
                display:none;
            }
            .bulletEntry .type{
                display:none;
            }
            .bulletEntry .completedCheck{
                display:none;
            }
          </style>
          <section class="bulletEntry">
            <div class="bullet">
                <input class="checkbox" type="checkbox">
                <span class="title">demo</span>
                <button class="BulletButton editBulletButton">edit</button>
                <button class="BulletButton bulletDetailButton">detail</button>
                <span class="date">demo</span>
                <span class="category">demo</span>
                <span class="type">demo</span>
                <span class="completedCheck">demo</span>


            </div>
            <div class="des">
            </div>
          </section>
          `;
  
      this.attachShadow({ mode: "open" })
      this.shadowRoot.appendChild(template.content.cloneNode(true))
    }
  
    get bullet() {
      let bullet = {
        'title': this.shadowRoot.querySelector('.title').innerText,
        'description':this.shadowRoot.querySelector('.des').innerText,
        'completedCheck':this.shadowRoot.querySelector('.completedCheck').innerText,
        'date':this.shadowRoot.querySelector('.date').innerText,
        'category':this.shadowRoot.querySelector('.category').innerText,
        'type':this.shadowRoot.querySelector('.type').innerText
      };
  
      return bullet;
    }
  
    set bullet(newBullet) {
      //Set up the bullet html content
      this.shadowRoot.querySelector('.title').innerText =newBullet.title;
      this.shadowRoot.querySelector('.completedCheck').innerText = 0;
      this.shadowRoot.querySelector(".des").innerText = newBullet.description;
      this.shadowRoot.querySelector(".date").innerText = newBullet.date;
      this.shadowRoot.querySelector('.category').innerText = newBullet.category;
      this.shadowRoot.querySelector('.type').innerText = newBullet.type;

      //Update variable property
      this.title=newBullet.title;
      this.completedCheck=0;
      this.description=newBullet.description;
      this.category=newBullet.category;
      this.date=newBullet.date;
      this.type=newBullet.type;

    }



  
  }
  
  customElements.define("bullet-entry", BulletEntry);
  
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
  
