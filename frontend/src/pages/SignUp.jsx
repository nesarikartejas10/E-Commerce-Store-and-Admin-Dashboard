import { Link } from "react-router";

const SignUp = () => {
  return (
    <section className="h-screen flex items-center justify-center">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend text-center text-2xl">SignUp</legend>

        <label className="label">Name</label>
        <input type="text" className="input outline-none" placeholder="Name" />

        <label className="label">Email</label>
        <input
          type="email"
          className="input outline-none"
          placeholder="Email"
        />

        <label className="label">Password</label>
        <input
          type="password"
          className="input outline-none"
          placeholder="Password"
        />

        <button className="btn btn-neutral mt-4">Create an Account</button>

        <div className="text-center pt-5 text-[14px]">
          <span>You already have an account?</span>
          <Link to="/login" className="ml-2 text-cyan-800 hover:underline">
            Login
          </Link>
        </div>
      </fieldset>
    </section>
  );
};

export default SignUp;
