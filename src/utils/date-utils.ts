export const formatDate = (dato?: Date) => {
    const dateFormat = new Intl.DateTimeFormat('no', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
    });
    return dato ? dateFormat.format(dato) : '';
};
