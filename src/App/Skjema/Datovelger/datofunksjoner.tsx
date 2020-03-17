export const skrivOmDato = (dato: Date) => {
  const year = dato.getFullYear().toString();
  let day = dato.getDate().toString();
  let month = (dato.getMonth() + 1).toString();
  if (day.length < 2) {
    day = "0" + day;
  }
  if (month.length < 2) {
    month = "0" + month;
  }
  return day + "/" + month + "/" + year;
};
