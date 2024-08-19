import { Genres } from "@/constants/types"
import { makeRequest, Request } from "."

// helper method to fetch genres from the API
export async function getGenres(): Promise<Genres> {
    const request: Request = {
        url: '/genre/movie/list',
        method: 'GET',
        params: {
            "language": "en-US"
        }
    }

    return await makeRequest<Genres>(request)
}