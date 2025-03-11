 {showModal && (
        <div className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="p-6 bg-white rounded-lg flex flex-col gap-3 w-96">
            <p className="text-lg font-semibold">Upload File & Enter Text</p>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <label className="font-medium">Text <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="text"
                placeholder="Enter text"
                value={formData.text}
                onChange={handleChange}
                className="border p-2 rounded w-full"
                required
              />
              <label className="font-medium">File <span className="text-red-500">*</span></label>
              <input
                type="file"
                name="file"
                onChange={handleChange}
                className="border p-2 rounded w-full"
                required
              />
              <button
                type="submit"
                className={`px-3 py-2 rounded-lg text-white ${!formData.text || !formData.file ? "bg-gray-400 cursor-not-allowed" : "bg-green-500"}`}
                disabled={!formData.text || !formData.file}
              >
                Submit
              </button>
            </form>
            <button
              onClick={() => setShowModal(false)}
              className="px-3 py-2 bg-red-500 rounded-lg text-white mt-2"
            >
              Close
            </button>
          </div>
        </div>
      )}
      
