class DateEntry extends HTMLElement {
  constructor() {
    super();
    const template = document.createElement("template");

    template.innerHTML = `
          <style>
            .date {
              vertical-align: middle;
              display: grid;
              align-items: center;
              height: 3em;
              font-size: 1.3em;
              border-radius: 0.5em;
              margin: 0.3rem;
              text-align: center;
              background-color: rgba(167, 200, 220, 0.925);
              -webkit-transform: perspective(1px) translateZ(0);
              transform: perspective(1px) translateZ(0);
              box-shadow: 0 0 1px rgba(0, 0, 0, 0);
              -webkit-transition-duration: 0.3s;
              transition-duration: 0.3s;
              -webkit-transition-property: transform;
              transition-property: transform;
            }
            
            .date:hover, .date:focus, .date:active {
              -webkit-transform: scale(1.05);
              transform: scale(1.05);
            }

            .active{
                display:none ;
            }


          </style>
          <section class="date-entry">
            <div class="date-inner-entry">
                <div class="date">Time</div>
                <div class="active">false</div>
            </div>
          </section>
          `;

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  /**
   * Set the date information
   */
  set date(date) {
    this.shadowRoot.querySelector(".date").innerText = date;
  }

  /**
   * Get the date information
   */
  get date() {
    return this.shadowRoot.querySelector(".date").innerText;
  }

  /**
   * Checks if active is set to true or false
   */
  get active() {
    return this.shadowRoot.querySelector(".active").innerText;
  }

  /**
   * Toggle the active of date
   */
  set active(active) {
    if (active == "true") {
      this.shadowRoot.querySelector(".date").style.backgroundColor =
        "rgba(107, 140, 160, 0.925)";
    } else {
      this.shadowRoot.querySelector(".date").style.backgroundColor =
        "rgba(167, 200, 220, 0.925)";
    }
    this.shadowRoot.querySelector(".active").innerText = active;
  }

  /**
   * Return the date object
   */
  get obj() {
    let dateObj = {
      date: this.shadowRoot.querySelector(".date").innerText,
      active: this.shadowRoot.querySelector(".active").innerText,
    };
    return dateObj;
  }

  set disabled(disabled){
    if (disabled ==true) {
      this.shadowRoot.querySelector(".date").style.backgroundColor =
        "rgba(160, 177, 187, 0.925)";
    } else {
      this.shadowRoot.querySelector(".date").style.backgroundColor =
        "rgba(167, 200, 220, 0.925)";
    }
  }
}

customElements.define("date-entry", DateEntry);
