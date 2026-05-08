import { StaffType } from "@/types";
import { DiagnosisAnswer } from "@/types";

// 各回答がどのタイプに何点加算するか
// A=0, B=1, C=2 のインデックスで管理
type ScoreMap = Partial<Record<StaffType, number>>;

export const SCORE_TABLE: ScoreMap[][] = [
  // Q1: 仕事でミスが発生したとき
  [
    { 段取りマスター: 2, インフォキュレーター: 1 },       // A
    { ハブ人材: 2, ウェルカムマスター: 1 },               // B
    { ルール守護者: 2, 数字の番人: 1 },                   // C
  ],
  // Q2: 理想の仕事の進め方
  [
    { 段取りマスター: 2 },                                // A
    { ウェルカムマスター: 2, ハブ人材: 1 },               // B
    { 数字の番人: 2, ルール守護者: 1 },                   // C
  ],
  // Q3: 得意だと感じる業務
  [
    { 段取りマスター: 2 },                                // A
    { ハブ人材: 2, ウェルカムマスター: 1 },               // B
    { インフォキュレーター: 2, 数字の番人: 1 },           // C
  ],
  // Q4: 職場でよく言われること
  [
    { インフォキュレーター: 2, 段取りマスター: 1 },       // A
    { ハブ人材: 2, ウェルカムマスター: 1 },               // B
    { 数字の番人: 2, ルール守護者: 1 },                   // C
  ],
  // Q5: 締め切りが重なった時
  [
    { 段取りマスター: 2 },                                // A
    { ハブ人材: 2 },                                      // B
    { 数字の番人: 2, ルール守護者: 1 },                   // C
  ],
  // Q6: 仕事のやりがいを感じる時
  [
    { 段取りマスター: 2, インフォキュレーター: 1 },       // A
    { ウェルカムマスター: 2, ハブ人材: 1 },               // B
    { 数字の番人: 2, ルール守護者: 1 },                   // C
  ],
  // Q7: 得意な情報処理
  [
    { インフォキュレーター: 2, 段取りマスター: 1 },       // A
    { ハブ人材: 2, ウェルカムマスター: 1 },               // B
    { ルール守護者: 2, 数字の番人: 1 },                   // C
  ],
  // Q8: 初めての仕事を任されたとき
  [
    { インフォキュレーター: 2, 段取りマスター: 1 },       // A
    { ハブ人材: 2, ウェルカムマスター: 1 },               // B
    { ルール守護者: 2, 数字の番人: 1 },                   // C
  ],
  // Q9: 苦手なこと
  [
    { インフォキュレーター: 2, ルール守護者: 1 },         // A
    { ウェルカムマスター: 2, ハブ人材: 1 },               // B
    { 数字の番人: 2, ルール守護者: 1 },                   // C
  ],
  // Q10: 理想のチームの中での役割
  [
    { インフォキュレーター: 2, 段取りマスター: 1 },       // A
    { ハブ人材: 1, ウェルカムマスター: 2 },               // B
    { ルール守護者: 2, 数字の番人: 1 },                   // C
  ],
];

const ANSWER_INDEX: Record<string, number> = { A: 0, B: 1, C: 2 };

export function calcDiagnosis(answers: DiagnosisAnswer[]): StaffType {
  const scores: Record<StaffType, number> = {
    段取りマスター: 0,
    数字の番人: 0,
    ハブ人材: 0,
    ルール守護者: 0,
    ウェルカムマスター: 0,
    インフォキュレーター: 0,
  };

  for (const { questionId, answer } of answers) {
    const qIndex = questionId - 1;
    const aIndex = ANSWER_INDEX[answer];
    if (qIndex < 0 || qIndex >= SCORE_TABLE.length) continue;
    const scoreMap = SCORE_TABLE[qIndex][aIndex];
    for (const [type, pts] of Object.entries(scoreMap)) {
      scores[type as StaffType] += pts;
    }
  }

  return (Object.entries(scores).sort(([, a], [, b]) => b - a)[0][0]) as StaffType;
}
