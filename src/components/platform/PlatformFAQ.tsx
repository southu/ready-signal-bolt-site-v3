const PlatformFAQ = () => {
  return (
    <section className="bg-rs-light-gray py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-rs-dark mb-2">
              How can I automate feature engineering for economic data?
            </h3>
            <p className="text-rs-dark opacity-75 leading-relaxed">
              You can automate feature engineering using Ready Signal's API, which allows for pip install readysignal.
              It automatically handles lag identification, stationarity checks, and temporal alignment (e.g., converting
              daily weather to monthly sales) for over 40,000 global data streams.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformFAQ;
