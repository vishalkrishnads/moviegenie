import { TMDBResponse } from "@/constants/types"
import { makeRequest, Request } from "."

// function to search the movie db using the /search/movie endpoint
export async function search (query: string, page: number): Promise<TMDBResponse> {
    if(!query) throw Error("search query itself can't be an empty string")

    const request: Request = {
        url: '/search/movie',
        method: 'GET',
        params: {
            "language": "en-US",
            query,
            page: page.toString(),
            include_adult: true.toString()
        }
    }

    return await makeRequest<TMDBResponse>(request)
}