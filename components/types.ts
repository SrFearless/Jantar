export interface IPage {
    id: string;
    title: string;
    content: string;
    image?: string;
}

export interface IQuestion {
    id: string;
    text: string;
    options: string[];
    type: 'single' | 'multiple';
    gifs: string[]; // Agora é um array para múltiplos GIFs
}

export interface IUserResponse {
    questionId: string;
    selectedOptions: string[];
    timestamp: Date;
}