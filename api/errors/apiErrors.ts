export class ApiError extends Error {
    public status: number;
    public message: string;
    constructor(status: number, message: string){
        super()
        this.status = status
        this.message = message
    }

    static badRequest(message: string){
        return new ApiError(400, message)
    }

    static forbidden(message: string){
        return new ApiError(403, message)
    }

    static notFound(message: string) {
        return new ApiError(404, message)
    }
}
