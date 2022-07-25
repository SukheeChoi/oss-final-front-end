export default [
  {
    // Main Menu (1depth)
    path: '/edu',
    name: 'DIST',
    redirect: '/edu/Main',
    component: () => import('@/views/AppMain'),
    props: {
      left: {
        show: false,
      },
    },
    children: [
      // Test (2depth)
      {
        path: 'Main',
        name: 'DISTSub',
        redirect: '/edu/CustomerReceipt',
      },
      // detail ( 3depth)
      {
        path: 'CustomerReceipt',
        name: 'DISTSub1',
        component: () => import('@@/edu/views/CustomerReceipt'),
      },
      {
        path: 'Order',
        name: 'DISTSub2',
        component: () => import('@@/edu/views/Order'),
      },
      {
        path: 'ReleaseInspection',
        name: 'DISTSub3',
        component: () => import('@@/edu/views/ReleaseInspection'),
      },
      {
        path: 'AfterPicking',
        name: 'DISTSub4',
        component: () => import('@@/edu/views/AfterPicking'),
      },
      {
        path: 'Picking',
        name: 'DISTSub5',
        component: () => import('@@/edu/views/Picking'),
      },
      {
        path: 'InspectionLabeling',
        name: 'DISTSub6',
        component: () => import('@@/edu/views/InspectionLabeling'),
      },

    ],
  },
];
