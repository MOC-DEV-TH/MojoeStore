import {BaseView, Stack, StandardPadding, Text} from '@components';
import {useColors, useFetch} from '@hooks';
import {SCREENS, navigate} from '@navigations';
import {IconSvg} from '@svgs';
import {useTranslation} from 'react-i18next';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {ChartTab} from './components';
import {endpoints} from '@services';
import {useEffect, useState} from 'react';
import {
  getProfile,
  getUserInfo,
  setNotiUnreadCount,
  updateTotalSuspendCount,
} from '@slices';
import {useDispatch} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {getShopId, isOwner} from '@utils';

export const DashboardScreen = () => {
  const {t} = useTranslation();
  const colors = useColors();
  const dispatch = useDispatch();
  const info = getUserInfo();
  const isFocused = useIsFocused();
  const [profitData, setProfitData] = useState(0);
  const shopId = getShopId();
  const isOwnerRole = isOwner();

  const {fetch: reportProfitFetch} = useFetch({
    url: endpoints.report.getReportProfit,
    params: {shop_id: shopId},
    onSuccess: (data: any, response: any) => {
      setProfitData(response?.current_month_profit || 0);
    },
  });

  const {fetch: notiUnreadCountFetch}: any = useFetch({
    url: endpoints.common.getNotiUnreadCount,
    onSuccess: (data: any) => {
      dispatch(setNotiUnreadCount(data || 0));
    },
  });

  const {fetch: suspendListFetch}: any = useFetch({
    url: endpoints.common.suspendList,
    onSuccess: (data: any) => {
      dispatch(updateTotalSuspendCount(data?.length || null));
    },
  });

  useEffect(() => {
    dispatch(getProfile());
    suspendListFetch();
  }, []);

  useEffect(() => {
    notiUnreadCountFetch();
    reportProfitFetch();
  }, [isFocused, shopId]);

  return (
    <BaseView>
      <StandardPadding>
        {isOwnerRole && (
          <>
            <Text
              fontStyle="FW700_16"
              textColor={String(colors.color717171)}
              style={{marginBottom: 0}}>
              {t('sales_summary')}
            </Text>
            <ChartTab profitData={profitData} />
          </>
        )}

        <Stack columnSpace={15}>
          <TouchableOpacity
            onPress={() => navigate(SCREENS.INVOICE.name)}
            style={[styles.card, {backgroundColor: colors.orange}]}>
            <SvgXml xml={IconSvg.invoice(String(colors.white))} />
            <Text fontStyle="FW400_10" textColor={String(colors.white)}>
              {t('invoices')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigate(SCREENS.CASHIER.name)}
            style={[styles.card, {backgroundColor: colors.green}]}>
            <SvgXml xml={IconSvg.cashier(String(colors.white))} />
            <Text fontStyle="FW400_10" textColor={String(colors.white)}>
              {t('cashier')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigate(SCREENS.REPORT.name)}
            style={[styles.card, {backgroundColor: colors.blue}]}>
            <SvgXml xml={IconSvg.report(String(colors.white))} />
            <Text fontStyle="FW400_10" textColor={String(colors.white)}>
              {t('report')}
            </Text>
          </TouchableOpacity>
        </Stack>
      </StandardPadding>
    </BaseView>
  );
};

const styles = StyleSheet.create({
  amountBox: {
    borderWidth: 1,
    borderRadius: 7,
    padding: 15,
  },
  card: {
    flex: 1,
    borderRadius: 7,
    height: 59,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 4,
  },
});
