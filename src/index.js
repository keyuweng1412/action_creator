import React from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux'
import store from './store/store'
import FromComponent from './components/FromCustom'

const App = (
    <Provider store={store}>
        <FromComponent />
    </Provider>
)

ReactDOM.render(App, document.getElementById('root'));

