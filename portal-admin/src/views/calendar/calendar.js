const { ipcRenderer } = require("electron");
const axios = require("axios");
var Calendar = require("tui-calendar");

const goBack = document.querySelector("#goBack");
const ordersDiv = document.querySelector("#orders");
let calendar;

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
  milestone: function (schedule) {
    return (
      '<span style="color:red;"><i class="fa fa-flag"></i> ' +
      schedule.title +
      "</span>"
    );
  },
  milestoneTitle: function () {
    return "Milestone";
  },
  task: function (schedule) {
    return "&nbsp;&nbsp;#" + schedule.title;
  },
  taskTitle: function () {
    return '<label><input type="checkbox" />Task</label>';
  },
  allday: function (schedule) {
    return schedule.title + ' <i class="fa fa-refresh"></i>';
  },
  alldayTitle: function () {
    return "All Day";
  },
  time: function (schedule) {
    return schedule.title + ' <i class="fa fa-refresh"></i>' + schedule.start;
  },
  monthMoreTitleDate: function (date) {
    date = new Date(date);
    return (
      tui.util.formatDate("MM-DD", date) + "(" + daynames[date.getDay()] + ")"
    );
  },
  monthMoreClose: function () {
    return '<i class="fa fa-close"></i>';
  },
  monthGridHeader: function (model) {
    var date = parseInt(model.date.split("-")[2], 10);
    var classNames = [];

    classNames.push(config.classname("weekday-grid-date"));
    if (model.isToday) {
      classNames.push(config.classname("weekday-grid-date-decorator"));
    }

    return '<span class="' + classNames.join(" ") + '">' + date + "</span>";
  },
  monthGridHeaderExceed: function (hiddenSchedules) {
    return (
      '<span class="calendar-more-schedules">+' + hiddenSchedules + "</span>"
    );
  },

  monthGridFooter: function () {
    return '<div class="calendar-new-schedule-button">New Schedule</div>';
  },

  monthGridFooterExceed: function (hiddenSchedules) {
    return (
      '<span class="calendar-footer-more-schedules">+ See ' +
      hiddenSchedules +
      " more events</span>"
    );
  },
  weekDayname: function (dayname) {
    return (
      '<span class="calendar-week-dayname-name">' +
      dayname.dayName +
      '</span><br><span class="calendar-week-dayname-date">' +
      dayname.date +
      "</span>"
    );
  },
  monthDayname: function (dayname) {
    return (
      '<span class="calendar-week-dayname-name">' + dayname.label + "</span>"
    );
  },
  timegridDisplayPrimaryTime: function (time) {
    var meridiem = time.hour < 12 ? "am" : "pm";

    return time.hour + " " + meridiem;
  },
  timegridDisplayTime: function (time) {
    return time.hour + ":" + time.minutes;
  },
  goingDuration: function (model) {
    var goingDuration = model.goingDuration;
    var hour = parseInt(goingDuration / SIXTY_MINUTES, 10);
    var minutes = goingDuration % SIXTY_MINUTES;

    return "GoingTime " + hour + ":" + minutes;
  },
  comingDuration: function (model) {
    var goingDuration = model.goingDuration;
    var hour = parseInt(goingDuration / SIXTY_MINUTES, 10);
    var minutes = goingDuration % SIXTY_MINUTES;

    return "ComingTime " + hour + ":" + minutes;
  },
  popupDetailRepeat: function (model) {
    return model.recurrenceRule;
  },
  popupDetailBody: function (model) {
    return model.body;
  },
};

const loadCalendar = async () => {
  calendar = new Calendar("#calendar", {
    defaultView: "month",
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
      useDetailPopup: false,
      useDetailPopup: false,
    },
  });

  const { data } = await axios.get(`http://localhost:4444/orders`);
  const schedules = data.filter(
    (order) => order.order_state.state == "Agendado"
  );

  const schedulesCalendar = schedules.map((schedule) => {
    const orderProducts = schedule.order_products;
    const nameAndQuantity = orderProducts.map(
      (orderProduct) =>
        `${orderProduct.product.name} (${orderProduct.quantity})`
    );
    return {
      id: schedule.id,
      calendarId: "1",
      title: `Id Pedido: ${schedule.id}`,
      body: `Productos: ${nameAndQuantity.join(",")}\nNombre: ${
        schedule.client.name
      } ${schedule.client.lastname} ${schedule.client.sec_lastname}\nRut: ${
        schedule.client.rut
      }\nTelefono: ${schedule.client.number}\nTotal: $${
        schedule.total
      }\n Fecha de entrega: ${schedule.estimated_date_delivery}`,
      location: schedule.client.address,
      category: "allday",
      isPending: true,
      customStyle: "height: 60px; background-color: #f3acac;",
      isReadOnly: true,
      start: schedule.estimated_date_delivery,
      end: schedule.estimated_date_delivery,
    };
  });
  calendar.createSchedules(schedulesCalendar);

  calendar.on("clickSchedule", (event) => {
    ipcRenderer.send("show-popup", event.schedule);
  });
};

const loadOrders = async () => {
  let orders = await ipcRenderer.invoke("load-calendar-orders");
  orders = JSON.parse(orders);

  for (let i = 0; i < orders.length; i++) {
    const template = `
    <div class="order">
      <h3 class="client-name">${orders[i].client.name} ${
      orders[i].client.lastname
    } ${orders[i].client.sec_lastname}</h3>

      <p class="row">Id pedido: ${orders[i].id}</p>
      <p class="row">Dirección: ${orders[i].client.address}</p>
      <p class="row">Telefono: ${orders[i].client.number}</p>
      <p class="row">Rut: ${orders[i].client.rut}</p>
      <p class="row">Codigo(s) producto(s): ${showProductsCode(
        orders[i].order_products
      )}</p>
      <p class="row">Fecha de emisión: ${formatDate(orders[i].created_at)}</p>
      <p class="row">Total: $${parseInt(orders[i].total).toLocaleString(
        "es-ES"
      )}</p>

      <input id="date-${orders[i].id}" type="date" class="date">
      <button class="button blue" onclick="createNewSchedule(${
        orders[i].id
      }, '${orders[i].client.name}', '${orders[i].client.rut}', '${
      orders[i].client.number
    }', '${orders[i].total}')">Agendar</button>
 
    </div>
    
    `;

    ordersDiv.innerHTML += template;
  }
};

window.onload = async () => {
  await loadCalendar();
  await loadOrders();
};

goBack.addEventListener("click", () => {
  ipcRenderer.send("go-back");
});

const createNewSchedule = async (orderId, name, rut, number, total) => {
  const { data } = await axios.get(`http://localhost:4444/orders/${orderId}`);
  const location = data.client.address;
  const orderProducts = data.order_products;
  const date = document.querySelector(`#date-${orderId}`).value;
  const nameAndQuantity = orderProducts.map(
    (orderProduct) => `${orderProduct.product.name} (${orderProduct.quantity})`
  );

  if (date === "") {
    ipcRenderer.send("show-notification", {
      title: "Portal admin - Error",
      body: "Debe ingresar una fecha",
    });
    return;
  }

  calendar.createSchedules([
    {
      id: orderId,
      calendarId: "1",
      title: `Id Pedido: ${orderId}`,
      body: `Productos: ${nameAndQuantity.join(
        ", "
      )}\nNombre: ${name}\nRut: ${rut}\nTelefono: ${number}\nTotal: $${total}\n Fecha de entrega: ${date}`,
      location: location,
      category: "allday",
      isPending: true,
      customStyle: "height: 60px; background-color: #f3acac;",
      isReadOnly: true,
      start: date,
      end: date,
    },
  ]);

  // Pasar de pedido a agendado y poner fecha de entrega
  await axios.put(`http://localhost:4444/orders/${orderId}`, {
    order_state: 4,
    estimated_date_delivery: date,
  });

  // Enviar notificación de agendado
  await axios.post("http://localhost:4444/notifications", {
    order: {
      id: orderId,
    },
    message: `Se ha agendado una fecha estimada: ${date}. Cualquier cambio me comunicare con usted.`,
  });

  ipcRenderer.send("open-calendar");
};

const showProductsCode = (order_products) => {
  const codes = order_products.map(
    (order_product) =>
      `${order_product.product.code} (${order_product.quantity})`
  );

  return codes.join(", ");
};

const formatDate = (date) => {
  const DATE_INDEX = 0;
  const newDate = date.split(10)[DATE_INDEX];
  const day = newDate[8] + newDate[9];
  const month = newDate[5] + newDate[6];
  const year = newDate[0] + newDate[3];
  return `${day}/${month}/${year}`;
};

goBack.addEventListener("click", () => {
  ipcRenderer.send("go-back");
});
