// import ProductCard from "./ProductCard";

// export default function ProductList({ products }) {
//   return (
//     <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//       {products.map((product) => (
//         <ProductCard key={product._id} product={product} />
//       ))}
//     </div>
//   );
// }
import ProductCard from "./ProductCard";

export default function ProductList({ products, onDelete, onQuickEdit }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          onDelete={onDelete}
          onQuickEdit={onQuickEdit}
        />
      ))}
    </div>
  );
}