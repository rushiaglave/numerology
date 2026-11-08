'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Calendar, User, Compass, ArrowRight, ShieldCheck, Stars } from 'lucide-react';

interface InputHeroProps {
  onGenerate: (name: string, dob: string, gender: 'male' | 'female') => void;
}

export default function InputHero({ onGenerate }: InputHeroProps) {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [error, setError] = useState<string | null>(null);
  const [maxDate, setMaxDate] = useState<string>('');

  useEffect(() => {
    setMaxDate(new Date().toISOString().split('T')[0]);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!dob) {
      setError('Please select your date of birth.');
      return;
    }
    setError(null);
    onGenerate(name.trim(), dob, gender);
  };

  const setSample = (sampleName: string, sampleDob: string, sampleGender: 'male' | 'female') => {
    setName(sampleName);
    setDob(sampleDob);
    setGender(sampleGender);
    setError(null);
  };

  return (
    <section className="hero-section">
      <div className="hero-glow-circle hero-glow-1" />
      <div className="hero-glow-circle hero-glow-2" />

      {/* <div className="hero-badge">
        <Sparkles size={14} className="text-amber-400" />
        <span>Vedic & Lo Shu Numerology Portal</span>
      </div> */}

      <h1 className="hero-title">
        Decode Your Cosmic Blueprint With <span className="gold-text-gradient">Sacred Numerology</span>
      </h1>

      <p className="hero-subtitle">
        Discover your <strong>Mulank</strong> (Psychic Number), <strong>Bhagyank</strong> (Destiny Number),
        <strong> Namank</strong> (Name Vibration), <strong>Kua Number</strong>, and the ancient 3x3
        <strong> Lo Shu Magic Grid</strong>.
      </p>

      {/* Input Card */}
      <div className="input-card-container">
        <form onSubmit={handleSubmit} className="input-form">
          {error && (
            <div className="error-alert">
              <span>{error}</span>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="user-name" className="form-label">
              <User size={15} />
              <span>Full Name</span>
            </label>
            <input
              id="user-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. John Doe / Priya Sharma"
              className="cosmic-input"
              required
            />
            <span className="input-hint">Used for calculating your Namank (Name Vibration).</span>
          </div>

          <div className="form-group">
            <label htmlFor="user-dob" className="form-label">
              <Calendar size={15} />
              <span>Date of Birth</span>
            </label>
            <input
              id="user-dob"
              type="date"
              value={dob}
              max={maxDate || undefined}
              onChange={(e) => setDob(e.target.value)}
              className="cosmic-input cosmic-date-input"
              required
            />
            <span className="input-hint">Used for Mulank, Bhagyank, and Lo Shu Grid placements.</span>
          </div>

          <div className="form-group">
            <label className="form-label">
              <Compass size={15} />
              <span>Gender (Used for Kua Number)</span>
            </label>
            <div className="gender-selector">
              <label className={`gender-option ${gender === 'male' ? 'gender-active' : ''}`}>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={gender === 'male'}
                  onChange={() => setGender('male')}
                  className="sr-only"
                />
                <span>Male</span>
              </label>

              <label className={`gender-option ${gender === 'female' ? 'gender-active' : ''}`}>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={gender === 'female'}
                  onChange={() => setGender('female')}
                  className="sr-only"
                />
                <span>Female</span>
              </label>

              {/* <label className={`gender-option ${gender === 'other' ? 'gender-active' : ''}`}>
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  checked={gender === 'other'}
                  onChange={() => setGender('other')}
                  className="sr-only"
                />
                <span>Other</span>
              </label> */}
            </div>
          </div>

          <button type="submit" id="generate-report-btn" className="generate-cta-btn">
            <Stars size={18} />
            <span>Generate the Report</span>
            <ArrowRight size={18} />
          </button>
        </form>

        {/* Quick Demo Presets */}
        {/* <div className="sample-profiles-box">
          <div className="sample-label">
            <ShieldCheck size={14} /> Quick Demo Profiles (1-Click Test):
          </div>
          <div className="sample-chips">
            <button
              type="button"
              onClick={() => setSample('Sachin Tendulkar', '1973-04-24', 'male')}
              className="sample-chip"
            >
              Sachin Tendulkar (24 Apr 1973)
            </button>
            <button
              type="button"
              onClick={() => setSample('Priyanka Chopra', '1982-07-18', 'female')}
              className="sample-chip"
            >
              Priyanka Chopra (18 Jul 1982)
            </button>
            <button
              type="button"
              onClick={() => setSample('A. P. J. Abdul Kalam', '1931-10-15', 'male')}
              className="sample-chip"
            >
              Dr. APJ Abdul Kalam (15 Oct 1931)
            </button>
          </div>
        </div> */}
      </div>
    </section>
  );
}
