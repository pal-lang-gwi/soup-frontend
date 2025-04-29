import { BrowserRouter } from 'react-router';
import { ThemeProvider } from 'styled-components';
import './App.css';
import './index.css';
import AppRoutes from './routes/router';
import { theme } from './styles/theme';



function App() {
  return (
    <>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <AppRoutes />
      </ThemeProvider>
    </BrowserRouter>
    </>
  );
}

export default App;
