import { ThemeProvider } from 'styled-components';
import './App.css';
import KeywordSelect from './components/KeywordSelect';
import { theme } from './styles/theme';

function App() {
  return (
    <>
    <ThemeProvider theme={theme}>
    {/* <HomePage /> */}
    <KeywordSelect />
    </ThemeProvider>
    </>
  );
}

export default App;
