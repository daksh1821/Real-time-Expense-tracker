import * as React from 'react';
import Paper from '@mui/material/Paper';
import {
    Chart,
    ArgumentAxis,
    ValueAxis,
    BarSeries,
    Tooltip,
  } from '@devexpress/dx-react-chart-material-ui';
import { scaleBand } from '@devexpress/dx-chart-core';
import { ArgumentScale, Stack } from '@devexpress/dx-react-chart';
import { ValueScale, Animation } from '@devexpress/dx-react-chart';
import { EventTracker } from '@devexpress/dx-react-chart';
import dayjs from 'dayjs';
export default function TransactionChart({data}) {
    const chartData = data.map(item=>{
        item.month = dayjs().month(item._id-1).format("MMMM");
        return item;
    })
    return (
        <Paper sx={{marginTop:7}}>
          <Chart
            data={chartData}
          >
            <ArgumentScale factory={scaleBand} />
            <ArgumentAxis />
            <ValueAxis />
            <Animation />
            <EventTracker />
            <Tooltip />
            <BarSeries
              valueField="totalExpenses"
              argumentField="month"
            />
          </Chart>
        </Paper>
    );
}