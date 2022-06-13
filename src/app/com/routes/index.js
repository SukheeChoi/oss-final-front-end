export default [
  {
    path: '/com',
    name: 'COMROOT',
    redirect: '/com/Batch',
    component: () => import('@/views/AppMain'),
    props: {
      left: {
        show: false,
      },
    },
    children: [
      // 배치관리(BT)
      {
        path: 'Batch',
        name: 'COMBT',
        redirect: '/com/BatchMgmt',
      },
      {
        path: 'BatchMgmt',
        name: 'COMBT001',
        component: () => import('@@/com/views/BatchMgmt'),
      },
      {
        path: 'BatchResult',
        name: 'COMBT002',
        component: () => import('@@/com/views/BatchResult'),
      },
      {
        path: 'BatchHistory',
        name: 'COMBT003',
        component: () => import('@@/com/views/BatchHistory'),
      },
    ],
  },
];
