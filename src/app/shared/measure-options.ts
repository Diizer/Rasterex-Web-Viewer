export interface PresetOption {
  pageScaleValue: number;
  customScaleValue: number;
  label: string;
  isSelected?: boolean;
}

export interface MeasureOption {
  value: string | number;
  label: string;
  shortLabel?: string;
  imgSrc?: string;
  hidden?: boolean;
}

export const metricUnitsOptions: MeasureOption[] = [
  {
    value: 'MILLIMETER',
    label: 'Millimeter',
    shortLabel: 'mm',
  },
  {
    value: 'CENTIMETER',
    label: 'Centimeter',
    shortLabel: 'cm',
  },
  {
    value: 'DECIMETER',
    label: 'Decimeter',
    shortLabel: 'dm',
  },
  { 
    value: 'METER', 
    label: 'Meter', 
    shortLabel: 'm' 
  },
  {
    value: 'KILOMETER',
    label: 'Kilometer',
    shortLabel: 'km',
  },
];

export const imperialUnitsOptions: MeasureOption[] = [
  { 
    value: 'INCH', 
    label: 'Inch', 
    shortLabel: 'in' 
  },
  { 
    value: 'FEET', 
    label: 'Feet', 
    shortLabel: 'ft' 
  },
  { 
    value: 'YARD', 
    label: 'Yard', 
    shortLabel: 'yd' 
  },
  { 
    value: 'MILE', 
    label: 'Mile', 
    shortLabel: 'mi' 
  },
  {
    value: 'NAUTICAL_MILES',
    label: 'Nautical Miles',
    shortLabel: 'nmi',
  },
];

export const precisionOptions: MeasureOption[] = [
  { 
    value: 1, 
    label: 'Rounded', 
    shortLabel: '1' 
  },
  { 
    value: 0.1, 
    label: 'Tenths', 
    shortLabel: '1.0' 
  },
  { 
    value: 0.01, 
    label: 'Hundredths', 
    shortLabel: '1.00' 
  },
  { 
    value: 0.001, 
    label: 'Thousandths', 
    shortLabel: '1.000' 
  },
  { 
    value: 0.0001, 
    label: 'Ten-Thousandths', 
    shortLabel: '1.0000' 
  },
];

export const metricSystemOptions: MeasureOption[] = [
  { value: '0', label: 'Metric' },
  { value: '1', label: 'Imperial' },
];

export const presetOptions: PresetOption[] = [
  { pageScaleValue: 1, customScaleValue: 1, label: '1:1' },
  { pageScaleValue: 1, customScaleValue: 10, label: '1:10' },
  { pageScaleValue: 1, customScaleValue: 100, label: '1:100' },
  { pageScaleValue: 1, customScaleValue: 1000, label: '1:1000' },
  { pageScaleValue: 1, customScaleValue: 2, label: '1:2' },
  { pageScaleValue: 1, customScaleValue: 3, label: '1:3' },
  { pageScaleValue: 1, customScaleValue: 4, label: '1:4' },
  { pageScaleValue: 1, customScaleValue: 5, label: '1:5' },
  { pageScaleValue: 1, customScaleValue: 6, label: '1:6' },
  { pageScaleValue: 1, customScaleValue: 7, label: '1:7' },
  { pageScaleValue: 1, customScaleValue: 8, label: '1:8' },
  { pageScaleValue: 1, customScaleValue: 9, label: '1:9' },
  { pageScaleValue: 1, customScaleValue: 12, label: '1:12' },
  { pageScaleValue: 1, customScaleValue: 16, label: '1:16' },
  { pageScaleValue: 1, customScaleValue: 20, label: '1:20' },
  { pageScaleValue: 1, customScaleValue: 25, label: '1:25' },
  { pageScaleValue: 1, customScaleValue: 32, label: '1:32' },
  { pageScaleValue: 1, customScaleValue: 48, label: '1:48' },
  { pageScaleValue: 1, customScaleValue: 50, label: '1:50' },
  { pageScaleValue: 1, customScaleValue: 150, label: '1:150' },
  { pageScaleValue: 1, customScaleValue: 200, label: '1:200' },
  { pageScaleValue: 1, customScaleValue: 250, label: '1:250' },
  { pageScaleValue: 1, customScaleValue: 300, label: '1:300' },
  { pageScaleValue: 1, customScaleValue: 500, label: '1:500' },
  { pageScaleValue: 1, customScaleValue: 1250, label: '1:1250' },
  { pageScaleValue: 1, customScaleValue: 2000, label: '1:2000' },
  { pageScaleValue: 1, customScaleValue: 2500, label: '1:2500' },
  { pageScaleValue: 1, customScaleValue: 5000, label: '1:5000' },
  { pageScaleValue: 1, customScaleValue: 10000, label: '1:10000' },
  { pageScaleValue: 2, customScaleValue: 1, label: '2:1' },
  { pageScaleValue: 4, customScaleValue: 1, label: '4:1' },
  { pageScaleValue: 5, customScaleValue: 1, label: '5:1' },
  { pageScaleValue: 10, customScaleValue: 1, label: '10:1' },
  { pageScaleValue: 20, customScaleValue: 1, label: '20:1' },
  { pageScaleValue: 25, customScaleValue: 1, label: '25:1' },
  { pageScaleValue: 50, customScaleValue: 1, label: '50:1' },
  { pageScaleValue: 100, customScaleValue: 1, label: '100:1' },
  { pageScaleValue: 200, customScaleValue: 1, label: '200:1' },
  { pageScaleValue: 500, customScaleValue: 1, label: '500:1' },
  { pageScaleValue: 1000, customScaleValue: 1, label: '1000:1' },
  { pageScaleValue: 10000, customScaleValue: 1, label: '10000:1' },
];

export const isMeasureOption = (obj: any): obj is MeasureOption => {
  return obj 
    && typeof obj === 'object'
    && 'value' in obj
    && 'label' in obj;
};

export const findMeasureOptionByValue = (options: MeasureOption[], value: string | number): MeasureOption | undefined => {
  return options.find(option => option.value === value);
};

export const filterMeasureOptions = (options: MeasureOption[], searchTerm: string): MeasureOption[] => {
  const term = searchTerm.toLowerCase();
  return options.filter(option => 
    option.label.toLowerCase().includes(term)
  );
}; 