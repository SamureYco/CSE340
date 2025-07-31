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

module.exports = { buildVehicleDetailView };