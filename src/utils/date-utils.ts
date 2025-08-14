export const formatDate = (dato?: Date) => {
    const dateFormat = new Intl.DateTimeFormat('no', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
    });
    return dato ? dateFormat.format(dato) : '';
};

export const todayMidnight = () => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
};