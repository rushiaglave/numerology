'use client';

import React from 'react';
import { User, Calendar, Moon, Sparkles, Printer, ArrowLeft, Share2, Compass } from 'lucide-react';

interface ReportHeaderProps {
  userName: string;
  dob: string;
  formattedDate: string;
  age: number;
  zodiacSign: string;
  gender: string;
  onReset: () => void;
}

export default function ReportHeader({
  userName,
  dob,
  formattedDate,
  age,
  zodiacSign,
  gender,
  onReset,
}: ReportHeaderProps) {
  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(
        `Numerology Report for ${userName} (DOB: ${formattedDate}) - Generated with Sacred Numerology App.`
      );
      alert('Report summary copied to clipboard!');
    }
  };

  return (
    <div className="report-header-banner">
      <div className="banner-top-actions">
        <button type="button" onClick={onReset} className="banner-back-btn">
          <ArrowLeft size={16} />
          <span>New Reading</span>
        </button>

        <div className="banner-btn-group">
          {/* <button type="button" onClick={handleShare} className="banner-secondary-btn">
            <Share2 size={16} />
            <span>Share</span>
          </button> */}
          <button type="button" onClick={handlePrint} className="banner-primary-btn">
            <Printer size={16} />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      <div className="banner-main-content">
        <div className="user-avatar-badge">
          <User size={36} color="#b45309" />
        </div>

        <div className="user-meta-details">
          <div className="cosmic-eyebrow">
            <Sparkles size={14} color="#b45309" /> Sacred Numerology Reading
          </div>
          <h1 className="user-name-heading">{userName}</h1>

          <div className="user-tags-row">
            <div className="user-tag">
              <Calendar size={14} />
              <span>DOB: <strong>{formattedDate}</strong></span>
            </div>

            <div className="user-tag">
              <Moon size={14} />
              <span>Sun Sign: <strong>{zodiacSign}</strong></span>
            </div>

            <div className="user-tag">
              <Compass size={14} />
              <span>Age: <strong>{age} years</strong></span>
            </div>

            <div className="user-tag capitalize">
              <span>Kuwa Profile: <strong>{gender}</strong></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
