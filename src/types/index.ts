export type StaffType =
  | "段取りマスター"
  | "数字の番人"
  | "ハブ人材"
  | "ルール守護者"
  | "ウェルカムマスター"
  | "インフォキュレーター";

export interface BasicInfo {
  name: string;
  nameKana: string;
  birthDate: string;
  gender: string;
  postalCode: string;
  address: string;
  addressKana: string;
  phone: string;
  email: string;
  photo: string;
  wishes: string;
  education: EducationEntry[];
  workHistory: WorkHistoryEntry[];
  certifications: CertificationEntry[];
}

export interface EducationEntry {
  year: string;
  month: string;
  description: string;
  label: string;
}

export interface WorkHistoryEntry {
  year: string;
  month: string;
  description: string;
  label: string;
}

export interface CertificationEntry {
  name: string;
  year: string;
  month: string;
}

export interface DiagnosisAnswer {
  questionId: number;
  answer: string; // A | B | C
}

export interface DiagnosisResult {
  type: StaffType;
  description: string;
  selfPR: string;
}

export type Step = 1 | 2 | 3 | 4;
