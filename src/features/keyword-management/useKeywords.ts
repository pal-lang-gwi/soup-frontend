import { useQuery } from '@tanstack/react-query';
import { axiosKeywords } from '../../shared/api/keywords';
import { keyword } from '../../entities/keyword';

export const useKeywords = () => {
  return useQuery<keyword[]>({
    queryKey: ['keywords'],
    queryFn: axiosKeywords,
  });
};