'use client';

import React from 'react';
import { CoreNumberResult } from '@/lib/numerology';
import { Sparkles, Compass, Shield, SunMedium, Palette, Calendar } from 'lucide-react';

interface CoreNumberCardProps {
  data: CoreNumberResult;
  accentColor?: 'gold' | 'purple' | 'cyan' | 'emerald';
}

export default function CoreNumberCard({ data, accentColor = 'gold' }: CoreNumberCardProps) {
  const colorMap = {
    gold: {
      border: 'rgba(217, 119, 6, 0.25)',
      glow: 'rgba(217, 119, 6, 0.08)',
      badgeBg: 'rgba(254, 243, 199, 0.95)',
      badgeText: '#b45309',
      numGradient: 'linear-gradient(135deg, #d97706 0%, #b45309 60%, #78350f 100%)',
    },
    purple: {
      border: 'rgba(147, 51, 234, 0.25)',
      glow: 'rgba(147, 51, 234, 0.08)',
      badgeBg: 'rgba(243, 232, 255, 0.95)',
      badgeText: '#7e22ce',
      numGradient: 'linear-gradient(135deg, #9333ea 0%, #7e22ce 60%, #581c87 100%)',
    },
    cyan: {
      border: 'rgba(14, 165, 233, 0.25)',
      glow: 'rgba(14, 165, 233, 0.08)',
      badgeBg: 'rgba(224, 242, 254, 0.95)',
      badgeText: '#0369a1',
      numGradient: 'linear-gradient(135deg, #0284c7 0%, #0369a1 60%, #0c4a6e 100%)',
    },
    emerald: {
      border: 'rgba(16, 185, 129, 0.25)',
      glow: 'rgba(16, 185, 129, 0.08)',
      badgeBg: 'rgba(209, 250, 229, 0.95)',
      badgeText: '#047857',
      numGradient: 'linear-gradient(135deg, #059669 0%, #047857 60%, #064e3b 100%)',
    },
  }[accentColor];

  return (
    <div
      className="core-number-card"
      style={{
        borderColor: colorMap.border,
        boxShadow: `0 8px 30px ${colorMap.glow}`,
      }}
    >
      <div className="card-top-row">
        <div>
          <div className="hindi-badge" style={{ color: colorMap.badgeText, background: colorMap.badgeBg }}>
            {data.hindiTitle}
          </div>
          <h3 className="card-title">{data.title}</h3>
        </div>

        <div
          className="large-number-circle"
          style={{
            background: colorMap.badgeBg,
            borderColor: colorMap.border,
          }}
        >
          <span
            className="large-number-text"
            style={{ backgroundImage: colorMap.numGradient }}
          >
            {data.number}
          </span>
        </div>
      </div>

      <div className="calculation-pill">
        <Sparkles size={13} className="text-amber-400" />
        <span>Formula: {data.calculationSteps}</span>
      </div>

      <p className="card-description">{data.description}</p>

      <div className="meta-grid">
        <div className="meta-item">
          <div className="meta-label">
            <SunMedium size={14} /> Ruling Energy
          </div>
          <div className="meta-val font-semibold">{data.rulingPlanet}</div>
        </div>

        <div className="meta-item">
          <div className="meta-label">
            <Compass size={14} /> Element
          </div>
          <div className="meta-val font-semibold">{data.element}</div>
        </div>
      </div>

      <div className="strengths-section">
        <div className="section-label">
          <Shield size={13} /> Core Strengths
        </div>
        <div className="strengths-tags">
          {data.strengths.map((s, idx) => (
            <span key={idx} className="strength-tag">
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="card-footer-info">
        <div className="footer-subitem">
          <Palette size={13} />
          <span>Colors: {data.luckyColors.join(', ')}</span>
        </div>
        <div className="footer-subitem">
          <Calendar size={13} />
          <span>Days: {data.luckyDays.join(', ')}</span>
        </div>
      </div>
    </div>
  );
}
