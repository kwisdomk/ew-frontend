export type Severity = 'red' | 'orange' | 'yellow' | 'green';

export interface Alert {
  id: string;
  county: string;
  disease: string;
  severity: Severity;
  riskScore: number;
  zScore: number;
  timestamp: string;
  summary: string;
  isNew?: boolean;
}

export interface CountyStats {
  population: number;
  hospitalCapacity: number; // total beds
  currentUtilization: number; // percentage
  activeResponseUnits: number;
  stockpileStatus: 'optimal' | 'low' | 'critical';
}

export const activeAlerts: Alert[] = [
  {
    id: "ALT-8492-CH",
    county: "Turkana",
    disease: "Cholera",
    severity: "red",
    riskScore: 94.2,
    zScore: 4.8,
    timestamp: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
    summary: "Anomalous cluster detected in Kakuma region. Waterborne transmission vector highly probable. 142 cases reported in 48h.",
    isNew: true
  },
  {
    id: "ALT-8491-MA",
    county: "Kisumu",
    disease: "Malaria",
    severity: "orange",
    riskScore: 78.5,
    zScore: 3.1,
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    summary: "Post-rain season spike exceeding historical 5-year mean. Pediatric ward admissions up 34%.",
  },
  {
    id: "ALT-8490-TY",
    county: "Nairobi",
    disease: "Typhoid",
    severity: "yellow",
    riskScore: 62.0,
    zScore: 2.2,
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    summary: "Elevated reporting from Kibera clinics. Pattern consistent with localized water contamination.",
  },
  {
    id: "ALT-8488-CH",
    county: "Mombasa",
    disease: "Cholera",
    severity: "red",
    riskScore: 88.1,
    zScore: 4.1,
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    summary: "Urban outbreak vector identified. Initial case cluster near Likoni. Multi-agency response active.",
  },
  {
    id: "ALT-8487-DF",
    county: "Mandera",
    disease: "Dengue Fever",
    severity: "orange",
    riskScore: 71.4,
    zScore: 2.9,
    timestamp: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
    summary: "Cross-border surveillance indicates viral movement. 12 confirmed cases, 40+ suspected.",
  },
  {
    id: "ALT-8485-ME",
    county: "Garissa",
    disease: "Measles",
    severity: "yellow",
    riskScore: 58.7,
    zScore: 1.9,
    timestamp: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
    summary: "Isolated cases in refugee settlements. Vaccination status verification requested.",
  }
];

export const weekGraphData = [
  { day: 'Mon', cases: 120, baseline: 110, threshold: 150 },
  { day: 'Tue', cases: 132, baseline: 112, threshold: 150 },
  { day: 'Wed', cases: 180, baseline: 111, threshold: 150 },
  { day: 'Thu', cases: 240, baseline: 115, threshold: 150 },
  { day: 'Fri', cases: 310, baseline: 114, threshold: 150 },
  { day: 'Sat', cases: 410, baseline: 110, threshold: 150 },
  { day: 'Sun', cases: 390, baseline: 108, threshold: 150 },
];

export const countyStatsData: Record<string, CountyStats> = {
  "Turkana": { population: 926976, hospitalCapacity: 340, currentUtilization: 89, activeResponseUnits: 4, stockpileStatus: 'critical' },
  "Kisumu": { population: 1155574, hospitalCapacity: 850, currentUtilization: 72, activeResponseUnits: 2, stockpileStatus: 'low' },
  "Nairobi": { population: 4397073, hospitalCapacity: 4500, currentUtilization: 65, activeResponseUnits: 8, stockpileStatus: 'optimal' },
  "Mombasa": { population: 1208333, hospitalCapacity: 1200, currentUtilization: 82, activeResponseUnits: 3, stockpileStatus: 'low' },
  "Mandera": { population: 867457, hospitalCapacity: 280, currentUtilization: 94, activeResponseUnits: 2, stockpileStatus: 'critical' },
  "Garissa": { population: 840395, hospitalCapacity: 310, currentUtilization: 45, activeResponseUnits: 1, stockpileStatus: 'optimal' },
};
