import { memo } from "react";
import styled from "styled-components";
import { BarChart, Bar, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";

const Style = styled.div`
  .recharts {
    &-layer {
    }

    &-cartesian {
      &-grid {
        &-horizontal {
          line[stroke-dasharray="0"] {
            stroke: #f4f5f6;
          }
        }
      }

      &-axis {
        &-line {
          stroke: #f4f5f6;

          &[orientation="left"] {
            stroke: #ffffff;
          }
        }

        &-ticks {
        }

        &-tick {
          &-value {
            font-weight: 400;
            font-size: 12px;
            line-height: 18px;
            color: #777e91;

            &[orientation="left"] {
              font-weight: 500;
            }
          }

          &-line {
            stroke: #ffffff;
          }
        }
      }
    }

    &-xAxis {
      &.rxAxis {
      }
    }

    &-yAxis {
      &.yAxis {
      }
    }
  }
`;

const BarChartComponent = ({
  data,
  width = 800,
  height = 400,
  nameKey = "name",
  barCategoryGap = 15,
  barGap = -30,
  xaxis = 20,
  yaxis = 20,
  firstBarKey = "income",
  secondBarKey = "expense",
}) => {
  return (
    <Style>
      <BarChart
        width={width}
        height={height}
        data={data}
        margin={{
          top: 5,
          right: 3,
          left: 10,
          bottom: 5,
        }}
        barCategoryGap={barCategoryGap}
        barGap={barGap}
        background={"#FFFFFF"}
      >
        <CartesianGrid strokeDasharray="0" vertical={false} />
        <XAxis dataKey={nameKey} tickSize={xaxis} />
        <YAxis tickSize={yaxis} />
        <Tooltip />

        <Bar dataKey={firstBarKey} fill="#5CCA81" maxBarSize={14} radius={4} />
        <Bar dataKey={secondBarKey} fill="#EF466F" maxBarSize={14} radius={4} />
      </BarChart>
    </Style>
  );
};

export default memo(BarChartComponent);
