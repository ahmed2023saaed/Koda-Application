function CartCard({ cart }) {
  const items = cart.items ?? [];
  const money = (n) => `$${Number(n ?? 0).toFixed(2)}`;
  const imageUrl = (img) => (typeof img === "string" ? img : img?.url);
  const couponLabel =
    typeof cart.coupon === "string" ? cart.coupon : cart.coupon?.code;

  return (
    <article className="rounded-3xl border border-slate-800 bg-slate-900/60 p-5">
      <header className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Cart</h3>
        <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs text-cyan-300">
          {cart.itemCount ?? items.length} items
        </span>
      </header>

      <ul className="mt-4 divide-y divide-slate-800">
        {items.map((item) => (
          <li key={item._id} className="flex items-center gap-3 py-3">
            <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-slate-800">
              {imageUrl(item.image) && (
                <img
                  src={imageUrl(item.image)}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white">{item.name}</p>
              <p className="text-xs text-slate-400">
                Qty: {item.quantity} × {money(item.price)}
              </p>
            </div>
            <p className="text-sm font-semibold text-white">
              {money(item.price * item.quantity)}
            </p>
          </li>
        ))}
      </ul>

      <footer className="mt-4 space-y-2 border-t border-slate-800 pt-4 text-sm">
        <div className="flex justify-between text-slate-400">
          <span>Subtotal</span>
          <span>{money(cart.subtotal)}</span>
        </div>
        {cart.discountAmount > 0 && (
          <div className="flex justify-between text-emerald-400">
            <span>Discount {couponLabel ? `(${couponLabel})` : ""}</span>
            <span>-{money(cart.discountAmount)}</span>
          </div>
        )}
        <div className="flex justify-between text-lg font-bold text-cyan-300">
          <span>Total</span>
          <span>{money(cart.total)}</span>
        </div>
      </footer>
    </article>
  );
}

export default CartCard;