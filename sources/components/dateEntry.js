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
                background-color: rgba(123, 151, 169, 0.925);
                border-radius: 0.5em;
                margin: 0.3rem;
                text-align: center;
            }
          </style>
          <section class="date-entry">
            <div class="date-inner-entry">
                <div class="date">Time</div>
            </div>
          </section>
          `;

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  set date(date) {
    this.shadowRoot.querySelector(".date").innerText = date;
  }

  get date() {
    return this.shadowRoot.querySelector(".date").innerText;
  }

  active() {
    this.shadowRoot.querySelector(".date").style.backgroundColor =
      "rgba(60, 77, 87, 0.925)";
  }

  deactive() {
    this.shadowRoot.querySelector(".date").style.backgroundColor =
      "rgba(123, 151, 169, 0.925)";
  }
}

customElements.define("date-entry", DateEntry);
