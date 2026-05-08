"use client";

import { useState } from "react";
import { BasicInfo, CertificationEntry, EducationEntry, WorkHistoryEntry } from "@/types";

interface Props {
  data: BasicInfo;
  onChange: (data: BasicInfo) => void;
  onNext: () => void;
}

function formatPhone(digits: string): string {
  const d = digits.replace(/\D/g, "");
  if (d.length === 11 && /^0[789]0/.test(d)) return `${d.slice(0,3)}-${d.slice(3,7)}-${d.slice(7)}`;
  if (d.length === 10 && /^0[3-9]/.test(d)) return `${d.slice(0,2)}-${d.slice(2,6)}-${d.slice(6)}`;
  if (d.length === 10) return `${d.slice(0,3)}-${d.slice(3,6)}-${d.slice(6)}`;
  return d;
}

function validatePhone(v: string): string {
  const d = v.replace(/\D/g, "");
  if (!d) return "電話番号を入力してください。";
  if (d.length < 10 || d.length > 11) return "10〜11桁で入力してください。";
  return "";
}

function validateEmail(v: string): string {
  if (!v.trim()) return "メールアドレスを入力してください。";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "メールアドレスの形式が正しくありません。";
  return "";
}

export default function Step1BasicInfo({ data, onChange, onNext }: Props) {
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const update = (field: keyof BasicInfo, value: unknown) =>
    onChange({ ...data, [field]: value });

  const updateEducation = (index: number, field: keyof EducationEntry, value: string) => {
    const updated = [...data.education];
    updated[index] = { ...updated[index], [field]: value };
    update("education", updated);
  };

  const updateWork = (index: number, field: keyof WorkHistoryEntry, value: string) => {
    const updated = [...data.workHistory];
    updated[index] = { ...updated[index], [field]: value };
    update("workHistory", updated);
  };

  const updateCert = (index: number, field: keyof CertificationEntry, value: string) => {
    const updated = [...data.certifications];
    updated[index] = { ...updated[index], [field]: value };
    update("certifications", updated);
  };

  const LABELS = ["卒業", "入社", "退社", "出向", "──"];

  const addEducation = () =>
    update("education", [...data.education, { year: "", month: "", description: "", label: "卒業" }]);

  const addWork = () =>
    update("workHistory", [...data.workHistory, { year: "", month: "", description: "", label: "入社" }]);

  const addCert = () =>
    update("certifications", [...data.certifications, { name: "", year: "", month: "" }]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("画像ファイルを選択してください");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("ファイルサイズは5MB以下にしてください");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => update("photo", reader.result as string);
    reader.readAsDataURL(file);
  };

  const isValid =
    data.name.trim() && data.nameKana.trim() && data.birthDate &&
    !validatePhone(data.phone) && !validateEmail(data.email);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-1">基本情報</h2>
        <p className="text-sm text-gray-500">履歴書に記載する情報を入力してください</p>
      </div>

      {/* 証明写真 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">証明写真</label>
        <div className="flex items-start gap-4">
          <div className="w-24 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden bg-gray-50 shrink-0">
            {data.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={data.photo} alt="証明写真" className="w-full h-full object-cover" />
            ) : (
              <span className="text-xs text-gray-400 text-center">写真なし</span>
            )}
          </div>
          <div className="flex-1 space-y-2">
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="block w-full text-xs text-gray-600 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            <p className="text-xs text-gray-400">推奨：縦横比 4:3、5MB以下</p>
            {data.photo && (
              <button
                onClick={() => update("photo", "")}
                className="text-xs text-red-500 hover:text-red-700"
              >
                削除
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 氏名・フリガナ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            氏名 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="山田 太郎"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            フリガナ <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={data.nameKana}
            onChange={(e) => update("nameKana", e.target.value)}
            placeholder="ヤマダ タロウ"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* 生年月日・性別 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="min-w-0">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            生年月日 <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={data.birthDate}
            onChange={(e) => update("birthDate", e.target.value)}
            className="w-full min-w-0 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 box-border"
          />
        </div>
        <div className="min-w-0">
          <label className="block text-sm font-medium text-gray-700 mb-1">性別</label>
          <select
            value={data.gender}
            onChange={(e) => update("gender", e.target.value)}
            className="w-full min-w-0 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 box-border"
          >
            <option value="">選択してください</option>
            <option value="男性">男性</option>
            <option value="女性">女性</option>
            <option value="その他">その他</option>
            <option value="未回答">未回答</option>
          </select>
        </div>
      </div>

      {/* 郵便番号 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">郵便番号</label>
        <input
          type="text"
          value={data.postalCode}
          onChange={(e) => update("postalCode", e.target.value)}
          placeholder="150-0001"
          className="w-40 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* 住所ふりがな */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">住所ふりがな</label>
        <input
          type="text"
          value={data.addressKana}
          onChange={(e) => update("addressKana", e.target.value)}
          placeholder="とうきょうとしぶやく〇〇"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* 住所 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">住所</label>
        <input
          type="text"
          value={data.address}
          onChange={(e) => update("address", e.target.value)}
          placeholder="東京都渋谷区〇〇1-2-3"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* 電話・メール */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            電話番号 <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            inputMode="numeric"
            value={data.phone}
            onChange={(e) => {
              const digits = e.target.value.replace(/\D/g, "");
              update("phone", digits);
              if (submitted) setPhoneError(validatePhone(digits));
            }}
            onBlur={() => setPhoneError(validatePhone(data.phone))}
            placeholder="09012345678（ハイフンなし）"
            className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${phoneError ? "border-red-400" : "border-gray-300"}`}
          />
          {phoneError && <p className="text-xs text-red-500 mt-1">{phoneError}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            メールアドレス <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => {
              update("email", e.target.value);
              if (submitted) setEmailError(validateEmail(e.target.value));
            }}
            onBlur={() => setEmailError(validateEmail(data.email))}
            placeholder="example@email.com"
            className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${emailError ? "border-red-400" : "border-gray-300"}`}
          />
          {emailError && <p className="text-xs text-red-500 mt-1">{emailError}</p>}
        </div>
      </div>

      {/* 学歴 */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">学歴</label>
          <button
            onClick={addEducation}
            className="text-xs text-blue-600 hover:text-blue-800 font-medium"
          >
            ＋ 追加
          </button>
        </div>
        <div className="space-y-2">
          {data.education.map((entry, i) => (
            <div key={i} className="flex gap-2 items-center">
              <input
                type="text"
                value={entry.year}
                onChange={(e) => updateEducation(i, "year", e.target.value)}
                placeholder="2020"
                className="w-20 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-500">年</span>
              <input
                type="text"
                value={entry.month}
                onChange={(e) => updateEducation(i, "month", e.target.value)}
                placeholder="3"
                className="w-14 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-500">月</span>
              <input
                type="text"
                value={entry.description}
                onChange={(e) => updateEducation(i, "description", e.target.value)}
                placeholder="〇〇大学 〇〇学部"
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={entry.label}
                onChange={(e) => updateEducation(i, "label", e.target.value)}
                className="w-24 border border-gray-300 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {LABELS.map((l) => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
          ))}
        </div>
      </div>

      {/* 職歴 */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">職歴</label>
          <button
            onClick={addWork}
            className="text-xs text-blue-600 hover:text-blue-800 font-medium"
          >
            ＋ 追加
          </button>
        </div>
        <div className="space-y-2">
          {data.workHistory.map((entry, i) => (
            <div key={i} className="flex gap-2 items-center">
              <input
                type="text"
                value={entry.year}
                onChange={(e) => updateWork(i, "year", e.target.value)}
                placeholder="2022"
                className="w-20 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-500">年</span>
              <input
                type="text"
                value={entry.month}
                onChange={(e) => updateWork(i, "month", e.target.value)}
                placeholder="4"
                className="w-14 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-500">月</span>
              <input
                type="text"
                value={entry.description}
                onChange={(e) => updateWork(i, "description", e.target.value)}
                placeholder="株式会社〇〇"
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={entry.label}
                onChange={(e) => updateWork(i, "label", e.target.value)}
                className="w-24 border border-gray-300 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {LABELS.map((l) => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
          ))}
        </div>
      </div>

      {/* 資格・免許 */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">資格・免許</label>
          <button
            onClick={addCert}
            className="text-xs text-blue-600 hover:text-blue-800 font-medium"
          >
            ＋ 追加
          </button>
        </div>
        <div className="space-y-2">
          {data.certifications.map((cert, i) => (
            <div key={i} className="flex gap-2 items-center">
              <input
                type="text"
                value={cert.name}
                onChange={(e) => updateCert(i, "name", e.target.value)}
                placeholder="日商簿記2級"
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                value={cert.year}
                onChange={(e) => updateCert(i, "year", e.target.value)}
                placeholder="2020"
                className="w-20 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-500">年</span>
              <input
                type="text"
                value={cert.month}
                onChange={(e) => updateCert(i, "month", e.target.value)}
                placeholder="3"
                className="w-14 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-500">月取得</span>
            </div>
          ))}
        </div>
      </div>

      {/* 本人希望記入欄 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">本人希望記入欄</label>
        <textarea
          value={data.wishes}
          onChange={(e) => update("wishes", e.target.value)}
          rows={2}
          placeholder="貴社の規定に従います。"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
        <p className="text-xs text-gray-400 mt-1">特に希望がなければ「貴社の規定に従います。」のままでOK</p>
      </div>

      <button
        onClick={() => {
          setSubmitted(true);
          setPhoneError(validatePhone(data.phone));
          setEmailError(validateEmail(data.email));
          if (isValid) onNext();
        }}
        className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
      >
        次へ：自己診断へ進む →
      </button>
    </div>
  );
}
