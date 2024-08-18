import { Genres } from "@/constants/types"
import { makeRequest, Request } from "."

export async function getGenres() {
    const request: Request = {
        url: '/genre/movie/list',
        method: 'GET',
        params: {
            "language": "en-US"
        }
    }

    return await makeRequest<Genres>(request)
}