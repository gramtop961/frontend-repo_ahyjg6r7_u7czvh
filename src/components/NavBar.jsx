import React from 'react';
import { ShoppingCart, Package, BarChart3 } from 'lucide-react';

const tabs = [
  { key: 'cashier', label: 'Cashier', icon: ShoppingCart },
  { key: 'inventory', label: 'Inventory', icon: Package },
  { key: 'reports', label: 'Reports', icon: BarChart3 },
];

export default function NavBar({ active, onChange }) {
  return (
    <div className="w-full border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-indigo-600 text-white grid place-items-center font-bold">P</div>
          <div>
            <div className="font-semibold leading-tight">POS Dashboard</div>
            <div className="text-xs text-gray-500">Fast checkout • Smart inventory</div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-1">
          {tabs.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => onChange(key)}
              className={`inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-all ${
                active === key
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="md:hidden px-3 pb-3 flex items-center gap-2">
        {tabs.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => onChange(key)}
            className={`px-3 py-1.5 rounded-full text-sm ${
              active === key ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
