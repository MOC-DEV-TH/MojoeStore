import {useColors} from '@hooks';
import {summaryTickFormat} from '@utils';
import {Defs, LinearGradient, Stop} from 'react-native-svg';
import {
  VictoryArea,
  VictoryAxis,
  VictoryChart,
  VictoryLabel,
  VictoryTheme,
} from 'victory-native';

export const Chart = ({chartInfo}: any) => {
  const colors = useColors();

  const {data = [], tickValues = [], type} = chartInfo;

  const monthNames = [
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

  const getMonthName = (value: any) => {
    const month = parseInt(String(value), 10);

    if (month >= 1 && month <= 12) {
      return monthNames[month - 1];
    }

    return String(value);
  };

  const formatXAxis = (value: any) => {
    console.log('XAxis value =', value);
    console.log('Chart type =', type);

    // 3M / 6M / 1Y
    if (
      type === '3M' ||
      type === '6M' ||
      type === '1Y'
    ) {
      return getMonthName(value);
    }

    return summaryTickFormat(value, type);
  };

  return (
    <VictoryChart
      theme={VictoryTheme.material}
      domainPadding={25}
      height={250}
      padding={{
        top: 0,
        bottom: 30,
        left: 0,
        right: 30,
      }}>

      {/* X Axis */}
      <VictoryAxis
        {...(tickValues.length > 0
          ? {tickValues}
          : {})}
        tickFormat={formatXAxis}
        style={{
          axis: {
            strokeOpacity: 0,
          },
        }}
      />

      {/* Chart */}
      <VictoryArea
        style={{
          data: {
            fill: 'url(#gradientStroke)',
            stroke: String(colors.primary),
            strokeWidth: 3,
          },
        }}
        data={data.map(({x, y}: any) => ({
          x,
          y: parseFloat(y) || 0,
        }))}
        labelComponent={
          <VictoryLabel
            style={{
              fontSize: 12,
              fontWeight: 'bold',
            }}
          />
        }
      />

      <Defs>
        <LinearGradient
          id="gradientStroke"
          x1="0%"
          y1="100%"
          x2="0%"
          y2="0%">
          <Stop
            offset="0%"
            stopColor="white"
            stopOpacity={0}
          />

          <Stop
            offset="100%"
            stopColor="#f4e0e5"
          />
        </LinearGradient>
      </Defs>

      <VictoryAxis
        dependentAxis
        offsetX={70}
        style={{
          axis: {
            strokeOpacity: 0,
          },
        }}
        tickFormat={t => `${Math.round(t)}`}
      />
    </VictoryChart>
  );
};