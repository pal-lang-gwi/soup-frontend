
import { BrowserRouter } from 'react-router-dom';
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
        {/* <AuthProvider> */}
          <AppRoutes />
        {/* </AuthProvider> */}
      </ThemeProvider>
    </BrowserRouter>
    </>
  );
}

export default App;
