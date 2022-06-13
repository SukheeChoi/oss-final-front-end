export default [
  {
      // Main Menu (1depth)
      path: '/edu',
      name: 'EDUROOT',
      redirect: '/edu/Test',
      component: () => import('@/views/AppMain'),
      props:{
          left:{
              show: false,
          },
      },
      children:[
          // Test (2depth)
          {
              path: 'Test',
              name: 'TestSub',
              redirect: '/edu/abc'

          },
          // detail ( 3depth)
          {
              path: 'abc',
              name: 'abc001',
              component: () => import('@@/edu/views/abc')
          }
      ]
  }
]