export const endpoints = {
  auth: {
    profile: 'profile/show',
    updateProfile: 'profile/update',
    login: 'login',
    logout: 'logout',
  },
  invoice: {
    getInvoiceList: '/invoice/filter',
    getInvoiceDetail: (invoiceId: number) => `invoice/${invoiceId}/show`,
  },
  report: {
    getReportList: 'report/filter',
    getReportProfit: 'report/profit',
  },
  common: {
    getChartDataById: (id: number) => `dashboard/chart/date?filterKey=${id}`,
    getNotiUnreadCount: 'notification/unread/count',
    notificationList: 'notification/get',
    getParentCategory: 'category/list',
    createCategory: 'category/create',
    createSubCategory: 'subcategory/create',
    getSubCategory: 'subcategory/list',
    getParentCategoryIcon: 'category/icons',
    getSubCategoryByCategory: (categoryId: number) =>
      `subcategory/${categoryId}/filter`,
    getProductByCategory: (categoryId: number) =>
      `product/search/subcategory/${categoryId}`,
    createProduct: 'product/create',
    updateProduct: (productId: number) => `product/${productId}/update`,
    searchBarcode: `product/search/barcode`,
    checkout: 'order/checkout',
    suspend: 'order/create',
    suspendList: 'order/list',
    deleteSuspend: (orderId: number) => `order/${orderId}/delete`,
  },
};
