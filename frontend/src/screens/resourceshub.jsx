import React from "react";

const Education= () => {
  const resources = [
    { id: 1, title: "Managing Anxiety", description: "Learn practical tips to manage anxiety.", link: "#" },
    { id: 2, title: "Coping with Depression", description: "Resources to help you understand and cope with depression.", link: "#" },
    { id: 3, title: "Mindfulness Practices", description: "Guided mindfulness exercises to promote relaxation.", link: "#" },
    { id: 4, title: "Building Resilience", description: "Strategies to build emotional and mental resilience.", link: "#" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-green-600 mb-8">Education & Resource Hub</h1>
        <p className="text-center font-semibold text-gray-700 mb-10">
          Explore resources and educational materials to support your mental health journey.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource) => (
            <div
              key={resource.id}
              className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-200"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-2">{resource.title}</h2>
              <p className="text-gray-600 mb-4">{resource.description}</p>
              <a
                href={resource.link}
                className="text-green-500 font-medium hover:underline"
              >
                Learn More
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Education;