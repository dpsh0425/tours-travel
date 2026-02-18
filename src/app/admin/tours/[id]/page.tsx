"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getTours, updateTour, createTour } from "@/lib/mockServices";
import type { Tour, ImportantInfo, FAQ } from "@/types";
import Button from "@/components/Button";
import LoadingSpinner from "@/components/admin/LoadingSpinner";
import Toast from "@/components/admin/Toast";
import RichTextEditor from "@/components/admin/RichTextEditor";

export default function AdminTourEditPage() {
  const router = useRouter();
  const params = useParams();
  const tourId = params.id as string;
  const isNew = tourId === "new";

  const [formData, setFormData] = useState<Partial<Tour>>({
    title: "",
    slug: "",
    category: "",
    duration: "",
    price: 0,
    currency: "USD",
    highlights: [],
    itinerary: [],
    images: [],
    isPublished: false,
    description: "",
    whatsIncluded: [],
    whatsExcluded: [],
    importantInfo: [],
    faq: [],
    cancellationPolicy: "",
    difficulty: "Moderate",
    maxAltitude: "",
    groupSize: "",
    bestTime: "",
    detailedDescription: "",
    preparationGuide: "",
    whatToExpect: "",
  });
  const [isLoading, setIsLoading] = useState(!isNew);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const [highlightInput, setHighlightInput] = useState("");
  const [includedInput, setIncludedInput] = useState("");
  const [excludedInput, setExcludedInput] = useState("");
  const [itineraryDay, setItineraryDay] = useState({ day: 1, title: "", description: "" });
  const [infoInput, setInfoInput] = useState<ImportantInfo>({ title: "", description: "" });
  const [faqInput, setFaqInput] = useState<FAQ>({ question: "", answer: "" });
  const [toast, setToast] = useState<{ isVisible: boolean; message: string; type: "success" | "error" | "info" | "warning" }>({
    isVisible: false,
    message: "",
    type: "success",
  });
  const [autoGenerateSlug, setAutoGenerateSlug] = useState(true);

  useEffect(() => {
    if (!isNew) {
      loadTour();
    }
  }, [tourId]);

  const loadTour = async () => {
    setIsLoading(true);
    const tours = await getTours();
    const tour = tours.find((t) => t.id === tourId);
    if (tour) {
      setFormData({
        ...tour,
        currency: tour.currency || "USD",
        whatsIncluded: tour.whatsIncluded || [],
        whatsExcluded: tour.whatsExcluded || [],
        importantInfo: tour.importantInfo || [],
        faq: tour.faq || [],
      });
    }
    setIsLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      if (isNew) {
        await createTour(formData as Omit<Tour, "id" | "createdAt">);
        showToast("Tour created successfully!", "success");
      } else {
        await updateTour(tourId, formData);
        showToast("Tour updated successfully!", "success");
      }
      setTimeout(() => {
        router.push("/admin/tours");
      }, 1000);
    } catch (error) {
      console.error("Error saving tour:", error);
      showToast("Error saving tour. Please try again.", "error");
      setIsSaving(false);
    }
  };

  const showToast = (message: string, type: "success" | "error" | "info" | "warning") => {
    setToast({ isVisible: true, message, type });
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const updates: Partial<Tour> = {
      [name]: name === "price" ? Number(value) : value,
    };

    if (name === "title" && autoGenerateSlug && isNew) {
      updates.slug = generateSlug(value);
    }

    setFormData((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  const addHighlight = () => {
    if (highlightInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        highlights: [...(prev.highlights || []), highlightInput.trim()],
      }));
      setHighlightInput("");
    }
  };

  const removeHighlight = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      highlights: prev.highlights?.filter((_, i) => i !== index),
    }));
  };

  const addIncluded = () => {
    if (includedInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        whatsIncluded: [...(prev.whatsIncluded || []), includedInput.trim()],
      }));
      setIncludedInput("");
    }
  };

  const removeIncluded = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      whatsIncluded: prev.whatsIncluded?.filter((_, i) => i !== index),
    }));
  };

  const addExcluded = () => {
    if (excludedInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        whatsExcluded: [...(prev.whatsExcluded || []), excludedInput.trim()],
      }));
      setExcludedInput("");
    }
  };

  const removeExcluded = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      whatsExcluded: prev.whatsExcluded?.filter((_, i) => i !== index),
    }));
  };

  const addItineraryDay = () => {
    if (itineraryDay.title.trim() && itineraryDay.description.trim()) {
      setFormData((prev) => ({
        ...prev,
        itinerary: [
          ...(prev.itinerary || []),
          { ...itineraryDay, day: (prev.itinerary?.length || 0) + 1 },
        ],
      }));
      setItineraryDay({ day: 1, title: "", description: "" });
    }
  };

  const removeItineraryDay = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      itinerary: prev.itinerary?.filter((_, i) => i !== index),
    }));
  };

  const addImportantInfo = () => {
    if (infoInput.title.trim() && infoInput.description.trim()) {
      setFormData((prev) => ({
        ...prev,
        importantInfo: [...(prev.importantInfo || []), { ...infoInput }],
      }));
      setInfoInput({ title: "", description: "" });
    }
  };

  const removeImportantInfo = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      importantInfo: prev.importantInfo?.filter((_, i) => i !== index),
    }));
  };

  const addFAQ = () => {
    if (faqInput.question.trim() && faqInput.answer.trim()) {
      setFormData((prev) => ({
        ...prev,
        faq: [...(prev.faq || []), { ...faqInput }],
      }));
      setFaqInput({ question: "", answer: "" });
    }
  };

  const removeFAQ = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      faq: prev.faq?.filter((_, i) => i !== index),
    }));
  };

  if (isLoading && !isNew) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const tabs = [
    { id: "basic", label: "Basic Info" },
    { id: "content", label: "Content" },
    { id: "details", label: "Details & Pricing" },
    { id: "itinerary", label: "Itinerary" },
    { id: "inclusions", label: "Inclusions/Exclusions" },
    { id: "info", label: "Important Info & FAQ" },
    { id: "images", label: "Images" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">
          {isNew ? "Create New Tour" : "Edit Tour"}
        </h1>
        <Button href="/admin/tours" variant="secondary">
          Cancel
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Basic Info Tab */}
          {activeTab === "basic" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Slug *
                    </label>
                    {isNew && (
                      <label className="flex items-center gap-2 text-xs text-gray-500">
                        <input
                          type="checkbox"
                          checked={autoGenerateSlug}
                          onChange={(e) => setAutoGenerateSlug(e.target.checked)}
                          className="w-3 h-3"
                        />
                        Auto-generate
                      </label>
                    )}
                  </div>
                  <input
                    type="text"
                    name="slug"
                    required
                    value={formData.slug}
                    onChange={handleChange}
                    disabled={autoGenerateSlug && isNew}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 disabled:bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="">Select Category</option>
                    <option value="Trekking">Trekking</option>
                    <option value="Safari">Safari</option>
                    <option value="Cultural">Cultural</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Spiritual">Spiritual</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration *
                  </label>
                  <input
                    type="text"
                    name="duration"
                    required
                    value={formData.duration}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
                    placeholder="14 Days"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.isPublished}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, isPublished: e.target.checked }))
                      }
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-600"
                    />
                    <span className="ml-2 text-sm text-gray-700">Published</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Short Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
                  placeholder="Brief description shown on tour cards"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Highlights
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={highlightInput}
                    onChange={(e) => setHighlightInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addHighlight())}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
                    placeholder="Add a highlight"
                  />
                  <button
                    type="button"
                    onClick={addHighlight}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Add
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.highlights?.map((highlight, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded"
                    >
                      <span>{highlight}</span>
                      <button
                        type="button"
                        onClick={() => removeHighlight(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Content Tab */}
          {activeTab === "content" && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Detailed Description (Rich Text)
                </label>
                <RichTextEditor
                  value={formData.detailedDescription || ""}
                  onChange={(value) =>
                    setFormData((prev) => ({ ...prev, detailedDescription: value }))
                  }
                  placeholder="Write a detailed description of the tour..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What to Expect (Rich Text)
                </label>
                <RichTextEditor
                  value={formData.whatToExpect || ""}
                  onChange={(value) =>
                    setFormData((prev) => ({ ...prev, whatToExpect: value }))
                  }
                  placeholder="Describe what travelers can expect from this tour..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preparation Guide (Rich Text)
                </label>
                <RichTextEditor
                  value={formData.preparationGuide || ""}
                  onChange={(value) =>
                    setFormData((prev) => ({ ...prev, preparationGuide: value }))
                  }
                  placeholder="Provide preparation tips and requirements..."
                />
              </div>
            </div>
          )}

          {/* Details & Pricing Tab */}
          {activeTab === "details" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price *
                  </label>
                  <div className="flex gap-2">
                    <select
                      name="currency"
                      value={formData.currency || "USD"}
                      onChange={handleChange}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
                    >
                      <option value="USD">$ USD</option>
                      <option value="NPR">₨ NPR</option>
                    </select>
                    <input
                      type="number"
                      name="price"
                      required
                      value={formData.price}
                      onChange={handleChange}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
                      placeholder="1299"
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Price will be displayed as: {formData.currency === "NPR" ? "₨" : "$"}{formData.price || 0}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Difficulty Level
                  </label>
                  <select
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Challenging">Challenging</option>
                    <option value="Strenuous">Strenuous</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Altitude
                  </label>
                  <input
                    type="text"
                    name="maxAltitude"
                    value={formData.maxAltitude}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
                    placeholder="5,545m (Kala Patthar)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Group Size
                  </label>
                  <input
                    type="text"
                    name="groupSize"
                    value={formData.groupSize}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
                    placeholder="2-12 people"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Best Time to Visit
                  </label>
                  <input
                    type="text"
                    name="bestTime"
                    value={formData.bestTime}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
                    placeholder="March-May, September-November"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cancellation Policy
                </label>
                <RichTextEditor
                  value={formData.cancellationPolicy || ""}
                  onChange={(value) =>
                    setFormData((prev) => ({ ...prev, cancellationPolicy: value }))
                  }
                  placeholder="Enter cancellation policy details..."
                />
              </div>
            </div>
          )}

          {/* Itinerary Tab */}
          {activeTab === "itinerary" && (
            <div className="space-y-6">
              <div className="space-y-4">
                {formData.itinerary?.map((day, index) => (
                  <div
                    key={index}
                    className="border border-gray-300 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">Day {day.day}</span>
                      <button
                        type="button"
                        onClick={() => removeItineraryDay(index)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="text-sm text-gray-700">
                      <strong>{day.title}</strong>
                      <p className="mt-1">{day.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                <input
                  type="text"
                  value={itineraryDay.title}
                  onChange={(e) =>
                    setItineraryDay((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
                  placeholder="Day title"
                />
                <input
                  type="text"
                  value={itineraryDay.description}
                  onChange={(e) =>
                    setItineraryDay((prev) => ({ ...prev, description: e.target.value }))
                  }
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
                  placeholder="Day description"
                />
              </div>
              <button
                type="button"
                onClick={addItineraryDay}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add Day
              </button>
            </div>
          )}

          {/* Inclusions/Exclusions Tab */}
          {activeTab === "inclusions" && (
            <div className="space-y-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  What's Included
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={includedInput}
                    onChange={(e) => setIncludedInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addIncluded())}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
                    placeholder="Add included item"
                  />
                  <button
                    type="button"
                    onClick={addIncluded}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Add
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.whatsIncluded?.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-green-50 px-4 py-2 rounded border border-green-200"
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-green-600">✓</span>
                        <span>{item}</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => removeIncluded(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  What's Excluded
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={excludedInput}
                    onChange={(e) => setExcludedInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addExcluded())}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
                    placeholder="Add excluded item"
                  />
                  <button
                    type="button"
                    onClick={addExcluded}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Add
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.whatsExcluded?.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-red-50 px-4 py-2 rounded border border-red-200"
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-red-600">✗</span>
                        <span>{item}</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => removeExcluded(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Important Info & FAQ Tab */}
          {activeTab === "info" && (
            <div className="space-y-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Important Information
                </label>
                <div className="space-y-4 mb-4">
                  {formData.importantInfo?.map((info, index) => (
                    <div
                      key={index}
                      className="border border-gray-300 rounded-lg p-4 bg-blue-50"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{info.title}</h4>
                        <button
                          type="button"
                          onClick={() => removeImportantInfo(index)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                      <p className="text-sm text-gray-700">{info.description}</p>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                  <input
                    type="text"
                    value={infoInput.title}
                    onChange={(e) =>
                      setInfoInput((prev) => ({ ...prev, title: e.target.value }))
                    }
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
                    placeholder="Info title (e.g., Visa Requirements)"
                  />
                  <input
                    type="text"
                    value={infoInput.description}
                    onChange={(e) =>
                      setInfoInput((prev) => ({ ...prev, description: e.target.value }))
                    }
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
                    placeholder="Info description"
                  />
                </div>
                <button
                  type="button"
                  onClick={addImportantInfo}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add Important Info
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Frequently Asked Questions
                </label>
                <div className="space-y-4 mb-4">
                  {formData.faq?.map((faq, index) => (
                    <div
                      key={index}
                      className="border border-gray-300 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">Q: {faq.question}</h4>
                        <button
                          type="button"
                          onClick={() => removeFAQ(index)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                      <p className="text-sm text-gray-700 mt-2">A: {faq.answer}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-2 mb-2">
                  <input
                    type="text"
                    value={faqInput.question}
                    onChange={(e) =>
                      setFaqInput((prev) => ({ ...prev, question: e.target.value }))
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
                    placeholder="Question"
                  />
                  <textarea
                    value={faqInput.answer}
                    onChange={(e) =>
                      setFaqInput((prev) => ({ ...prev, answer: e.target.value }))
                    }
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
                    placeholder="Answer"
                  />
                </div>
                <button
                  type="button"
                  onClick={addFAQ}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add FAQ
                </button>
              </div>
            </div>
          )}

          {/* Images Tab */}
          {activeTab === "images" && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image URLs (one per line)
                </label>
                <p className="text-xs text-gray-500 mb-2">
                  First image will be used as the main cover image
                </p>
                <textarea
                  value={formData.images?.join("\n") || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      images: e.target.value.split("\n").filter((url) => url.trim()),
                    }))
                  }
                  rows={8}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 font-mono text-sm"
                  placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
                />
              </div>
              {formData.images && formData.images.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image Preview
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg border border-gray-300"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/placeholder.jpg";
                          }}
                        />
                        {index === 0 && (
                          <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                            Cover
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex gap-4 p-6 pt-4 border-t border-gray-200 bg-gray-50">
          <Button type="submit" disabled={isSaving}>
            {isSaving ? "Saving..." : isNew ? "Create Tour" : "Save Changes"}
          </Button>
          <Button href="/admin/tours" variant="secondary" type="button">
            Cancel
          </Button>
        </div>
      </form>

      <Toast
        isVisible={toast.isVisible}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />
    </div>
  );
}
