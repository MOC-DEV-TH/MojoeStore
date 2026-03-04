import {View, Text as RNText} from 'react-native';
import {Chart} from '../chart';
import {SPACING, SUMMARY_PERIOD} from '@constants';
import {useEffect, useState} from 'react';
import {Button, Stack, Text} from '@components';
import {useDispatch, useSelector} from 'react-redux';
import {getChartDataById} from '@slices';
import {RootState} from '@redux';
import {divideData} from '@utils';
import {useColors, useFonts} from '@hooks';
import {useTranslation} from 'react-i18next';

export const TabBtn = ({label, active, onPress}: any) => {
  return (
    <Button
      title={label}
      onPress={onPress}
      borderRadius={30}
      size="sm"
      paddingHorizontal={15}
      colorScheme={active ? 'primary' : 'white'}
      textColor={active ? 'white' : 'black'}
    />
  );
};

export const ChartTab = ({profitData}) => {
  const [activeTab, setActiveTab] = useState(SUMMARY_PERIOD.ONE_WEEK);
  const {data: chartData, revenue} = useSelector(
    (store: RootState) => store.common.chartData,
  );
  const dispatch = useDispatch();
  const colors = useColors();
  const fonts = useFonts();
  const {t} = useTranslation();

  const changeDataShape = (chart: any[] = [], type = '') => {
    const xAxisData: any = divideData(chart, 4);
    let tickValues: any[] = [];

    if (type === SUMMARY_PERIOD.ONE_MONTH) {
      tickValues = [chart[0]?.x || null, ...xAxisData];
    }

    return {
      data: chart,
      tickValues: tickValues,
      type,
    };
  };

  useEffect(() => {
    dispatch(
      getChartDataById({
        id: 1,
        type: SUMMARY_PERIOD.THREE_MONTH,
      }),
    );
  }, [dispatch]);

  return (
    <View style={{marginBottom: 20}}>
      <Stack justify="space-between" style={{paddingVertical: 15}}>
        {Object.values(SUMMARY_PERIOD).map((name, index) => (
          <TabBtn
            label={name}
            active={activeTab === name}
            onPress={() => {
              setActiveTab(name);
              dispatch(
                getChartDataById({
                  id: index + 1,
                  type: name,
                }),
              );
            }}
          />
        ))}
      </Stack>

      <Chart chartInfo={changeDataShape(chartData, activeTab)} />

      <View
        style={[
          {
            borderColor: colors.blue,
            marginBottom: SPACING['LARGE'],
            borderWidth: 1,
            borderRadius: 7,
            padding: 15,
            marginTop: 15,
          },
        ]}>
        <RNText style={{...fonts.en.FW600_16, color: colors.color212325}}>
          {profitData}
        </RNText>
        <Text>{t('profit')}</Text>
      </View>
    </View>
  );
};
