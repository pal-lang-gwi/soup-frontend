import React from 'react';
import { AdminKeywordResponseDto } from '../types/admin';

interface KeywordRequestTableProps {
  requests: AdminKeywordResponseDto[]; // 표시할 키워드 요청 목록
  onApprove: (requestId: number) => void; // 승인 버튼 클릭 시 호출될 함수
  onReject: (requestId: number) => void; // 거절 버튼 클릭 시 호출될 함수
}

const KeywordRequestTable: React.FC<KeywordRequestTableProps> = ({ requests, onApprove, onReject }) => {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
      <thead>
        <tr style={{ backgroundColor: '#f2f2f2' }}>
          <th style={tableHeaderStyle}>요청 ID</th>
          <th style={tableHeaderStyle}>키워드</th>
          <th style={tableHeaderStyle}>요청자 이메일</th>
          <th style={tableHeaderStyle}>상태</th>
          <th style={tableHeaderStyle}>요청일</th>
          <th style={tableHeaderStyle}>거절 사유</th>
          <th style={tableHeaderStyle}>액션</th>
        </tr>
      </thead>
      <tbody>
        {requests.length === 0 ? ( // 요청 목록이 비어있는 경우
          <tr>
            <td colSpan={7} style={{ textAlign: 'center', padding: '20px' }}>
              요청된 키워드가 없습니다.
            </td>
          </tr>
        ) : ( // 요청 목록이 있는 경우
          requests.map((request) => (
            <tr key={request.requestId} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={tableCellStyle}>{request.requestId}</td>
              <td style={tableCellStyle}>{request.keyword.name}</td>
              <td style={tableCellStyle}>{request.requestedBy.email}</td>
              <td style={tableCellStyle}>{request.keyword.status}</td>
              <td style={tableCellStyle}>{new Date(request.keyword.requestedDate).toLocaleString()}</td>
              <td style={tableCellStyle}>{request.keyword.rejectionReason || '-'}</td> {/* 거절 사유가 없으면 '-' 표시 */}
              <td style={tableCellStyle}>
                {request.keyword.status === 'PENDING' && ( // 상태가 'PENDING'일 때만 승인/거절 버튼 표시
                  <>
                    <button
                      onClick={() => onApprove(request.requestId)}
                      style={{ padding: '5px 10px', marginRight: '5px', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px' }}
                    >
                      승인
                    </button>
                    <button
                      onClick={() => onReject(request.requestId)}
                      style={{ padding: '5px 10px', cursor: 'pointer', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '4px' }}
                    >
                      거절
                    </button>
                  </>
                )}
                {/* 승인됨/거절됨 상태일 때는 버튼을 표시하지 않거나 다른 상태 표시 */}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

// 테이블 헤더 스타일
const tableHeaderStyle: React.CSSProperties = {
  padding: '12px 8px',
  border: '1px solid #ddd',
  textAlign: 'left',
};

// 테이블 셀 스타일
const tableCellStyle: React.CSSProperties = {
  padding: '8px',
  border: '1px solid #ddd',
};

export default KeywordRequestTable;