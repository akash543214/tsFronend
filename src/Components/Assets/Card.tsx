
export default function FeatureCard ({ icon, title, description }) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <div className="text-blue-600 flex justify-center mb-4">{icon}</div>
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-600 mt-2">{description}</p>
      </div>
    );
  };