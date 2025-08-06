import Swal from 'sweetalert2';

// 테마 색상 접근 함수
const getThemeColors = () => {
  // styled-components의 theme에 접근하기 위해 document에서 CSS 변수나 다른 방법을 사용
  // 임시로 하드코딩된 색상들을 테마 색상으로 정의
  return {
    success: '#48BB78',
    error: '#E53E3E',
    warning: '#ED8936',
    info: '#4299E1',
    neutral: '#A0AEC0',
    background: '#ffffff',
    text: {
      primary: '#2D3748',
      secondary: '#4A5568',
    }
  };
};

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
  const colors = getThemeColors();
  Swal.fire({
    icon: 'success',
    title: '🎉 완료되었어요!',
    text: message,
    confirmButtonText: '좋아요',
    confirmButtonColor: colors.success,
    background: colors.background,
    ...commonStyle,
    iconColor: colors.success,
    timer: 3000,
    timerProgressBar: true,
  });
};

// 에러 알림
export const showError = (message: string) => {
  const colors = getThemeColors();
  Swal.fire({
    icon: 'error',
    title: '😅 잠깐만요!',
    text: message,
    confirmButtonText: '알겠어요',
    confirmButtonColor: colors.error,
    background: colors.background,
    ...commonStyle,
    iconColor: colors.error,
  });
};

// 경고 알림
export const showWarning = (message: string) => {
  const colors = getThemeColors();
  Swal.fire({
    icon: 'warning',
    title: '⚠️ 주의해주세요',
    text: message,
    confirmButtonText: '알겠어요',
    confirmButtonColor: colors.warning,
    background: colors.background,
    ...commonStyle,
    iconColor: colors.warning,
  });
};

// 정보 알림
export const showInfo = (message: string) => {
  const colors = getThemeColors();
  Swal.fire({
    icon: 'info',
    title: '💡 안내드려요',
    text: message,
    confirmButtonText: '알겠어요',
    confirmButtonColor: colors.info,
    background: colors.background,
    ...commonStyle,
    iconColor: colors.info,
    timer: 2500,
    timerProgressBar: true,
  });
};

// 확인 다이얼로그
export const showConfirm = (message: string): Promise<boolean> => {
  const colors = getThemeColors();
  return Swal.fire({
    title: '🤔 확인해주세요',
    text: message,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: '네, 할게요',
    cancelButtonText: '아니요, 취소할게요',
    confirmButtonColor: colors.success,
    cancelButtonColor: colors.neutral,
    background: colors.background,
    ...commonStyle,
    iconColor: colors.success,
    reverseButtons: true,
  }).then((result: any) => {
    return result.isConfirmed;
  });
};

// 로딩 표시
export const showLoading = (message: string = '잠시만 기다려주세요...') => {
  const colors = getThemeColors();
  Swal.fire({
    title: message,
    allowOutsideClick: false,
    background: colors.background,
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

// 로그인 필요 알림
export const showLoginRequired = () => {
  const colors = getThemeColors();
  Swal.fire({
    icon: 'info',
    title: '🔐 로그인이 필요해요!',
    text: '이 기능을 이용하려면 로그인해주세요.',
    confirmButtonText: '로그인하러 가기',
    confirmButtonColor: colors.info,
    background: colors.background,
    ...commonStyle,
    iconColor: colors.info,
  });
};

// 네트워크 오류 알림
export const showNetworkError = () => {
  const colors = getThemeColors();
  Swal.fire({
    icon: 'error',
    title: '📡 연결에 실패했어요!',
    text: '인터넷 연결을 확인하고 다시 시도해주세요.',
    confirmButtonText: '다시 시도',
    confirmButtonColor: colors.error,
    background: colors.background,
    ...commonStyle,
    iconColor: colors.error,
  });
};

// 데이터 없음 알림
export const showNoData = (message: string = '데이터가 없어요!') => {
  const colors = getThemeColors();
  Swal.fire({
    icon: 'info',
    title: '📭 아직 없어요!',
    text: message,
    confirmButtonText: '알겠어요',
    confirmButtonColor: colors.neutral,
    background: colors.background,
    ...commonStyle,
    iconColor: colors.neutral,
  });
};

// 저장 완료 알림
export const showSaved = (message: string = '저장되었어요!') => {
  const colors = getThemeColors();
  Swal.fire({
    icon: 'success',
    title: '💾 저장 완료!',
    text: message,
    confirmButtonText: '좋아요',
    confirmButtonColor: colors.success,
    background: colors.background,
    ...commonStyle,
    iconColor: colors.success,
    timer: 2000,
    timerProgressBar: true,
  });
};

// 삭제 확인 다이얼로그
export const showDeleteConfirm = (itemName: string): Promise<boolean> => {
  const colors = getThemeColors();
  return Swal.fire({
    title: '🗑️ 정말 삭제할까요?',
    text: `"${itemName}"을(를) 삭제하면 되돌릴 수 없어요.`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: '네, 삭제할게요',
    cancelButtonText: '아니요, 취소할게요',
    confirmButtonColor: colors.error,
    cancelButtonColor: colors.neutral,
    background: colors.background,
    ...commonStyle,
    iconColor: colors.warning,
    reverseButtons: true,
  }).then((result: any) => {
    return result.isConfirmed;
  });
};

// 뉴스 큐레이션 서비스 특화 메시지들

// 키워드 구독 시작
export const showKeywordSubscribed = (keywordName: string) => {
  const colors = getThemeColors();
  Swal.fire({
    icon: 'success',
    title: '📰 뉴스 구독 시작!',
    text: `"${keywordName}" 관련 뉴스를 받아보실 수 있어요!`,
    confirmButtonText: '좋아요',
    confirmButtonColor: colors.success,
    background: colors.background,
    ...commonStyle,
    iconColor: colors.success,
    timer: 3000,
    timerProgressBar: true,
  });
};

// 키워드 구독 해지
export const showKeywordUnsubscribed = (keywordName: string) => {
  const colors = getThemeColors();
  Swal.fire({
    icon: 'info',
    title: '👋 구독 해지 완료',
    text: `"${keywordName}" 뉴스 알림을 더 이상 받지 않아요.`,
    confirmButtonText: '알겠어요',
    confirmButtonColor: colors.neutral,
    background: colors.background,
    ...commonStyle,
    iconColor: colors.neutral,
    timer: 2500,
    timerProgressBar: true,
  });
};

// 키워드 등록 요청
export const showKeywordRequested = (keywordName: string) => {
  const colors = getThemeColors();
  Swal.fire({
    icon: 'success',
    title: '📝 키워드 등록 요청!',
    text: `"${keywordName}" 키워드 등록을 요청했어요. 검토 후 추가될 예정이에요!`,
    confirmButtonText: '알겠어요',
    confirmButtonColor: colors.success,
    background: colors.background,
    ...commonStyle,
    iconColor: colors.success,
    timer: 4000,
    timerProgressBar: true,
  });
};

// 뉴스 없음
export const showNoNews = (keywordName?: string) => {
  const colors = getThemeColors();
  const message = keywordName 
    ? `"${keywordName}" 관련 뉴스가 아직 없어요. 조금만 기다려주세요!`
    : '해당 키워드의 뉴스가 아직 없어요. 다른 키워드로 검색해보세요!';
    
  Swal.fire({
    icon: 'info',
    title: '📭 뉴스가 없어요',
    text: message,
    confirmButtonText: '알겠어요',
    confirmButtonColor: colors.neutral,
    background: colors.background,
    ...commonStyle,
    iconColor: colors.neutral,
  });
};

// 뉴스 로딩
export const showNewsLoading = () => {
  const colors = getThemeColors();
  Swal.fire({
    title: '📰 뉴스를 가져오는 중...',
    text: '잠시만 기다려주세요!',
    allowOutsideClick: false,
    background: colors.background,
    ...commonStyle,
    didOpen: () => {
      Swal.showLoading();
    },
  });
};

// 뉴스 새로고침
export const showNewsRefreshed = () => {
  const colors = getThemeColors();
  Swal.fire({
    icon: 'success',
    title: '🔄 뉴스 새로고침 완료!',
    text: '최신 뉴스로 업데이트되었어요!',
    confirmButtonText: '좋아요',
    confirmButtonColor: colors.success,
    background: colors.background,
    ...commonStyle,
    iconColor: colors.success,
    timer: 2000,
    timerProgressBar: true,
  });
};

// 키워드 검색 결과 없음
export const showNoKeywordResults = (searchTerm: string) => {
  const colors = getThemeColors();
  Swal.fire({
    icon: 'info',
    title: '🔍 검색 결과가 없어요',
    text: `"${searchTerm}" 관련 키워드를 찾을 수 없어요. 다른 키워드로 검색해보세요!`,
    confirmButtonText: '알겠어요',
    confirmButtonColor: colors.neutral,
    background: colors.background,
    ...commonStyle,
    iconColor: colors.neutral,
  });
};

// 뉴스 필터 적용
export const showFilterApplied = (filterName: string) => {
  const colors = getThemeColors();
  Swal.fire({
    icon: 'success',
    title: '🔍 필터 적용 완료!',
    text: `${filterName} 필터가 적용되었어요.`,
    confirmButtonText: '좋아요',
    confirmButtonColor: colors.success,
    background: colors.background,
    ...commonStyle,
    iconColor: colors.success,
    timer: 2000,
    timerProgressBar: true,
  });
};

// 뉴스 공유
export const showNewsShared = () => {
  const colors = getThemeColors();
  Swal.fire({
    icon: 'success',
    title: '📤 공유 완료!',
    text: '뉴스가 성공적으로 공유되었어요!',
    confirmButtonText: '좋아요',
    confirmButtonColor: colors.success,
    background: colors.background,
    ...commonStyle,
    iconColor: colors.success,
    timer: 2000,
    timerProgressBar: true,
  });
};

// 뉴스 북마크 추가
export const showNewsBookmarked = () => {
  const colors = getThemeColors();
  Swal.fire({
    icon: 'success',
    title: '🔖 북마크 추가!',
    text: '뉴스를 북마크에 추가했어요!',
    confirmButtonText: '좋아요',
    confirmButtonColor: colors.success,
    background: colors.background,
    ...commonStyle,
    iconColor: colors.success,
    timer: 2000,
    timerProgressBar: true,
  });
};

// 뉴스 북마크 제거
export const showNewsUnbookmarked = () => {
  const colors = getThemeColors();
  Swal.fire({
    icon: 'info',
    title: '🔖 북마크 제거',
    text: '뉴스를 북마크에서 제거했어요.',
    confirmButtonText: '알겠어요',
    confirmButtonColor: colors.neutral,
    background: colors.background,
    ...commonStyle,
    iconColor: colors.neutral,
    timer: 2000,
    timerProgressBar: true,
  });
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
