"use client";

import { useEffect, useState } from "react";
import { getHomepageData } from "@/lib/mockServices";
import type { HomepageData } from "@/types";
import LoadingSpinner from "@/components/admin/LoadingSpinner";
import Toast from "@/components/admin/Toast";
import Button from "@/components/Button";

export default function AdminSettingsPage() {
  const [homepageData, setHomepageData] = useState<HomepageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<{ isVisible: boolean; message: string; type: "success" | "error" | "info" | "warning" }>({
    isVisible: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setIsLoading(true);
    const data = await getHomepageData();
    setHomepageData(data);
    setIsLoading(false);
  };

  const handleToggleSection = (section: keyof HomepageData["enabledSections"]) => {
    if (!homepageData) return;
    setHomepageData({
      ...homepageData,
      enabledSections: {
        ...homepageData.enabledSections,
        [section]: !homepageData.enabledSections[section],
      },
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      showToast("Settings saved successfully", "success");
    }, 1000);
  };

  const showToast = (message: string, type: "success" | "error" | "info" | "warning") => {
    setToast({ isVisible: true, message, type });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!homepageData) {
    return <div>Error loading settings</div>;
  }

  const sections = [
    { key: "hero", label: "Hero Section", description: "Main banner with title and CTA" },
    { key: "featuredTours", label: "Featured Tours", description: "Showcase selected tours" },
    { key: "bestSelling", label: "Best Selling Tours", description: "Display popular tours" },
    { key: "whyChooseUs", label: "Why Choose Us", description: "Highlight company benefits" },
    { key: "testimonials", label: "Testimonials", description: "Customer reviews section" },
    { key: "blogPreview", label: "Blog Preview", description: "Latest blog posts preview" },
  ] as const;

  return (
    <>
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Manage homepage sections and site configuration</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
            </svg>
            Homepage Sections
          </h2>
          <p className="text-gray-600 mb-6 text-sm">
            Enable or disable sections on the homepage. Disabled sections will not appear on the public website.
          </p>
          <div className="space-y-4">
            {sections.map((section) => (
              <div
                key={section.key}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{section.label}</h3>
                  <p className="text-sm text-gray-500">{section.description}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={homepageData.enabledSections[section.key]}
                    onChange={() => handleToggleSection(section.key)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Hero Section Content
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={homepageData.hero.title}
                onChange={(e) =>
                  setHomepageData({
                    ...homepageData,
                    hero: { ...homepageData.hero, title: e.target.value },
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
              <input
                type="text"
                value={homepageData.hero.subtitle}
                onChange={(e) =>
                  setHomepageData({
                    ...homepageData,
                    hero: { ...homepageData.hero, subtitle: e.target.value },
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">CTA Text</label>
              <input
                type="text"
                value={homepageData.hero.ctaText}
                onChange={(e) =>
                  setHomepageData({
                    ...homepageData,
                    hero: { ...homepageData.hero, ctaText: e.target.value },
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Background Image URL</label>
              <input
                type="url"
                value={homepageData.hero.backgroundImage}
                onChange={(e) =>
                  setHomepageData({
                    ...homepageData,
                    hero: { ...homepageData.hero, backgroundImage: e.target.value },
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Settings"}
          </Button>
        </div>
      </div>

      <Toast
        isVisible={toast.isVisible}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />
    </>
  );
}
