import { createGlobalStyle } from 'styled-components';

export const FontFace = createGlobalStyle`
    @font-face {
        font-family: 'mainFont';
        src: url('../assets/fonts/Geurimilgi.ttf') format('truetype');
        font-weight: normal;
        font-style: normal;
    }
`;

export const fontTheme = {
    mainFont: "'mainFont', sans-serif",
};

export default fontTheme;
