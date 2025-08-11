import React from 'react';

interface PaginationProps {
  currentPage: number; // 현재 페이지 (0부터 시작)
  totalPages: number; // 전체 페이지 수
  onPageChange: (page: number) => void; // 페이지 변경 시 호출될 콜백 함수
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  // 전체 페이지 번호 배열 생성
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i);

  return (
    <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '5px' }}>
      {/* 이전 페이지 버튼 */}
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 0}>
        이전
      </button>
      {/* 페이지 번호 버튼들 */}
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          style={{ fontWeight: currentPage === number ? 'bold' : 'normal' }}
        >
          {number + 1} {/* 사용자에게는 1부터 시작하는 페이지 번호 표시 */}
        </button>
      ))}
      {/* 다음 페이지 버튼 */}
      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages - 1}>
        다음
      </button>
    </div>
  );
};

export default Pagination;