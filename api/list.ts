import { makeRequest, Request } from "."
import { TMDBResponse } from "@/constants/types"

/*
    All the endpoints which return data as a list are unified here for easy access.
    Basically, all the data being shown on the list page are pulled using these.
*/

const request = async(endpoint: string, page: number): Promise<TMDBResponse> => {
    const request: Request = {
        url: endpoint,
        method: 'GET',
        params: {
            "language": "en-US",
            "page": page.toString()
        }
    }

    return await makeRequest<TMDBResponse>(request)
}

export const trendingMovies = async (page: number): Promise<TMDBResponse> => request('/trending/movie/day', page)

export const nowPlayingMovies = async(page: number): Promise<TMDBResponse> => request('/movie/now_playing', page)

export const popularMovies = async(page: number): Promise<TMDBResponse> => request('/movie/popular', page)

export const topRatedMovies = async(page: number): Promise<TMDBResponse> => request('/movie/top_rated', page)

export const upcomingMovies = async(page: number): Promise<TMDBResponse> => request('/movie/upcoming', page)