import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import { Provider } from 'mobx-react';
import rootStore from './store/rootStore';

const jsx = (
  <Provider store={rootStore} >
    <App />
  </Provider>
)

ReactDOM.render(jsx, document.getElementById('root'));
registerServiceWorker();
