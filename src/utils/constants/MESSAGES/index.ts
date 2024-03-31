export enum RESPONSE_CODE {
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOTFOUND = 404,
    AUTHENTICATION_TIMEOUT = 419,
    UNPROCESSABLE_ENTITY = 422,
    FAILED_DEPENDENCY = 424
}

export enum MESSAGES {
    INTERNAL_SERVER_ERROR = 'Ошибка сервера! Попробуйте позже...',
    IP_ADDRESS = "Введенные IP адреса не валидны! Пример ввода: 176.59.54.251, 24.48.0.1, 172.16.0.1",
}