const { ipcRenderer } = require("electron");
const axios = require("axios");
var Calendar = require("tui-calendar");

const goBack = document.querySelector("#goBack");
const ordersDiv = document.querySelector("#orders");
let calendar;

// tema para el calendario
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

// template el calendario
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

// carga la informacion del calendario
const loadCalendar = async () => {
  // crea un calendario mensual
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

  // carga los pedidos
  const { data } = await axios.get(`http://localhost:4444/orders`);

  // filtea por pedidos en estado "Agendado"
  const schedules = data.filter(
    (order) => order.order_state.state == "Agendado"
  );

  // crea un array de pedidos con estado "Agendado"
  const schedulesCalendar = schedules.map((schedule) => {
    const orderProducts = schedule.order_products;

    // devuelve una lista de productos con su cantidad, EJ: "Producto 1 (2)"
    const nameAndQuantity = orderProducts.map(
      (orderProduct) =>
        `${orderProduct.product.name} (${orderProduct.quantity})`
    );

    // calcula el tiempo estimado de fabricacion
    const estimatedManufactoringTime = orderProducts.map(
      (orderProduct) =>
        orderProduct.product.manufactoring_time * orderProduct.quantity
    );

    // retorna una tarjeta con la info de un pedido
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
      }\nTiempo de fabricación estimado: ${estimatedManufactoringTime} Horas\nFecha de entrega: ${
        schedule.estimated_date_delivery
      }`,
      location: schedule.client.address,
      category: "allday",
      isPending: true,
      customStyle: "height: 60px; background-color: #f3acac;",
      isReadOnly: true,
      start: schedule.estimated_date_delivery,
      end: schedule.estimated_date_delivery,
    };
  });

  // crea las tarjetas dentro del calendario
  calendar.createSchedules(schedulesCalendar);

  // espera el evento click de una tarjeta para mostrar la info de la tarjeta en un popup
  calendar.on("clickSchedule", (event) => {
    // envia un evento que sera escuchado en main.js para mostrar la info de la tarjeta en un popup
    ipcRenderer.send("show-popup", event.schedule);
  });
};

// carga la los pedidos del calendario
const loadOrders = async () => {
  // invoca los pedidos que sera escuchado en el main.js"
  let orders = await ipcRenderer.invoke("load-calendar-orders");
  orders = JSON.parse(orders);

  // se calcula cuantos pedidos hay
  const ordersLength = orders.filter(
    (order) => order.order_state.state === "Pedido"
  );

  // si no hay pedidos, muestra un mensaje
  if (ordersLength.length == 0) {
    ordersDiv.innerHTML += `<p class="not-pending-text">No hay pedidos pendientes.</p>`;
    return;
  }

  // por cada pedido  se crea una tarjeta y se inyecta al calendar.html por medio de un template
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
      <p class="row">Tiempo aprox. fabricación: ${calculateEstimatedTime(
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

    // aqui se inyecta el template al calendar.html
    ordersDiv.innerHTML += template;
  }
};

// esta funcion se ejecuta cuando carga la pagina
window.onload = async () => {
  await loadCalendar();
  await loadOrders();
};

// escucha que se haga click en el boton de volver atras
goBack.addEventListener("click", () => {
  ipcRenderer.send("go-back");
});

// crea una tarjeta con la info de un pedido, esta funcion se ejecuta cuando se hace click en "Agendar"
const createNewSchedule = async (orderId, name, rut, number, total) => {
  const { data } = await axios.get(`http://localhost:4444/orders/${orderId}`);
  const location = data.client.address;
  const orderProducts = data.order_products;
  const date = document.querySelector(`#date-${orderId}`).value;
  const nameAndQuantity = orderProducts.map(
    (orderProduct) => `${orderProduct.product.name} (${orderProduct.quantity})`
  );

  const estimatedManufactoringTime = orderProducts.map(
    (orderProduct) =>
      orderProduct.product.manufactoring_time * orderProduct.quantity
  );

  // si la fecha de entrega es menor a la fecha actual, muestra un mensaje de error
  if (new Date(date) < Date.now()) {
    ipcRenderer.send("show-notification", {
      title: "Portal admin - Error",
      body: "Debe ingresar una fecha valida",
    });
    return;
  }

  // si no hay fecha de entrega, muestra un mensaje de error
  if (date === "") {
    ipcRenderer.send("show-notification", {
      title: "Portal admin - Error",
      body: "Debe ingresar una fecha",
    });
    return;
  }

  // crea una tarjeta con la info de un pedido temporalmente (cuando se vuelve a cargar la pagina ya va a estar creada)
  calendar.createSchedules([
    {
      id: orderId,
      calendarId: "1",
      title: `Id Pedido: ${orderId}`,
      body: `Productos: ${nameAndQuantity.join(
        ", "
      )}\nNombre: ${name}\nRut: ${rut}\nTelefono: ${number}\nTotal: $${total}\nTiempo de fabricación estimado: ${estimatedManufactoringTime} Horas\n Fecha de entrega: ${date}`,
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

  // recarga el calendario
  ipcRenderer.send("open-calendar");
};

// calcula el tiempo de fabricacion de un pedido
const calculateEstimatedTime = (orderProducts) => {
  const estimatedManufactoringTime = orderProducts.map((orderProduct) => {
    return (
      Number(orderProduct.product.manufacturing_time) *
      Number(orderProduct.quantity)
    );
  });

  return estimatedManufactoringTime;
};

// muestra los codigos de los productos de un pedido y su cantidad
const showProductsCode = (order_products) => {
  const codes = order_products.map(
    (order_product) =>
      `${order_product.product.code} (${order_product.quantity})`
  );

  // une los elementos de un array con una coma
  return codes.join(", ");
};

// formatea la fecha para nuestro formato
const formatDate = (date) => {
  const DATE_INDEX = 0;
  const newDate = date.split(10)[DATE_INDEX];
  const day = newDate[8] + newDate[9];
  const month = newDate[5] + newDate[6];
  const year = newDate[0] + newDate[3];
  return `${day}/${month}/${year}`;
};

// evento de js que espera que se le haga click al boton de volver
goBack.addEventListener("click", () => {
  ipcRenderer.send("go-back");
});
