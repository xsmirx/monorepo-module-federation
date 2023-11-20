import {App} from '@/components/App'
import {LazyShop} from '@/pages/shop/Shop.lazy'
import {Suspense} from 'react'
import {RouteObject, createBrowserRouter} from 'react-router-dom'

const routes: RouteObject[] = [
  {
    path: '/shop',
    element: <App />,
    children: [
      {
        path: 'main',
        element: (
          <Suspense fallback={'Loading...'}>
            <LazyShop />
          </Suspense>
        ),
      },
      {
        path: 'second',
        element: (
          <Suspense fallback={'Loading...'}>
            <div style={{color: 'red'}}>second</div>
          </Suspense>
        ),
      },
    ],
  },
]

export const router = createBrowserRouter(routes)

export default routes
