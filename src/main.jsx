import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter,Route, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import './index.css'
import { DataProvider } from './context/DataContext.jsx'
import IpGetter from './components/IpgGetter.jsx'
import Weather from './components/Weather.jsx'
import EuroConverter from './components/EuroConverter.jsx'
import ShareMarket from './components/ShareMarket.Jsx'


const route=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<DataProvider><App/></DataProvider>}>
      <Route path='' element={<IpGetter/>}/>
      <Route path='/weather' element={<Weather/>}/>
      <Route path='/euroconverter' element={<EuroConverter/>}/>
      <Route path='/appleshareinfo' element={<ShareMarket/>}/>
    </Route>
  )
)
createRoot(document.getElementById('root')).render(
  <RouterProvider router={route}/>
)
