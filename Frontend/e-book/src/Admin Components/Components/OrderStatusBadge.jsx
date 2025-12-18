import { Badge } from "../../Components/ui/badge";
import { cn } from "../../lib/utils";

export function OrderStatusBadge({ status }) {
  const statusConfig = {
    pending: {
      label: "Pending",
      className: "border-yellow-400 text-yellow-600 bg-yellow-50",
    },
    confirmed: {
      label: "Confirmed",
      className: "border-blue-400 text-blue-600 bg-blue-50",
    },
    delivered: {
      label: "Delivered",
      className: "border-green-400 text-green-600 bg-green-50",
    },
    shipped: {
      label: "Shipped",
      className: "border-purple-400 text-purple-600 bg-purple-50",
    },
    cancelled: {
      label: "Cancelled",
      className: "border-red-400 text-red-600 bg-red-50",
    },
  };

  const config = statusConfig[status] || {
    label: "Unknown",
    className: "border-gray-300 text-gray-600 bg-gray-50",
  };

  return (
    <Badge
      variant="outline"
      className={cn(
        "font-medium capitalize px-3 py-1 rounded-full",
        config.className
      )}
    >
      {config.label}
    </Badge>
  );
}
