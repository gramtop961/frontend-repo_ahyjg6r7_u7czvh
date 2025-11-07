import React, { useMemo, useState } from 'react';

const demoSales = [
  { id: 's1', date: '2025-11-01', items: 12, total: 84.5 },
  { id: 's2', date: '2025-11-02', items: 9, total: 63.1 },
  { id: 's3', date: '2025-11-03', items: 18, total: 122.8 },
  { id: 's4', date: '2025-11-04', items: 7, total: 49.9 },
];

export default function Reports() {
  const [range, setRange] = useState('week');

  const kpis = useMemo(() => {
    const orders = demoSales.length;
    const revenue = demoSales.reduce((s, i) => s + i.total, 0);
    const items = demoSales.reduce((s, i) => s + i.items, 0);
    const avg = revenue / (orders || 1);
    return { orders, revenue, items, avg };
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">Sales Overview</h3>
        <select value={range} onChange={(e)=>setRange(e.target.value)} className="border rounded-md px-2 py-1 text-sm">
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
      </div>

      <div className="grid sm:grid-cols-4 gap-3">
        <Card label="Orders" value={kpis.orders} />
        <Card label="Revenue" value={`$${kpis.revenue.toFixed(2)}`} />
        <Card label="Items" value={kpis.items} />
        <Card label="Avg. Ticket" value={`$${kpis.avg.toFixed(2)}`} />
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-4">
        <h4 className="font-medium mb-2">Recent Sales</h4>
        <div className="text-sm divide-y">
          {demoSales.map(s => (
            <div key={s.id} className="py-2 flex items-center justify-between">
              <div className="text-gray-600">{s.date}</div>
              <div className="font-medium">${s.total.toFixed(2)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Card({ label, value }){
  return (
    <div className="bg-white rounded-xl shadow-sm border p-4">
      <div className="text-xs text-gray-500 mb-1">{label}</div>
      <div className="text-xl font-semibold">{value}</div>
    </div>
  );
}
