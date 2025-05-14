import React from 'react';
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const AdminChart = ({ studentCount, lecturerCount }) => {
  const data = [
    { name: 'Lecturers', uv: lecturerCount, pv: 0 },
    { name: 'Students', uv: studentCount, pv: 0 },
    // { name: 'Classes', uv: 2000, pv: 9800 },
  
  ];
  
  return (
    
  <ResponsiveContainer width="100%" height="100%">
  <BarChart data={data} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Bar dataKey="pv" fill="#8884d8" radius={[4, 4, 0, 0]} />
    <Bar dataKey="uv" fill="#82ca9d" radius={[4, 4, 0, 0]} />
  </BarChart>
</ResponsiveContainer>
  )
}

export default AdminChart