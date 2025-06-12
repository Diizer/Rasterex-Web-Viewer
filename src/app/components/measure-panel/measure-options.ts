export interface MeasureOption {
  value: string | number;
  label: string;
  imgSrc?: string;
  hidden?: boolean;
}

export const presetOptions: MeasureOption[] = [
  { value: 'custom', label: 'Custom' },
  { value: 'metric', label: 'Metric' },
  { value: 'imperial', label: 'Imperial' }
];

export const metricSystemOptions: MeasureOption[] = [
  { value: 'metric', label: 'Metric' },
  { value: 'imperial', label: 'Imperial' }
];

export const precisionOptions: MeasureOption[] = [
  { value: 0, label: '0' },
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' }
];

export const imperialUnitsOptions: MeasureOption[] = [
  { value: 'in', label: 'Inches (in)' },
  { value: 'ft', label: 'Feet (ft)' },
  { value: 'yd', label: 'Yards (yd)' },
  { value: 'mi', label: 'Miles (mi)' }
];

export const metricUnitsOptions: MeasureOption[] = [
  { value: 'mm', label: 'Millimeters (mm)' },
  { value: 'cm', label: 'Centimeters (cm)' },
  { value: 'm', label: 'Meters (m)' },
  { value: 'km', label: 'Kilometers (km)' }
];

// Type guard to check if an object is a MeasureOption
export const isMeasureOption = (obj: any): obj is MeasureOption => {
  return obj 
    && typeof obj === 'object'
    && 'value' in obj
    && 'label' in obj;
};

// Helper function to find an option by value
export const findMeasureOptionByValue = (options: MeasureOption[], value: string | number): MeasureOption | undefined => {
  return options.find(option => option.value === value);
};

// Helper function to filter options
export const filterMeasureOptions = (options: MeasureOption[], searchTerm: string): MeasureOption[] => {
  const term = searchTerm.toLowerCase();
  return options.filter(option => 
    option.label.toLowerCase().includes(term)
  );
}; 