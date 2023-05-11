import React from 'react'
import ReactDOM from 'react-dom'
import 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

import 'react-toastify/dist/ReactToastify.css'
import './index.css'

import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter } from 'react-router-dom'
import RouteConfig from './routerConfig'

ReactDOM.render(
   <BrowserRouter>
      <RouteConfig />
   </BrowserRouter>,
   document.getElementById('root')
)
registerServiceWorker()
