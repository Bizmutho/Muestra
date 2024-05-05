import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Principal from './pages/Principal';
import { Provider } from 'react-redux';
import store from './Reducers/ColorStore';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
          <Router>
            <Routes>
              <Route path="/" element={ <Principal/>} />
            </Routes>
          </Router>
      </div>
    </Provider>
  );
}

export default App;
