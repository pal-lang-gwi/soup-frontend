import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        // 기존 색상 (마이클리닝 스타일)
        mainColor: string;
        buttonColor: string;
        mainGreen: string;
        lightGreen: string;
        darkGreen: string;
        
        // 상태별 색상 (마이클리닝 스타일)
        success: string;
        error: string;
        warning: string;
        info: string;
        neutral: string;
        
        // 배경 색상 (마이클리닝 스타일)
        background: {
            primary: string;
            secondary: string;
            tertiary: string;
            gradient: {
                primary: string;
                secondary: string;
                card: string;
                hero: string;
            };
        };
        
        // 텍스트 색상 (마이클리닝 스타일)
        text: {
            primary: string;
            secondary: string;
            tertiary: string;
            muted: string;
            inverse: string;
            accent: string;
        };
        
        // 테두리 색상 (마이클리닝 스타일)
        border: {
            primary: string;
            secondary: string;
            accent: string;
            subtle: string;
        };
        
        // 스켈레톤 색상 (마이클리닝 스타일)
        skeleton: {
            primary: string;
            secondary: string;
        };
        
        // 아이콘 색상 (마이클리닝 스타일)
        icon: {
            primary: string;
            secondary: string;
            accent: string;
            muted: string;
        };
        
        // 브랜드 색상 (마이클리닝 스타일)
        brand: {
            primary: string;
            secondary: string;
            accent: string;
            muted: string;
        };
        
        // 상태 색상 (마이클리닝 스타일)
        status: {
            online: string;
            offline: string;
            busy: string;
            error: string;
        };
        
        // 폰트 테마 (마이클리닝 스타일)
        mainFont: string;
        headingFont: string;
        bodyFont: string;
        buttonFont: string;
        
        // 폰트 크기 (마이클리닝 스타일)
        fontSize: {
            xs: string;
            sm: string;
            base: string;
            lg: string;
            xl: string;
            '2xl': string;
            '3xl': string;
            '4xl': string;
            '5xl': string;
            '6xl': string;
        };
        
        // 폰트 웨이트 (마이클리닝 스타일)
        fontWeight: {
            light: number;
            normal: number;
            medium: number;
            semibold: number;
            bold: number;
            extrabold: number;
        };
        
        // 라인 하이트 (마이클리닝 스타일)
        lineHeight: {
            none: number;
            tight: number;
            snug: number;
            normal: number;
            relaxed: number;
            loose: number;
        };
        
        // 레터 스페이싱 (마이클리닝 스타일)
        letterSpacing: {
            tighter: string;
            tight: string;
            normal: string;
            wide: string;
            wider: string;
            widest: string;
        };
    }
}