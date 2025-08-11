import 'styled-components';
import type { combinedTheme } from './theme';

declare module 'styled-components' {
    export interface DefaultTheme {
        // Modern theme
        colors: typeof combinedTheme.colors;
        typography: typeof combinedTheme.typography;
        spacing: typeof combinedTheme.spacing;
        borderRadius: typeof combinedTheme.borderRadius;
        boxShadow: typeof combinedTheme.boxShadow;
        zIndex: typeof combinedTheme.zIndex;
        breakpoints: typeof combinedTheme.breakpoints;
        transition: typeof combinedTheme.transition;
        components: typeof combinedTheme.components;
        layout: typeof combinedTheme.layout;
        
        // Legacy theme properties
        mainColor: string;
        buttonColor: string;
        mainGreen: string;
        lightGreen: string;
        darkGreen: string;
        success: string;
        error: string;
        warning: string;
        info: string;
        neutral: string;
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
        text: {
            primary: string;
            secondary: string;
            tertiary: string;
            muted: string;
            inverse: string;
        };
        border: {
            primary: string;
            secondary: string;
            accent: string;
        };
        skeleton: {
            primary: string;
            secondary: string;
        };
        icon: {
            primary: string;
            secondary: string;
            accent: string;
            muted: string;
        };
        mainFont: string;
    }
}