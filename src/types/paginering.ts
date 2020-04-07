export type Paginering<T> = {
    content: Array<T>;
    totalElements: number;
    totalPages: number;
    page: number;
    size: number;
};

export const tomPaginering: Paginering<any> = {
    content: [],
    totalElements: 0,
    page: 0,
    size: 0,
    totalPages: 0,
};
