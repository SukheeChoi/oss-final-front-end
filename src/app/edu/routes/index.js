export default [
  {
      // Main Menu (1depth)
      path: '/edu',
      name: 'DIST',
      redirect: '/edu/Main',
      component: () => import('@/views/AppMain'),
      props:{
          left:{
              show: false,
          },
      },
      children:[
          // Test (2depth)
          {
              path: 'Main',
              name: 'DISTSub',
              redirect: '/edu/Order'
          },
          // detail ( 3depth)
          {
              path: 'Order',
              name: 'DISTSub1',
              component: () => import('@@/edu/views/Order')
          },
          {
            path: 'ReleaseInspection',
            name: 'DISTSub2',
            component: () => import('@@/edu/views/ReleaseInspection')
        },
        {
            path: 'Releases',
            name: 'DISTSub3',
            component: () => import('@@/edu/views/Releases')
        },
        {
            path: 'Picking',
            name: 'DISTSub4',
            component: () => import('@@/edu/views/Picking')
        },
        {
            path: 'CustomerReceipt.vue',
            name: 'DISTSub5',
            component: () => import('@@/edu/views/CustomerReceipe')
        },
        {
            path: 'InspectionLabelling.vue',
            name: 'DISTSub6',
            component: () => import('@@/edu/views/InspectionLabelling')
        },
      ]
  }
]