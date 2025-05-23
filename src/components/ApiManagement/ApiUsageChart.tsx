
import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { ChartContainer, ChartTooltipContent, ChartLegendContent } from '@/components/ui/chart';

// Sample data for the API usage chart
const data = [
  { date: 'Oct 1', requests: 1200, errors: 23, latency: 95 },
  { date: 'Oct 2', requests: 1300, errors: 18, latency: 88 },
  { date: 'Oct 3', requests: 1400, errors: 25, latency: 92 },
  { date: 'Oct 4', requests: 1800, errors: 29, latency: 102 },
  { date: 'Oct 5', requests: 2000, errors: 31, latency: 110 },
  { date: 'Oct 6', requests: 2300, errors: 42, latency: 125 },
  { date: 'Oct 7', requests: 2500, errors: 40, latency: 118 },
  { date: 'Oct 8', requests: 2200, errors: 32, latency: 98 },
  { date: 'Oct 9', requests: 1900, errors: 26, latency: 90 },
  { date: 'Oct 10', requests: 1700, errors: 22, latency: 88 },
  { date: 'Oct 11', requests: 1600, errors: 19, latency: 85 },
  { date: 'Oct 12', requests: 1900, errors: 23, latency: 90 },
  { date: 'Oct 13', requests: 2100, errors: 28, latency: 96 },
  { date: 'Oct 14', requests: 2400, errors: 35, latency: 105 },
];

export const ApiUsageChart = () => {
  const [chartType, setChartType] = React.useState<'line' | 'bar'>('line');
  const [metric, setMetric] = React.useState<'requests' | 'errors' | 'latency'>('requests');

  const config = {
    requests: {
      label: 'API Requests',
      theme: {
        dark: '#22c55e', // green color for requests
        light: '#22c55e',
      },
    },
    errors: {
      label: 'Errors',
      theme: {
        dark: '#ef4444', // red color for errors
        light: '#ef4444',
      },
    },
    latency: {
      label: 'Avg. Latency (ms)',
      theme: {
        dark: '#8b5cf6', // purple color for latency
        light: '#8b5cf6',
      },
    },
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <button
            onClick={() => setChartType('line')}
            className={`px-3 py-1 rounded text-sm ${
              chartType === 'line' ? 'bg-primary text-white' : 'bg-muted'
            }`}
          >
            Line
          </button>
          <button
            onClick={() => setChartType('bar')}
            className={`px-3 py-1 rounded text-sm ${
              chartType === 'bar' ? 'bg-primary text-white' : 'bg-muted'
            }`}
          >
            Bar
          </button>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setMetric('requests')}
            className={`px-3 py-1 rounded text-sm ${
              metric === 'requests' ? 'bg-primary text-white' : 'bg-muted'
            }`}
          >
            Requests
          </button>
          <button
            onClick={() => setMetric('errors')}
            className={`px-3 py-1 rounded text-sm ${
              metric === 'errors' ? 'bg-primary text-white' : 'bg-muted'
            }`}
          >
            Errors
          </button>
          <button
            onClick={() => setMetric('latency')}
            className={`px-3 py-1 rounded text-sm ${
              metric === 'latency' ? 'bg-primary text-white' : 'bg-muted'
            }`}
          >
            Latency
          </button>
        </div>
      </div>

      <ChartContainer config={config} className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'line' ? (
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip content={<ChartTooltipContent />} />
              <Legend content={<ChartLegendContent />} />
              <Line
                type="monotone"
                dataKey={metric}
                name={config[metric].label}
              />
            </LineChart>
          ) : (
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip content={<ChartTooltipContent />} />
              <Legend content={<ChartLegendContent />} />
              <Bar
                dataKey={metric}
                name={config[metric].label}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};
