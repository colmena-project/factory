export const dateFormat = (date: Date) => {
  let mesActual = new Intl.DateTimeFormat("es-ES", { month: "long" }).format(
    date
  );
  mesActual = mesActual.charAt(0).toUpperCase() + mesActual.slice(1);

  return `${("0" + date.getDate()).slice(
    -2
  )} ${mesActual} ${date.getFullYear()} ${date.getHours()}:${date.getMinutes()} HS `;
};
