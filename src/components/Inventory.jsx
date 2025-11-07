import React, { useMemo, useState } from 'react';

const initial = [
  { id: 'p1', name: 'Espresso', sku: 'ESP-01', price: 3.0, stock: 42, low: 10 },
  { id: 'p2', name: 'Latte', sku: 'LAT-01', price: 4.5, stock: 27, low: 8 },
  { id: 'p3', name: 'Croissant', sku: 'CRS-01', price: 2.2, stock: 16, low: 6 },
];

function format(n) {
  return n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function Inventory() {
  const [items, setItems] = useState(initial);
  const [query, setQuery] = useState('');
  const [form, setForm] = useState({ id: '', name: '', sku: '', price: '', stock: '', low: '' });

  const filtered = useMemo(() => items.filter(i => {
    const q = query.toLowerCase();
    return [i.name, i.sku].some(v => v.toLowerCase().includes(q));
  }), [items, query]);

  const submit = (e) => {
    e.preventDefault();
    const exists = items.some(i => i.id === form.id);
    const next = { ...form, price: Number(form.price)||0, stock: Number(form.stock)||0, low: Number(form.low)||0 };
    if (exists) setItems(prev => prev.map(i => i.id === form.id ? next : i));
    else setItems(prev => [...prev, next]);
    setForm({ id: '', name: '', sku: '', price: '', stock: '', low: '' });
  };

  const edit = (i) => setForm(i);
  const remove = (id) => setItems(prev => prev.filter(i => i.id !== id));

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2 bg-white rounded-xl shadow-sm border p-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or SKU"
            className="flex-1 border rounded-md px-3 py-2"
          />
          <div className="text-sm text-gray-500">{filtered.length} items</div>
        </div>

        <div className="overflow-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="py-2">ID</th>
                <th>Name</th>
                <th>SKU</th>
                <th className="text-right">Price</th>
                <th className="text-right">Stock</th>
                <th className="text-right">Low</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(i => (
                <tr key={i.id} className="border-b last:border-0">
                  <td className="py-2">{i.id}</td>
                  <td>{i.name}</td>
                  <td>{i.sku}</td>
                  <td className="text-right">${format(i.price)}</td>
                  <td className={`text-right ${i.stock <= i.low ? 'text-red-600 font-semibold' : ''}`}>{i.stock}</td>
                  <td className="text-right">{i.low}</td>
                  <td className="text-right">
                    <button className="text-indigo-600 mr-3" onClick={() => edit(i)}>Edit</button>
                    <button className="text-red-600" onClick={() => remove(i.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-4">
        <h3 className="font-semibold mb-3">Add / Edit Product</h3>
        <form onSubmit={submit} className="space-y-3 text-sm">
          <div>
            <label className="block text-gray-600 mb-1">ID</label>
            <input value={form.id} onChange={e=>setForm({...form, id: e.target.value})} required className="w-full border rounded-md px-3 py-2" />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Name</label>
            <input value={form.name} onChange={e=>setForm({...form, name: e.target.value})} required className="w-full border rounded-md px-3 py-2" />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">SKU</label>
            <input value={form.sku} onChange={e=>setForm({...form, sku: e.target.value})} required className="w-full border rounded-md px-3 py-2" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-gray-600 mb-1">Price</label>
              <input type="number" value={form.price} onChange={e=>setForm({...form, price: e.target.value})} className="w-full border rounded-md px-3 py-2" />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Stock</label>
              <input type="number" value={form.stock} onChange={e=>setForm({...form, stock: e.target.value})} className="w-full border rounded-md px-3 py-2" />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Low</label>
              <input type="number" value={form.low} onChange={e=>setForm({...form, low: e.target.value})} className="w-full border rounded-md px-3 py-2" />
            </div>
          </div>
          <button type="submit" className="w-full bg-indigo-600 text-white rounded-md px-3 py-2 font-medium">Save</button>
        </form>
        <div className="mt-3 text-xs text-gray-500">Low stock numbers turn red for quick alerts.</div>
      </div>
    </div>
  );
}
