import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center h-screen flex-col">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <Link
        to="/"
        className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
