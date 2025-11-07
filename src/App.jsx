import React, { useState } from 'react';
import NavBar from './components/NavBar';
import Cashier from './components/Cashier';
import Inventory from './components/Inventory';
import Reports from './components/Reports';

function App() {
  const [tab, setTab] = useState('cashier');

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar active={tab} onChange={setTab} />

      <main className="max-w-6xl mx-auto px-4 py-6">
        {tab === 'cashier' && <Cashier />}
        {tab === 'inventory' && <Inventory />}
        {tab === 'reports' && <Reports />}
      </main>
    </div>
  );
}

export default App;
