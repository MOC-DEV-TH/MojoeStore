import {
  AccountScreen,
  BasketScreen,
  CashierScreen,
  CategoryLevel1,
  CategoryLevel2,
  ComingSoonScreen,
  DashboardScreen,
  EditProductScreen,
  InventoryAddNewScreen,
  InventoryProductScreen,
  InventoryScreen,
  InventorySubCategoryScreen,
  InvoiceDetailScreen,
  InvoiceScreen,
  LoginScreen,
  NotificationsScreen,
  ProductPicker,
  ProfileScreen,
  ReceiptScreen,
  ReportScreen,
  ScanBarcode,
} from '@features';

export const SCREENS = {
  LOGIN: {
    name: 'Login',
    component: LoginScreen,
  },
  REPORT: {
    name: 'Report',
    component: ReportScreen,
  },
  BASKET: {
    name: 'Basket',
    component: BasketScreen,
  },
  CASHIER: {
    name: 'Cashier',
    component: CashierScreen,
  },
  INVENTORY: {
    name: 'Inventory',
    component: InventoryScreen,
  },
  INVOICE: {
    name: 'Invoice',
    component: InvoiceScreen,
  },
  INVOICE_DETAIL: {
    name: 'InvoiceDetail',
    component: InvoiceDetailScreen,
  },
  NOTIFICATION: {
    name: 'Notification',
    component: NotificationsScreen,
  },
  DASHBOARD: {
    name: 'Dashboard',
    component: DashboardScreen,
  },
  COMING_SOON: {
    name: 'ComingSoon',
    component: ComingSoonScreen,
  },
  CATEGORY_LEVEL1: {
    name: 'CategoryLevel1',
    component: CategoryLevel1,
  },
  CATEGORY_LEVEL2: {
    name: 'CategoryLevel2',
    component: CategoryLevel2,
  },
  PRODUCT_PICKER: {
    name: 'ProductPicker',
    component: ProductPicker,
  },
  SCAN_BARCODE: {
    name: 'ScanBarcode',
    component: ScanBarcode,
  },
  INVENTORY_SUB_CATEGORY: {
    name: 'Inventory Sub Category',
    component: InventorySubCategoryScreen,
  },
  INVENTORY_PRODUCT: {
    name: 'InventoryProduct',
    component: InventoryProductScreen,
  },
  INVENTORY_ADD_NEW: {
    name: 'InventoryAddNew',
    component: InventoryAddNewScreen,
  },
  EDIT_PRODUCT: {
    name: 'EditProduct',
    component: EditProductScreen,
  },
  RECEIPT: {
    name: 'Receipt',
    component: ReceiptScreen,
  },
  ACCOUNT: {
    name: "Account",
    component: AccountScreen
  },
  PROFILE: {
    name: "Profile",
    component: ProfileScreen
  }
};
