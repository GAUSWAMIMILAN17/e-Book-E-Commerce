const OrderBookCard = ({ item }) => {
  return (
    <div className="bg-white border rounded-b-xl p-4 shadow-sm hover:shadow-md transition">
      
      <h2 className="font-semibold text-lg text-gray-800 mb-2">
        {item?.book?.title}
      </h2>

      <div className="text-sm text-gray-600 space-y-1">
        <p><span className="font-medium">Language:</span> {item?.book?.language}</p>
        <p><span className="font-medium">Published:</span> {item?.book?.publishedYear}</p>
        <p><span className="font-medium">Price:</span> ₹{item?.book?.price}</p>
        <p><span className="font-medium">Quantity:</span> {item?.quantity}</p>
      </div>

      <div className="mt-3 pt-3 border-t flex justify-between items-center">
        <span className="text-sm text-gray-500">Subtotal</span>
        <span className="font-semibold text-[#008ECC]">
          ₹{item?.book?.price * item?.quantity}
        </span>
      </div>
    </div>
  );
};

export default OrderBookCard;
