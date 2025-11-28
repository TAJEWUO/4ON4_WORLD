"use client";

import React, { useState } from "react";

type RequestModalProps = {
  onClose: () => void;
  onContinue: () => void; // "Continue exploring" link
};

export default function RequestModal({
  onClose,
  onContinue,
}: RequestModalProps) {
  const [carDescription, setCarDescription] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [visitDescription, setVisitDescription] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // For now (Option B): just log and close. No backend call.
    console.log("Helpdesk request:", {
      carDescription,
      name,
      phone,
      email,
      visitDescription,
    });

    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
      {/* Top "Continue exploring" link */}
      <div className="absolute top-4 left-0 w-full flex justify-center">
        <button
          onClick={onContinue}
          className="text-sm md:text-base text-white underline decoration-white/70 hover:decoration-white"
        >
          Continue exploring →
        </button>
      </div>

      {/* Dialog card */}
      <div className="relative bg-white rounded-2xl w-full max-w-xl md:max-w-2xl p-6 md:p-8 shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-black text-xl font-bold"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Heading */}
        <div className="mb-4 md:mb-6 text-center">
          <h2 className="text-xl md:text-2xl font-bold text-black mb-1">
            Hello there
          </h2>
          <p className="text-sm md:text-base font-semibold text-black">
            4ON4 is the Ultimate Tour Vehicle Connect
          </p>
          <p className="mt-2 text-xs md:text-sm text-gray-600">
            Select your ride from our catalogue or describe below your ideal car.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
          {/* Describe your car */}
          <div>
            <label className="block text-xs md:text-sm text-black mb-1">
              Describe your car
            </label>
            <textarea
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs md:text-sm resize-none focus:outline-none focus:ring-1 focus:ring-black/70"
              rows={3}
              value={carDescription}
              onChange={(e) => setCarDescription(e.target.value)}
              placeholder="E.g. 14-seater, sliding windows, white, safari-ready..."
            />
          </div>

          {/* Your name */}
          <div>
            <label className="block text-xs md:text-sm text-black mb-1">
              Your name
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-black/70"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Phone (optional) */}
          <div>
            <label className="block text-xs md:text-sm text-black mb-1">
              Phone number <span className="text-gray-500">(optional)</span>
            </label>
            <input
              type="tel"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-black/70"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+2547XXXXXXXX"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs md:text-sm text-black mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-black/70"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          {/* Visit description */}
          <div>
            <label className="block text-xs md:text-sm text-black mb-1">
              Where do you plan to visit?
            </label>
            <textarea
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs md:text-sm resize-none focus:outline-none focus:ring-1 focus:ring-black/70"
              rows={3}
              value={visitDescription}
              onChange={(e) => setVisitDescription(e.target.value)}
              placeholder="E.g. Maasai Mara, Amboseli, coast trip..."
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full mt-2 py-2.5 md:py-3 bg-black text-white rounded-full font-semibold text-xs md:text-sm tracking-wide hover:bg-gray-900 transition"
          >
            Submit to Helpdesk
          </button>
        </form>
      </div>
    </div>
  );
}
