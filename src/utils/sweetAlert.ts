import Swal from 'sweetalert2';

// 공통 스타일 설정
const commonStyle = {
  customClass: {
    popup: 'swal2-custom-popup',
    confirmButton: 'swal2-custom-confirm',
    cancelButton: 'swal2-custom-cancel',
  },
  showClass: {
    popup: 'animate__animated animate__fadeInDown'
  },
  hideClass: {
    popup: 'animate__animated animate__fadeOutUp'
  },
  backdrop: `
    background: linear-gradient(135deg, rgba(72, 187, 120, 0.1) 0%, rgba(66, 153, 225, 0.1) 100%);
  `,
  customStyle: {
    borderRadius: '16px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
    border: 'none',
  }
};

// 성공 알림
export const showSuccess = (message: string) => {
  Swal.fire({
    icon: 'success',
    title: '성공!',
    text: message,
    confirmButtonText: '확인',
    confirmButtonColor: '#48BB78',
    background: '#ffffff',
    ...commonStyle,
    iconColor: '#48BB78',
    timer: 3000,
    timerProgressBar: true,
  });
};

// 에러 알림
export const showError = (message: string) => {
  Swal.fire({
    icon: 'error',
    title: '오류 발생',
    text: message,
    confirmButtonText: '확인',
    confirmButtonColor: '#E53E3E',
    background: '#ffffff',
    ...commonStyle,
    iconColor: '#E53E3E',
  });
};

// 경고 알림
export const showWarning = (message: string) => {
  Swal.fire({
    icon: 'warning',
    title: '주의',
    text: message,
    confirmButtonText: '확인',
    confirmButtonColor: '#ED8936',
    background: '#ffffff',
    ...commonStyle,
    iconColor: '#ED8936',
  });
};

// 정보 알림
export const showInfo = (message: string) => {
  Swal.fire({
    icon: 'info',
    title: '알림',
    text: message,
    confirmButtonText: '확인',
    confirmButtonColor: '#4299E1',
    background: '#ffffff',
    ...commonStyle,
    iconColor: '#4299E1',
    timer: 2500,
    timerProgressBar: true,
  });
};

// 확인 다이얼로그
export const showConfirm = (message: string): Promise<boolean> => {
  return Swal.fire({
    title: '확인',
    text: message,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: '확인',
    cancelButtonText: '취소',
    confirmButtonColor: '#48BB78',
    cancelButtonColor: '#A0AEC0',
    background: '#ffffff',
    ...commonStyle,
    iconColor: '#48BB78',
    reverseButtons: true,
  }).then((result) => {
    return result.isConfirmed;
  });
};

// 로딩 표시
export const showLoading = (message: string = '처리 중...') => {
  Swal.fire({
    title: message,
    allowOutsideClick: false,
    background: '#ffffff',
    ...commonStyle,
    didOpen: () => {
      Swal.showLoading();
    },
  });
};

// 로딩 닫기
export const closeLoading = () => {
  Swal.close();
};

// 커스텀 스타일 CSS 추가
const style = document.createElement('style');
style.textContent = `
  .swal2-custom-popup {
    font-family: 'Noto Sans KR', sans-serif !important;
    padding: 2rem !important;
  }
  
  .swal2-custom-confirm {
    border-radius: 12px !important;
    font-weight: 600 !important;
    padding: 12px 24px !important;
    font-size: 14px !important;
    text-transform: none !important;
    box-shadow: 0 4px 12px rgba(72, 187, 120, 0.3) !important;
    transition: all 0.2s ease !important;
  }
  
  .swal2-custom-confirm:hover {
    transform: translateY(-2px) !important;
    box-shadow: 0 6px 16px rgba(72, 187, 120, 0.4) !important;
  }
  
  .swal2-custom-cancel {
    border-radius: 12px !important;
    font-weight: 600 !important;
    padding: 12px 24px !important;
    font-size: 14px !important;
    text-transform: none !important;
    box-shadow: 0 4px 12px rgba(160, 174, 192, 0.3) !important;
    transition: all 0.2s ease !important;
  }
  
  .swal2-custom-cancel:hover {
    transform: translateY(-2px) !important;
    box-shadow: 0 6px 16px rgba(160, 174, 192, 0.4) !important;
  }
  
  .swal2-title {
    font-size: 24px !important;
    font-weight: 700 !important;
    color: #2D3748 !important;
    margin-bottom: 1rem !important;
  }
  
  .swal2-html-container {
    font-size: 16px !important;
    color: #4A5568 !important;
    line-height: 1.6 !important;
  }
  
  .swal2-icon {
    margin-bottom: 1.5rem !important;
  }
  
  .swal2-timer-progress-bar {
    background: linear-gradient(90deg, #48BB78, #38A169) !important;
  }
`;

document.head.appendChild(style);
