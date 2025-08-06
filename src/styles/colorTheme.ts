export const colorTheme = {
    // 마이클리닝 스타일의 메인 색상
    mainColor: '#1a1a1a',           // 깊이 있는 다크 그레이
    buttonColor: '#2d3748',         // 중성적인 다크 그레이
    mainGreen: '#10b981',           // 밝고 현대적인 그린 (마이클리닝 스타일)
    
    // 확장된 색상 팔레트 (마이클리닝 스타일)
    // 그라데이션용 밝은 그린
    lightGreen: '#34d399',
    // 다크 그린
    darkGreen: '#059669',
    
    // 상태별 색상 (마이클리닝 스타일)
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6',
    neutral: '#6b7280',
    
    // 배경 색상 (마이클리닝의 깔끔한 배경)
    background: {
        primary: '#ffffff',
        secondary: '#f9fafb',
        tertiary: '#f3f4f6',
        gradient: {
            primary: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            secondary: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)',
            card: 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)',
            hero: 'linear-gradient(135deg, #f9fafb 0%, #e5e7eb 100%)',
        }
    },
    
    // 텍스트 색상 (마이클리닝의 명확한 계층)
    text: {
        primary: '#111827',         // 가장 진한 텍스트
        secondary: '#374151',       // 보조 텍스트
        tertiary: '#6b7280',       // 세 번째 계층
        muted: '#9ca3af',          // 흐린 텍스트
        inverse: '#ffffff',         // 반전 텍스트
        accent: '#10b981',         // 강조 텍스트
    },
    
    // 테두리 색상 (마이클리닝의 미묘한 구분선)
    border: {
        primary: '#e5e7eb',
        secondary: '#d1d5db',
        accent: '#10b981',
        subtle: '#f3f4f6',
    },
    
    // 스켈레톤 색상 (마이클리닝 스타일)
    skeleton: {
        primary: '#f3f4f6',
        secondary: '#e5e7eb',
    },
    
    // 아이콘 색상 (마이클리닝 스타일)
    icon: {
        primary: '#10b981',
        secondary: '#6b7280',
        accent: '#f59e0b',
        muted: '#9ca3af',
    },

    // 마이클리닝 스타일의 추가 색상
    brand: {
        primary: '#10b981',
        secondary: '#059669',
        accent: '#34d399',
        muted: '#d1fae5',
    },

    // 마이클리닝 스타일의 상태 색상
    status: {
        online: '#10b981',
        offline: '#6b7280',
        busy: '#f59e0b',
        error: '#ef4444',
    }
}
