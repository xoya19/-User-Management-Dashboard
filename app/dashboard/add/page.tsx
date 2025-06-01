'use client';

import { useState } from 'react';
import Link from 'next/link';

type FormData = {
  name: string;
  email: string;
  street: string;
  city: string;
  zip: string;
};

export default function AddUserPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    street: '',
    city: '',
    zip: '',
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const validateStep = () => {
    const newErrors: Partial<FormData> = {};
    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = 'Name is required';
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Invalid email';
      }
    } else if (step === 2) {
      if (!formData.street.trim()) newErrors.street = 'Street is required';
      if (!formData.city.trim()) newErrors.city = 'City is required';
      if (!formData.zip.trim()) newErrors.zip = 'Zip is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = () => {
    console.log('Submitted Data:', formData);
    setSubmitted(true);
  };

  return (
    <main className="max-w-md mx-auto mt-10 p-6 border rounded bg-white shadow">
      <h1 className="text-2xl font-bold mb-6">Add User - Step {step}</h1>

      {step === 1 && (
        <>
          <div className="mb-4">
            <label className="block mb-1">Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          <div className="mb-4">
            <label className="block mb-1">Email</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <div className="mb-4">
            <label className="block mb-1">Street</label>
            <input
              name="street"
              value={formData.street}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            {errors.street && <p className="text-red-500 text-sm">{errors.street}</p>}
          </div>

          <div className="mb-4">
            <label className="block mb-1">City</label>
            <input
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
          </div>

          <div className="mb-4">
            <label className="block mb-1">Zip</label>
            <input
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            {errors.zip && <p className="text-red-500 text-sm">{errors.zip}</p>}
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <div className="mb-2">
            <p><strong>Name:</strong> {formData.name}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Street:</strong> {formData.street}</p>
            <p><strong>City:</strong> {formData.city}</p>
            <p><strong>Zip:</strong> {formData.zip}</p>
          </div>
          {submitted && <p className="text-green-600 font-semibold mt-4">Form submitted! ✅</p>}
        </>
      )}

      <div className="flex justify-between mt-6">
        {step > 1 && (
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
          >
            Back
          </button>
        )}

        {step < 3 ? (
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Submit
          </button>
        )}
      </div>

      <Link href="/dashboard" className="block mt-6 text-blue-600 underline">
        Back to Dashboard
      </Link>
    </main>
  );
}
