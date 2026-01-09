const SolutionsFAQ = () => {
  return (
    <section className="bg-rs-light-gray py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-rs-dark mb-2">
              What is the difference between Auto-ML and Ready Signal?
            </h3>
            <p className="text-rs-dark opacity-75 leading-relaxed">
              While generic Auto-ML tools focus on correlation, Ready Signal focuses on Explainability and Causality.
              Ready Signal uses a "Human-in-the-Loop" governance model to filter out spurious correlations, providing
              narrative reports that explain why a forecast changed (e.g., due to Consumer Credit shifts), rather than
              just providing a black-box number.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionsFAQ;
