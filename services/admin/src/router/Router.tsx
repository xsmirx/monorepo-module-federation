import {App} from '@/components/App'
import {LazyAbout} from '@/pages/about/About.lazy'
import {Suspense} from 'react'
import {RouteObject, createBrowserRouter} from 'react-router-dom'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/about',
        element: (
          <Suspense fallback={'Loading...'}>
            <LazyAbout />
          </Suspense>
        ),
      },
    ],
  },
]

export const router = createBrowserRouter(routes)

export default routes
