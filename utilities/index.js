const invModel = require("../models/inventoryModel");

function buildVehicleDetailView(data) {
  const formattedPrice = `$${data.inv_price.toLocaleString()}`;
  const formattedMiles = data.inv_miles.toLocaleString();

  return `
    <div class="vehicle-detail">
      <img src="${data.inv_image}" alt="Image of ${data.inv_make} ${data.inv_model}">
      <div>
        <h2>${data.inv_year} ${data.inv_make} ${data.inv_model}</h2>
        <p><strong>Price:</strong> ${formattedPrice}</p>
        <p><strong>Mileage:</strong> ${formattedMiles} miles</p>
        <p><strong>Description:</strong> ${data.inv_description}</p>
        <p><strong>Color:</strong> ${data.inv_color}</p>
      </div>
    </div>
  `;
}

// 👇 NUEVA función: genera el <select> para clasificaciones
async function buildClassificationList(classification_id = null) {
  let data = await invModel.getClassifications();
  let list = '<select name="classification_id" id="classification_id" required>';
  list += "<option value=''>Choose a Classification</option>";

  data.rows.forEach(row => {
    list += `<option value="${row.classification_id}"`;
    if (classification_id && row.classification_id == classification_id) {
      list += " selected";
    }
    list += `>${row.classification_name}</option>`;
  });

  list += "</select>";
  return list;
}

module.exports = {
  buildVehicleDetailView,
  buildClassificationList, // 👈 ¡NO OLVIDES exportarla!
};
