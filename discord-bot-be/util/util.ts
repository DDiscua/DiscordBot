import { E_FATAL_SERVER, E_INTERNAL_SERVER } from "../constants";

export function getErrorMessage(error: unknown) {
    if (error instanceof Error) return error.message;
    return String(error);
}


export function crashProvider(error: unknown) {
    const errorString = getErrorMessage(error);
    return (
        errorString.indexOf(E_INTERNAL_SERVER) !== -1 ||
        errorString.indexOf(E_FATAL_SERVER) !== -1
    );
}