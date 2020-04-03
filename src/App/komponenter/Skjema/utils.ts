export const selectedRows = (rows: any[]) => {
    return rows.filter((e: any) => e.selected).map(e => e.fnr);
};
