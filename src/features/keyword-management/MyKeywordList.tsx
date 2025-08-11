import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMyKeywords } from "../../shared/api/user/user";

const MyKeywordList = () => {
  const [page, setPage] = useState(0);

  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["myKeywords", page],
    queryFn: () => getMyKeywords(page),
  });

  // 로딩 중
  if (isLoading) return <div>로딩 중...</div>;

  // 오류 발생
  if (isError || !data) return <div>오류 발생: {(error as Error)?.message}</div>;

  return (
    <div>
      <ul>
        {data.myKeywordDtos.length === 0 ? (
          <li>구독 중인 키워드가 없습니다.</li>
        ) : (
          data.myKeywordDtos.map((k) => (
            <li key={k.normalizedKeyword}>{k.keyword}</li>
          ))
        )}
      </ul>

      <div style={{ marginTop: "1rem" }}>
        <button
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          disabled={page === 0}
        >
          이전
        </button>
        <span style={{ margin: "0 1rem" }}>
          {data.currentPage + 1} / {data.totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(data.totalPages - 1, p + 1))}
          disabled={page === data.totalPages - 1}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default MyKeywordList;