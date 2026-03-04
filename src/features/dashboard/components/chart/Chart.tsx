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
  const {data, tickValues, type} = chartInfo;

  console.log('data', data);

  return (
    <VictoryChart
      theme={VictoryTheme.material}
      domainPadding={25}
      height={250}
      padding={{top: 0, bottom: 30, left: 0, right: 30}}>
      {tickValues.length ? (
        <VictoryAxis
          tickValues={tickValues}
          style={{axis: {strokeOpacity: 0}}}
          tickFormat={t => summaryTickFormat(t, type)}
        />
      ) : (
        <VictoryAxis style={{axis: {strokeOpacity: 0}}} />
      )}

      <VictoryArea
        style={{
          data: {
            fill: 'url(#gradientStroke)',
            stroke: `${String(colors.primary)}`,
            strokeWidth: 3,
          },
        }}
        data={data.map(({x, y}) => ({x, y: parseFloat(y)}))}
        labelComponent={
          <VictoryLabel style={{fontSize: 12, fontWeight: 'bold'}} />
        }
      />

      <Defs>
        <LinearGradient id="gradientStroke" x1="0%" y1="100%" x2="0%" y2="0%">
          <Stop offset="0%" stopColor="white" stopOpacity={0} />
          <Stop offset="100%" stopColor={'#f4e0e5'} />
        </LinearGradient>
      </Defs>
      <Defs>
        <LinearGradient
          id="barGradientStroke"
          x1="0%"
          y1="100%"
          x2="0%"
          y2="0%">
          <Stop offset="0%" stopColor="white" stopOpacity={0.5} />
          <Stop offset="100%" stopColor={colors.primary} />
        </LinearGradient>
      </Defs>

      {/* <VictoryAxis dependentAxis domain={{x: [0, 100], y: [0, 1]}} /> */}

      <VictoryAxis
        dependentAxis
        offsetX={70}
        style={{axis: {strokeOpacity: 0}}}
        tickFormat={t => `${Math.round(t)}`}
      />
    </VictoryChart>
  );
};
