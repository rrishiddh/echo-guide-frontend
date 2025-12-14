/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/src/hooks/useAuth";
import { User, Mail, Lock, Loader2, AlertCircle } from "lucide-react";

export const RegisterForm = () => {
  const router = useRouter();
  const { register } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "tourist" as "tourist" | "guide",
    bio: "",
    expertise: [] as string[],
    dailyRate: undefined as number | undefined,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleExpertiseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const expertiseArray = e.target.value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    setFormData((prev) => ({
      ...prev,
      expertise: expertiseArray,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.email || !formData.password) {
      setError("Please fill in all required fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (formData.role === "guide") {
      if (!formData.expertise.length) {
        setError("Please add at least one area of expertise");
        return;
      }

      if (!formData.dailyRate || formData.dailyRate <= 0) {
        setError("Please provide a valid daily rate");
        return;
      }
    }

    setIsLoading(true);

    try {
      await register(formData);
      router.push("/dashboard");
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="name">Full Name *</Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            className="pl-10"
            required
          />
        </div>
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">Email Address *</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            className="pl-10"
            required
          />
        </div>
      </div>

      {/* Password */}
      <div className="space-y-2">
        <Label htmlFor="password">Password *</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            className="pl-10"
            required
          />
        </div>
        <p className="text-xs text-gray-500">
          Must be at least 8 characters
        </p>
      </div>

      {/* Confirm Password */}
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password *</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="pl-10"
            required
          />
        </div>
      </div>

      {/* Role */}
      <div className="space-y-2">
        <Label>I want to *</Label>
        <RadioGroup
          value={formData.role}
          onValueChange={(value) =>
            setFormData((prev) => ({
              ...prev,
              role: value as "tourist" | "guide",
            }))
          }
        >
          <div className="flex items-center space-x-2 p-4 border rounded-lg">
            <RadioGroupItem value="tourist" id="tourist" />
            <Label htmlFor="tourist" className="cursor-pointer flex-1">
              Book Tours
            </Label>
          </div>

          <div className="flex items-center space-x-2 p-4 border rounded-lg">
            <RadioGroupItem value="guide" id="guide" />
            <Label htmlFor="guide" className="cursor-pointer flex-1">
              Become a Guide
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Guide Fields */}
      {formData.role === "guide" && (
        <>
          {/* Bio */}
          <div className="space-y-2">
            <Label htmlFor="bio">Bio (Optional)</Label>
            <Textarea
              id="bio"
              name="bio"
              placeholder="Tell us about yourself..."
              value={formData.bio}
              onChange={handleChange}
            />
          </div>

          {/* Expertise */}
          <div className="space-y-2">
            <Label htmlFor="expertise">Expertise *</Label>
            <Input
              id="expertise"
              type="text"
              placeholder="History, Food, Adventure"
              onChange={handleExpertiseChange}
            />
            <p className="text-xs text-gray-500">
              Separate skills with commas
            </p>
          </div>

          {/* Daily Rate */}
          <div className="space-y-2">
            <Label htmlFor="dailyRate">Daily Rate ($) *</Label>
            <Input
              id="dailyRate"
              type="number"
              min={0}
              placeholder="150"
              value={formData.dailyRate ?? ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  dailyRate: Number(e.target.value),
                }))
              }
            />
          </div>
        </>
      )}

      {/* Submit */}
      <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating account...
          </>
        ) : (
          "Create account"
        )}
      </Button>

      <p className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link
          href="/auth/login"
          className="text-blue-600 hover:text-blue-700 font-semibold"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
