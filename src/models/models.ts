export interface ICard {
    title: string,
    id: number,
    notes: INote[]
}
export interface INote {
    id: number,
    body: string
}