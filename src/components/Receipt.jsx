import React, { forwardRef } from 'react';

function format(n) {
  return n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

const Receipt = forwardRef(function Receipt({ company = { name: 'Cafe Pos', address: '123 Main St', phone: '555-1234' }, items = [], summary = { sub: 0, disc: 0, tax: 0, total: 0 } }, ref){
  return (
    <div ref={ref} className="bg-white p-6 rounded-xl shadow-sm border max-w-md mx-auto print:shadow-none print:border-0 print:p-0">
      <div className="text-center">
        <div className="text-lg font-semibold">{company.name}</div>
        <div className="text-xs text-gray-500">{company.address}</div>
        <div className="text-xs text-gray-500">{company.phone}</div>
      </div>

      <div className="my-3 border-t border-dashed"></div>

      <div className="text-sm">
        {items.map((i) => (
          <div key={i.id} className="flex items-center justify-between py-1">
            <div>
              <div className="font-medium">{i.name}</div>
              <div className="text-[10px] text-gray-500">x{i.qty} @ ${format(i.price)}</div>
            </div>
            <div className="font-medium">${format(i.price * i.qty)}</div>
          </div>
        ))}
      </div>

      <div className="my-3 border-t border-dashed"></div>

      <div className="text-sm space-y-1">
        <div className="flex items-center justify-between"><span>Subtotal</span><span>${format(summary.sub)}</span></div>
        <div className="flex items-center justify-between"><span>Discount</span><span>-${format(summary.disc)}</span></div>
        <div className="flex items-center justify-between"><span>Tax</span><span>${format(summary.tax)}</span></div>
        <div className="border-t pt-1 flex items-center justify-between text-base font-semibold"><span>Total</span><span>${format(summary.total)}</span></div>
      </div>

      <div className="mt-4 text-center text-[11px] text-gray-500">Thanks for your purchase!</div>
    </div>
  );
});

export default Receipt;
