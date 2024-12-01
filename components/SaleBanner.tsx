import { getActiveSaleByCouponCode } from "@/sanity/lib/sales/getActiveSaleByCouponCode";

async function SaleBanner() {
  const sale = await getActiveSaleByCouponCode("DD10");

  if (!sale?.isActive) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-purple-600 to-red-400 text-white py-10 px-6 mt-2 rounded-lg shadow-lg ">
      <div className="flex items-center justify-between">
        <div className="">
          <h2 className="text-3xl text-white sm:text-5xl font-extrabold text-left mb-4 flex-1">
            {sale?.title}
          </h2>
          <p className="text-left text-xl sm:text-3xl font-semibold mb-6">
            {sale?.description}
          </p>
          <div className="flex">
            <div className="bg-white text-black py-4 px-6 rounded-full shadow-md transform hover:scale-105 transition duration-300 sm:text-xl">
              <span className="font-bold text-black sm:text-xl">
                Use code:{" "}
                <span className="text-red-600">{sale.couponCode} </span>
              </span>
              <span className="font-bold text-base sm:text-xl">
                for {sale.discountAmount}% OFF
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SaleBanner;