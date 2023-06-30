import axios, { AxiosError } from 'axios';

export function Api(ctx = undefined) {
    const api = axios.create({
        baseURL: "https://rickandmortyapi.com/api"
    });

    return api;
}
