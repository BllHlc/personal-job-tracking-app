import { Container } from '@mui/material';
import { MainContextProvider } from './context/MainContext';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

function App() {
  return (
    <MainContextProvider >
      <Container fixed sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <Main />
        <Footer />
      </Container>
    </MainContextProvider >
  );
}

export default App;
