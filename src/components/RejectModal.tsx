import React, { useState } from 'react';

interface RejectModalProps {
  isOpen: boolean; // 모달 열림/닫힘 상태
  onClose: () => void; // 모달 닫기 함수
  onConfirm: (reason: string) => void; // 거절 사유 확인 시 호출될 함수
  isLoading?: boolean; // 로딩 상태
}

const RejectModal: React.FC<RejectModalProps> = ({ isOpen, onClose, onConfirm, isLoading = false }) => {
  const [rejectReason, setRejectReason] = useState(''); // 거절 사유 입력 상태

  if (!isOpen) return null; // 모달이 닫혀있으면 아무것도 렌더링하지 않음

  const handleSubmit = () => {
    if (rejectReason.trim()) { // 입력된 사유가 비어있지 않은지 확인
      onConfirm(rejectReason); // 확인 함수 호출
      setRejectReason(''); // 입력 필드 초기화
      onClose(); // 모달 닫기
    } else {
      alert('거절 사유를 입력해주세요.');
    }
  };

  return (
    <div style={{ // 모달 오버레이 스타일
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)', // 반투명 배경
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      zIndex: 1000 // 다른 요소 위에 표시
    }}>
      <div style={{ // 모달 내용 컨테이너 스타일
        backgroundColor: 'white', padding: '20px', borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)', minWidth: '300px'
      }}>
        <h2>키워드 거절</h2>
        <p>거절 사유를 입력해주세요:</p>
        <textarea
          value={rejectReason}
          onChange={(e) => setRejectReason(e.target.value)}
          rows={4} // 텍스트 영역 높이
          style={{ width: '100%', marginBottom: '10px' }}
          placeholder="예: 부적절한 단어 사용, 이미 존재하는 키워드 등"
          disabled={isLoading}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button 
            onClick={onClose} 
            style={{ padding: '8px 15px', cursor: 'pointer' }}
            disabled={isLoading}
          >
            취소
          </button>
          <button 
            onClick={handleSubmit} 
            style={{ 
              padding: '8px 15px', 
              cursor: isLoading ? 'not-allowed' : 'pointer', 
              backgroundColor: 'red', 
              color: 'white',
              opacity: isLoading ? 0.6 : 1
            }}
            disabled={isLoading}
          >
            {isLoading ? '처리 중...' : '거절'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RejectModal;