// src/pages/AdminPage.tsx
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getKeywordRequests,
  approveKeywordRequest,
  rejectKeywordRequest,
} from '../shared/api/admin/keyword';
import KeywordRequestTable from '../components/KeywordRequestTable';
import RejectModal from '../components/RejectModal';
import Navbar from '../components/Navbar';
import { AdminKeywordResponseListDto } from '../types/admin';

const AdminPage: React.FC = () => {
  /* ─────────── 상태 ─────────── */
  const [currentPage, setCurrentPage] = useState(0);
  const [status, setStatus] = useState<'PENDING' | 'APPROVED' | 'REJECTED'>(
    'PENDING',
  );
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState<number | null>(
    null,
  );

  const queryClient = useQueryClient();
  const pageSize = 10;

  /* ─────────── 쿼리 ─────────── */
  const {
    data: keywordRequests,
    isLoading,
    error,
  } = useQuery<AdminKeywordResponseListDto>({
    queryKey: ['keywordRequests', status, currentPage],
    queryFn: () =>
      getKeywordRequests(status, currentPage, pageSize, 'createdDate,desc'),
  });

  /* ─────────── 뮤테이션 ─────────── */
  const approveMutation = useMutation({
    mutationFn: approveKeywordRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['keywordRequests'] });
      alert('키워드가 승인되었습니다.');
    },
    onError: (e: Error) => alert(`승인 실패: ${e.message}`),
  });

  const rejectMutation = useMutation({
    mutationFn: ({
      requestId,
      rejectReason,
    }: {
      requestId: number;
      rejectReason: string;
    }) => rejectKeywordRequest(requestId, rejectReason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['keywordRequests'] });
      setRejectModalOpen(false);
      setSelectedRequestId(null);
      alert('키워드가 거절되었습니다.');
    },
    onError: (e: Error) => alert(`거절 실패: ${e.message}`),
  });

  /* ─────────── 이벤트 핸들러 ─────────── */
  const handleApprove = (id: number) =>
    window.confirm('이 키워드를 승인하시겠습니까?') &&
    approveMutation.mutate(id);

  const handleReject = (id: number) => {
    setSelectedRequestId(id);
    setRejectModalOpen(true);
  };

  const handleRejectConfirm = (reason: string) =>
    selectedRequestId &&
    rejectMutation.mutate({ requestId: selectedRequestId, rejectReason: reason });

  const handleStatusChange = (s: 'PENDING' | 'APPROVED' | 'REJECTED') => {
    setStatus(s);
    setCurrentPage(0);
  };

  const handlePageChange = (p: number) => setCurrentPage(p);

  /* ─────────── 로딩/에러 ─────────── */
  if (isLoading)
    return <div style={center}>로딩 중...</div>;

  if (error)
    return (
      <div style={{ ...center, color: 'red' }}>
        에러: {(error as Error).message}
      </div>
    );

  /* ─────────── 렌더링 ─────────── */
  return (
    <>
      {/* 고정 네비게이션 */}
      <Navbar />

      {/* 본문 */}
      <div
        style={{
          paddingTop: '72px',          // Navbar 높이만큼 여백 (UI_CONSTANTS.MOBILE_NAVBAR_HEIGHT)
          padding: '20px',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <h1 style={{ marginBottom: '30px', color: '#333' }}>키워드 요청 관리</h1>

        {/* 상태 필터 */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ marginRight: '10px', fontWeight: 'bold' }}>상태:</label>
          <select
            value={status}
            onChange={(e) =>
              handleStatusChange(e.target.value as typeof status)
            }
            style={{
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ddd',
            }}
          >
            <option value="PENDING">대기 중</option>
            <option value="APPROVED">승인됨</option>
            <option value="REJECTED">거절됨</option>
          </select>
        </div>

        {/* 테이블 */}
        {keywordRequests && (
          <KeywordRequestTable
            requests={keywordRequests.adminKeywordResponseDtos}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        )}

        {/* 페이지네이션 */}
        {keywordRequests && keywordRequests.totalPages > 1 && (
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 0}
              style={navButtonStyle(currentPage === 0)}
            >
              이전
            </button>

            <span style={{ margin: '0 10px' }}>
              {currentPage + 1} / {keywordRequests.totalPages}
            </span>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= keywordRequests.totalPages - 1}
              style={navButtonStyle(
                currentPage >= keywordRequests.totalPages - 1,
              )}
            >
              다음
            </button>
          </div>
        )}
      </div>

      {/* 거절 모달 */}
      <RejectModal
        isOpen={rejectModalOpen}
        onClose={() => {
          setRejectModalOpen(false);
          setSelectedRequestId(null);
        }}
        onConfirm={handleRejectConfirm}
        isLoading={rejectMutation.isPending}
      />
    </>
  );
};

export default AdminPage;

/* ─────────── 인라인 스타일 헬퍼 ─────────── */
const center: React.CSSProperties = {
  textAlign: 'center',
  padding: '20px',
};

const navButtonStyle = (disabled: boolean): React.CSSProperties => ({
  padding: '8px 16px',
  margin: '0 5px',
  cursor: disabled ? 'not-allowed' : 'pointer',
  backgroundColor: disabled ? '#ccc' : '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
});