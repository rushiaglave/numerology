'use client';

import React from 'react';
import { NumerologyReportData } from '@/lib/numerology';
import ReportHeader from './ReportHeader';
import CoreNumberCard from './CoreNumberCard';
import LoShuGridCard from './LoShuGridCard';
import MulankBhagyankCompatibility from './MulankBhagyankCompatibility';
import { Code2, Sparkles, Compass } from 'lucide-react';

interface ReportViewProps {
  report: NumerologyReportData;
  onReset: () => void;
}

export default function ReportView({ report, onReset }: ReportViewProps) {
  return (
    <div className="report-container">
      {/* 1. First show Name and DOB of user */}
      <ReportHeader
        userName={report.userName}
        dob={report.dob}
        formattedDate={report.formattedDate}
        age={report.age}
        zodiacSign={report.zodiacSign}
        gender={report.gender}
        onReset={onReset}
      />

      {/* 2. Below show Mulank, Namank, Bhagyank, Kua */}
      <div className="core-numbers-section">
        <div className="section-title-wrapper">
          <div className="section-eyebrow">
            <Sparkles size={14} /> The 4 Pillars of Your Vibrational Matrix
          </div>
          <h2 className="section-title">Core Celestial Numbers</h2>
          <p className="section-subtitle">
            Your cosmic signature is governed by the synergy between your date of birth, name vibration,
            and solar planetary forces.
          </p>
        </div>

        <div className="core-cards-grid">
          {/* Mulank */}
          <CoreNumberCard data={report.mulank} accentColor="gold" />

          {/* Bhagyank */}
          <CoreNumberCard data={report.bhagyank} accentColor="purple" />

          {/* Namank */}
          <CoreNumberCard data={report.namank} accentColor="cyan" />

          {/* Kuva / Kua */}
          <CoreNumberCard data={report.kua} accentColor="emerald" />
        </div>
      </div>

      {/* 4. Mulank-Bhagyank Compatibility Reading */}
      <MulankBhagyankCompatibility
        mulank={report.mulank.number}
        bhagyank={report.bhagyank.number}
      />
      {/* 3. Lo Shu Grid */}
      <LoShuGridCard
        cells={report.loShuGrid.cells}
        planes={report.loShuGrid.planes}
        allBirthDigits={report.loShuGrid.allBirthDigits}
      />


      {/* Calculation Logic Ready Banner */}
      {/* <div className="logic-ready-box">
        <div className="logic-icon-wrap">
          <Code2 size={24} className="text-amber-400" />
        </div>
        <div className="logic-text-wrap">
          <h4 className="logic-title">Ready for Your Custom Calculation Logic</h4>
          <p className="logic-desc">
            All calculations for <strong>Mulank</strong>, <strong>Namank</strong>, <strong>Bhagyank</strong>,{' '}
            <strong>Kuva</strong>, and the <strong>Lo Shu Grid</strong> are cleanly modularized in{' '}
            <code>src/lib/numerology.ts</code>. You can easily provide your exact formulas or custom rules!
          </p>
        </div>
      </div> */}
    </div>
  );
}
