// Numerology calculation helpers and types
// NOTE: These provide standard Vedic and Pythagorean/Chaldean baseline calculations.
// You can easily replace or adjust any calculation functions below with your custom logic!

export interface CoreNumberResult {
  number: number;
  title: string;
  hindiTitle: string;
  rulingPlanet: string;
  element: string;
  description: string;
  strengths: string[];
  luckyColors: string[];
  luckyDays: string[];
  calculationSteps: string;
}

export interface LoShuCell {
  positionNumber: number; // 1 to 9
  label: string;
  plane: string;
  element: string;
  presentDigits: number[];
  count: number;
  significance: string;
}

export interface LoShuPlane {
  name: string;
  type: 'horizontal' | 'vertical' | 'diagonal';
  numbers: number[];
  presentCount: number;
  percentage: number;
  status: 'Complete' | 'Partial' | 'Missing';
  interpretation: string;
}

export interface NumerologyReportData {
  userName: string;
  dob: string; // YYYY-MM-DD
  gender: 'male' | 'female' | 'other';
  day: number;
  month: number;
  year: number;
  formattedDate: string;
  age: number;
  zodiacSign: string;
  
  // Core Numbers
  mulank: CoreNumberResult;
  bhagyank: CoreNumberResult;
  namank: CoreNumberResult;
  kua: CoreNumberResult;
  
  // Lo Shu Grid
  loShuGrid: {
    cells: Record<number, LoShuCell>;
    planes: LoShuPlane[];
    allBirthDigits: number[];
  };
}

// Planet & traits reference for numbers 1 to 9
export const NUMBER_TRAITS: Record<number, {
  planet: string;
  element: string;
  title: string;
  strengths: string[];
  colors: string[];
  days: string[];
  generalDescription: string;
}> = {
  1: {
    planet: "Sun (Surya)",
    element: "Fire",
    title: "The Pioneer & Leader",
    strengths: ["Leadership", "Ambition", "Independence", "Originality"],
    colors: ["Gold", "Orange", "Yellow"],
    days: ["Sunday", "Monday"],
    generalDescription: "Strong individuality, charismatic command, and pioneering vision driven by the Sun's radiant energy.",
  },
  2: {
    planet: "Moon (Chandra)",
    element: "Water",
    title: "The Diplomat & Peacemaker",
    strengths: ["Intuition", "Empathy", "Cooperation", "Artistic Senses"],
    colors: ["White", "Silver", "Cream"],
    days: ["Monday", "Friday"],
    generalDescription: "Gentle, imaginative, and deeply intuitive nature with an innate gift for harmony and interpersonal emotional depth.",
  },
  3: {
    planet: "Jupiter (Guru / Brihaspati)",
    element: "Fire / Wood",
    title: "The Visionary & Teacher",
    strengths: ["Wisdom", "Communication", "Creativity", "Optimism"],
    colors: ["Yellow", "Golden Yellow", "Purple"],
    days: ["Thursday"],
    generalDescription: "Blessed with wisdom, eloquence, and higher knowledge under Guru's expansive and auspicious guidance.",
  },
  4: {
    planet: "Rahu (North Node)",
    element: "Wood / Earth",
    title: "The Architect & Organizer",
    strengths: ["Discipline", "Practicality", "Loyalty", "Critical Thinking"],
    colors: ["Electric Blue", "Grey", "Smoky"],
    days: ["Saturday", "Sunday"],
    generalDescription: "Methodical, unconventional, hardworking strategist capable of groundbreaking sudden transformations.",
  },
  5: {
    planet: "Mercury (Budh)",
    element: "Earth",
    title: "The Explorer & Communicator",
    strengths: ["Adaptability", "Eloquence", "Commercial Acumen", "Curiosity"],
    colors: ["Green", "Emerald", "Turquoise"],
    days: ["Wednesday", "Friday"],
    generalDescription: "Dynamic, versatile, quick-witted, and business-savvy with a love for freedom and exploration.",
  },
  6: {
    planet: "Venus (Shukra)",
    element: "Metal",
    title: "The Harmonizer & Caregiver",
    strengths: ["Charm", "Aesthetics", "Responsibility", "Compassion"],
    colors: ["Royal Blue", "Pink", "White"],
    days: ["Friday"],
    generalDescription: "Lover of luxury, arts, family, and beauty, exuding magnetism and protective warmth.",
  },
  7: {
    planet: "Ketu (South Node)",
    element: "Metal / Water",
    title: "The Mystic & Philosopher",
    strengths: ["Spiritual Insight", "Analytical Mind", "Mysticism", "Research"],
    colors: ["Light Green", "White", "Pastels"],
    days: ["Tuesday", "Thursday"],
    generalDescription: "Deeply reflective, analytical, and seeker of hidden truths with intuitive and spiritual depth.",
  },
  8: {
    planet: "Saturn (Shani)",
    element: "Earth",
    title: "The Sovereign & Master",
    strengths: ["Resilience", "Karmic Justice", "Endurance", "Execution"],
    colors: ["Dark Blue", "Black", "Dark Violet"],
    days: ["Saturday"],
    generalDescription: "Stalwart worker of karma, disciplined builder of lasting empires, possessing immense perseverance.",
  },
  9: {
    planet: "Mars (Mangal)",
    element: "Fire",
    title: "The Warrior & Humanitarian",
    strengths: ["Courage", "Universal Compassion", "Energy", "Directness"],
    colors: ["Red", "Crimson", "Coral"],
    days: ["Tuesday"],
    generalDescription: "High-octane vital energy, fearless championship for justice, and unbounded philanthropic spirit.",
  },
};

// Helper to reduce any positive integer to a single digit 1-9
export function reduceToSingleDigit(num: number): number {
  if (num <= 0) return 0;
  while (num > 9) {
    num = num
      .toString()
      .split('')
      .reduce((sum, digit) => sum + parseInt(digit, 10), 0);
  }
  return num;
}

// Chaldean letter values (commonly used in Indian Vedic numerology)
export const CHALDEAN_MAP: Record<string, number> = {
  A: 1, I: 1, J: 1, Q: 1, Y: 1,
  B: 2, K: 2, R: 2,
  C: 3, G: 3, L: 3, S: 3,
  D: 4, M: 4, T: 4,
  E: 5, H: 5, N: 5, X: 5,
  U: 6, V: 6, W: 6,
  O: 7, Z: 7,
  F: 8, P: 8,
};

/**
 * 1. Mulank (Psychic / Driver / Root Number)
 * Calculation logic: Day of birth reduced to a single digit (1 - 9)
 * e.g., 28th -> 2 + 8 = 10 -> 1 + 0 = 1
 */
export function calculateMulank(day: number): CoreNumberResult {
  const reduced = reduceToSingleDigit(day);
  const info = NUMBER_TRAITS[reduced] || NUMBER_TRAITS[1];
  
  const stepText = day > 9 
    ? `Day ${day} -> ${day.toString().split('').join(' + ')} = ${reduced}`
    : `Day ${day} = ${reduced}`;

  return {
    number: reduced,
    title: "Mulank (Driver / Psychic Number)",
    hindiTitle: "मूलांक",
    rulingPlanet: info.planet,
    element: info.element,
    description: `Mulank represents your innate inner personality, core character traits, instincts, and how you perceive yourself.`,
    strengths: info.strengths,
    luckyColors: info.colors,
    luckyDays: info.days,
    calculationSteps: stepText,
  };
}

/**
 * 2. Bhagyank (Destiny / Conductor / Life Path Number)
 * Calculation logic: Sum of all digits of Date of Birth (DD + MM + YYYY) reduced to single digit.
 * e.g., 15-08-1995 -> 1+5+0+8+1+9+9+5 = 38 -> 3+8 = 11 -> 1+1 = 2
 */
export function calculateBhagyank(day: number, month: number, year: number): CoreNumberResult {
  const digits = `${day}${month}${year}`.replace(/\D/g, '').split('').map(Number);
  const sum = digits.reduce((acc, curr) => acc + curr, 0);
  const reduced = reduceToSingleDigit(sum);
  const info = NUMBER_TRAITS[reduced] || NUMBER_TRAITS[1];

  const stepText = `${digits.join(' + ')} = ${sum} -> ${reduced}`;

  return {
    number: reduced,
    title: "Bhagyank (Destiny / Life Path Number)",
    hindiTitle: "भाग्यांक",
    rulingPlanet: info.planet,
    element: info.element,
    description: `Bhagyank defines your life's destiny, karmic path, overarching life lessons, and major opportunities that present themselves.`,
    strengths: info.strengths,
    luckyColors: info.colors,
    luckyDays: info.days,
    calculationSteps: stepText,
  };
}

/**
 * 3. Namank (Name Number)
 * Calculation logic: Sum of numerical values of all letters in full name using Chaldean system reduced to single digit.
 */
export function calculateNamank(name: string): CoreNumberResult {
  const cleanName = name.toUpperCase().replace(/[^A-Z]/g, '');
  if (!cleanName) {
    const defaultInfo = NUMBER_TRAITS[1];
    return {
      number: 1,
      title: "Namank (Name Vibration Number)",
      hindiTitle: "नामांक",
      rulingPlanet: defaultInfo.planet,
      element: defaultInfo.element,
      description: "Namank influences your public image, social interactions, and how the world responds to you.",
      strengths: defaultInfo.strengths,
      luckyColors: defaultInfo.colors,
      luckyDays: defaultInfo.days,
      calculationSteps: "Letters sum reduced to 1",
    };
  }

  const values: number[] = [];
  for (const char of cleanName) {
    values.push(CHALDEAN_MAP[char] || 0);
  }

  const sum = values.reduce((a, b) => a + b, 0);
  const reduced = reduceToSingleDigit(sum);
  const info = NUMBER_TRAITS[reduced] || NUMBER_TRAITS[1];

  const stepText = `${cleanName} -> ${values.join('+')} = ${sum} -> ${reduced}`;

  return {
    number: reduced,
    title: "Namank (Name Vibration Number)",
    hindiTitle: "नामांक",
    rulingPlanet: info.planet,
    element: info.element,
    description: `Namank radiates your active social vibration, commercial signature, and the worldly resonance your name carries.`,
    strengths: info.strengths,
    luckyColors: info.colors,
    luckyDays: info.days,
    calculationSteps: stepText,
  };
}

/**
 * 4. Kuva / Kua Number (Feng Shui & Vedic Energy Number)
 * Calculation logic:
 * 1. Sum all 4 digits of birth year, reduced to single digit (1 - 9).
 * 2. For 1900 - 1999:
 *    - Male: 11 - reducedSum
 *    - Female: reducedSum + 4
 * 3. For 2000 onwards:
 *    - Male: 10 - reducedSum
 *    - Female: reducedSum + 5
 * 4. Reduced to single digit (1 - 9).
 */
export function calculateKua(year: number, gender: 'male' | 'female' | 'other'): CoreNumberResult {
  const allDigitsSum = Math.abs(year)
    .toString()
    .split("")
    .reduce((sum, digit) => sum + Number(digit), 0);

  const yearSumReduced = reduceToSingleDigit(allDigitsSum);
  let rawKua = 0;
  let formulaExplanation = "";

  if (year >= 1900 && year < 2000) {
    // 1900 - 1999: Male minus with 11, Female plus 4
    if (gender === 'female') {
      rawKua = yearSumReduced + 4;
      formulaExplanation = `1900-1999 Female: (Year sum ${yearSumReduced}) + 4 = ${rawKua}`;
    } else {
      // Male / Other
      rawKua = 11 - yearSumReduced;
      formulaExplanation = `1900-1999 Male: 11 - (Year sum ${yearSumReduced}) = ${rawKua}`;
    }
  } else {
    // 2000 onwards: Male minus 10, Female plus 5
    if (gender === 'female') {
      rawKua = yearSumReduced + 5;
      formulaExplanation = `2000+ Female: (Year sum ${yearSumReduced}) + 5 = ${rawKua}`;
    } else {
      // Male / Other
      rawKua = 10 - yearSumReduced;
      if (rawKua <= 0) rawKua += 9;
      formulaExplanation = `2000+ Male: 10 - (Year sum ${yearSumReduced}) = ${rawKua}`;
    }
  }

  let finalKua = reduceToSingleDigit(rawKua);
  if (finalKua === 0) finalKua = 9;

  formulaExplanation += ` -> Final Kua: ${finalKua}`;

  const info = NUMBER_TRAITS[finalKua] || NUMBER_TRAITS[1];

  return {
    number: finalKua,
    title: "Kuva Number (Kua / Angel Number)",
    hindiTitle: "कुआ अंक",
    rulingPlanet: info.planet,
    element: info.element,
    description: `Kuva number reveals your personal energy magnet, favorable cosmic directions, elemental harmony, and luck vortexes.`,
    strengths: info.strengths,
    luckyColors: info.colors,
    luckyDays: info.days,
    calculationSteps: formulaExplanation,
  };
}

/**
 * 5. Lo Shu Grid (3x3 Ancient Magic Square)
 * Standard Lo Shu layout:
 * [ 4 ] [ 9 ] [ 2 ]  -> Top row: Mental Plane
 * [ 3 ] [ 5 ] [ 7 ]  -> Middle row: Emotional Plane
 * [ 8 ] [ 1 ] [ 6 ]  -> Bottom row: Practical Plane
 *
 * Columns:
 * [ 4, 3, 8 ] -> Thought Plane
 * [ 9, 5, 1 ] -> Will Plane
 * [ 2, 7, 6 ] -> Action Plane
 *
 * Diagonals:
 * [ 4, 5, 6 ] -> Golden Raj Yog (Success & Wealth)
 * [ 2, 5, 8 ] -> Silver Raj Yog (Property & Earth Stability)
 */

export const LO_SHU_STRUCTURE: Record<number, {
  label: string;
  plane: string;
  element: string;
  significance: string;
}> = {
  4: {
    label: "Wood / Discipline",
    plane: "Mental & Thought Plane",
    element: "Wood (SE)",
    significance: "Memory, sharp intellect, analytical depth, wealth accumulation",
  },
  9: {
    label: "Fire / Fame",
    plane: "Mental & Will Plane",
    element: "Fire (South)",
    significance: "Fame, reputation, passion, visibility, ambition",
  },
  2: {
    label: "Earth / Marriage",
    plane: "Mental & Action Plane",
    element: "Earth (SW)",
    significance: "Relationships, marriage harmony, sensitivity, partnerships",
  },
  3: {
    label: "Wood / Wisdom",
    plane: "Emotional & Thought Plane",
    element: "Wood (East)",
    significance: "Family harmony, knowledge, teaching, spiritual growth",
  },
  5: {
    label: "Earth / Core Center",
    plane: "Emotional & Will Plane",
    element: "Earth (Center)",
    significance: "Balance, stability, resilience, freedom, center of gravity",
  },
  7: {
    label: "Metal / Creativity",
    plane: "Emotional & Action Plane",
    element: "Metal (West)",
    significance: "Children, creative arts, intuition, research, occult",
  },
  8: {
    label: "Earth / Knowledge",
    plane: "Practical & Thought Plane",
    element: "Earth (NE)",
    significance: "Education, spiritual discipline, patience, property",
  },
  1: {
    label: "Water / Career",
    plane: "Practical & Will Plane",
    element: "Water (North)",
    significance: "Career progression, opportunities, communication, clarity",
  },
  6: {
    label: "Metal / Luxury",
    plane: "Practical & Action Plane",
    element: "Metal (NW)",
    significance: "Luxury, international travel, helpful friends, comfort",
  },
};

export function generateLoShuGrid(
  dobString: string,
  mulankNumber: number,
  bhagyankNumber: number,
  kuaNumber?: number
) {
  // Extract all single non-zero digits from DOB
  // e.g. "1995-08-15" gives [1, 9, 9, 5, 8, 1, 5]
  const rawDigits = dobString
    .replace(/\D/g, '')
    .split('')
    .map(Number)
    .filter(n => n >= 1 && n <= 9);

  // In standard Lo Shu practice, DOB digits are placed. Mulank & Bhagyank are often included.
  const allChartDigits = [...rawDigits];
  if (mulankNumber >= 1 && mulankNumber <= 9) {
    allChartDigits.push(mulankNumber);
  }
  if (bhagyankNumber >= 1 && bhagyankNumber <= 9) {
    allChartDigits.push(bhagyankNumber);
  }
  if (kuaNumber && kuaNumber >= 1 && kuaNumber <= 9) {
    allChartDigits.push(kuaNumber);
  }

  // Count occurrences
  const cells: Record<number, LoShuCell> = {};
  for (let pos = 1; pos <= 9; pos++) {
    const present = allChartDigits.filter(d => d === pos);
    cells[pos] = {
      positionNumber: pos,
      label: LO_SHU_STRUCTURE[pos].label,
      plane: LO_SHU_STRUCTURE[pos].plane,
      element: LO_SHU_STRUCTURE[pos].element,
      presentDigits: present,
      count: present.length,
      significance: LO_SHU_STRUCTURE[pos].significance,
    };
  }

  // Calculate planes
  const planeConfigs: { name: string; type: 'horizontal' | 'vertical' | 'diagonal'; numbers: number[]; desc: string }[] = [
    {
      name: "Mental Plane (4-9-2)",
      type: "horizontal",
      numbers: [4, 9, 2],
      desc: "Represents intellectual power, keen memory, vision, and mental agility.",
    },
    {
      name: "Emotional Plane (3-5-7)",
      type: "horizontal",
      numbers: [3, 5, 7],
      desc: "Controls inner feelings, empathy, artistic sensibilities, and spiritual connection.",
    },
    {
      name: "Practical Plane (8-1-6)",
      type: "horizontal",
      numbers: [8, 1, 6],
      desc: "Focuses on execution, tangible wealth, career discipline, and practical mastery.",
    },
    {
      name: "Thought Plane (4-3-8)",
      type: "vertical",
      numbers: [4, 3, 8],
      desc: "Depth of thinking, analytical strategy, ideas conception, and planning power.",
    },
    {
      name: "Will Plane (9-5-1)",
      type: "vertical",
      numbers: [9, 5, 1],
      desc: "Determination, unstoppable persistence, willpower, and executive drive.",
    },
    {
      name: "Action Plane (2-7-6)",
      type: "vertical",
      numbers: [2, 7, 6],
      desc: "Execution of plans, swift implementation, dynamism, and social charm.",
    },
    {
      name: "Golden Raj Yog (4-5-6)",
      type: "diagonal",
      numbers: [4, 5, 6],
      desc: "Royal combination for exceptional luck, massive financial success, and luxury.",
    },
    {
      name: "Silver Raj Yog (2-5-8)",
      type: "diagonal",
      numbers: [2, 5, 8],
      desc: "Auspicious combination for extensive real estate, property, and enduring stability.",
    },
  ];

  const planes: LoShuPlane[] = planeConfigs.map(config => {
    const presentNumbers = config.numbers.filter(num => cells[num].count > 0);
    const count = presentNumbers.length;
    const percentage = Math.round((count / config.numbers.length) * 100);
    
    let status: 'Complete' | 'Partial' | 'Missing' = 'Missing';
    if (count === config.numbers.length) {
      status = 'Complete';
    } else if (count > 0) {
      status = 'Partial';
    }

    return {
      name: config.name,
      type: config.type,
      numbers: config.numbers,
      presentCount: count,
      percentage,
      status,
      interpretation: config.desc,
    };
  });

  return {
    cells,
    planes,
    allBirthDigits: allChartDigits,
  };
}

// Full report generator
export function generateNumerologyReport(
  userName: string,
  dobString: string,
  gender: 'male' | 'female' | 'other' = 'male'
): NumerologyReportData {
  const parts = dobString.split('-');
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);

  const dateObj = new Date(year, month - 1, day);
  const formattedDate = dateObj.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  // Calculate age
  const today = new Date();
  let age = today.getFullYear() - year;
  const monthDiff = today.getMonth() - (month - 1);
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < day)) {
    age--;
  }

  // Western Zodiac estimation
  const zodiacSign = getZodiacSign(day, month);

  // Core calculations
  const mulank = calculateMulank(day);
  const bhagyank = calculateBhagyank(day, month, year);
  const namank = calculateNamank(userName);
  const kua = calculateKua(year, gender);

  const loShuGrid = generateLoShuGrid(dobString, mulank.number, bhagyank.number, kua.number);

  return {
    userName: userName.trim(),
    dob: dobString,
    gender,
    day,
    month,
    year,
    formattedDate,
    age,
    zodiacSign,
    mulank,
    bhagyank,
    namank,
    kua,
    loShuGrid,
  };
}

function getZodiacSign(day: number, month: number): string {
  const signs = [
    { sign: "Capricorn", cutoff: [1, 19] },
    { sign: "Aquarius", cutoff: [2, 18] },
    { sign: "Pisces", cutoff: [3, 20] },
    { sign: "Aries", cutoff: [4, 19] },
    { sign: "Taurus", cutoff: [5, 20] },
    { sign: "Gemini", cutoff: [6, 20] },
    { sign: "Cancer", cutoff: [7, 22] },
    { sign: "Leo", cutoff: [8, 22] },
    { sign: "Virgo", cutoff: [9, 22] },
    { sign: "Libra", cutoff: [10, 22] },
    { sign: "Scorpio", cutoff: [11, 21] },
    { sign: "Sagittarius", cutoff: [12, 21] },
    { sign: "Capricorn", cutoff: [12, 31] },
  ];

  for (const s of signs) {
    if (month === s.cutoff[0] && day <= s.cutoff[1]) {
      return s.sign;
    }
  }
  return "Capricorn";
}
