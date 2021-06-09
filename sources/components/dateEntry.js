class DateEntry extends HTMLElement {
  constructor() {
    super();
    const template = document.createElement("template");

    template.innerHTML = `
          <style>
            .date {
                display: grid;
                align-items: center;
                height: 3em;
                font-size: 1.3em;
                background-color: rgba(167, 200, 220, 0.925);
                border-radius: 0.5em;
                margin: 0.3rem;
                text-align: center;
            }
            
            .date:hover {
                display: grid;
                align-items: center;
                height: 3em;
                font-size: 1.3em;
                background-color: rgba(123, 151, 169, 0.925) !important;
                border-radius: 0.5em;
                margin: 0.3rem;
                text-align: center;
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

  /**
   * Toggles the disabled view
   */
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
