// UI 관련 상수들 (마이클리닝 스타일)
export const UI_CONSTANTS = {
	// 애니메이션 관련 (마이클리닝 스타일)
	ANIMATION_DELAY_MS: 200,        // 더 빠른 애니메이션
	SCROLL_DELAY_MS: 50,            // 빠른 스크롤 반응
	TRANSITION_DURATION: 150,       // 빠른 전환 효과

	// 레이아웃 관련 (마이클리닝 스타일)
	NAVBAR_HEIGHT: 80,              // 더 높은 네비게이션
	MOBILE_NAVBAR_HEIGHT: 70,
	SIDEBAR_WIDTH: 280,             // 더 넓은 사이드바
	CONTENT_PADDING: 120,           // 적절한 패딩
	MOBILE_CONTENT_PADDING: 24,     // 모바일 패딩

	// Z-Index 레이어 (마이클리닝 스타일)
	Z_INDEX: {
		NAVBAR: 1000,
		MODAL_OVERLAY: 1001,
		MODAL_CONTENT: 1002,
		CONFETTI: 9999,
		TOOLTIP: 1003,
		POPOVER: 1004,
	},

	// 반응형 브레이크포인트 (마이클리닝 스타일)
	BREAKPOINTS: {
		MOBILE: 768,
		TABLET: 1024,
		DESKTOP: 1200,
		LARGE: 1440,
	},

	// 컨페티 설정 (마이클리닝 스타일)
	CONFETTI: {
		PARTICLE_COUNT: 200,         // 적당한 파티클 수
		SPREAD: 120,                 // 넓은 스프레드
		START_VELOCITY: 60,          // 적당한 속도
		GRAVITY: 0.6,               // 자연스러운 중력
		TICKS: 250,                 // 적당한 지속시간
		SCALAR: 0.85,               // 스케일 팩터
	},

	// 폼 관련 (마이클리닝 스타일)
	FORM: {
		MAX_NICKNAME_LENGTH: 20,
		MIN_AGE: 18,
		MAX_AGE: 99,
		BIRTH_YEAR_RANGE: 106,
		MONTHS_IN_YEAR: 12,
		DAYS_IN_MONTH: 31,
		INPUT_HEIGHT: 48,            // 표준 입력 높이
		BUTTON_HEIGHT: 48,           // 표준 버튼 높이
		BORDER_RADIUS: 8,            // 표준 둥근 모서리
	},

	// 페이지네이션 (마이클리닝 스타일)
	PAGINATION: {
		DEFAULT_PAGE: 0,
		ITEMS_PER_PAGE: 10,
		MAX_VISIBLE_PAGES: 5,
	},

	// 카드 관련 (마이클리닝 스타일)
	CARD: {
		BORDER_RADIUS: 12,           // 카드 둥근 모서리
		PADDING: 24,                 // 카드 패딩
		SHADOW: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
		HOVER_SHADOW: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
	},

	// 버튼 관련 (마이클리닝 스타일)
	BUTTON: {
		PRIMARY_HEIGHT: 48,
		SECONDARY_HEIGHT: 40,
		SMALL_HEIGHT: 32,
		BORDER_RADIUS: 8,
		PADDING_X: 24,
		PADDING_Y: 12,
	},

	// 입력 필드 관련 (마이클리닝 스타일)
	INPUT: {
		HEIGHT: 48,
		BORDER_RADIUS: 8,
		PADDING_X: 16,
		PADDING_Y: 12,
		FOCUS_RING: '0 0 0 3px rgba(16, 185, 129, 0.1)',
	},

	// 간격 시스템 (마이클리닝 스타일)
	SPACING: {
		XS: 4,
		SM: 8,
		MD: 16,
		LG: 24,
		XL: 32,
		'2XL': 48,
		'3XL': 64,
		'4XL': 96,
	},
} as const;
