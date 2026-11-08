'use client';

import React from 'react';
import { getCompatibilityReading, PLANET_REMEDIES } from '@/lib/mulankBhagyankData';
import { Sparkles, HeartHandshake, Briefcase, UserCheck, Flame, Compass } from 'lucide-react';

interface MulankBhagyankCompatibilityProps {
  mulank: number;
  bhagyank: number;
}

export default function MulankBhagyankCompatibility({
  mulank,
  bhagyank,
}: MulankBhagyankCompatibilityProps) {
  const reading = getCompatibilityReading(mulank, bhagyank);
  const mulankRemedy = PLANET_REMEDIES[mulank];
  const bhagyankRemedy = PLANET_REMEDIES[bhagyank];

  if (!reading) return null;

  const getHarmonyBadgeClass = (harmony: string) => {
    const lower = harmony.toLowerCase();
    if (lower.includes('excellent')) return 'badge-harmony-excellent';
    if (lower.includes('strong')) return 'badge-harmony-strong';
    if (lower.includes('good')) return 'badge-harmony-good';
    if (lower.includes('mixed')) return 'badge-harmony-mixed';
    return 'badge-harmony-challenging';
  };

  return (
    <div className="compatibility-section-card">
      <div className="compatibility-header">
        <div>
          <div className="section-eyebrow">
            <HeartHandshake size={15} /> Mulank & Bhagyank Synergy Reading
          </div>
          <h2 className="section-title">
            Combination {mulank}–{bhagyank} · {reading.planets}
          </h2>
          <p className="section-subtitle">
            Mulank is who you are in your own mind; Bhagyank is where life carries you.
          </p>
        </div>

        <div className="harmony-status-wrap">
          <span className="harmony-label">Vibrational Harmony:</span>
          <span className={`harmony-pill ${getHarmonyBadgeClass(reading.harmony)}`}>
            <Sparkles size={13} /> {reading.harmony}
          </span>
        </div>
      </div>

      <div className="compatibility-grid">
        {/* Self Card */}
        <div className="compat-block">
          <div className="compat-block-title">
            <div className="compat-icon-wrap compat-icon-self">
              <UserCheck size={18} />
            </div>
            <span>Self & Inner Nature</span>
          </div>
          <p className="compat-text">{reading.self}</p>
        </div>

        {/* Career Card */}
        <div className="compat-block">
          <div className="compat-block-title">
            <div className="compat-icon-wrap compat-icon-career">
              <Briefcase size={18} />
            </div>
            <span>Career & Life Direction</span>
          </div>
          <p className="compat-text">{reading.career}</p>
        </div>

        {/* Relationships Card */}
        <div className="compat-block">
          <div className="compat-block-title">
            <div className="compat-icon-wrap compat-icon-rel">
              <HeartHandshake size={18} />
            </div>
            <span>Relationships & Love</span>
          </div>
          <p className="compat-text">{reading.relationships}</p>
        </div>
      </div>

      {/* Quick Remedies Section */}
      {(mulankRemedy || bhagyankRemedy) && (
        <div className="remedies-container">
          <div className="remedies-title">
            <Flame size={16} color="#b45309" />
            <span>Harmonizing Planetary Remedies</span>
          </div>

          <div className="remedies-list">
            {mulankRemedy && (
              <div className="remedy-item">
                <div className="remedy-badge">
                  <Compass size={13} /> Mulank {mulank} ({mulankRemedy.planet})
                </div>
                <p className="remedy-text">{mulankRemedy.remedy}</p>
              </div>
            )}

            {bhagyankRemedy && (
              <div className="remedy-item">
                <div className="remedy-badge">
                  <Compass size={13} /> Bhagyank {bhagyank} ({bhagyankRemedy.planet})
                </div>
                <p className="remedy-text">{bhagyankRemedy.remedy}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
