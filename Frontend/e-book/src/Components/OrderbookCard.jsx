const OrderbookCard = ({ item }) => {
  return (
    <div className="border p-4 rounded-b-xl bg-white shadow-sm">
      <h2 className="font-semibold text-lg">
        {item.book.title}
      </h2>


      <p>Language : {item.book.language}</p>
      <p>Published Year : {item.book.publishedYear}</p>
      <p>Price : ₹{item.book.price}</p>
      <p>Quantity : {item.quantity}</p>

      <p className="font-semibold mt-2">
        Subtotal : ₹{item.book.price * item.quantity}
      </p>
    </div>
  );
};

export default OrderbookCard;
