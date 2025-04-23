import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { axiosKeywords } from '../api/keywords';

//string으로 변경
export const useKeywords = (): UseQueryResult<string[], Error> =>
    useQuery({
        queryKey: ['keywords'],
        queryFn: axiosKeywords,
        staleTime: 1000 * 60 * 10,
    });