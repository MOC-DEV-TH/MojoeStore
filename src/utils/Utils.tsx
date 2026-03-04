import {
  AUTH_INFO,
  DISCOUNT_TYPE,
  DISCOUNT_TYPE_KYAT,
  DISCOUNT_TYPE_PERCENT,
  LANGUAGE,
  MONTH,
  OWNER,
  SUMMARY_PERIOD,
  TOKEN,
} from 'src/assets/constants';
import {getFromStorage, saveToStorage} from './StorageUtils';
import i18next from 'i18next';
import {View} from 'react-native';
import {Stack, Text} from '@components';
import {getUserInfo} from '@slices';
import {useSelector} from 'react-redux';
import {RootState, store} from '@redux';

export function isValidJSON(jsonString: string) {
  try {
    JSON.parse(jsonString);
    return true;
  } catch (error) {
    return false;
  }
}

export function isUndefined(e: any | Object) {
  switch (e) {
    case 'undefined':
      return true;
    case 'NaN':
      return true;
    case NaN:
      return true;
    case undefined:
      return true;
    case '':
      return true;
    case null:
      return true;
    case 'null':
      return true;
    case false:
      return true;
    case 'false':
      return true;
    default:
      return false;
  }
}

export function getLanguage() {
  return getFromStorage(LANGUAGE) || 'en';
}

export function changeLanguage(key: string) {
  i18next.changeLanguage(key);
  saveToStorage(LANGUAGE, key);
}

export function camelToSnakeCase(o: any) {
  const newObj: any = {};
  for (let key in o) {
    const snakeCaseKey = key.replace(
      /[A-Z]/g,
      letter => `_${letter.toLowerCase()}`,
    );
    newObj[snakeCaseKey] = o[key];
  }
  return newObj;
}

export const authToken = getFromStorage(TOKEN) ?? null;

export const useAuthInfo = () => {
  const data = getFromStorage(AUTH_INFO);
  console.log('authInfo data', data);
  let token = null;
  let role = null;

  if (isValidJSON(data)) {
    const parse = JSON.parse(data);
    if (!isUndefined(data) && parse.token && parse.role) {
      token = parse.token;
      role = parse.role;
    }
  }

  return {token, role};
};

export const isOwner = () => {
  const data = useAuthInfo() || {};
  if (!data.role) return;
  return data.role === OWNER;
};

export const objectToArray = (object: {}) => {
  return Object.values(object);
};

export const formatPrice = ({
  pricePerUnit,
  qty,
  discountAmount,
  discountType,
  isPerUnitDisplay,
}: any) => {
  const originalPrice = pricePerUnit * qty;

  if (discountAmount && objectToArray(DISCOUNT_TYPE).includes(discountType)) {
    if (discountType === DISCOUNT_TYPE_PERCENT) {
      const percentAmount = pricePerUnit * (discountAmount / 100);
      const salePrice = (pricePerUnit - percentAmount) * qty;
      return (
        <Stack columnSpace={4}>
          <Text fontStyle={isPerUnitDisplay ? 'FW400_10' : 'FW700_12'}>
            {salePrice}
          </Text>
          <Text
            fontStyle={isPerUnitDisplay ? 'FW400_10' : 'FW700_12'}
            textColor={'red'}
            style={{
              textDecorationLine: 'line-through',
              textDecorationStyle: 'solid',
            }}>
            {originalPrice} {isPerUnitDisplay ? ' Ks / unit' : 'Ks'}
          </Text>
        </Stack>
      );
    }

    if (discountType === DISCOUNT_TYPE_KYAT) {
      const salePrice = (pricePerUnit - discountAmount) * qty;
      return (
        <Stack columnSpace={4}>
          <Text fontStyle={isPerUnitDisplay ? 'FW400_10' : 'FW700_12'}>
            {salePrice}
          </Text>
          <Text
            fontStyle={isPerUnitDisplay ? 'FW400_10' : 'FW700_12'}
            textColor={'red'}
            style={{
              textDecorationLine: 'line-through',
              textDecorationStyle: 'solid',
            }}>
            {originalPrice} {isPerUnitDisplay ? ' Ks / unit' : 'Ks'}
          </Text>
        </Stack>
      );
    }
  }

  return (
    <View>
      <Text fontStyle={isPerUnitDisplay ? 'FW400_10' : 'FW700_12'}>
        {originalPrice} {isPerUnitDisplay ? ' Ks / unit' : 'Ks'}
      </Text>
    </View>
  );
};

export const getItemTotalPrice = ({
  pricePerUnit,
  qty,
  discountAmount,
  discountType,
}: any) => {
  let total = pricePerUnit * qty;

  if (discountAmount && objectToArray(DISCOUNT_TYPE).includes(discountType)) {
    if (discountType === DISCOUNT_TYPE_PERCENT) {
      const percentAmount = pricePerUnit * (discountAmount / 100);
      total = (pricePerUnit - percentAmount) * qty;
    }

    if (discountType === DISCOUNT_TYPE_KYAT) {
      total = (pricePerUnit - discountAmount) * qty;
    }
  }

  return total;
};

export const defaultValueByIndex = (
  array: {name: string; value: any}[],
  value: any,
) => {
  return array.map(lang => lang.value).indexOf(value);
};

export const shortWeekDay = (date: any) => {
  return date.toLocaleString('en-US', {weekday: 'short'});
};

export const divideData = (data: any[], parts: number) => {
  const totalPoints = data.length;
  const interval = Math.floor(totalPoints / parts);
  const indices = [];
  for (let i = 1; i <= parts; i++) {
    indices.push(interval * i);
  }
  if (indices[parts - 1] >= totalPoints) {
    indices[parts - 1] = totalPoints - 1;
  }
  return indices.map(index => (data[index]?.x ? data[index].x : null));
};

export const summaryTickFormat = (date: any, type: string) => {
  console.log('date', date);
  if (type === SUMMARY_PERIOD.ONE_WEEK) {
    return date
      ?.toLocaleString('en-US', {
        weekday: 'short',
      })
      .split(',')[0];
  }

  return date?.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
  });
};

export const convertSelectOptions = (
  data: any[],
  labelkey: any,
  valueKey: any,
) => {
  if (!Array.isArray(data)) return;
  return data.map(item => ({
    name: item[labelkey],
    value: item[valueKey],
  }));
};

export const toCamelCase = (obj: any): any => {
  const camelCaseObj: any = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const camelKey = key.replace(/([-_]\w)/g, matches =>
        matches.toUpperCase().replace(/[-_]/, ''),
      );
      const value = obj[key];
      camelCaseObj[camelKey] =
        typeof value === 'object' ? toCamelCase(value) : value.toString(); // Convert value to string
    }
  }
  return camelCaseObj;
};

export const formatDate = (date: any) => {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear().toString().slice(-2);

  return `${day}.${month}.${year}`;
};

export function formatDate2(dateString: any) {
  const date = new Date(dateString);
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  return `${day}/${MONTH[monthIndex]}/${year}`;
}

export function getShopId() {
  const info: any =
    useSelector((store: RootState) => store.auth.userInfo) || {};
  return info?.shop_id || info?.data?.shop_id;
}

export function discountTypeToNumber(type: string) {
  if (type === DISCOUNT_TYPE_KYAT) {
    return 0;
  } else if (type === DISCOUNT_TYPE_PERCENT) {
    return 1;
  }
  return null;
}
