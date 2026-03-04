export const ENGLISH_LANGUAGE = 'en';
export const MYANMAR_LANGUAGE = 'mm';
export const THAI_LANGUAGE = 'th';
export const LANGUAGE = 'language';

export const TOKEN = 'token';

export const OWNER = 'shopowner';
export const STAFF = 'cashier';
export const ROLES = [OWNER, STAFF];

export const AUTH_INFO = 'authInfo';
export const ROLE = 'role';

export const DISCOUNT_TYPE_PERCENT = 'percentage';
export const DISCOUNT_TYPE_KYAT = 'kyat';

export const LANGUAGES_ARRAY = [
  {name: 'En', value: ENGLISH_LANGUAGE},
  {name: 'My', value: MYANMAR_LANGUAGE},
  {name: 'Thai', value: THAI_LANGUAGE},
];

export const LANGUAGES_OBJECT: any = {
  [ENGLISH_LANGUAGE]: LANGUAGES_ARRAY[0],
  [MYANMAR_LANGUAGE]: LANGUAGES_ARRAY[1],
  [THAI_LANGUAGE]: LANGUAGES_ARRAY[2],
};

export const DISCOUNT_TYPE_ARRAY: any = [
  {name: 'Kyat', value: DISCOUNT_TYPE_KYAT}, // Kyat is 0
  {name: 'Percent', value: DISCOUNT_TYPE_PERCENT}, // Percentage is 1
];

export const DISCOUNT_TYPE = {
  PERCENT: DISCOUNT_TYPE_PERCENT,
  KYAT: DISCOUNT_TYPE_KYAT,
};

export const SPACING = {
  SMALL: 10,
  STANDARD: 16,
  LARGE: 24,
};

export const PRODUCT_CATEGORIES = [
  {
    name: 'Beverages',
    value: 'Beverages',
  },
  {
    name: 'Food',
    value: 'Food',
  },
  {
    name: 'Personal Care',
    value: 'Personal Care',
  },
  {
    name: 'House Hold',
    value: 'House Hold',
  },
  {
    name: 'Fruit',
    value: 'Fruit',
  },
  {
    name: 'Vegetables',
    value: 'Vegetables',
  },
  {
    name: 'Medicine',
    value: 'Medicine',
  },
  {
    name: 'Automotive',
    value: 'Automotive',
  },
  {
    name: 'Cigarettes',
    value: 'Cigarettes',
  },
  {
    name: 'Alcohol & Beer',
    value: 'Alcohol & Beer',
  },
  {
    name: 'Snack',
    value: 'Snack',
  },
  {
    name: 'Confectionery',
    value: 'Confectionery',
  },
  {
    name: 'Drink',
    value: 'Drink',
  },
  {
    name: 'Test 1',
    value: 'Test 1',
  },
  {
    name: 'My King',
    value: 'My King',
  },
  {
    name: 'Computer',
    value: 'Computer',
  },
  {
    name: 'car',
    value: 'car',
  },
  {
    name: 'Air Con',
    value: 'Air Con',
  },
];

export const SUMMARY_PERIOD = {
  ONE_WEEK: '1W',
  ONE_MONTH: '1M',
  THREE_MONTH: '3M',
  SIX_MONTH: '6M',
  ONE_YEAR: '1Y',
};

export const DAYS_OF_WEEK = {
  Mon: 'Mo',
  Tue: 'Tu',
  Wed: 'We',
  Thu: 'Th',
  Fri: 'Fr',
  Sat: 'Sa',
  Sun: 'Su',
};

export const PAYMENT = {
  CASH: 'Cash',
  KBZ_PAY: 'KBZ Pay',
  AYA_PAY: 'AYA Pay',
};

export const PAYMENT_SELECT = [
  {name: PAYMENT['CASH'], value: 'cash'},
  {name: PAYMENT['KBZ_PAY'], value: 'KBZpay'},
  {name: PAYMENT['AYA_PAY'], value: 'AYApay'},
];

export const EMIT_TAGS = {
  PRODUCT: 'Product',
  CATEGORY: 'Category',
  BASKET: 'BASKET',
  SUSPEND: 'Suspend',
};

export const MONTH = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
