import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getKeywordRequests, approveKeywordRequest, rejectKeywordRequest } from '../api/admin/keyword';
import KeywordRequestTable from '../components/KeywordRequestTable';
import RejectModal from '../components/RejectModal';
import { AdminKeywordResponseListDto } from '../types/admin';

const AdminPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [status, setStatus] = useState('PENDING');
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState<number | null>(null);
  
  const queryClient = useQueryClient();
  const pageSize = 10;

  // 키워드 요청 목록 조회
  const { data: keywordRequests, isLoading, error } = useQuery<AdminKeywordResponseListDto>({
    queryKey: ['keywordRequests', status, currentPage],
    queryFn: () => getKeywordRequests(status, currentPage, pageSize, 'createdDate,desc'),
  });

  // 키워드 승인 뮤테이션
  const approveMutation = useMutation({
    mutationFn: approveKeywordRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['keywordRequests'] });
      alert('키워드가 승인되었습니다.');
    },
    onError: (error: Error) => {
      alert(`승인 실패: ${error.message}`);
    },
  });

  // 키워드 거절 뮤테이션
  const rejectMutation = useMutation({
    mutationFn: ({ requestId, rejectReason }: { requestId: number; rejectReason: string }) =>
      rejectKeywordRequest(requestId, rejectReason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['keywordRequests'] });
      setRejectModalOpen(false);
      setSelectedRequestId(null);
      alert('키워드가 거절되었습니다.');
    },
    onError: (error: Error) => {
      alert(`거절 실패: ${error.message}`);
    },
  });

  const handleApprove = (requestId: number) => {
    if (window.confirm('이 키워드를 승인하시겠습니까?')) {
      approveMutation.mutate(requestId);
    }
  };

  const handleReject = (requestId: number) => {
    setSelectedRequestId(requestId);
    setRejectModalOpen(true);
  };

  const handleRejectConfirm = (rejectReason: string) => {
    if (selectedRequestId) {
      rejectMutation.mutate({ requestId: selectedRequestId, rejectReason });
    }
  };

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    setCurrentPage(0); // 상태 변경 시 첫 페이지로 이동
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>로딩 중...</div>;
  }

  if (error) {
    return <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>에러: {error.message}</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '30px', color: '#333' }}>키워드 요청 관리</h1>
      
      {/* 상태 필터 */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ marginRight: '10px', fontWeight: 'bold' }}>상태:</label>
        <select 
          value={status} 
          onChange={(e) => handleStatusChange(e.target.value)}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
        >
          <option value="PENDING">대기 중</option>
          <option value="APPROVED">승인됨</option>
          <option value="REJECTED">거절됨</option>
        </select>
      </div>

      {/* 키워드 요청 테이블 */}
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
            style={{
              padding: '8px 16px',
              margin: '0 5px',
              cursor: currentPage === 0 ? 'not-allowed' : 'pointer',
              backgroundColor: currentPage === 0 ? '#ccc' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px'
            }}
          >
            이전
          </button>
          
          <span style={{ margin: '0 10px' }}>
            {currentPage + 1} / {keywordRequests.totalPages}
          </span>
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= keywordRequests.totalPages - 1}
            style={{
              padding: '8px 16px',
              margin: '0 5px',
              cursor: currentPage >= keywordRequests.totalPages - 1 ? 'not-allowed' : 'pointer',
              backgroundColor: currentPage >= keywordRequests.totalPages - 1 ? '#ccc' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px'
            }}
          >
            다음
          </button>
        </div>
      )}

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
    </div>
  );
};

export default AdminPage; 