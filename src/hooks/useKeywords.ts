import { useQuery } from '@tanstack/react-query';
import { axiosKeywords } from '../api/keywords';
import { keyword } from '../types/keyword';

export const useKeywords = () => {
  return useQuery<keyword[]>({
    queryKey: ['keywords'],
    queryFn: axiosKeywords,
  });
};