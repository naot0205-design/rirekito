export interface Question {
  id: number;
  text: string;
  options: { value: string; label: string }[];
}

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "仕事でミスが発生したとき、あなたが最初にすることは？",
    options: [
      { value: "A", label: "原因を分析して、再発防止の仕組みを考える" },
      { value: "B", label: "関係者にすぐ報告・連絡して状況を共有する" },
      { value: "C", label: "規則やマニュアルに照らし合わせて確認する" },
    ],
  },
  {
    id: 2,
    text: "理想の仕事の進め方に近いのは？",
    options: [
      { value: "A", label: "計画を立てて、先手先手で動く" },
      { value: "B", label: "チームと相談しながら柔軟に進める" },
      { value: "C", label: "ルールや手順に沿って正確に進める" },
    ],
  },
  {
    id: 3,
    text: "得意だと感じる業務に近いのは？",
    options: [
      { value: "A", label: "複数のタスクを同時にこなすマルチタスク" },
      { value: "B", label: "人と話したり、調整したりするコミュニケーション業務" },
      { value: "C", label: "データや書類をきれいに整理する作業" },
    ],
  },
  {
    id: 4,
    text: "職場でよく言われることは？",
    options: [
      { value: "A", label: "「気が利くね」「先読みが上手」" },
      { value: "B", label: "「話しやすい」「相談しやすい」" },
      { value: "C", label: "「丁寧」「正確」「しっかりしてる」" },
    ],
  },
  {
    id: 5,
    text: "締め切りが重なった時、どうする？",
    options: [
      { value: "A", label: "優先順位を即座に決めて、効率よく片付ける" },
      { value: "B", label: "チームに声をかけて分担を調整する" },
      { value: "C", label: "落ち着いて、一つずつ確実にこなす" },
    ],
  },
  {
    id: 6,
    text: "仕事のやりがいを感じるのはどんな時？",
    options: [
      { value: "A", label: "物事がスムーズに進んだとき" },
      { value: "B", label: "誰かに「助かった」と言われたとき" },
      { value: "C", label: "正確な仕事ができた、ミスゼロだったとき" },
    ],
  },
  {
    id: 7,
    text: "あなたが自然と得意な情報処理は？",
    options: [
      { value: "A", label: "スケジュールや進捗の管理" },
      { value: "B", label: "人の気持ちや関係性の把握" },
      { value: "C", label: "ルールや数字、文書の整合性チェック" },
    ],
  },
  {
    id: 8,
    text: "初めての仕事を任されたとき、最初にすることは？",
    options: [
      { value: "A", label: "全体像を把握して、段取りを組む" },
      { value: "B", label: "周囲に聞いて、情報を集める" },
      { value: "C", label: "マニュアルや資料を読み込む" },
    ],
  },
  {
    id: 9,
    text: "苦手なことに近いのは？",
    options: [
      { value: "A", label: "曖昧なままで進めること" },
      { value: "B", label: "一人で黙々と作業し続けること" },
      { value: "C", label: "スピード優先で雑になること" },
    ],
  },
  {
    id: 10,
    text: "理想のチームの中での自分の役割は？",
    options: [
      { value: "A", label: "全体を管理・調整するコーディネーター" },
      { value: "B", label: "橋渡し役・サポーター" },
      { value: "C", label: "品質管理・チェック担当" },
    ],
  },
];
