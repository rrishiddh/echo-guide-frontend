/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Globe, Loader2, AlertCircle, X } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/src/hooks/useAuth";
import { useUser } from "@/src/hooks/useUser";
import { GuideUser } from "@/src/types";

interface FormData {
  name: string;
  email: string;
  bio: string;
  languagesSpoken: string[];
  expertise: string[];
  dailyRate: number;
}

export const ProfileForm = () => {
  const { user: authUser, updateUser: updateAuthUser } = useAuth();
  const { updateUser, isLoading } = useUser();

  const [error, setError] = useState("");
  const [languageInput, setLanguageInput] = useState("");
  const [expertiseInput, setExpertiseInput] = useState("");

const guideUser = authUser?.role === "guide" ? (authUser as GuideUser) : undefined;

const [formData, setFormData] = useState<FormData>({
  name: authUser?.name || "",
  email: authUser?.email || "",
  bio: guideUser?.bio || "",
  languagesSpoken: guideUser?.languagesSpoken || [],
  expertise: guideUser?.expertise || [],
  dailyRate: guideUser?.dailyRate || 0,
});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const addLanguage = () => {
    const lang = languageInput.trim();
    if (lang && !formData.languagesSpoken.includes(lang)) {
      setFormData({ ...formData, languagesSpoken: [...formData.languagesSpoken, lang] });
      setLanguageInput("");
    }
  };

  const removeLanguage = (lang: string) => {
    setFormData({ ...formData, languagesSpoken: formData.languagesSpoken.filter(l => l !== lang) });
  };

  const addExpertise = () => {
    const exp = expertiseInput.trim();
    if (exp && !formData.expertise.includes(exp)) {
      setFormData({ ...formData, expertise: [...formData.expertise, exp] });
      setExpertiseInput("");
    }
  };

  const removeExpertise = (exp: string) => {
    setFormData({ ...formData, expertise: formData.expertise.filter(e => e !== exp) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.name) {
      setError("Name is required");
      return;
    }

    try {
      const updatedUser = await updateUser(authUser!.id, {
        name: formData.name,
        bio: formData.bio,
        languagesSpoken: formData.languagesSpoken,
        expertise: formData.expertise.length > 0 ? formData.expertise : undefined,
        dailyRate: formData.dailyRate > 0 ? formData.dailyRate : undefined,
      });

      updateAuthUser(updatedUser);
      toast.success("Profile updated successfully");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update profile");
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

      <div className="space-y-2">
        <Label htmlFor="name">Full Name *</Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="pl-10"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            disabled
            className="pl-10 bg-gray-100"
          />
        </div>
        <p className="text-xs text-gray-500">Email cannot be changed</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          rows={4}
          placeholder="Tell us about yourself..."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="languages">Languages Spoken</Label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              id="languages"
              type="text"
              value={languageInput}
              onChange={(e) => setLanguageInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addLanguage())}
              placeholder="Add a language"
              className="pl-10"
            />
          </div>
          <Button type="button" onClick={addLanguage}>Add</Button>
        </div>
        {formData.languagesSpoken.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.languagesSpoken.map((lang) => (
              <Badge key={lang} variant="secondary" className="cursor-pointer">
                {lang} <X className="w-3 h-3 ml-1" onClick={() => removeLanguage(lang)} />
              </Badge>
            ))}
          </div>
        )}
      </div>

      {authUser?.role === "guide" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="expertise">Expertise</Label>
            <div className="flex gap-2">
              <Input
                id="expertise"
                type="text"
                value={expertiseInput}
                onChange={(e) => setExpertiseInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addExpertise())}
                placeholder="Add expertise"
              />
              <Button type="button" onClick={addExpertise}>Add</Button>
            </div>
            {formData.expertise.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.expertise.map((exp) => (
                  <Badge key={exp} variant="secondary" className="cursor-pointer">
                    {exp} <X className="w-3 h-3 ml-1" onClick={() => removeExpertise(exp)} />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="dailyRate">Daily Rate (USD)</Label>
            <Input
              id="dailyRate"
              name="dailyRate"
              type="number"
              value={formData.dailyRate}
              onChange={handleChange}
              min={0}
            />
          </div>
        </>
      )}

      <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
          </>
        ) : "Save Changes"}
      </Button>
    </form>
  );
};

export default ProfileForm;
