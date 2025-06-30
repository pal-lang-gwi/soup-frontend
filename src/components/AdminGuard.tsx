import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router';

interface AdminGuardProps {
  children: React.ReactNode;
}

const AdminGuard: React.FC<AdminGuardProps> = ({ children }) => {
  const { isAuthenticated, user, loading } = useAuth();
  const navigate = useNavigate();

  // 로딩 중일 때는 아무것도 렌더링하지 않음
  if (loading) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>로딩 중...</div>;
  }

  // 로그인하지 않았거나 관리자가 아닌 경우
  if (!isAuthenticated || user?.role !== 'ADMIN') {
    // 홈페이지로 리다이렉트
    React.useEffect(() => {
      navigate('/');
    }, [navigate]);
    
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '20px',
        color: 'red',
        fontSize: '1.1rem'
      }}>
        관리자 권한이 필요합니다.
      </div>
    );
  }

  // 관리자인 경우 자식 컴포넌트 렌더링
  return <>{children}</>;
};

export default AdminGuard; 