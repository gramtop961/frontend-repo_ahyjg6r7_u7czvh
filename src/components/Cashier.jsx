import React, { useMemo, useState } from 'react';

const demoProducts = [
  { id: 'p1', name: 'Espresso', price: 3.0, taxRate: 0.07, sku: 'ESP-01', stock: 42 },
  { id: 'p2', name: 'Latte', price: 4.5, taxRate: 0.07, sku: 'LAT-01', stock: 27 },
  { id: 'p3', name: 'Croissant', price: 2.2, taxRate: 0.07, sku: 'CRS-01', stock: 16 },
  { id: 'p4', name: 'Bagel', price: 2.0, taxRate: 0.07, sku: 'BGL-01', stock: 10 },
];

function format(n) {
  return n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function Cashier() {
  const [cart, setCart] = useState([]);
  const [discount, setDiscount] = useState(0); // percentage 0-100
  const [payment, setPayment] = useState({ method: 'cash', amount: '' });

  const addToCart = (p) => {
    setCart((prev) => {
      const found = prev.find((i) => i.id === p.id);
      if (found) return prev.map((i) => (i.id === p.id ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { ...p, qty: 1 }];
    });
  };

  const updateQty = (id, qty) => {
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, Number(qty) || 1) } : i)));
  };

  const decrement = (id) => {
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, i.qty - 1) } : i)));
  };

  const increment = (id) => {
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)));
  };

  const removeItem = (id) => setCart((prev) => prev.filter((i) => i.id !== id));

  const summary = useMemo(() => {
    const sub = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const disc = sub * (Number(discount) / 100);
    const taxable = Math.max(0, sub - disc);
    const taxBase = sub || 1; // prevent division by zero
    const tax = cart.reduce((t, i) => t + i.price * i.qty * i.taxRate, 0) * ((sub - disc) / taxBase);
    const total = taxable + tax;
    return { sub, disc, tax, total };
  }, [cart, discount]);

  const change = useMemo(() => {
    const amt = Number(payment.amount) || 0;
    return Math.max(0, amt - summary.total);
  }, [payment.amount, summary.total]);

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2 bg-white rounded-xl shadow-sm border p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-lg">Cart</h3>
          <button
            className="text-sm text-red-600 hover:underline disabled:opacity-40"
            onClick={() => setCart([])}
            disabled={!cart.length}
          >
            Clear
          </button>
        </div>
        <div className="space-y-3 max-h-80 overflow-auto pr-2">
          {cart.length === 0 && (
            <div className="text-gray-500 text-sm">No items yet. Add products from the right.</div>
          )}
          {cart.map((i) => (
            <div key={i.id} className="flex items-center justify-between border rounded-lg p-3">
              <div>
                <div className="font-medium">{i.name}</div>
                <div className="text-xs text-gray-500">{i.sku}</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center border rounded-md overflow-hidden">
                  <button
                    aria-label={`Decrease ${i.name}`}
                    onClick={() => decrement(i.id)}
                    className="px-2 py-1 text-lg leading-none hover:bg-gray-50 disabled:opacity-40"
                    disabled={i.qty <= 1}
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={i.qty}
                    onChange={(e) => updateQty(i.id, e.target.value)}
                    className="w-14 text-center px-2 py-1 text-sm focus:outline-none"
                    min={1}
                  />
                  <button
                    aria-label={`Increase ${i.name}`}
                    onClick={() => increment(i.id)}
                    className="px-2 py-1 text-lg leading-none hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
                <div className="w-20 text-right font-medium">${format(i.price * i.qty)}</div>
                <button
                  onClick={() => removeItem(i.id)}
                  className="text-xs text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <label className="flex items-center gap-2">Discount (%)
            <input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(Math.min(100, Math.max(0, Number(e.target.value) || 0)))}
              className="ml-auto w-24 border rounded-md px-2 py-1"
            />
          </label>
          <div className="flex items-center gap-2">Subtotal <span className="ml-auto font-medium">${format(summary.sub)}</span></div>
          <div className="flex items-center gap-2">Discount <span className="ml-auto font-medium">-${format(summary.disc)}</span></div>
          <div className="flex items-center gap-2">Tax <span className="ml-auto font-medium">${format(summary.tax)}</span></div>
          <div className="col-span-2 border-t pt-2 flex items-center gap-2 text-base">Total <span className="ml-auto font-semibold">${format(summary.total)}</span></div>
        </div>

        <div className="mt-4 grid sm:grid-cols-3 gap-3">
          <select
            value={payment.method}
            onChange={(e) => setPayment({ ...payment, method: e.target.value })}
            className="border rounded-md px-3 py-2"
          >
            <option value="cash">Cash</option>
            <option value="card">Card</option>
            <option value="digital">Digital</option>
          </select>
          <input
            type="number"
            placeholder="Amount received"
            value={payment.amount}
            onChange={(e) => setPayment({ ...payment, amount: e.target.value })}
            className="border rounded-md px-3 py-2"
          />
          <button className="bg-indigo-600 text-white rounded-md px-3 py-2 font-medium disabled:opacity-50" disabled={!cart.length}>
            Complete Sale
          </button>
        </div>

        {payment.method === 'cash' && (
          <div className="mt-2 text-sm text-gray-700">Change: <span className="font-semibold">${format(change)}</span></div>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-4">
        <h3 className="font-semibold mb-3">Products</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[28rem] overflow-auto pr-1">
          {demoProducts.map((p) => (
            <button
              key={p.id}
              onClick={() => addToCart(p)}
              className="border rounded-lg p-3 text-left hover:border-indigo-500"
            >
              <div className="font-medium">{p.name}</div>
              <div className="text-xs text-gray-500">{p.sku}</div>
              <div className="mt-2 text-indigo-600 font-semibold">${format(p.price)}</div>
            </button>
          ))}
        </div>
        <div className="mt-3 text-xs text-gray-500">Tap to add to cart. Use +/− to adjust quantities. Taxes auto-applied.</div>
      </div>
    </div>
  );
}
