import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@boletia/react-ui';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './router';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <AppRouter />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
