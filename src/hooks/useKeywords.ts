import { useQuery } from "@tanstack/react-query";
import { axiosKeywords } from "../api/keywords";
import { Keyword } from "../types/keyword";

//string으로 변경
export const useKeywords = () =>
    useQuery<Keyword[], Error>({
        queryKey: ["keywords"],
        queryFn: async () => {
            const res = await axiosKeywords(); // 반환값: KeywordListResponseDto
            return res.data.KeywordResponseDtos;
        },
        staleTime: 1000 * 60 * 10,
    });