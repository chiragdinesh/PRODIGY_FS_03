import { formatCurrency } from "@/lib/formatCurrency";
import { imageUrl } from "@/lib/imageUrl";
import { getMyOrders } from "@/sanity/lib/orders/getMyOrders";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

async function Orders() {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/");
  }

  const orders = await getMyOrders(userId);
  console.log(orders);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl">
        <h1 className="font-bold text-4xl text-gray-900 tracking-tight mb-8 p-4">
          My Orders
        </h1>

        {orders.length === 0 ? (
          <div className="text-center text-gray-900">
            <p>You have not placed any orders yet.</p>
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-8">
            {orders.map((order) => (
              <div
                className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden p-4"
                key={order.orderNumber}
              >
                <div className="p-4 sm:p-6 border-b border-gray-200">
                  <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1 font-bold">
                        Order Number
                      </p>
                      <p className="font-mono text-sm break-all text-green-800">
                        {order.orderNumber}
                      </p>
                    </div>
                    <div className="sm:text-right">
                      <p className="text-sm text-gray-600 mb-1">Order Date</p>
                      <p className="font-medium">
                        {order.orderDate
                          ? new Date(order.orderDate).toLocaleDateString()
                          : "NA"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4">
                  <div className="flex items-center justify-center">
                    <span className="text-sm mr-2 font-semibold">Status:</span>
                    <span
                      className={`${order.status === "paid" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"} px-3 py-4 rounded-lg font-mono capitalize`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <div className="sm:text-right">
                    <p className="text-sm text-gray-800 mb-1">Total Amount</p>
                    <p className="font-bold text-lg">
                      {formatCurrency(order.totalPrice ?? 0, order.currency)}
                    </p>
                  </div>
                </div>

                {order.amountDiscount ? (
                  <div className="bg-red-50 rounded-lg mt-4 p-3 sm:p-4">
                    <p className="text-red-500 font-medium text-sm sm:text-base mb-1">
                      Discount Applied:{" "}
                      {formatCurrency(order.amountDiscount, order.currency)}
                    </p>
                    <p className="text-sm text-gray-600">
                      Original Subtotal:{" "}
                      {formatCurrency(
                        (order.totalPrice ?? 0) + order.amountDiscount,
                        order.currency
                      )}
                    </p>
                  </div>
                ) : null}

                <div className="flex flex-col shadow-lg p-4">
                  <p className="font-bold text-gray-800 text-base">
                    Order Items:
                  </p>

                  <div className="flex flex-col items-center gap-3 sm:gap-4 justify-between">
                    {order.products?.map((product) => (
                      <div
                        key={product.product?._id}
                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-2 border-b last:border-b-0 w-full"
                      >
                        <div className="flex items-center gap-3 sm:gap-4 sm:justify">
                          {product.product?.image && (
                            <div className="relative w-14 h-14 sm:h-16 sm:w-16 rounded-md overflow-hidden">
                              <Image
                                src={imageUrl(product.product.image).url()}
                                alt={product.product.name ?? ""}
                                className="object-cover"
                                fill
                              />
                            </div>
                          )}
                          <div>
                            <p className="font-medium text-sm sm:text-base">
                              {product.product?.name}
                            </p>
                            <p className="text-sm text-gray-800">
                              Quantity: {product.quantity ?? "NA"}
                            </p>
                          </div>
                        </div>
                        <div>
                          <p className="font-bold text-right">
                          {product.product?.price && product.quantity
                            ? formatCurrency(
                                product.product.price * product.quantity,
                                order.currency
                              )
                            : "NA"}
                        </p>
                        </div>
                        
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;
