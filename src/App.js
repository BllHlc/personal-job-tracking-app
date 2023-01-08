import { Container } from '@mui/material';
import { MainContextProvider } from './components/context/MainContext';
import Header from './components/Header';
import Main from './components/Main';

function App() {
  return (
    <MainContextProvider >
      <Container fixed>
        <Header />
        <Main />
      </Container>
    </MainContextProvider >
  );
}

export default App;
