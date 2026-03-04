import {BaseView, Stack, Text} from '@components';
import {MONTH, SPACING} from '@constants';
import {SectionList, Text as RNText, View} from 'react-native';
import {FilterBar, ReportItem} from './components';
import {useColors, useFonts, useInfinite} from '@hooks';
import {endpoints} from '@services';
import {useEffect} from 'react';

export const ReportScreen = () => {
  const fonts = useFonts();
  const colors = useColors();
  const {data, response, fetchData, fetchNextPage, onRefresh, isRefreshing} =
    useInfinite({
      classify: 'data',
      url: endpoints.report.getReportList,
      pageStart: 1,
      pageSize: 10,
      canLoadMore: (response: any) =>
        response?.current_page < response?.total_pages,
      transformData: (data: any) => {
        return data.map(({total_paymenttype, ...rest}: any) => ({
          ...rest,
          data: total_paymenttype,
        }));
      },
    });

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <BaseView noPadding>
      <SectionList
        sections={data}
        ListHeaderComponent={<FilterBar onFilter={fetchData} />}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => <ReportItem data={item} />}
        renderSectionHeader={({section: {title}}) => {
          const parts = title.split('-');
          const monthIndex = parseInt(parts[0] - 1);
          const month = MONTH[monthIndex];
          const year = parts[1];
          return (
            <Stack
              style={{
                padding: SPACING['STANDARD'],
                backgroundColor: colors.colorD6D6D6,
                marginBottom: 10,
              }}
              justify="space-between">
              <RNText style={{...fonts.en.FW600_14, color: colors.black}}>
                {month} {year}
              </RNText>
            </Stack>
          );
        }}
      />
    </BaseView>
  );
};
