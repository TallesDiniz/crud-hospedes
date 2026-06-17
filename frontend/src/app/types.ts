export interface HospedeDTO {
    id?: number;
    nome: string;
    cpf: string;
    dataNascimento: string;
    email: string;
    telefone: string;
    ativo?: boolean;
    logradouro: string;
    numero: string;
    cep: string;
    bairro: string;
    complemento?: string;
    cidade: string;
    estado: string;
}