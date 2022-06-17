const { ipcRenderer } = require("electron");
var Calendar = require("tui-calendar");

const goBack = document.querySelector("#goBack");

const MONTHLY_CUSTOM_THEME = {
  // month header 'dayname'
  "month.dayname.height": "30px",
  "month.dayname.borderLeft": "none",
  "month.dayname.paddingLeft": "8px",
  "month.dayname.paddingRight": "0",
  "month.dayname.fontSize": "14px",
  "month.dayname.backgroundColor": "inherit",
  "month.dayname.fontWeight": "normal",
  "month.dayname.textAlign": "left",

  // month day grid cell 'day'
  "month.holidayExceptThisMonth.color": "#f3acac",
  "month.dayExceptThisMonth.color": "#bbb",
  "month.weekend.backgroundColor": "#fafafa",
  "month.day.fontSize": "16px",

  // month schedule style
  "month.schedule.borderRadius": "5px",
  "month.schedule.height": "18px",
  "month.schedule.marginTop": "2px",
  "month.schedule.marginLeft": "10px",
  "month.schedule.marginRight": "10px",

  // month more view
  "month.moreView.boxShadow": "none",
  "month.moreView.paddingBottom": "0",
  "month.moreView.border": "1px solid #9a935a",
  "month.moreView.backgroundColor": "#f9f3c6",
  "month.moreViewTitle.height": "28px",
  "month.moreViewTitle.marginBottom": "0",
  "month.moreViewTitle.backgroundColor": "#f4f4f4",
  "month.moreViewTitle.borderBottom": "1px solid #ddd",
  "month.moreViewTitle.padding": "0 10px",
  "month.moreViewList.padding": "10px",
};

const templates = {
  popupIsAllDay: function () {
    return "All Day";
  },
  popupStateFree: function () {
    return "Free";
  },
  popupStateBusy: function () {
    return "Busy";
  },
  titlePlaceholder: function () {
    return "Subject";
  },
  locationPlaceholder: function () {
    return "Location";
  },
  startDatePlaceholder: function () {
    return "Start date";
  },
  endDatePlaceholder: function () {
    return "End date";
  },
  popupSave: function () {
    return "Save";
  },
  popupUpdate: function () {
    return "Update";
  },
  popupDetailDate: function (isAllDay, start, end) {
    var isSameDate = moment(start).isSame(end);
    var endFormat = (isSameDate ? "" : "YYYY.MM.DD ") + "hh:mm a";

    if (isAllDay) {
      return (
        moment(start).format("YYYY.MM.DD") +
        (isSameDate ? "" : " - " + moment(end).format("YYYY.MM.DD"))
      );
    }

    return (
      moment(start).format("YYYY.MM.DD hh:mm a") +
      " - " +
      moment(end).format(endFormat)
    );
  },
  popupDetailLocation: function (schedule) {
    return "Location : " + schedule.location;
  },
  popupDetailUser: function (schedule) {
    return "User : " + (schedule.attendees || []).join(", ");
  },
  popupDetailState: function (schedule) {
    return "State : " + schedule.state || "Busy";
  },
  popupDetailRepeat: function (schedule) {
    return "Repeat : " + schedule.recurrenceRule;
  },
  popupDetailBody: function (schedule) {
    return "Body : " + schedule.body;
  },
  popupEdit: function () {
    return "Edit";
  },
  popupDelete: function () {
    return "Delete";
  },
};

const loadCalendar = () => {
  const calendar = new Calendar("#calendar", {
    defaultView: "month",
    taskview: true,
    theme: MONTHLY_CUSTOM_THEME,
    month: {
      daynames: [
        "Domingo",
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado",
      ],
      startDayOfWeek: 1,
      template: templates,
      useCreationPopup: true,
      useDetailPopup: true,
    },
  });

  calendar.createSchedules([
    {
      id: "1",
      calendarId: "1",
      title: "Polera Carolina llona \n Cantidad: 1",
      category: "allday",
      isAllDay: true,
      isPending: true,
      customStyle: "height: 50px; background-color: #f3acac;",
    },
  ]);
};

window.onload = loadCalendar();

goBack.addEventListener("click", () => {
  ipcRenderer.send("go-back");
});
