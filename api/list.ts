import { makeRequest, Request } from "."
import { TMDBResponse } from "@/constants/types"

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