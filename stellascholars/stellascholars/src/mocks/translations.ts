// Multi-language translations for quiz questions and flashcard terms
// Only Chinese (Simplified) is supported — and only for Mathematics subjects

export const SUPPORTED_LANGUAGES = [
  { code: "none", label: "None (English only)", native: "",   flag: "🌐" },
  { code: "zh",   label: "Chinese",              native: "中文", flag: "🇨🇳" },
];

// ─────────────────────────────────────────────────────────────────────────────
// MATHS QUIZ QUESTION TRANSLATIONS (Chinese only)
// Only maths topics: linear equations (le*), quadratics (q*),
// simultaneous equations (se*), inequalities (ineq*), sequences (seq*), calculus (calc*)
// ─────────────────────────────────────────────────────────────────────────────

const ZH_QUESTIONS: Record<string, string> = {
  // Linear Equations
  "le1":"解方程：3x + 7 = 22","le2":"解方程：2x − 4 = 10","le3":"解方程：5x + 3 = 3x + 11",
  "le4":"解方程：4(x − 2) = 20","le5":"解方程：x/3 + 5 = 9","le6":"解方程：7 − 2x = 1",
  "le7":"哪一个是线性方程？","le8":"解方程：3(2x + 1) = 15",
  "le9":"一个数乘以4再减去6等于18，这个数是？","le10":"解方程：2x/5 = 8",
  "le11":"解方程：x + 12 = 5","le12":"解方程：6x − 3 = 4x + 7",
  "le13":"直线 y = 3x + 7 的斜率是多少？","le14":"解方程：12 − x = 5x + 6",
  "le15":"若 3x + y = 10 且 y = 4，求 x",
  "le16":"解方程：2(x + 3) = 3(x − 1)","le17":"解方程：0.5x + 2 = 7",
  "le18":"一袋苹果 £x，3袋共 £18，x 是多少？",
  "le19":"解方程：x − (x + 3) = 2x − 1","le20":"解方程：(x + 2)/3 = 4",
  "le21":"长方形周长28厘米，长比宽多4厘米，宽是多少？",
  "le22":"解 y：4y + 8 = 0","le23":"解 2x − 6 = 10 的第一步是？",
  "le24":"解方程：x/4 − 3 = 2","le25":"解方程：5(x − 4) = 0",
  // Quadratics
  "q1":"对 x² + 5x + 6 进行因式分解","q2":"解方程 x² − 7x + 12 = 0",
  "q3":"x² + 4x + 5 = 0 的判别式是？","q4":"判别式为负，有几个实数解？",
  "q5":"用求根公式解 2x² − 5x + 2 = 0","q6":"判别式为零意味着什么？",
  "q7":"对 x² − 9 因式分解","q8":"x² + 6x + 9 是什么完全平方？",
  "q9":"使 x² + 8x + c 成为完全平方，c = ？","q10":"解方程 x² = 49",
  "q11":"y = x² − 4x + 3 的对称轴？","q12":"解方程 x² + x − 6 = 0",
  "q13":"展开 (x + 5)²","q14":"3x² − 12x + 9 = 0 的判别式？",
  "q15":"解方程 x² − 5x = 0","q16":"y = 2x² − 8x + 6 的 y 轴截距？",
  "q17":"二次方程图形是什么形状？","q18":"a > 0 时抛物线开口方向？",
  "q19":"解方程 2x² = 18","q20":"识别 −x² + 4x − 3 = 0 中的 a、b、c",
  "q21":"解方程 x² − 4x − 5 = 0","q22":"求根公式中 ± 表示？",
  "q23":"什么是二次方程的根？","q24":"对 2x² + 7x + 3 因式分解",
  "q25":"配方法将二次式转化为什么形式？",
  // Simultaneous Equations
  "se1":"解：x + y = 10 且 x − y = 4","se2":"解：2x + y = 7 且 x + y = 5",
  "se3":"哪种方法通过加减消去变量？","se4":"解：3x + 2y = 16 且 x + 2y = 8",
  "se5":"两数和15差3，两数是？","se6":"解：y = 2x 且 x + y = 9",
  "se7":"图形法中联立方程的解在哪里？","se8":"解：4x − y = 10 且 2x + y = 8",
  "se9":"无解意味着什么？","se10":"解：x = 3y 且 2x − y = 10",
  // Inequalities
  "ineq1":"解：3x + 2 > 11","ineq2":"解：5 − 2x ≤ 1",
  "ineq3":"−2 < x ≤ 3 的整数值？","ineq4":"解：4x − 3 < 2x + 5",
  "ineq5":"乘以负数时不等号如何处理？",
  // Sequences
  "seq1":"3,7,11,15,... 下一项？","seq2":"5,8,11,14,... 第n项公式？",
  "seq3":"4n−1 的第10项？","seq4":"2,6,18,54,... 是什么数列？","seq5":"20,15,10,5,... 公差？",
  // Calculus
  "calc1":"y = 3x² + 5x − 7，求 dy/dx","calc2":"y = x³ 的导数？",
  "calc3":"求 ∫ 6x² dx","calc4":"y = x² − 6x + 5 的驻点？","calc5":"∫(3x² + 4x)dx = ？",
};

export const QUESTION_TRANSLATIONS: Record<string, Record<string, string>> = {
  zh: ZH_QUESTIONS,
};

// ─────────────────────────────────────────────────────────────────────────────
// MATHS FLASHCARD TERM TRANSLATIONS (Chinese only)
// Only algebra (alg-f*), geometry (geo-f*), number (num-f*) card IDs
// ─────────────────────────────────────────────────────────────────────────────

type TermEntry = { term: string; roman?: string };

const ZH_TERMS: Record<string, TermEntry> = {
  "alg-f1":{term:"线性方程",roman:"xiànxìng fāngchéng"},
  "alg-f2":{term:"逆运算法",roman:"nì yùnsuàn fǎ"},
  "alg-f3":{term:"二次方程",roman:"èrcì fāngchéng"},
  "alg-f4":{term:"因式分解",roman:"yīnshì fēnjiě"},
  "alg-f5":{term:"求根公式",roman:"qiú gēn gōngshì"},
  "alg-f6":{term:"判别式",roman:"pànbiéshì"},
  "alg-f7":{term:"平方差公式",roman:"píngfāng chā gōngshì"},
  "alg-f8":{term:"配方法",roman:"pèi fāng fǎ"},
  "alg-f9":{term:"联立方程",roman:"liánlì fāngchéng"},
  "alg-f10":{term:"消元法",roman:"xiāo yuán fǎ"},
  "alg-f11":{term:"不等号",roman:"bùděng hào"},
  "alg-f12":{term:"翻转符号规则",roman:"fānzhuǎn fúhào guīzé"},
  "alg-f13":{term:"等差数列",roman:"děngchā shùliè"},
  "alg-f14":{term:"通项公式",roman:"tōngxiàng gōngshì"},
  "alg-f15":{term:"等比数列",roman:"děngbǐ shùliè"},
  "alg-f17":{term:"代入法",roman:"dàirù fǎ"},
  "alg-f18":{term:"方程的根",roman:"fāngchéng de gēn"},
  "geo-f1":{term:"直线上的角",roman:"zhíxiàn shàng de jiǎo"},
  "geo-f2":{term:"三角形内角和",roman:"sānjiǎoxíng nèijiǎo hé"},
  "geo-f3":{term:"勾股定理",roman:"gōugǔ dìnglǐ"},
  "geo-f4":{term:"正弦余弦正切",roman:"zhèngxián yúxián zhèngqiē"},
  "geo-f5":{term:"圆的面积",roman:"yuán de miànjī"},
  "geo-f6":{term:"圆的周长",roman:"yuán de zhōucháng"},
  "geo-f7":{term:"长方体体积",roman:"chángfāngtǐ tǐjī"},
  "geo-f8":{term:"圆柱体体积",roman:"yuánzhùtǐ tǐjī"},
  "geo-f9":{term:"内错角",roman:"nèicuò jiǎo"},
  "geo-f10":{term:"同位角",roman:"tóngwèi jiǎo"},
  "geo-f11":{term:"同旁内角",roman:"tóngpáng nèijiǎo"},
  "geo-f12":{term:"表面积",roman:"biǎomiàn jī"},
  "num-f1":{term:"分数转小数",roman:"fēnshù zhuǎn xiǎoshù"},
  "num-f2":{term:"百分比变化",roman:"bǎifēnbǐ biànhuà"},
  "num-f4":{term:"比率",roman:"bǐlǜ"},
  "num-f5":{term:"科学记数法",roman:"kēxué jìshù fǎ"},
  "num-f7":{term:"最小公倍数",roman:"zuìxiǎo gōngbèishù"},
  "num-f8":{term:"最大公因数",roman:"zuìdà gōngyīnshù"},
  "num-f10":{term:"复利",roman:"fùlì"},
  "num-f11":{term:"正比例",roman:"zhèng bǐlì"},
  "num-f12":{term:"反比例",roman:"fǎn bǐlì"},
};

export const FLASHCARD_TERM_TRANSLATIONS: Record<string, Record<string, TermEntry>> = {
  zh: ZH_TERMS,
};

// Legacy re-exports so old imports still compile
export const QUESTION_TRANSLATIONS_ZH = ZH_QUESTIONS;
export const FLASHCARD_TERM_ZH = ZH_TERMS;
