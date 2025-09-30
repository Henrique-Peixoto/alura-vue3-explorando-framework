export enum TipoNotificacao {
    SUCESSO = 1,
    FALHA = 2,
    ATENCAO = 3
}

export interface INotificacao {
    titulo: string
    texto: string
    tipo: TipoNotificacao
    id: number
}