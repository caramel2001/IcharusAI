import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, Sector } from 'recharts';
import { BarChart, Bar, XAxis, YAxis } from 'recharts';

import './analytics.css';

const dataPie = [
  { name: 'Applications', value:35 },
  { name: 'Rejections', value: 10 },
  { name: 'Online Assessment', value: 18 },
  { name: 'Interviews', value: 4 },
  { name: 'Acceptances', value: 1 },
];

const dataBar = [
  { name: 'Fri', NumberOfApplications: 7 },
  { name: 'Sat', NumberOfApplications: 4 },
  { name: 'Sun', NumberOfApplications: 3 },
  { name: 'Mon', NumberOfApplications: 9},
  { name: 'Tue', NumberOfApplications: 8 },
  { name: 'Wed', NumberOfApplications: 4 },
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
        Last week data only
      </div>
    </div>
  );
};

const Analytics = () => {
  return (
    <div className="analytics-dashboard">
      <h1>Job Application Status Dashboard</h1>
      <div className="metrics-container">
        <MetricCard title="Latest Application" value="HRT Traders" percentage="Current Stage: OA" />
        <MetricCard title="Application to Interview Rate %" value="11.43" percentage="Interview scheduled on 09/03/2024" />
        <MetricCard title="Pending Applications" value="17" percentage="QA/Applications Stage only" />
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
        <div className="w-full md:w-1/2 p-4">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={dataBar}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="NumberOfApplications" fill="#8884d8" />
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