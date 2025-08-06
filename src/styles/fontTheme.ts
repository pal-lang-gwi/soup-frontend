import { createGlobalStyle } from 'styled-components';

export const FontFace = createGlobalStyle`
    @font-face {
        font-family: 'mainFont';
        src: url('/fonts/Geurimilgi.ttf') format('truetype');
        font-weight: normal;
        font-style: normal;
    }

    /* 마이클리닝 스타일의 전역 폰트 설정 */
    * {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
            'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    }

    /* 마이클리닝 스타일의 헤딩 폰트 */
    h1, h2, h3, h4, h5, h6 {
        font-family: 'Inter', sans-serif;
        font-weight: 600;
        line-height: 1.2;
        letter-spacing: -0.025em;
    }

    /* 마이클리닝 스타일의 본문 폰트 */
    body {
        font-family: 'Inter', sans-serif;
        font-weight: 400;
        line-height: 1.6;
        letter-spacing: 0;
    }

    /* 마이클리닝 스타일의 버튼 폰트 */
    button {
        font-family: 'Inter', sans-serif;
        font-weight: 500;
        letter-spacing: 0.025em;
    }
`;

export const fontTheme = {
    mainFont: "'Inter', sans-serif",
    headingFont: "'Inter', sans-serif",
    bodyFont: "'Inter', sans-serif",
    buttonFont: "'Inter', sans-serif",
    
    // 마이클리닝 스타일의 폰트 크기
    fontSize: {
        xs: '0.75rem',      // 12px
        sm: '0.875rem',     // 14px
        base: '1rem',       // 16px
        lg: '1.125rem',     // 18px
        xl: '1.25rem',      // 20px
        '2xl': '1.5rem',    // 24px
        '3xl': '1.875rem',  // 30px
        '4xl': '2.25rem',   // 36px
        '5xl': '3rem',      // 48px
        '6xl': '3.75rem',   // 60px
    },
    
    // 마이클리닝 스타일의 폰트 웨이트
    fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
    },
    
    // 마이클리닝 스타일의 라인 하이트
    lineHeight: {
        none: 1,
        tight: 1.25,
        snug: 1.375,
        normal: 1.5,
        relaxed: 1.625,
        loose: 2,
    },
    
    // 마이클리닝 스타일의 레터 스페이싱
    letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.025em',
        normal: '0em',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em',
    }
};

export default fontTheme;
