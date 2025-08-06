import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        // 기존 색상
        mainColor: string;
        buttonColor: string;
        mainGreen: string;
        
        // 확장된 색상
        lightGreen: string;
        darkGreen: string;
        
        // 상태별 색상
        success: string;
        error: string;
        warning: string;
        info: string;
        neutral: string;
        
        // 배경 색상
        background: {
            primary: string;
            secondary: string;
            tertiary: string;
            gradient: {
                primary: string;
                secondary: string;
                card: string;
            };
        };
        
        // 텍스트 색상
        text: {
            primary: string;
            secondary: string;
            tertiary: string;
            muted: string;
            inverse: string;
        };
        
        // 테두리 색상
        border: {
            primary: string;
            secondary: string;
            accent: string;
        };
        
        // 스켈레톤 색상
        skeleton: {
            primary: string;
            secondary: string;
        };
        
        // 아이콘 색상
        icon: {
            primary: string;
            secondary: string;
            accent: string;
            muted: string;
        };
        
        // 폰트
        mainFont: string;
    }
}