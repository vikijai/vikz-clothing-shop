import { HashRouter } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import ErrorBoundary from './containers/shared/ErrorBoundary/ErrorBoundary';
import AppRoutes from './routes/AppRoutes/AppRoutes';

function App() {
  return (
    <div data-testid='app' className='container-fluid p-0'>
      {/* Wrapping Error boundary to all component to avoid Errors */}
      <ErrorBoundary>
        <HashRouter>

          <Header />
          <main>
            <AppRoutes />
          </main>
          <Footer />
        </HashRouter>
      </ErrorBoundary>
    </div>
  );
}

export default App;
