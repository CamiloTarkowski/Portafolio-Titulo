const { ipcRenderer } = require("electron");
const popup = document.querySelector("#popup");

const loadData = async () => {
  const schedule = await ipcRenderer.invoke("load-popup-data");

  console.log(schedule);

  const template = `
  <div class="tui-full-calendar-popup-container">
        <div
          class="tui-full-calendar-popup-section tui-full-calendar-section-header"
        >
          <div>
            <span
              class="tui-full-calendar-schedule-private tui-full-calendar-icon tui-full-calendar-ic-private"
            ></span>
            <span class="tui-full-calendar-schedule-title"
              >${schedule.title}</span
            >
          </div>
          <div
            class="tui-full-calendar-popup-detail-date tui-full-calendar-content"
          >
            ${schedule.body.split("\n")[6]}
          </div>
        </div>
        <div class="tui-full-calendar-section-detail">
          <div class="tui-full-calendar-popup-detail-item">
            <span
              class="tui-full-calendar-icon tui-full-calendar-ic-location-b"
            ></span
            ><span class="tui-full-calendar-content"
              >Dirección: ${schedule.location}</span
            >
          </div>
          <div class="tui-full-calendar-popup-detail-item">
            <span class="tui-full-calendar-content"
              >${schedule.body.split("\n")[0]}
            </span>
          </div>
          <div class="tui-full-calendar-popup-detail-item">
            <span class="tui-full-calendar-content"
              >${schedule.body.split("\n")[1]}
            </span>
          </div>
          <div class="tui-full-calendar-popup-detail-item">
            <span class="tui-full-calendar-content"
              >${schedule.body.split("\n")[2]}
            </span>
          </div>
          <div class="tui-full-calendar-popup-detail-item">
            <span class="tui-full-calendar-content"
              >${schedule.body.split("\n")[3]}
            </span>
          </div>
          <div class="tui-full-calendar-popup-detail-item">
            <span class="tui-full-calendar-content"
              >${schedule.body.split("\n")[4]}
            </span>
          </div>
          <div class="tui-full-calendar-popup-detail-item">
            <span class="tui-full-calendar-content"
              >${schedule.body.split("\n")[5]}
            </span>
          </div>
        </div>
      </div>
      <div
        class="tui-full-calendar-popup-top-line"
        style="
          background-color: rgb(187, 220, 0);
          --darkreader-inline-bgcolor: #96b000;
        "
        data-darkreader-inline-bgcolor=""
      ></div>
      <div
        id="tui-full-calendar-popup-arrow"
        class="tui-full-calendar-popup-arrow tui-full-calendar-arrow-left"
      ></div>
  `;

  popup.innerHTML += template;
};

window.onload = async () => {
  await loadData();
};
