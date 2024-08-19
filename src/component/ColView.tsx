import React from 'react';

const allClasses = `
  md:col-span-1 md:col-span-2 md:col-span-3 md:col-span-4 md:col-span-5 md:col-span-6
  md:col-span-7 col-span-8 md:col-span-9 col-span-10 md:col-span-11 md:col-span-12
  md:col-start-1 md:col-start-2 md:col-start-3 md:col-start-4 md:col-start-5 md:col-start-6
  md:ol-start-7 md:col-start-8 md:col-start-9 md:col-start-10 md:col-start-11 md:col-start-12
`;

type ColViewProps = {
  cols: {
    col: number | string | null; // Erlaubt sowohl Zahlen als auch Zahlwörter
  };
  children?: React.ReactNode;
};

// Mapping von Zahlwörtern zu Zahlen
const numberMap: Record<string, number> = {
  "one": 1,
  "two": 2,
  "three": 3,
  "four": 4,
  "five": 5,
  "six": 6,
  "seven": 7,
  "eight": 8,
  "nine": 9,
  "ten": 10,
  "eleven": 11,
  "twelve": 12,
};

// Funktion zur Umwandlung von Zahlwörtern in Zahlen
const parseNumber = (value: number | string | null): number | null => {
  if (typeof value === 'number') {
    return (value >= 1 && value <= 12) ? value : null;
  }
  if (typeof value === 'string') {
    return numberMap[value.toLowerCase()] || null;
  }
  return null;
};

const ColView = ({ cols, children }: ColViewProps) => {
  const colValue = parseNumber(cols.col);

  if (colValue === null) {
    return null;
  }

  const colStartValue = Math.ceil((13 - colValue) / 2);
  const colSpanClass = `md:col-span-${colValue}`;
  const colStartClass = colValue < 12 ? `md:col-start-${colStartValue} col-start-0 bg-red-100` : '';

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className={`${colSpanClass} ${colStartClass} :col-start-0 col-span-12`}>
        {children}
      </div>
    </div>
  );
};

export default ColView;