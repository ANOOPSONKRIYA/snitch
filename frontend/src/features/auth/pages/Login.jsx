import { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../hook/useAuth.js";
import { Button } from "../../../components/ui/button.jsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card.jsx";
import { Input } from "../../../components/ui/input.jsx";
import { Label } from "../../../components/ui/label.jsx";

const initialForm = {
  email: "",
  password: "",
};

const Login = () => {
  const [form, setForm] = useState(initialForm);
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { handleLogin, loading, error } = useAuth();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError("");
    setSuccessMessage("");

    try {
      const response = await handleLogin({
        email: form.email.trim(),
        password: form.password,
      });

      setSuccessMessage(response?.message || "Logged in successfully.");
      setForm(initialForm);
    } catch {
      // Error state is handled by the hook.
    }
  };

  return (
    <main className="min-h-screen px-4 py-8 text-zinc-50 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-md items-center justify-center">
        <Card className="w-full overflow-hidden">
          <CardHeader className="space-y-2 border-b border-white/10 bg-white/3 px-6 py-6 sm:px-8">
            <div className="inline-flex w-fit items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.24em] text-zinc-400">
              Login
            </div>
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <CardDescription className="max-w-sm text-sm leading-6 text-zinc-400">
              Enter your email and password to access your account.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 px-6 py-6 sm:px-8 sm:py-8">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-zinc-200">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-zinc-200">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {(formError || error) && (
                <div className="rounded-2xl border border-white/10 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {formError || error}
                </div>
              )}

              {successMessage && (
                <div className="rounded-2xl border border-white/10 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
                  {successMessage}
                </div>
              )}

              <div className="space-y-3 pt-1">
                <Button type="submit" className="h-11 w-full" disabled={loading}>
                  {loading ? "Signing in..." : "Sign in"}
                </Button>
                <p className="text-center text-xs leading-5 text-zinc-500">
                  Don&apos;t have an account? <Link to="/register" className="text-zinc-300 hover:text-zinc-50">Create one</Link>.
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Login;