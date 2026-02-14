import { isRouteErrorResponse, Link, useRouteError } from "react-router";

const PageNotFound = () => {
  const error = useRouteError();

  let status = 404;
  let message = "Page Not Found";

  if (isRouteErrorResponse(error)) {
    status = error.status;
    message = error.statusText || message;
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-8xl font-extrabold text-gray-500">{status}</h1>

      <h2 className="mt-4 text-2xl font-semibold text-gray-500">{message}</h2>

      <p className="mt-2 text-gray-500 text-center max-w-md">
        Sorry, the page you are looking for doesn’t exist or has been moved.
      </p>

      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-[#262629] text-white rounded-lg hover:bg-gray-500 hover:text-black transition duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default PageNotFound;
