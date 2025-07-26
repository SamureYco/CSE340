export function buildVehicleHtml(vehicle) {
  const price = Number(vehicle.inv_price).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  const mileage = Number(vehicle.inv_miles).toLocaleString("en-US");

  return `
    <img src="${vehicle.inv_image}" alt="Image of ${vehicle.inv_make} ${vehicle.inv_model}">
    <h2>${vehicle.inv_year} ${vehicle.inv_make} ${vehicle.inv_model}</h2>
    <p><strong>Price:</strong> ${price}</p>
    <p><strong>Mileage:</strong> ${mileage} miles</p>
    <p><strong>Color:</strong> ${vehicle.inv_color}</p>
    <p><strong>Description:</strong> ${vehicle.inv_description}</p>
  `;
}
