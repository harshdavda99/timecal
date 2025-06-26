const PaymentSuccess = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 text-center">
        <div className="flex justify-center mb-4">
          <CheckCircle className="h-12 w-12 text-green-500" />
        </div>

        <h2 className="text-xl font-semibold text-gray-800">Payment Successful!</h2>
        <p className="text-sm text-gray-600 mt-1">
          We have received your membership request.
        </p>

        <div className="border-t border-gray-200 mt-6 pt-4 text-left">
          <div className="mb-3">
            <p className="text-gray-500 text-sm">Status</p>
            <p className="text-green-600 font-semibold">Successful</p>
          </div>

          <div className="mb-3">
            <p className="text-gray-500 text-sm">Date</p>
            <p className="text-gray-700 font-medium">Aug 30, 2023 at 7:58PM</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm mb-1">Payment Method</p>
            <div className="flex items-center gap-2">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png"
                alt="Mastercard"
                className="w-8 h-5"
              />
              <span className="text-gray-700 font-medium">Mastercard Ending in 1887</span>
            </div>
          </div>
        </div>

        <button className="mt-6 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition text-sm">
          Invoice Download
        </button>
      </div>
    </div>
  );
};
