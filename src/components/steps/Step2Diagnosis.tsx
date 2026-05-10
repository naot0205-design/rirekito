"use client";

import { useEffect, useState } from "react";
import { DiagnosisAnswer } from "@/types";
import { QUESTIONS } from "@/data/questions";

interface Props {
  onNext: (answers: DiagnosisAnswer[]) => void;
  onBack: () => void;
}

export default function Step2Diagnosis({ onNext, onBack }: Props) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isNavigating, setIsNavigating] = useState(false);

  // 診断ページに遷移したら最上部にスクロール
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  const setAnswer = (questionId: number, value: string) =>
    setAnswers((prev) => ({ ...prev, [questionId]: value }));

  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === QUESTIONS.length;

  const handleNext = () => {
    const result: DiagnosisAnswer[] = Object.entries(answers).map(([id, answer]) => ({
      questionId: Number(id),
      answer,
    }));
    onNext(result);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-1">自己診断</h2>
        <p className="text-sm text-gray-500">
          直感で答えてください。全{QUESTIONS.length}問（{answeredCount}/{QUESTIONS.length}
          問回答済み）
        </p>
        <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${(answeredCount / QUESTIONS.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="space-y-6">
        {QUESTIONS.map((q, index) => (
          <div
            key={q.id}
            className={`rounded-xl border p-5 transition-all ${
              answers[q.id] ? "border-blue-200 bg-blue-50" : "border-gray-200 bg-white"
            }`}
          >
            <p className="text-sm font-semibold text-gray-800 mb-3">
              <span className="text-blue-500 mr-2">Q{index + 1}</span>
              {q.text}
            </p>
            <div className="space-y-2">
              {q.options.map((opt) => (
                <label
                  key={opt.value}
                  className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer border transition-all ${
                    answers[q.id] === opt.value
                      ? "border-blue-500 bg-white shadow-sm"
                      : "border-transparent hover:border-gray-200 hover:bg-white"
                  }`}
                >
                  <input
                    type="radio"
                    name={`q${q.id}`}
                    value={opt.value}
                    checked={answers[q.id] === opt.value}
                    onChange={() => setAnswer(q.id, opt.value)}
                    className="mt-0.5 accent-blue-600 shrink-0"
                  />
                  <span className="text-sm text-gray-700">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition"
        >
          ← 戻る
        </button>
        <button
          onClick={() => { setIsNavigating(true); handleNext(); }}
          disabled={!allAnswered || isNavigating}
          className="flex-[2] bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isNavigating ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              処理中...
            </>
          ) : "診断する →"}
        </button>
      </div>
    </div>
  );
}
