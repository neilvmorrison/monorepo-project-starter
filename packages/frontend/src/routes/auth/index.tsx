import { useState } from "react";
import apiHandler from "../../lib/fetch";
import useForm from "../../hooks/useForm";
import { Alert } from "../../components/alert";
import { Card } from "../../components/card";
import { FormInput } from "../../components/form/FormInput";
import { useNavigate } from "react-router";

export default function AuthRoute() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const loginForm = useForm({
    email: "",
    password: "",
  });

  async function handleLogin(values: { email: string; password: string }) {
    setLoading(true);
    const { error } = await apiHandler("/api/auth/login", {
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
      method: "POST",
    });
    if (error) {
      setError(error.message);
      return;
    }
    setLoading(false);
    navigate("/", { replace: true });
  }

  const handleSubmit = loginForm.handleSubmit(
    async (values) => await handleLogin(values)
  );

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="min-w-[400px]">
        <h1 className="mb-6 text-2xl font-bold">Login</h1>
        {error && (
          <Alert variant="error" className="mb-4" title="Login Failed">
            {error}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <FormInput
              type="email"
              id="email"
              label="Email"
              placeholder="Email"
              required
              value={loginForm.values["email"]}
              onChange={(value) => loginForm.setValue("email", value)}
            />
          </div>
          <div className="mb-6">
            <FormInput
              type="password"
              id="password"
              label="Password"
              placeholder="Password"
              required
              value={loginForm.values["password"]}
              onChange={(value) => loginForm.setValue("password", value)}
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            {isLoading ? "Loading" : "Login"}
          </button>
        </form>
      </Card>
    </div>
  );
}
