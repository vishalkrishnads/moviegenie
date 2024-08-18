import { Movie } from "@/constants/types"

export const emptyMovie = (id: number): Movie => {
    return {
        id, 
        title: `Movie ${id}`,
        adult: false,
        backdrop_path: '',
        genre_ids: [
            10, 11, 12
        ],
        original_language: '',
        original_title: '',
        overview: '',
        popularity: 0,
        poster_path: '',
        release_date: '',
        video: false,
        vote_average: 0,
        vote_count: 0
    }
}