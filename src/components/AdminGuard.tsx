import React from 'react';

interface AdminGuardProps {
  children: React.ReactNode;
}

const AdminGuard: React.FC<AdminGuardProps> = ({ children }) => {
  // 모든 사용자에게 접근 허용 (권한 체크 제거)
  return <>{children}</>;
};

export default AdminGuard; 