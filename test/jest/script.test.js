import "../../sources/scripts/script.js";

import { checkDateSelector, fadeBullet, showDetail, submitBullet, 
  submitCategory, deleteBullet, deleteCategory } from "../../sources/scripts/script.js";

const dateNoActive = `
<div class="journal-box-history">
  <date-entry>
    <section class="date-entry">
      <div class="date-inner-entry">
        <div class="date" style="background-color: rgba(167, 200, 220, 0.925);"></div>
        <div class="active">false</div>
      </div>
    </section>
  </date-entry>
  <date-entry>
    <section class="date-entry">
      <div class="date-inner-entry">
        <div class="date" style="background-color: rgba(107, 140, 160, 0.925);">2021-6-10</div>
        <div class="active">false</div>
      </div>
    </section>
  </date-entry>
</div>
`;
describe("checkDateSelector", () => {
  // allows for soft selection
  it("if active dates is 0", async () => {
    let document = dateNoActive;
    checkDateSelector();
  });

  it("if active dates is not 0", () => {

  });
});


it("fadeBullet", async () => {
});

it("showDetail", async () => {
});

it("something", async () => {
});

it("something", async () => {
});

it("something", async () => {
});

it("something", async () => {
});