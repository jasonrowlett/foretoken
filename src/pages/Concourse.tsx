// src/pages/Concourse.tsx
import React from "react";

const Concourse: React.FC = () => {
  return (
    <div className="p-8 text-white bg-gray-900 min-h-screen">
      <h1 className="text-4xl font-bold mb-6">Concourse Dashboard</h1>
      <p className="text-lg text-gray-300 mb-6">
        Real-time comparisons between tokenized real-world assets and their traditional market counterparts.
      </p>
      <div className="aspect-w-16 aspect-h-9 w-full max-w-6xl mx-auto shadow-lg rounded-xl overflow-hidden">
        <iframe
          title="Foretoken Concourse Dashboard"
          width="100%"
          height="800"
          src="https://lookerstudio.google.com/embed/reporting/a37bb396-b347-4ed5-872b-c884cd3bb03b/page/tgwNF"
          style={{ border: 0 }}
          allowFullScreen
          sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
        />
      </div>
    </div>
  );
};

export default Concourse;
