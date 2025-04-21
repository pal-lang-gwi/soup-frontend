import { DefaultTheme } from 'styled-components';
import { colorTheme } from './colorTheme';
import { fontTheme } from './fontTheme';

export const theme: DefaultTheme = {
  ...colorTheme,
  ...fontTheme,
};
