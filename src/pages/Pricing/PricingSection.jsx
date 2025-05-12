import { useSelector } from "react-redux";
import MainLayout from "../../components/MainLayout";
import { useMutation } from "@tanstack/react-query";
import { setVarifiedUsers } from "../../services/index/user";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// PricingSection.jsx
const PricingSection = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.userSlice);
  const handelPurchase = () => {
    mutate();
  };

  const { mutate, isPending, isError } = useMutation({
    mutationFn: () => {
      return setVarifiedUsers();
    },
    onSuccess: () => {
      navigate("/login");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <MainLayout>
      <section className="py-12 px-4 bg-gray-50   ">
        <h2 className="text-3xl font-bold text-center mb-8">Pricing Plans</h2>

        {user?.userInfo?.varified ? (
          <h1 className="text-2xl text-green-300">You are allready Varified</h1>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Monthly Plan */}
            <div className="bg-white shadow-md rounded-2xl p-6 text-center border-2 border-blue-600">
              <h3 className="text-xl font-semibold mb-4">Monthly Plan</h3>
              <p className="text-4xl font-bold text-blue-600 mb-4">
                $9<span className="text-base font-normal">/month</span>
              </p>
              <ul className="text-gray-600 mb-6 space-y-2 flex flex-col items-start">
                <li>✅ Unlimited Posts</li>
                <li>✅ Basic Support</li>
                <li>✅ Community Access</li>
              </ul>
              <button
                className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
                disabled={isPending}
                onClick={handelPurchase}
              >
                Buy Monthly
              </button>
            </div>

            {/* Yearly Plan */}
            <div className="bg-white shadow-md rounded-2xl p-6 text-center border-2 border-blue-600">
              <h3 className="text-xl font-semibold mb-4">Yearly Plan</h3>
              <p className="text-4xl font-bold text-blue-600 mb-4">
                $90<span className="text-base font-normal">/year</span>
              </p>
              <ul className="text-gray-600 mb-6 space-y-2 flex flex-col items-start">
                <li>✅ Everything in Monthly</li>
                <li>✅ Priority Support</li>
                <li>✅ 2 Months Free</li>
              </ul>
              <button
                className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
                disabled={isPending}
                onClick={handelPurchase}
              >
                Buy Yearly
              </button>
            </div>
          </div>
        )}
      </section>
    </MainLayout>
  );
};

export default PricingSection;
