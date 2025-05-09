import { useState } from "react";
import apiHandler from "../../lib/api";
import useForm from "../../hooks/useForm";
import { FormInput } from "../../components/form/FormInput";
import { useNavigate } from "react-router";
import { Button, Surface, Text, useToast } from "design-system";
import usePageMetadata from "../../hooks/usePageMetadata";
import { APP_NAME } from "shared/constants";

export default function AuthRoute() {
  const { toast } = useToast();
  usePageMetadata({ title: APP_NAME });
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const loginForm = useForm({
    email: "",
    password: "",
  });

  const registerForm = useForm({
    email: "",
    password: "",
    username: "",
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
      toast({
        message: error.message,
        type: "error",
      });
      setLoading(false);
      return;
    }
    setLoading(false);
    toast({
      type: "success",
      message: "Login successful!",
    });
    navigate("/", { replace: true });
  }

  async function handleRegister(values: {
    email: string;
    password: string;
    username: string;
  }) {
    setLoading(true);
    const { error } = await apiHandler("/api/auth/register", {
      body: JSON.stringify({
        email: values.email,
        password: values.password,
        username: values.username,
      }),
      method: "POST",
    });
    if (error) {
      toast({
        message: error.message,
        type: "error",
      });
      setLoading(false);
      return;
    }
    setLoading(false);
    navigate("/", { replace: true });
  }

  const handleLoginSubmit = loginForm.handleSubmit(
    async (values) => await handleLogin(values)
  );

  const handleRegisterSubmit = registerForm.handleSubmit(
    async (values) => await handleRegister(values)
  );

  return (
    <div className="flex flex-col min-h-screen items-center justify-start gap-4">
      <div className="mt-12">
        <Text as="h1" weight="bold" size="xxl">
          {APP_NAME}
        </Text>
      </div>
      <Surface
        className="w-full max-w-md mx-4 p-6"
        radius="medium"
        elevation="low"
      >
        <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mb-6">
          <Text as="h1" size="xxl" weight="semibold">
            {isLogin ? "Login" : "Register"}
          </Text>
          <Button
            variant="ghost"
            size="small"
            onClick={() => {
              setIsLogin(!isLogin);
            }}
          >
            {isLogin ? "Need an account?" : "Already have an account?"}
          </Button>
        </div>
        {isLogin ? (
          <form onSubmit={handleLoginSubmit}>
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
            <Button
              isLoading={isLoading}
              type="submit"
              className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Login
            </Button>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit}>
            <div className="mb-4">
              <FormInput
                type="email"
                id="register-email"
                label="Email"
                placeholder="Email"
                required
                value={registerForm.values["email"]}
                onChange={(value) => registerForm.setValue("email", value)}
              />
            </div>
            <div className="mb-4">
              <FormInput
                type="text"
                id="register-username"
                label="Username"
                placeholder="Username"
                required
                value={registerForm.values["username"]}
                onChange={(value) => registerForm.setValue("username", value)}
              />
            </div>
            <div className="mb-6">
              <FormInput
                type="password"
                id="register-password"
                label="Password"
                placeholder="Password"
                required
                value={registerForm.values["password"]}
                onChange={(value) => registerForm.setValue("password", value)}
              />
            </div>
            <Button type="submit" className="w-full" isLoading={isLoading}>
              Register
            </Button>
          </form>
        )}
      </Surface>
    </div>
  );
}
