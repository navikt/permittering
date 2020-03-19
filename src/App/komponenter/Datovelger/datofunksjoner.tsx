export const skrivOmDato = (dato: Date) => {
    const year = dato.getFullYear().toString();
    let day = dato.getDate().toString();
    let month = (dato.getMonth() + 1).toString();
    if (day.length < 2) {
        day = '0' + day;
    }
    if (month.length < 2) {
        month = '0' + month;
    }
    return day + '/' + month + '/' + year;
};

export const skrivOmDatoStreng = (datoStreng: string) => {
    const parts = datoStreng.split('/');
    const year = parseInt(parts[2]);
    const month = parseInt(parts[1]);
    const day = parseInt(parts[0]);
    if (year > 1970 && month > 0 && day > 0) {
        const returnDate = new Date(year, month - 1, day);
        console.log(returnDate);
        return returnDate;
    } else {
        return false;
    }
};

export const datoValidering = (day: Date, after?: Date) => {
    if (after) {
        if (day.getTime() <= after.getTime()) {
            return 'Slutt- før Til-dato';
        } else {
            return '';
        }
    }
    if (day.getTime() + 84400000 < new Date().getTime()) {
        return 'Kan ikke velge tilbake i tid';
    }
    return '';
};
