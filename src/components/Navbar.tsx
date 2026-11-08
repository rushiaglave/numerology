'use client';

import React from 'react';
import { Sparkles, Compass } from 'lucide-react';

interface NavbarProps {
  onNewReading?: () => void;
  hasReport?: boolean;
}

export default function Navbar({ onNewReading, hasReport }: NavbarProps) {
  return (
    <header className="navbar-container">
      <div className="navbar-inner">
        <div className="navbar-brand" onClick={onNewReading} role="button" tabIndex={0}>
          <div className="brand-logo-icon">
            <Compass size={22} color="#b45309" className="animate-spin-slow" />
          </div>
          <div className="brand-text-block">
            <span className="brand-title">AURA NUMERO</span>
            {/* <span className="brand-tagline">Vedic & Lo Shu Science</span> */}
          </div>
        </div>

        <div className="navbar-right-actions">
          {/* <div className="brand-status-badge">
            <Sparkles size={13} className="text-amber-300" />
            <span>Cosmic Engine Ready</span>
          </div> */}

          {hasReport && (
            <button type="button" onClick={onNewReading} className="nav-new-btn">
              + New Reading
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
