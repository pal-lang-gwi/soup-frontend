import { ThemeProvider } from 'styled-components';
import './App.css';
import './index.css';
import HomePage from './pages/HomePage';
import { theme } from './styles/theme';



function App() {
  return (
    <>
    <ThemeProvider theme={theme}>
    <HomePage />
    </ThemeProvider>
    </>
  );
}

export default App;
