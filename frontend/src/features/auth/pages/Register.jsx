import { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../hook/useAuth.js";
import { Button } from "../../../components/ui/button.jsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card.jsx";
import { Input } from "../../../components/ui/input.jsx";
import { Label } from "../../../components/ui/label.jsx";

const initialForm = {
  fullname: "",
  contact: "",
  email: "",
  password: "",
  confirmPassword: "",
  isSeller: false,
};

const Register = () => {
  const [form, setForm] = useState(initialForm);
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { handleRegister, loading, error } = useAuth();

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((currentForm) => ({
      ...currentForm,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError("");
    setSuccessMessage("");

    if (form.password !== form.confirmPassword) {
      setFormError("Passwords do not match.");
      return;
    }

    try {
      const response = await handleRegister({
        fullname: form.fullname.trim(),
        contact: form.contact.trim(),
        email: form.email.trim(),
        password: form.password,
        confirmPassword: form.confirmPassword,
        isSeller: form.isSeller,
      });

      setSuccessMessage(response?.message || "Account created successfully.");
      setForm(initialForm);
    } catch {
      // Error state is handled by the hook.
    }
  };

  const handleGoogleAuth = () => {
    window.location.assign("/api/auth/google");
  };

  return (
    <main className="min-h-screen px-4 py-8 text-zinc-50 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-md items-center justify-center">
        <Card className="w-full overflow-hidden">
          <CardHeader className="space-y-2 border-b border-white/10 bg-white/3 px-6 py-6 sm:px-8">
            <div className="inline-flex w-fit items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.24em] text-zinc-400">
              Register
            </div>
            <CardTitle className="text-2xl">Create account</CardTitle>
            <CardDescription className="max-w-sm text-sm leading-6 text-zinc-400">
              Enter your details below to create your account.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 px-6 py-6 sm:px-8 sm:py-8">
            <div className="space-y-3">
              <Button type="button" variant="secondary" className="h-11 w-full" onClick={handleGoogleAuth}>
                Continue with Google
              </Button>
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-zinc-500">
                <span className="h-px flex-1 bg-white/10" />
                or
                <span className="h-px flex-1 bg-white/10" />
              </div>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="fullname" className="text-zinc-200">Full name</Label>
                  <Input
                    id="fullname"
                    name="fullname"
                    type="text"
                    placeholder="John Doe"
                    value={form.fullname}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact" className="text-zinc-200">Contact number</Label>
                  <Input
                    id="contact"
                    name="contact"
                    type="tel"
                    inputMode="numeric"
                    placeholder="9876543210"
                    value={form.contact}
                    onChange={handleChange}
                    required
                  />
                </div>

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

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-zinc-200">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Create a password"
                      value={form.password}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-zinc-200">Confirm password</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="Re-enter password"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <label className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/3 px-4 py-4 text-sm text-zinc-300 shadow-[0_10px_30px_rgba(0,0,0,0.16)]">
                <input
                  name="isSeller"
                  type="checkbox"
                  checked={form.isSeller}
                  onChange={handleChange}
                  className="mt-1 h-4 w-4 rounded border-white/20 bg-transparent text-zinc-50 focus:ring-zinc-100/20"
                />
                <span>
                  Register as a seller
                  <span className="mt-1 block text-xs leading-5 text-zinc-500">
                    Enable this if you need seller-specific access.
                  </span>
                </span>
              </label>

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
                  {loading ? "Creating account..." : "Create account"}
                </Button>
                <p className="text-center text-xs leading-5 text-zinc-500">
                  By continuing, you agree to our Terms and Privacy Policy.
                </p>
                <p className="text-center text-xs leading-5 text-zinc-500">
                  Already have an account? <Link to="/login" className="text-zinc-300 hover:text-zinc-50">Sign in</Link>.
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Register;