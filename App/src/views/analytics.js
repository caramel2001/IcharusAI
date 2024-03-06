import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, Sector } from 'recharts';
import { BarChart, Bar, XAxis, YAxis } from 'recharts';

import './analytics.css';

const dataPie = [
  { name: 'Applications', value: 400 },
  { name: 'Rejections', value: 300 },
  { name: 'Online Assessment', value: 300 },
  { name: 'Interviews', value: 200 },
  { name: 'Acceptances', value: 100 },
];

const dataBar = [
  { name: 'Jan', uv: 4000 },
  { name: 'Feb', uv: 3000 },
  { name: 'Mar', uv: 2000 },
  { name: 'Apr', uv: 2780 },
  { name: 'May', uv: 1890 },
  { name: 'Jun', uv: 2390 },
  { name: 'Jul', uv: 3490 },
];


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const MetricCard = ({ title, value, percentage }) => {
  return (
    <div className="metric-card">
      <div className="metric-title">{title}</div>
      <div className="metric-value">{value}</div>
      <div className={`metric-percentage ${percentage.startsWith('-') ? 'negative' : 'positive'}`}>
        {percentage}
      </div>
      <div className="metric-footer">
        vs previous 30 days
      </div>
    </div>
  );
};

const Analytics = () => {
  return (
    <div className="analytics-dashboard">
      <h1>Executive Dashboard</h1>
      <div className="metrics-container">
        <MetricCard title="New Wins" value="230" percentage="+25%" />
        <MetricCard title="Trial:Win Rate" value="9.86%" percentage="+25%" />
        <MetricCard title="New MRR" value="$25,690" percentage="+8.7%" />
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
        <div className="w-full md:w-1/2 p-4">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={dataBar}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="uv" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="w-full md:w-1/2 p-4">
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={dataPie}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label
              >
                {dataPie.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend layout="vertical" verticalAlign="middle" align="right" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;