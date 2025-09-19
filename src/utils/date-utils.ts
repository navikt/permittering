export const formatDate = (dato?: Date) => {
    const dateFormat = new Intl.DateTimeFormat('no', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
    });
    return dato ? dateFormat.format(dato) : '';
};

export const dateKey = (date: Date, timeZone: string = 'Europe/Oslo'): string =>
    new Intl.DateTimeFormat('en-CA', {
        timeZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).format(date);
