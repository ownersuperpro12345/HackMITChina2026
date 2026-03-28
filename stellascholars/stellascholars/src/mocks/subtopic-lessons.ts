export interface SubtopicLessonSection {
  title: string;
  content: string;
  quickCheck?: {
    question: string;
    options: string[];
    correct: number;
    explanation: string;
  };
}

export interface SubtopicLesson {
  keyPoints: string[];
  estimatedMinutes: number;
  sections: SubtopicLessonSection[];
}

export const SUBTOPIC_LESSONS: Record<string, SubtopicLesson> = {

  // ═══════════════════════════════════════════
  // MATHS — ALGEBRA
  // ═══════════════════════════════════════════

  "linear-equations": {
    estimatedMinutes: 18,
    keyPoints: [
      "A linear equation has no x² or higher powers — just x",
      "To solve, get x on its own by doing the same thing to both sides",
      "Whatever you do to one side, you MUST do to the other",
      "Check your answer by substituting it back in",
    ],
    sections: [
      {
        title: "What Is a Linear Equation?",
        content: `<p>A <strong>linear equation</strong> is simply an equation where the unknown (usually <em>x</em>) appears on its own — no x², no x³. Just plain x.</p>
<p>Examples of linear equations:</p>
<ul>
  <li>3x + 5 = 14</li>
  <li>2x − 7 = 9</li>
  <li>5x = 20</li>
</ul>
<p>Our job is to find the value of x that makes the equation true. The key rule is:</p>
<div class="formula-box">Whatever you do to one side, do exactly the same to the other side.</div>
<p>Think of the equation like a balance scale — keep it balanced!</p>`,
        quickCheck: {
          question: "Which of these is a linear equation?",
          options: ["x² + 3 = 7", "3x + 5 = 14", "x³ = 8", "x² − x = 0"],
          correct: 1,
          explanation: "3x + 5 = 14 is linear because x only appears to the power of 1. The others have x², x³, so they're not linear.",
        },
      },
      {
        title: "Step-by-Step: Solving One-Step Equations",
        content: `<p>The goal is always to <strong>get x on its own</strong>. To do that, we undo whatever is being done to x.</p>
<p><strong>Example 1:</strong> Solve x + 7 = 12</p>
<p>x has 7 added to it. So we <em>subtract 7</em> from both sides:</p>
<div class="formula-box">x + 7 − 7 = 12 − 7 → x = 5</div>
<p><strong>Example 2:</strong> Solve 3x = 21</p>
<p>x is multiplied by 3. So we <em>divide both sides by 3</em>:</p>
<div class="formula-box">3x ÷ 3 = 21 ÷ 3 → x = 7</div>
<p><strong>Always check:</strong> Substitute back. Does 3(7) = 21? Yes ✓</p>`,
        quickCheck: {
          question: "Solve: x − 4 = 11. What is x?",
          options: ["x = 7", "x = 15", "x = 44", "x = 4"],
          correct: 1,
          explanation: "Add 4 to both sides: x − 4 + 4 = 11 + 4, so x = 15. Check: 15 − 4 = 11 ✓",
        },
      },
      {
        title: "Two-Step Equations",
        content: `<p>Most equations have two steps. The rule: <strong>undo in the reverse order of operations</strong>.</p>
<p>Think of it like getting dressed: you put socks on then shoes. To undo it, you take shoes off first, then socks.</p>
<p><strong>Example:</strong> Solve 4x + 3 = 19</p>
<p><strong>Step 1</strong> — subtract 3 from both sides (undo the +3 first):</p>
<div class="formula-box">4x + 3 − 3 = 19 − 3 → 4x = 16</div>
<p><strong>Step 2</strong> — divide both sides by 4 (undo the ×4):</p>
<div class="formula-box">4x ÷ 4 = 16 ÷ 4 → x = 4</div>
<p><strong>Check:</strong> 4(4) + 3 = 16 + 3 = 19 ✓</p>`,
        quickCheck: {
          question: "Solve: 5x − 2 = 18",
          options: ["x = 3", "x = 4", "x = 16", "x = 20"],
          correct: 1,
          explanation: "Step 1: Add 2 → 5x = 20. Step 2: Divide by 5 → x = 4. Check: 5(4) − 2 = 18 ✓",
        },
      },
      {
        title: "Equations with x on Both Sides",
        content: `<p>When x appears on both sides, first <strong>collect all the x terms on one side</strong>.</p>
<p><strong>Example:</strong> Solve 5x + 2 = 3x + 10</p>
<p><strong>Step 1</strong> — subtract 3x from both sides to move x terms left:</p>
<div class="formula-box">5x − 3x + 2 = 3x − 3x + 10 → 2x + 2 = 10</div>
<p><strong>Step 2</strong> — subtract 2:</p>
<div class="formula-box">2x = 8</div>
<p><strong>Step 3</strong> — divide by 2:</p>
<div class="formula-box">x = 4</div>
<p><strong>Check:</strong> 5(4) + 2 = 22, and 3(4) + 10 = 22 ✓</p>
<p><strong>Tip:</strong> Always move the smaller x term to avoid negatives where possible.</p>`,
        quickCheck: {
          question: "Solve: 7x − 3 = 4x + 12",
          options: ["x = 3", "x = 5", "x = 9", "x = 15"],
          correct: 1,
          explanation: "Subtract 4x: 3x − 3 = 12. Add 3: 3x = 15. Divide by 3: x = 5. Check: 7(5)−3=32, 4(5)+12=32 ✓",
        },
      },
    ],
  },

  "quadratics": {
    estimatedMinutes: 22,
    keyPoints: [
      "A quadratic has an x² term — the standard form is ax² + bx + c = 0",
      "Method 1: Factorising — find two numbers that multiply to ac and add to b",
      "Method 2: Quadratic formula — always works, even when factorising fails",
      "The discriminant b² − 4ac tells you how many solutions before you solve",
    ],
    sections: [
      {
        title: "What Makes a Quadratic?",
        content: `<p>A <strong>quadratic equation</strong> always has an x² as its highest power. The standard form is:</p>
<div class="formula-box">ax² + bx + c = 0</div>
<p>For example: <strong>x² + 5x + 6 = 0</strong> (here a=1, b=5, c=6)</p>
<p>A quadratic can have <strong>two solutions</strong>, <strong>one solution</strong>, or <strong>no real solutions</strong>.</p>
<p>Why two? Think of a quadratic as a U-shaped parabola. It can cross the x-axis in two places, touch it in one, or miss it completely.</p>`,
        quickCheck: {
          question: "In the equation 3x² − 7x + 2 = 0, what are a, b, and c?",
          options: ["a=3, b=7, c=2", "a=3, b=−7, c=2", "a=−7, b=3, c=2", "a=2, b=3, c=−7"],
          correct: 1,
          explanation: "Reading from ax² + bx + c = 0: a is the coefficient of x², which is 3. b is the coefficient of x, which is −7 (the minus is part of b!). c = 2.",
        },
      },
      {
        title: "Factorising Simple Quadratics",
        content: `<p>When a = 1 (just x², not 2x² or 3x²), factorising is usually the quickest method.</p>
<p><strong>The trick:</strong> Find two numbers that <em>multiply to give c</em> and <em>add to give b</em>.</p>
<p><strong>Example:</strong> Solve x² + 7x + 12 = 0</p>
<p>We need two numbers that multiply to <strong>12</strong> and add to <strong>7</strong>.</p>
<p>Try pairs: 1×12=12 (sum 13✗), 2×6=12 (sum 8✗), <strong>3×4=12 (sum 7 ✓)</strong></p>
<div class="formula-box">(x + 3)(x + 4) = 0</div>
<p>Set each bracket to zero: x + 3 = 0 → <strong>x = −3</strong> &nbsp;or&nbsp; x + 4 = 0 → <strong>x = −4</strong></p>`,
        quickCheck: {
          question: "Solve x² − 9x + 20 = 0 by factorising.",
          options: ["x = 4 and x = 5", "x = −4 and x = −5", "x = 2 and x = 10", "x = 9 and x = 20"],
          correct: 0,
          explanation: "Find two numbers that multiply to 20 and add to −9: they are −4 and −5. So (x−4)(x−5)=0, giving x=4 or x=5.",
        },
      },
      {
        title: "The Quadratic Formula — Never Fails",
        content: `<p>When factorising gets tricky (especially with awkward numbers), use the <strong>quadratic formula</strong>:</p>
<div class="formula-box">x = (−b ± √(b² − 4ac)) / 2a</div>
<p>The ± means you get <em>two answers</em> — one using + and one using −.</p>
<p><strong>Example:</strong> Solve 2x² + 3x − 5 = 0 (a=2, b=3, c=−5)</p>
<div class="formula-box">x = (−3 ± √(9 − 4×2×(−5))) / (2×2)</div>
<div class="formula-box">x = (−3 ± √(9 + 40)) / 4 = (−3 ± √49) / 4 = (−3 ± 7) / 4</div>
<p>So: x = (−3 + 7)/4 = <strong>4/4 = 1</strong> &nbsp;or&nbsp; x = (−3 − 7)/4 = <strong>−10/4 = −2.5</strong></p>
<p><strong>Pro tip:</strong> Calculate the discriminant (b² − 4ac) first — if it's negative, there are no real solutions!</p>`,
        quickCheck: {
          question: "For 3x² − 5x + 1 = 0, what is the discriminant (b² − 4ac)?",
          options: ["37", "13", "−7", "25"],
          correct: 1,
          explanation: "b² − 4ac = (−5)² − 4(3)(1) = 25 − 12 = 13. Since it's positive, there are two solutions.",
        },
      },
    ],
  },

  "simultaneous-equations": {
    estimatedMinutes: 20,
    keyPoints: [
      "Two equations, two unknowns — solve them together",
      "Elimination: multiply equations to make one variable cancel",
      "Substitution: rearrange one equation, substitute into the other",
      "Always check both answers in BOTH original equations",
    ],
    sections: [
      {
        title: "What Are Simultaneous Equations?",
        content: `<p><strong>Simultaneous equations</strong> are two (or more) equations that are both true at the same time. We solve them together to find the values of two unknowns.</p>
<p>Example:</p>
<div class="formula-box">Equation 1: x + y = 7<br/>Equation 2: x − y = 3</div>
<p>We need to find the pair of values (x and y) that make <em>both</em> equations true. In this case, x = 5 and y = 2 (since 5+2=7 and 5−2=3).</p>
<p>There are two main methods: <strong>elimination</strong> and <strong>substitution</strong>.</p>`,
        quickCheck: {
          question: "Are x = 4, y = 3 a solution to: x + y = 7 AND 2x − y = 5?",
          options: ["Yes, they satisfy both equations", "No, they only satisfy the first", "No, they satisfy neither", "No, they only satisfy the second"],
          correct: 0,
          explanation: "Check eq 1: 4 + 3 = 7 ✓. Check eq 2: 2(4) − 3 = 8 − 3 = 5 ✓. Both work!",
        },
      },
      {
        title: "Elimination Method",
        content: `<p><strong>Elimination</strong> means we add or subtract the equations to remove one variable.</p>
<p><strong>Example:</strong> Solve: 3x + 2y = 16 and 3x − y = 7</p>
<p>The 3x terms are the same! Subtract equation 2 from equation 1:</p>
<div class="formula-box">(3x + 2y) − (3x − y) = 16 − 7<br/>3x − 3x + 2y + y = 9<br/>3y = 9 → y = 3</div>
<p>Now substitute y = 3 back into either equation:</p>
<div class="formula-box">3x + 2(3) = 16 → 3x + 6 = 16 → 3x = 10 → x = 10/3</div>
<p>If coefficients don't match, <strong>multiply</strong> one or both equations first to make them match.</p>`,
        quickCheck: {
          question: "Solve: x + y = 10 and x − y = 4. What is x?",
          options: ["x = 3", "x = 7", "x = 6", "x = 10"],
          correct: 1,
          explanation: "Add the two equations: (x+y) + (x−y) = 10 + 4 → 2x = 14 → x = 7.",
        },
      },
      {
        title: "Substitution Method",
        content: `<p><strong>Substitution</strong> is great when one equation has x or y on its own (or is easy to rearrange).</p>
<p><strong>Example:</strong> Solve: y = 2x + 1 and 3x + y = 16</p>
<p><strong>Step 1</strong> — equation 1 already gives y. Substitute it into equation 2:</p>
<div class="formula-box">3x + (2x + 1) = 16<br/>5x + 1 = 16<br/>5x = 15<br/>x = 3</div>
<p><strong>Step 2</strong> — substitute x = 3 back into y = 2x + 1:</p>
<div class="formula-box">y = 2(3) + 1 = 7</div>
<p><strong>Check</strong> in equation 2: 3(3) + 7 = 9 + 7 = 16 ✓</p>`,
        quickCheck: {
          question: "Using substitution on y = x + 2 and 2x + y = 11, what is x?",
          options: ["x = 2", "x = 3", "x = 4", "x = 5"],
          correct: 1,
          explanation: "Substitute y = x + 2 into 2x + y = 11: 2x + (x+2) = 11 → 3x + 2 = 11 → 3x = 9 → x = 3.",
        },
      },
    ],
  },

  "inequalities": {
    estimatedMinutes: 16,
    keyPoints: [
      "&lt; means 'less than', &gt; means 'greater than', ≤ and ≥ include the boundary value",
      "Solve inequalities just like equations — but flip the sign when multiplying/dividing by a negative",
      "Show solutions on a number line: open circle (○) for strict, filled circle (●) for ≤ or ≥",
      "Combining inequalities: a &lt; x &lt; b means x is between a and b",
    ],
    sections: [
      {
        title: "Understanding Inequality Symbols",
        content: `<p>Inequalities compare two values. Here are the four symbols:</p>
<ul>
  <li><strong>x &lt; 5</strong> — x is less than 5 (x could be 4, 3, 0, −7, but NOT 5)</li>
  <li><strong>x &gt; 5</strong> — x is greater than 5 (x could be 6, 10, 100, but NOT 5)</li>
  <li><strong>x ≤ 5</strong> — x is less than OR equal to 5 (x could be 5, 4, 3, −7)</li>
  <li><strong>x ≥ 5</strong> — x is greater than OR equal to 5 (x could be 5, 6, 10)</li>
</ul>
<p>Think of the arrow pointing to the smaller number: x &lt; 5 means x is on the smaller side.</p>`,
        quickCheck: {
          question: "Which values satisfy x ≤ 3? Select all that apply:",
          options: ["x = 3", "x = 4", "x = 0", "x = −5"],
          correct: 0,
          explanation: "x ≤ 3 includes x = 3 (the ≤ symbol includes the boundary). So x = 3 satisfies it. Options 'x=0' and 'x=−5' also satisfy it, but in this single-answer format, the key point is x=3 IS included (unlike strict <).",
        },
      },
      {
        title: "Solving Inequalities — Almost Like Equations",
        content: `<p>You solve inequalities the same way as equations — with one important exception.</p>
<p><strong>Example:</strong> Solve 3x + 4 &lt; 16</p>
<div class="formula-box">3x + 4 − 4 &lt; 16 − 4<br/>3x &lt; 12<br/>x &lt; 4</div>
<p>So x can be any value less than 4.</p>
<p><strong>⚠️ The key rule:</strong> If you multiply or divide both sides by a <em>negative number</em>, you must <strong>flip the inequality sign</strong>.</p>
<p><strong>Example:</strong> Solve −2x &gt; 10</p>
<div class="formula-box">−2x ÷ (−2) &lt; 10 ÷ (−2) &nbsp;← sign flips!<br/>x &lt; −5</div>`,
        quickCheck: {
          question: "Solve: 2x − 5 ≥ 9. What is x?",
          options: ["x ≥ 2", "x ≥ 7", "x ≥ 14", "x ≤ 7"],
          correct: 1,
          explanation: "Add 5 to both sides: 2x ≥ 14. Divide by 2: x ≥ 7.",
        },
      },
      {
        title: "Showing Solutions on a Number Line",
        content: `<p>Inequalities can be shown on a <strong>number line</strong>:</p>
<ul>
  <li><strong>Open circle (○)</strong> at the boundary for strict inequalities (&lt; or &gt;) — the boundary is NOT included</li>
  <li><strong>Filled circle (●)</strong> at the boundary for ≤ or ≥ — the boundary IS included</li>
  <li>Draw an arrow in the direction of the solution</li>
</ul>
<p><strong>Double inequalities</strong> like −2 &lt; x ≤ 5 mean x is between −2 and 5, not including −2 but including 5. Show this with an open circle at −2, a filled circle at 5, and a line connecting them.</p>
<div class="formula-box">Integer solutions of −1 &lt; x ≤ 4: x can be 0, 1, 2, 3, 4</div>`,
        quickCheck: {
          question: "List the integer solutions of −3 ≤ x < 2.",
          options: ["−3, −2, −1, 0, 1", "−2, −1, 0, 1", "−3, −2, −1, 0, 1, 2", "−2, −1, 0, 1, 2"],
          correct: 0,
          explanation: "≤ means −3 IS included. < means 2 is NOT included. So integers from −3 up to (but not including) 2: −3, −2, −1, 0, 1.",
        },
      },
    ],
  },

  "sequences": {
    estimatedMinutes: 18,
    keyPoints: [
      "Arithmetic sequence: add the same number each time (common difference d)",
      "nth term of arithmetic sequence: nth term = a + (n−1)d, where a is the first term",
      "Geometric sequence: multiply by the same number each time (common ratio r)",
      "Fibonacci-type: each term is the sum of the two before it",
    ],
    sections: [
      {
        title: "Arithmetic Sequences — Same Difference Each Time",
        content: `<p>An <strong>arithmetic sequence</strong> goes up (or down) by the same amount each time. That amount is called the <strong>common difference (d)</strong>.</p>
<p>Examples:</p>
<ul>
  <li>3, 7, 11, 15, 19 ... (d = +4)</li>
  <li>20, 17, 14, 11, 8 ... (d = −3)</li>
</ul>
<p>To find the common difference: subtract any term from the one after it.</p>
<div class="formula-box">d = term₂ − term₁</div>`,
        quickCheck: {
          question: "What is the common difference in the sequence: 5, 11, 17, 23, 29?",
          options: ["4", "5", "6", "7"],
          correct: 2,
          explanation: "11 − 5 = 6. Check: 17 − 11 = 6, 23 − 17 = 6. The common difference is 6.",
        },
      },
      {
        title: "The nth Term Formula",
        content: `<p>The <strong>nth term formula</strong> lets you find any term in a sequence without listing them all.</p>
<div class="formula-box">nth term = a + (n − 1)d</div>
<p>Where <strong>a</strong> = first term, <strong>d</strong> = common difference, <strong>n</strong> = position.</p>
<p><strong>Example:</strong> Find the nth term of 3, 7, 11, 15 ...</p>
<p>a = 3, d = 4 (since 7−3=4)</p>
<div class="formula-box">nth term = 3 + (n−1)×4 = 3 + 4n − 4 = 4n − 1</div>
<p>Check: when n = 1: 4(1)−1 = 3 ✓ &nbsp; when n = 3: 4(3)−1 = 11 ✓</p>
<p><strong>Shortcut:</strong> The coefficient of n always equals the common difference d.</p>`,
        quickCheck: {
          question: "The nth term of a sequence is 5n + 2. What is the 10th term?",
          options: ["52", "12", "57", "72"],
          correct: 0,
          explanation: "Substitute n = 10: 5(10) + 2 = 50 + 2 = 52.",
        },
      },
      {
        title: "Geometric Sequences & Other Types",
        content: `<p>In a <strong>geometric sequence</strong>, each term is multiplied by the same number — the <strong>common ratio (r)</strong>.</p>
<p>Examples:</p>
<ul>
  <li>2, 6, 18, 54 ... (r = 3 — multiply by 3 each time)</li>
  <li>100, 50, 25, 12.5 ... (r = 0.5 — multiply by ½ each time)</li>
</ul>
<div class="formula-box">r = term₂ ÷ term₁</div>
<p><strong>Quadratic sequences</strong> have a changing difference, but the second differences are constant. The nth term includes an n² term.</p>
<p>Example: 2, 5, 10, 17, 26 ... (differences: 3, 5, 7, 9 — second differences: 2, 2, 2) → nth term = n² + 1</p>`,
        quickCheck: {
          question: "What is the common ratio in: 4, 12, 36, 108?",
          options: ["4", "3", "8", "12"],
          correct: 1,
          explanation: "12 ÷ 4 = 3. Check: 36 ÷ 12 = 3, 108 ÷ 36 = 3. The common ratio is 3.",
        },
      },
    ],
  },

  // ═══════════════════════════════════════════
  // MATHS — GEOMETRY (covered in LESSONS.geometry, but add subtopic versions)
  // ═══════════════════════════════════════════

  "angles": {
    estimatedMinutes: 16,
    keyPoints: [
      "Angles on a straight line = 180°; around a point = 360°",
      "Vertically opposite angles are equal",
      "In a triangle, all angles sum to 180°",
      "Alternate angles (Z-angles) are equal; co-interior angles sum to 180°",
    ],
    sections: [
      {
        title: "Basic Angle Rules",
        content: `<p>These are the building blocks of all angle work. You MUST know these:</p>
<ul>
  <li><strong>Angles on a straight line</strong> sum to 180°</li>
  <li><strong>Angles around a point</strong> sum to 360°</li>
  <li><strong>Vertically opposite angles</strong> are equal (the X-shape when two lines cross)</li>
  <li><strong>Angles in a triangle</strong> sum to 180°</li>
  <li><strong>Angles in a quadrilateral</strong> (4-sided shape) sum to 360°</li>
</ul>
<p><strong>Example:</strong> Two angles on a straight line are 65° and x°. Find x.</p>
<div class="formula-box">65 + x = 180 → x = 115°</div>`,
        quickCheck: {
          question: "Three angles on a straight line are 40°, 75°, and x°. Find x.",
          options: ["55°", "65°", "75°", "115°"],
          correct: 1,
          explanation: "40 + 75 + x = 180 → 115 + x = 180 → x = 65°.",
        },
      },
      {
        title: "Parallel Lines and Transversals",
        content: `<p>When a line crosses two <strong>parallel lines</strong>, it creates special angle pairs:</p>
<ul>
  <li><strong>Alternate angles</strong> (Z-shape) — equal to each other</li>
  <li><strong>Corresponding angles</strong> (F-shape) — equal to each other</li>
  <li><strong>Co-interior angles</strong> (C-shape) — add up to 180°</li>
</ul>
<p>You can always spot which is which by looking at the shape they form with the lines.</p>
<p><strong>Example:</strong> A transversal crosses parallel lines. One angle is 55°. Find the alternate angle.</p>
<div class="formula-box">Alternate angle = 55° (they're always equal)</div>`,
        quickCheck: {
          question: "Two co-interior angles are formed when a transversal crosses parallel lines. One angle is 70°. What is the other?",
          options: ["70°", "110°", "120°", "180°"],
          correct: 1,
          explanation: "Co-interior (C-angles) sum to 180°. So the other angle = 180° − 70° = 110°.",
        },
      },
      {
        title: "Polygon Angles",
        content: `<p>For any polygon with n sides, the sum of interior angles uses this formula:</p>
<div class="formula-box">Sum of interior angles = (n − 2) × 180°</div>
<p><strong>Examples:</strong></p>
<ul>
  <li>Triangle (n=3): (3−2) × 180 = 180°</li>
  <li>Quadrilateral (n=4): (4−2) × 180 = 360°</li>
  <li>Pentagon (n=5): (5−2) × 180 = 540°</li>
  <li>Hexagon (n=6): (6−2) × 180 = 720°</li>
</ul>
<p>For a <strong>regular polygon</strong> (all sides/angles equal): each interior angle = (n−2)×180° ÷ n</p>
<p>The <strong>exterior angle</strong> of any regular polygon = 360° ÷ n. Interior + exterior = 180°.</p>`,
        quickCheck: {
          question: "What is each interior angle of a regular octagon (8 sides)?",
          options: ["120°", "135°", "144°", "150°"],
          correct: 1,
          explanation: "Sum = (8−2) × 180 = 1080°. Each angle = 1080 ÷ 8 = 135°.",
        },
      },
    ],
  },

  "area-perimeter": {
    estimatedMinutes: 18,
    keyPoints: [
      "Perimeter = total distance around the outside of a shape",
      "Area = the space inside a 2D shape",
      "Circle: Area = πr², Circumference = 2πr",
      "Always include units: perimeter in cm/m, area in cm²/m²",
    ],
    sections: [
      {
        title: "Area Formulas You Must Know",
        content: `<p>Here are the area formulas for all the standard shapes:</p>
<ul>
  <li><strong>Rectangle:</strong> A = length × width</li>
  <li><strong>Triangle:</strong> A = ½ × base × perpendicular height</li>
  <li><strong>Parallelogram:</strong> A = base × perpendicular height (not the slant!)</li>
  <li><strong>Trapezium:</strong> A = ½(a + b) × h, where a and b are the two parallel sides</li>
  <li><strong>Circle:</strong> A = πr² (r = radius)</li>
</ul>
<p><strong>Important:</strong> For triangles and parallelograms, always use the <em>perpendicular</em> (vertical) height, not the slant side.</p>`,
        quickCheck: {
          question: "A trapezium has parallel sides of 6 cm and 10 cm, and height 4 cm. What is its area?",
          options: ["24 cm²", "32 cm²", "40 cm²", "60 cm²"],
          correct: 1,
          explanation: "A = ½(6 + 10) × 4 = ½ × 16 × 4 = 32 cm².",
        },
      },
      {
        title: "Circles — Area and Circumference",
        content: `<p>Two key circle formulas — you need both:</p>
<div class="formula-box">Area = πr² &nbsp;&nbsp; Circumference = 2πr = πd</div>
<p>where r = radius (centre to edge) and d = diameter (edge to edge through centre).</p>
<p><strong>Example:</strong> A circle has diameter 12 cm. Find the area and circumference.</p>
<p>First: r = d/2 = 6 cm</p>
<div class="formula-box">Area = π × 6² = 36π ≈ 113.1 cm²<br/>Circumference = 2π × 6 = 12π ≈ 37.7 cm</div>
<p><strong>Tip:</strong> Leave answers in terms of π (like 36π) unless asked for a decimal. It's more precise.</p>
<p><strong>Sectors:</strong> Area = (θ/360) × πr² &nbsp;|&nbsp; Arc length = (θ/360) × 2πr, where θ is the angle.</p>`,
        quickCheck: {
          question: "A circle has radius 5 cm. What is the exact area?",
          options: ["10π cm²", "25π cm²", "50π cm²", "100π cm²"],
          correct: 1,
          explanation: "Area = πr² = π × 5² = 25π cm². Always square the radius, not the diameter.",
        },
      },
      {
        title: "Compound Shapes",
        content: `<p><strong>Compound shapes</strong> are made of two or more basic shapes joined together. The strategy:</p>
<ol>
  <li>Split the shape into recognisable parts (rectangles, triangles, semicircles, etc.)</li>
  <li>Find the area of each part separately</li>
  <li>Add them together (or subtract if part is cut out)</li>
</ol>
<p><strong>Example:</strong> An L-shape. Split into two rectangles. Find each area. Add them.</p>
<p><strong>Perimeter tip:</strong> For compound shapes, trace the outside edge carefully. Don't count internal lines — only the boundary counts.</p>`,
        quickCheck: {
          question: "A shape is a 10×8 rectangle with a 4×4 square cut from one corner. What is the area?",
          options: ["64 cm²", "80 cm²", "64 cm²", "96 cm²"],
          correct: 0,
          explanation: "Area of rectangle = 10 × 8 = 80 cm². Area of cut square = 4 × 4 = 16 cm². Net area = 80 − 16 = 64 cm².",
        },
      },
    ],
  },

  "volume": {
    estimatedMinutes: 18,
    keyPoints: [
      "Volume = amount of 3D space a solid occupies, measured in cm³ or m³",
      "Prism (cylinder, cuboid): Volume = cross-section area × length",
      "Cone & pyramid: Volume = ⅓ × base area × height",
      "Sphere: Volume = (4/3)πr³",
    ],
    sections: [
      {
        title: "Prisms — Cross Section × Length",
        content: `<p>A <strong>prism</strong> is any 3D shape where the cross-section stays the same all the way through. A <strong>cylinder</strong> is a circular prism.</p>
<div class="formula-box">Volume of prism = cross-section area × length</div>
<p>Common prisms:</p>
<ul>
  <li><strong>Cuboid:</strong> V = length × width × height</li>
  <li><strong>Cylinder:</strong> V = πr²h (cross-section is a circle with area πr²)</li>
  <li><strong>Triangular prism:</strong> V = (½ × base × height) × length</li>
</ul>
<p><strong>Example:</strong> A cylinder has radius 4 cm and height 10 cm.</p>
<div class="formula-box">V = πr²h = π × 4² × 10 = 160π ≈ 502.7 cm³</div>`,
        quickCheck: {
          question: "A cuboid is 5 cm × 3 cm × 8 cm. What is its volume?",
          options: ["40 cm³", "79 cm³", "120 cm³", "240 cm³"],
          correct: 2,
          explanation: "V = 5 × 3 × 8 = 120 cm³.",
        },
      },
      {
        title: "Cones, Pyramids and Spheres",
        content: `<p>These shapes taper to a point, so their volume is <em>one third</em> of the equivalent prism:</p>
<ul>
  <li><strong>Cone:</strong> V = ⅓πr²h (one-third of a cylinder with the same base)</li>
  <li><strong>Pyramid:</strong> V = ⅓ × base area × height</li>
  <li><strong>Sphere:</strong> V = (4/3)πr³ (given in your formula sheet)</li>
</ul>
<p><strong>Example:</strong> A cone has radius 6 cm and height 9 cm.</p>
<div class="formula-box">V = ⅓ × π × 6² × 9 = ⅓ × 324π = 108π ≈ 339.3 cm³</div>
<p><strong>Tip:</strong> The formulas for cone, pyramid, and sphere are given in the exam — you don't need to memorise them, but you must know how to use them!</p>`,
        quickCheck: {
          question: "A sphere has radius 3 cm. What is its volume? (V = 4/3 πr³)",
          options: ["12π cm³", "36π cm³", "27π cm³", "108π cm³"],
          correct: 1,
          explanation: "V = (4/3) × π × 3³ = (4/3) × π × 27 = 36π cm³.",
        },
      },
      {
        title: "Surface Area",
        content: `<p><strong>Surface area</strong> is the total area of all the faces of a 3D shape.</p>
<p>Key formulas:</p>
<ul>
  <li><strong>Cuboid:</strong> SA = 2(lw + lh + wh)</li>
  <li><strong>Cylinder:</strong> Total SA = 2πr² + 2πrh (two circles + curved rectangle)</li>
  <li><strong>Cone:</strong> Total SA = πr² + πrl, where l = slant height = √(r² + h²)</li>
  <li><strong>Sphere:</strong> SA = 4πr²</li>
</ul>
<p><strong>Strategy:</strong> Identify each face, find its area individually, then add. Drawing a net (unfolded shape) helps visualise this.</p>`,
        quickCheck: {
          question: "A cube has side length 4 cm. What is the total surface area?",
          options: ["24 cm²", "64 cm²", "96 cm²", "192 cm²"],
          correct: 2,
          explanation: "A cube has 6 square faces, each with area 4² = 16 cm². Total = 6 × 16 = 96 cm².",
        },
      },
    ],
  },

  "pythagoras": {
    estimatedMinutes: 14,
    keyPoints: [
      "Pythagoras only works on right-angled triangles",
      "a² + b² = c², where c is always the hypotenuse (longest side, opposite the right angle)",
      "To find hypotenuse: c = √(a² + b²)",
      "To find a shorter side: a = √(c² − b²)",
    ],
    sections: [
      {
        title: "The Theorem — Understanding It",
        content: `<p><strong>Pythagoras' Theorem</strong> says: in any right-angled triangle, the square on the hypotenuse equals the sum of the squares on the other two sides.</p>
<div class="formula-box">a² + b² = c²</div>
<p>The <strong>hypotenuse (c)</strong> is always the side <em>opposite the right angle</em> — it's always the longest side.</p>
<p>Why does this work? The areas of the two smaller squares literally equal the area of the biggest square. It's one of the most beautiful facts in maths!</p>
<p><strong>Pythagorean triples</strong> — memorise these, they come up a lot:</p>
<ul>
  <li><strong>3, 4, 5</strong> (since 9 + 16 = 25)</li>
  <li><strong>5, 12, 13</strong></li>
  <li><strong>8, 15, 17</strong></li>
</ul>`,
        quickCheck: {
          question: "In a right-angled triangle, which side is the hypotenuse?",
          options: ["The longest side", "The side opposite the right angle", "Both A and B — they're the same side", "The shortest side"],
          correct: 2,
          explanation: "The hypotenuse is BOTH the longest side AND the side opposite the right angle — these always describe the same side.",
        },
      },
      {
        title: "Finding the Hypotenuse",
        content: `<p>When finding the hypotenuse (c), we add the squares and then square root.</p>
<p><strong>Example:</strong> Find the hypotenuse of a right-angled triangle with legs 6 cm and 8 cm.</p>
<div class="formula-box">c² = 6² + 8²<br/>c² = 36 + 64 = 100<br/>c = √100 = 10 cm</div>
<p>This is a 6-8-10 triple (a scaled version of 3-4-5).</p>
<p><strong>Another example:</strong> Legs of 5 cm and 9 cm.</p>
<div class="formula-box">c² = 25 + 81 = 106<br/>c = √106 ≈ 10.3 cm (1 d.p.)</div>`,
        quickCheck: {
          question: "A right-angled triangle has legs 7 cm and 24 cm. Find the hypotenuse.",
          options: ["25 cm", "31 cm", "√(631) cm", "√(31) cm"],
          correct: 0,
          explanation: "c² = 7² + 24² = 49 + 576 = 625. c = √625 = 25 cm. (This is a 7-24-25 Pythagorean triple!)",
        },
      },
      {
        title: "Finding a Shorter Side",
        content: `<p>When you know the hypotenuse and one leg, rearrange to find the missing leg.</p>
<div class="formula-box">a² = c² − b²</div>
<p><strong>Example:</strong> Hypotenuse = 13 cm, one leg = 5 cm. Find the other leg.</p>
<div class="formula-box">a² = 13² − 5²<br/>a² = 169 − 25 = 144<br/>a = √144 = 12 cm</div>
<p><strong>Key difference:</strong> Finding hypotenuse → ADD. Finding a leg → SUBTRACT. Don't mix them up!</p>
<p><strong>3D Pythagoras:</strong> Apply the theorem twice. First find a diagonal on the base, then use that as a leg to find the space diagonal.</p>`,
        quickCheck: {
          question: "A ladder 10 m long leans against a wall. The foot is 6 m from the wall. How high up the wall does it reach?",
          options: ["4 m", "8 m", "√164 m", "√(136) m"],
          correct: 1,
          explanation: "a² = 10² − 6² = 100 − 36 = 64. a = √64 = 8 m.",
        },
      },
    ],
  },

  "trigonometry": {
    estimatedMinutes: 20,
    keyPoints: [
      "SOH CAH TOA — the three ratios for right-angled triangles",
      "sin θ = Opposite/Hypotenuse | cos θ = Adjacent/Hypotenuse | tan θ = Opposite/Adjacent",
      "To find a side: rearrange the formula (e.g. Opp = Hyp × sin θ)",
      "To find an angle: use inverse trig (sin⁻¹, cos⁻¹, tan⁻¹ on your calculator)",
    ],
    sections: [
      {
        title: "Label the Triangle First",
        content: `<p>Before using any trig formula, always <strong>label the three sides</strong> relative to the angle you're using:</p>
<ul>
  <li><strong>Hypotenuse (H)</strong> — always the longest side, opposite the right angle</li>
  <li><strong>Opposite (O)</strong> — the side directly opposite the angle you're using (not touching it)</li>
  <li><strong>Adjacent (A)</strong> — the side next to the angle (not the hypotenuse)</li>
</ul>
<p><strong>Critical:</strong> H never changes. But O and A depend on which angle you're using — they swap if you switch to the other angle!</p>`,
        quickCheck: {
          question: "In a triangle, you're working with angle θ at the bottom left. The side directly opposite θ is labelled as...",
          options: ["Hypotenuse", "Adjacent", "Opposite", "It depends on the size of θ"],
          correct: 2,
          explanation: "The opposite side is the one directly across from the angle θ — it doesn't touch θ. This is always true regardless of angle size.",
        },
      },
      {
        title: "SOH CAH TOA — The Three Ratios",
        content: `<p>Once labelled, choose the formula based on which two sides are involved:</p>
<div class="formula-box">SOH: sin θ = Opposite / Hypotenuse<br/>CAH: cos θ = Adjacent / Hypotenuse<br/>TOA: tan θ = Opposite / Adjacent</div>
<p><strong>Choosing which to use:</strong></p>
<ul>
  <li>Have O and H? → Use <strong>sin</strong></li>
  <li>Have A and H? → Use <strong>cos</strong></li>
  <li>Have O and A? → Use <strong>tan</strong></li>
</ul>
<p><strong>Example:</strong> Angle = 35°, Hypotenuse = 20 cm. Find the Opposite side.</p>
<div class="formula-box">sin 35° = O / 20 → O = 20 × sin 35° = 20 × 0.574 ≈ 11.5 cm</div>`,
        quickCheck: {
          question: "You know the Adjacent and Hypotenuse. Which formula do you use?",
          options: ["SOH (sin θ = O/H)", "CAH (cos θ = A/H)", "TOA (tan θ = O/A)", "Pythagoras"],
          correct: 1,
          explanation: "CAH: cos θ = Adjacent / Hypotenuse. Always pick the formula containing the two sides you know.",
        },
      },
      {
        title: "Finding Angles Using Inverse Trig",
        content: `<p>When you know two sides and want the <strong>angle</strong>, use the inverse trig functions on your calculator: <strong>sin⁻¹</strong>, <strong>cos⁻¹</strong>, <strong>tan⁻¹</strong>.</p>
<p><strong>Example:</strong> Opposite = 8 cm, Hypotenuse = 17 cm. Find angle θ.</p>
<div class="formula-box">sin θ = 8/17 = 0.471<br/>θ = sin⁻¹(0.471) = 28.1°</div>
<p>On your calculator: press [sin⁻¹] (or [SHIFT][sin]) then type the value.</p>
<p><strong>Example 2:</strong> Adjacent = 5 cm, Opposite = 12 cm. Find θ.</p>
<div class="formula-box">tan θ = 12/5 = 2.4<br/>θ = tan⁻¹(2.4) = 67.4°</div>`,
        quickCheck: {
          question: "A right-angled triangle has Opposite = 6 cm and Adjacent = 6 cm. What is the angle θ?",
          options: ["30°", "45°", "60°", "90°"],
          correct: 1,
          explanation: "tan θ = 6/6 = 1. θ = tan⁻¹(1) = 45°. This is an isosceles right-angled triangle (the legs are equal).",
        },
      },
    ],
  },

  // ═══════════════════════════════════════════
  // MATHS — STATISTICS (subtopic versions)
  // ═══════════════════════════════════════════

  "mean-median-mode": {
    estimatedMinutes: 15,
    keyPoints: [
      "Mean = total ÷ count (use for symmetric data without outliers)",
      "Median = middle value when ordered (not affected by extreme values)",
      "Mode = most frequent value (use for categories)",
      "For grouped data, use midpoints to estimate the mean",
    ],
    sections: [
      {
        title: "Mean — The Balancing Average",
        content: `<p>The <strong>mean</strong> is what most people mean when they say 'average'. Add all values and divide by how many there are.</p>
<div class="formula-box">Mean = Σx / n (sum of all values ÷ number of values)</div>
<p><strong>Example:</strong> Find the mean of 4, 7, 12, 5, 7, 9, 2</p>
<div class="formula-box">Sum = 4+7+12+5+7+9+2 = 46<br/>Count = 7<br/>Mean = 46 ÷ 7 = 6.57 (2 d.p.)</div>
<p><strong>Weakness:</strong> The mean is dragged by outliers (extreme values). If one student scores 99% and the rest score around 50%, the mean makes it look higher than it really is for most students.</p>`,
        quickCheck: {
          question: "Find the mean of: 3, 8, 4, 10, 5",
          options: ["5", "6", "8", "30"],
          correct: 1,
          explanation: "Sum = 3+8+4+10+5 = 30. Count = 5. Mean = 30 ÷ 5 = 6.",
        },
      },
      {
        title: "Median — The Middle Value",
        content: `<p>The <strong>median</strong> is the middle value when data is placed in order. It's not affected by extreme values (outliers).</p>
<p><strong>To find the median:</strong></p>
<ol>
  <li>Order all values from smallest to largest</li>
  <li>Find the middle value</li>
</ol>
<p>For <strong>n</strong> values: the median is at position <strong>(n+1)/2</strong></p>
<p>If n is even, there's no single middle — the median is the <strong>mean of the two middle values</strong>.</p>
<p><strong>Example:</strong> 2, 5, 7, 8, 11 (n=5). Median at position (5+1)/2 = 3rd value = <strong>7</strong></p>
<p><strong>Example (even):</strong> 3, 5, 8, 12 (n=4). Median at position 2.5 → mean of 2nd and 3rd = (5+8)/2 = <strong>6.5</strong></p>`,
        quickCheck: {
          question: "Find the median of: 9, 3, 7, 1, 5",
          options: ["5", "7", "9", "3"],
          correct: 0,
          explanation: "Order: 1, 3, 5, 7, 9. Median is at position (5+1)/2 = 3rd value = 5.",
        },
      },
      {
        title: "Mode, Range and Grouped Data",
        content: `<p>The <strong>mode</strong> is the value that appears most often. A dataset can have no mode, one mode, or multiple modes.</p>
<p>The <strong>range</strong> = maximum − minimum. It measures spread, not a type of average.</p>
<p><strong>Which average to use?</strong></p>
<ul>
  <li><strong>Mean:</strong> When data is symmetric with no outliers</li>
  <li><strong>Median:</strong> When there are outliers or skewed data</li>
  <li><strong>Mode:</strong> For categorical data (shoe sizes, favourite colours)</li>
</ul>
<p><strong>Grouped data — estimating the mean:</strong> Use the midpoint of each class interval.</p>
<div class="formula-box">Estimated mean = Σ(midpoint × frequency) ÷ Σfrequency</div>`,
        quickCheck: {
          question: "What is the mode of: 4, 7, 2, 7, 5, 3, 7, 4?",
          options: ["4", "5", "7", "4 and 7"],
          correct: 2,
          explanation: "7 appears 3 times, 4 appears 2 times, others appear once. The mode is 7 (most frequent).",
        },
      },
    ],
  },

  "probability-trees": {
    estimatedMinutes: 18,
    keyPoints: [
      "P(event) = favourable outcomes ÷ total outcomes (always 0 to 1)",
      "P(not A) = 1 − P(A)",
      "Multiply along branches for AND (both events happening)",
      "Add across branches for OR (either event happening)",
    ],
    sections: [
      {
        title: "Basic Probability",
        content: `<p><strong>Probability</strong> measures how likely something is to happen. It's always between 0 (impossible) and 1 (certain).</p>
<div class="formula-box">P(event) = number of favourable outcomes ÷ total possible outcomes</div>
<p><strong>Example:</strong> A bag has 3 red, 4 blue, 3 green balls. P(red) = 3/10 = 0.3</p>
<p><strong>Key rules:</strong></p>
<ul>
  <li>All probabilities in a situation must <strong>add up to 1</strong></li>
  <li>P(event doesn't happen) = 1 − P(event happens)</li>
</ul>
<p>P(not red) = 1 − 3/10 = 7/10</p>`,
        quickCheck: {
          question: "A spinner has sections: 1, 2, 2, 3, 3, 3. What is P(3)?",
          options: ["1/6", "2/6", "3/6", "4/6"],
          correct: 2,
          explanation: "There are 3 threes out of 6 sections total. P(3) = 3/6 = ½.",
        },
      },
      {
        title: "Tree Diagrams — Two Events",
        content: `<p><strong>Tree diagrams</strong> are perfect for finding probabilities of two or more events in sequence.</p>
<p><strong>Rules:</strong></p>
<ul>
  <li><strong>Multiply along branches</strong> to get the probability of a specific combination (AND)</li>
  <li><strong>Add the relevant branch products</strong> for OR situations</li>
  <li>All branches from any point must sum to 1</li>
</ul>
<p><strong>Example:</strong> Flip a coin twice. P(heads then tails)?</p>
<div class="formula-box">P(H then T) = P(H) × P(T) = ½ × ½ = ¼</div>`,
        quickCheck: {
          question: "A bag has 2 red and 3 blue balls. One ball is drawn then replaced. What is P(two reds)?",
          options: ["2/5", "4/25", "4/20", "1/5"],
          correct: 1,
          explanation: "With replacement, P(red) = 2/5 each time. P(red AND red) = 2/5 × 2/5 = 4/25.",
        },
      },
      {
        title: "Without Replacement",
        content: `<p>When items are <strong>NOT replaced</strong>, the probabilities on the second draw change — because the total number of items has decreased by 1.</p>
<p><strong>Example:</strong> A bag has 4 red and 6 blue balls. Two balls are drawn without replacement. Find P(both red).</p>
<div class="formula-box">P(1st red) = 4/10<br/>P(2nd red | 1st was red) = 3/9 (only 3 red left out of 9 total)<br/>P(both red) = 4/10 × 3/9 = 12/90 = 2/15</div>
<p><strong>Tip:</strong> After drawing without replacing, decrease both the specific count AND the total by 1.</p>`,
        quickCheck: {
          question: "A bag has 5 red and 3 blue balls. Two are drawn without replacement. What is P(blue then red)?",
          options: ["15/56", "15/64", "5/24", "3/8"],
          correct: 0,
          explanation: "P(blue 1st) = 3/8. P(red 2nd | blue 1st) = 5/7 (5 reds still there, only 7 balls now). P = 3/8 × 5/7 = 15/56.",
        },
      },
    ],
  },

  // ═══════════════════════════════════════════
  // MATHS — NUMBER
  // ═══════════════════════════════════════════

  "percentages": {
    estimatedMinutes: 16,
    keyPoints: [
      "Percent means 'out of 100'. 45% = 45/100 = 0.45",
      "To find X% of Y: multiply Y by X/100 (or by the decimal equivalent)",
      "Percentage change = (change ÷ original) × 100",
      "Reverse percentage: divide by the multiplier to find the original value",
    ],
    sections: [
      {
        title: "Finding Percentages of Amounts",
        content: `<p><strong>Percentage</strong> means 'out of 100'. The easiest way to find a percentage of an amount is to convert to a decimal multiplier.</p>
<div class="formula-box">X% of Y = Y × (X ÷ 100)</div>
<p><strong>Examples:</strong></p>
<ul>
  <li>35% of 200 = 200 × 0.35 = <strong>70</strong></li>
  <li>17.5% of 80 = 80 × 0.175 = <strong>14</strong></li>
</ul>
<p><strong>Mental maths trick:</strong></p>
<ul>
  <li>10% → divide by 10</li>
  <li>5% → half of 10%</li>
  <li>1% → divide by 100</li>
  <li>Build other percentages from these</li>
</ul>`,
        quickCheck: {
          question: "Find 15% of 240.",
          options: ["24", "36", "48", "36"],
          correct: 1,
          explanation: "10% of 240 = 24. 5% = 12. So 15% = 24 + 12 = 36. Or: 240 × 0.15 = 36.",
        },
      },
      {
        title: "Percentage Increase and Decrease",
        content: `<p>To increase or decrease by a percentage, use a <strong>multiplier</strong>:</p>
<ul>
  <li>Increase by 20%: multiply by 1.20</li>
  <li>Decrease by 15%: multiply by 0.85</li>
</ul>
<p><strong>Rule:</strong> Increase by X% → multiply by (1 + X/100). Decrease by X% → multiply by (1 − X/100).</p>
<p><strong>Example:</strong> A jacket costs £80. It's reduced by 30%. New price?</p>
<div class="formula-box">£80 × 0.70 = £56</div>
<p><strong>Compound interest:</strong> Apply the multiplier multiple times.</p>
<div class="formula-box">After n years: Amount = P × (multiplier)ⁿ</div>`,
        quickCheck: {
          question: "A price increases by 25% from £120. What is the new price?",
          options: ["£30", "£145", "£150", "£160"],
          correct: 2,
          explanation: "Multiplier = 1.25. New price = £120 × 1.25 = £150.",
        },
      },
      {
        title: "Percentage Change and Reverse Percentages",
        content: `<p><strong>Percentage change:</strong> Find how much something went up or down as a percentage.</p>
<div class="formula-box">% change = (change ÷ original) × 100</div>
<p><strong>Example:</strong> A population increases from 400 to 500. What's the % increase?</p>
<div class="formula-box">Change = 100. % change = (100 ÷ 400) × 100 = 25%</div>
<p><strong>Reverse percentages:</strong> Find the original amount before a change.</p>
<p><strong>Example:</strong> After a 20% increase, a price is £96. Find the original.</p>
<div class="formula-box">£96 is 120% of the original.<br/>Original = £96 ÷ 1.20 = £80</div>
<p><strong>Key:</strong> NEVER just subtract the percentage of the new price — always divide by the multiplier.</p>`,
        quickCheck: {
          question: "After a 40% discount, a laptop costs £420. What was the original price?",
          options: ["£588", "£700", "£560", "£300"],
          correct: 1,
          explanation: "£420 is 60% of the original (100% − 40% = 60%). Original = £420 ÷ 0.60 = £700.",
        },
      },
    ],
  },

  "standard-form": {
    estimatedMinutes: 14,
    keyPoints: [
      "Standard form: A × 10ⁿ where 1 ≤ A < 10 and n is an integer",
      "Large numbers: positive power of 10. Small numbers: negative power.",
      "To multiply in standard form: multiply the A values, add the powers",
      "To divide: divide the A values, subtract the powers",
    ],
    sections: [
      {
        title: "What Is Standard Form?",
        content: `<p><strong>Standard form</strong> (scientific notation) is a compact way to write very large or very small numbers.</p>
<div class="formula-box">A × 10ⁿ where 1 ≤ A < 10</div>
<p><strong>Converting to standard form:</strong> Write the significant figures as a number between 1 and 10, then count how many places the decimal moved.</p>
<p>Large numbers → positive n: &nbsp; 4,700,000 = 4.7 × 10⁶</p>
<p>Small numbers → negative n: &nbsp; 0.000035 = 3.5 × 10⁻⁵</p>
<p><strong>Memory tip:</strong> Think about which direction the decimal moves. If you're making the number bigger (moving decimal right), the power is positive.</p>`,
        quickCheck: {
          question: "Write 0.00072 in standard form.",
          options: ["7.2 × 10⁴", "7.2 × 10⁻⁴", "72 × 10⁻⁵", "0.72 × 10⁻³"],
          correct: 1,
          explanation: "Move the decimal 4 places right to get 7.2. Since the original was small, n is negative: 7.2 × 10⁻⁴.",
        },
      },
      {
        title: "Calculating with Standard Form",
        content: `<p><strong>Multiplying:</strong> Multiply the A values, then add the powers.</p>
<div class="formula-box">(3 × 10⁴) × (2 × 10³) = 6 × 10⁷</div>
<p><strong>Dividing:</strong> Divide the A values, then subtract the powers.</p>
<div class="formula-box">(8 × 10⁶) ÷ (4 × 10²) = 2 × 10⁴</div>
<p><strong>Important:</strong> After calculating, check the answer is still in standard form (A must be between 1 and 10). If not, adjust:</p>
<div class="formula-box">4 × 10⁷ × 3 × 10⁵ = 12 × 10¹² = 1.2 × 10¹³</div>`,
        quickCheck: {
          question: "Calculate (5 × 10³) × (4 × 10²). Give your answer in standard form.",
          options: ["20 × 10⁵", "2 × 10⁶", "9 × 10⁵", "2 × 10⁵"],
          correct: 1,
          explanation: "5 × 4 = 20, and 10³ × 10² = 10⁵. So 20 × 10⁵ = 2 × 10⁶ (adjust since 20 is not between 1 and 10).",
        },
      },
    ],
  },

  // ═══════════════════════════════════════════
  // CS — ALGORITHMS (enhance existing)
  // ═══════════════════════════════════════════

  "sorting-algorithms": {
    estimatedMinutes: 20,
    keyPoints: [
      "Bubble Sort: compare adjacent pairs, swap if wrong — simple but slow O(n²)",
      "Merge Sort: split, sort halves, merge back — efficient O(n log n)",
      "Insertion Sort: build sorted list one item at a time — good for small/nearly sorted data",
      "For exam: know how to trace through each algorithm step by step",
    ],
    sections: [
      {
        title: "Bubble Sort — Step by Step",
        content: `<p><strong>Bubble Sort</strong> repeatedly compares adjacent pairs and swaps them if they're in the wrong order. Large values 'bubble up' to the end.</p>
<p><strong>Trace example:</strong> Sort [5, 3, 8, 1, 4]</p>
<p><strong>Pass 1:</strong></p>
<ul>
  <li>Compare 5,3 → swap → [3, 5, 8, 1, 4]</li>
  <li>Compare 5,8 → no swap → [3, 5, 8, 1, 4]</li>
  <li>Compare 8,1 → swap → [3, 5, 1, 8, 4]</li>
  <li>Compare 8,4 → swap → [3, 5, 1, 4, 8] ← 8 is in place!</li>
</ul>
<p>Each pass places the next largest value in its correct position. After n−1 passes, the list is sorted.</p>
<div class="formula-box">Worst case: O(n²) comparisons. Not efficient for large lists.</div>`,
        quickCheck: {
          question: "How many comparisons does Bubble Sort make in its first pass on a list of 5 elements?",
          options: ["3", "4", "5", "10"],
          correct: 1,
          explanation: "In each pass, we compare n−1 adjacent pairs. For 5 elements: 5−1 = 4 comparisons.",
        },
      },
      {
        title: "Merge Sort — Divide and Conquer",
        content: `<p><strong>Merge Sort</strong> uses a 'divide and conquer' strategy: split the list in half repeatedly until individual elements, then merge them back in order.</p>
<p><strong>Example:</strong> Sort [38, 27, 43, 3]</p>
<ol>
  <li>Split: [38, 27] | [43, 3]</li>
  <li>Split again: [38] | [27] | [43] | [3]</li>
  <li>Merge pairs: [27, 38] | [3, 43]</li>
  <li>Merge final: [3, 27, 38, 43] ✓</li>
</ol>
<div class="formula-box">Time complexity: O(n log n) — much faster than Bubble Sort for large n</div>
<p>The trade-off: Merge Sort needs extra memory to store the split halves.</p>`,
        quickCheck: {
          question: "What is the key advantage of Merge Sort over Bubble Sort?",
          options: ["It uses less memory", "It is faster for large lists — O(n log n) vs O(n²)", "It is simpler to understand", "It works without comparisons"],
          correct: 1,
          explanation: "Merge Sort has O(n log n) time complexity, which scales much better than Bubble Sort's O(n²) for large datasets.",
        },
      },
      {
        title: "Insertion Sort",
        content: `<p><strong>Insertion Sort</strong> builds a sorted list one element at a time, like sorting playing cards in your hand.</p>
<p><strong>Trace example:</strong> Sort [4, 2, 6, 1, 3]</p>
<ul>
  <li>Start: [4]</li>
  <li>Insert 2: [2, 4]</li>
  <li>Insert 6: [2, 4, 6]</li>
  <li>Insert 1: [1, 2, 4, 6]</li>
  <li>Insert 3: [1, 2, 3, 4, 6] ✓</li>
</ul>
<div class="formula-box">Best for: small lists or nearly-sorted lists. O(n) in best case, O(n²) in worst.</div>
<p><strong>Summary comparison:</strong></p>
<ul>
  <li>Bubble Sort: Simple to implement, O(n²) worst case</li>
  <li>Merge Sort: Efficient O(n log n), uses extra memory</li>
  <li>Insertion Sort: Good for nearly sorted data, O(n) best case</li>
</ul>`,
        quickCheck: {
          question: "Insertion sort is best suited to which type of data?",
          options: ["Large randomly-ordered lists", "Nearly sorted or small lists", "Reverse-sorted lists", "Lists with duplicate values"],
          correct: 1,
          explanation: "Insertion Sort is very efficient when data is already nearly sorted — in the best case it only needs n−1 comparisons (O(n)).",
        },
      },
    ],
  },

  "binary": {
    estimatedMinutes: 18,
    keyPoints: [
      "Binary uses only 0s and 1s (base 2). Each position is a power of 2.",
      "Convert decimal to binary: repeatedly divide by 2, remainders give the binary digits",
      "Convert binary to decimal: multiply each bit by its place value (powers of 2)",
      "Adding binary: 0+0=0, 0+1=1, 1+1=10 (carry the 1), 1+1+1=11",
    ],
    sections: [
      {
        title: "Understanding Binary Numbers",
        content: `<p><strong>Binary</strong> is base-2 — it only uses 0 and 1. Computers use it because circuits can easily represent two states: off (0) or on (1).</p>
<p>Just like decimal uses powers of 10 (ones, tens, hundreds...), binary uses powers of 2:</p>
<div class="formula-box">128 | 64 | 32 | 16 | 8 | 4 | 2 | 1</div>
<p>To read a binary number, add the place values where there's a 1.</p>
<p><strong>Example:</strong> What is 10110101 in decimal?</p>
<div class="formula-box">128+0+32+16+0+4+0+1 = 181</div>`,
        quickCheck: {
          question: "What is binary 1010 in decimal?",
          options: ["10", "12", "8", "5"],
          correct: 0,
          explanation: "1010 in binary: 1×8 + 0×4 + 1×2 + 0×1 = 8 + 0 + 2 + 0 = 10.",
        },
      },
      {
        title: "Decimal to Binary Conversion",
        content: `<p><strong>Method 1 — Subtraction:</strong> Find the largest power of 2 that fits, write a 1, subtract it, repeat.</p>
<p><strong>Example:</strong> Convert 45 to binary.</p>
<ul>
  <li>32 fits in 45: write 1, remainder 45−32=13</li>
  <li>16 doesn't fit in 13: write 0</li>
  <li>8 fits in 13: write 1, remainder 13−8=5</li>
  <li>4 fits in 5: write 1, remainder 5−4=1</li>
  <li>2 doesn't fit in 1: write 0</li>
  <li>1 fits: write 1, remainder 0</li>
</ul>
<div class="formula-box">45 = 101101 in binary</div>
<p><strong>Method 2 — Division:</strong> Divide by 2 repeatedly, read remainders from bottom to top.</p>`,
        quickCheck: {
          question: "Convert decimal 25 to binary.",
          options: ["11001", "10110", "11010", "10101"],
          correct: 0,
          explanation: "25 = 16+8+1 = 11001. Check: 1×16 + 1×8 + 0×4 + 0×2 + 1×1 = 25 ✓",
        },
      },
      {
        title: "Binary Addition",
        content: `<p>Binary addition uses only four rules:</p>
<div class="formula-box">0 + 0 = 0<br/>0 + 1 = 1<br/>1 + 0 = 1<br/>1 + 1 = 10 (write 0, carry 1)<br/>1 + 1 + 1 = 11 (write 1, carry 1)</div>
<p><strong>Example:</strong> Add 1011 + 0110</p>
<ul>
  <li>Rightmost: 1+0 = 1</li>
  <li>Next: 1+1 = 10 → write 0, carry 1</li>
  <li>Next: 0+1+1(carry) = 10 → write 0, carry 1</li>
  <li>Leftmost: 1+0+1(carry) = 10 → write 10</li>
</ul>
<div class="formula-box">1011 + 0110 = 10001 (= 17 in decimal, which is 11+6 ✓)</div>`,
        quickCheck: {
          question: "What is 1100 + 0101 in binary?",
          options: ["10001", "10111", "10011", "10010"],
          correct: 0,
          explanation: "1100 = 12, 0101 = 5, sum = 17 = 10001 in binary. Or add column by column: 0+1=1, 0+0=0, 1+1=10 (carry), 1+0+1=10. Result: 10001.",
        },
      },
    ],
  },

  // ═══════════════════════════════════════════
  // BIOLOGY
  // ═══════════════════════════════════════════

  "pathogens": {
    estimatedMinutes: 16,
    keyPoints: [
      "Pathogens are microorganisms that cause infectious diseases",
      "Types: bacteria, viruses, fungi, protists — each causes different diseases",
      "Bacteria reproduce rapidly inside the body and produce toxins",
      "Viruses replicate inside cells, damaging them — antibiotics don't work on viruses",
    ],
    sections: [
      {
        title: "What Are Pathogens?",
        content: `<p>A <strong>pathogen</strong> is a microorganism that causes disease. There are four main types:</p>
<ul>
  <li><strong>Bacteria</strong> — single-celled prokaryotes. E.g. Salmonella (food poisoning), tuberculosis</li>
  <li><strong>Viruses</strong> — not even cells; just DNA/RNA in a protein coat. E.g. influenza, HIV, measles</li>
  <li><strong>Fungi</strong> — eukaryotes with cell walls. E.g. ringworm, athlete's foot</li>
  <li><strong>Protists</strong> — single-celled eukaryotes. E.g. malaria (transmitted by mosquitoes)</li>
</ul>
<p>Pathogens spread by: direct contact, air (droplets), contaminated water/food, vectors (like mosquitoes).</p>`,
        quickCheck: {
          question: "Which type of pathogen causes malaria?",
          options: ["Bacteria", "Virus", "Fungi", "Protist"],
          correct: 3,
          explanation: "Malaria is caused by the Plasmodium protist, transmitted through the bite of infected Anopheles mosquitoes.",
        },
      },
      {
        title: "How Pathogens Make Us Ill",
        content: `<p><strong>Bacteria</strong> make us ill by:</p>
<ul>
  <li>Reproducing rapidly inside the body, competing for resources</li>
  <li>Producing <strong>toxins</strong> (poisons) that damage cells and tissues</li>
</ul>
<p><strong>Viruses</strong> make us ill by:</p>
<ul>
  <li>Invading host cells and using them to replicate</li>
  <li>Bursting the cell when they leave, killing it</li>
  <li>Triggering an immune response that causes symptoms like fever</li>
</ul>
<p><strong>Critical:</strong> <strong>Antibiotics kill bacteria</strong> but have NO effect on viruses. Using antibiotics for viral infections (like colds/flu) is ineffective AND contributes to antibiotic resistance.</p>`,
        quickCheck: {
          question: "Why are antibiotics NOT effective against viral infections?",
          options: ["Antibiotics are too strong for viruses", "Viruses are not cells, so antibiotics that target bacterial cell processes don't work on them", "Viruses become resistant immediately", "Antibiotics are only for the throat"],
          correct: 1,
          explanation: "Antibiotics target specific bacterial structures (cell walls, ribosomes). Viruses don't have these structures — they hijack host cells. So antibiotics have nothing to target.",
        },
      },
    ],
  },

  "photosynthesis": {
    estimatedMinutes: 18,
    keyPoints: [
      "Photosynthesis converts CO₂ + H₂O into glucose + O₂ using light energy",
      "Chlorophyll in chloroplasts absorbs light for the reaction",
      "Factors that affect rate: light intensity, CO₂ concentration, temperature",
      "Limiting factor: whichever factor is in shortest supply limits the rate",
    ],
    sections: [
      {
        title: "The Photosynthesis Equation",
        content: `<p><strong>Photosynthesis</strong> is how plants make food. Plants are producers — they make organic molecules from simple inorganic ones using light energy.</p>
<div class="formula-box">6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂ (light energy needed)</div>
<p>In words: <strong>Carbon dioxide + Water → Glucose + Oxygen</strong></p>
<p>Where does it happen? In <strong>chloroplasts</strong>, which contain <strong>chlorophyll</strong> — the green pigment that absorbs light.</p>
<p>Glucose is used for: respiration (energy), making cellulose (cell walls), making starch (storage), making proteins.</p>`,
        quickCheck: {
          question: "What are the raw materials (reactants) of photosynthesis?",
          options: ["Glucose and oxygen", "Carbon dioxide and water", "Carbon dioxide and oxygen", "Water and glucose"],
          correct: 1,
          explanation: "Photosynthesis takes in CO₂ and H₂O and produces glucose (C₆H₁₂O₆) and O₂. CO₂ and H₂O are the reactants.",
        },
      },
      {
        title: "Limiting Factors",
        content: `<p>The <strong>rate of photosynthesis</strong> is controlled by whichever factor is in shortest supply — this is the <strong>limiting factor</strong>.</p>
<p>Three main limiting factors:</p>
<ul>
  <li><strong>Light intensity</strong> — more light → faster photosynthesis (up to a point)</li>
  <li><strong>CO₂ concentration</strong> — more CO₂ → faster photosynthesis (up to a point)</li>
  <li><strong>Temperature</strong> — warmer = faster, but too hot denatures enzymes and rate drops sharply</li>
</ul>
<p>On a graph: the flat part of the curve shows the limiting factor has changed. If raising light doesn't help but raising CO₂ does → CO₂ was the limiting factor.</p>`,
        quickCheck: {
          question: "A plant is in a bright room but photosynthesis is slow. Increasing CO₂ makes it faster. What was the limiting factor?",
          options: ["Light intensity", "Temperature", "CO₂ concentration", "Water availability"],
          correct: 2,
          explanation: "If the plant is already in bright light but CO₂ was limiting, then adding more CO₂ will speed up photosynthesis. CO₂ concentration was the limiting factor.",
        },
      },
    ],
  },

  // ═══════════════════════════════════════════
  // CHEMISTRY
  // ═══════════════════════════════════════════

  "ionic-bonding": {
    estimatedMinutes: 18,
    keyPoints: [
      "Ionic bonds form between metals and non-metals by transfer of electrons",
      "Metals lose electrons → positive ions (cations). Non-metals gain electrons → negative ions (anions)",
      "Ions are attracted by electrostatic forces — this forms the ionic bond",
      "Ionic compounds: high melting points, conduct electricity when dissolved or molten",
    ],
    sections: [
      {
        title: "How Ionic Bonds Form",
        content: `<p><strong>Ionic bonding</strong> occurs between a metal and a non-metal. Electrons are completely <em>transferred</em> from the metal to the non-metal.</p>
<p><strong>Why?</strong> Both atoms want a full outer shell of electrons (like the noble gases). The metal has 1-3 outer electrons to lose; the non-metal has 1-3 spaces to fill.</p>
<p><strong>Example: Sodium + Chlorine → Sodium Chloride (NaCl)</strong></p>
<ul>
  <li>Sodium (Na): 2,8,1 — loses 1 electron → Na⁺ ion (2,8)</li>
  <li>Chlorine (Cl): 2,8,7 — gains 1 electron → Cl⁻ ion (2,8,8)</li>
  <li>The opposite charges attract: <strong>Na⁺ and Cl⁻ form an ionic bond</strong></li>
</ul>`,
        quickCheck: {
          question: "When magnesium (2 outer electrons) bonds with oxygen (6 outer electrons), what ions form?",
          options: ["Mg⁻ and O²⁺", "Mg²⁺ and O²⁻", "Mg⁺ and O⁻", "Mg²⁻ and O²⁺"],
          correct: 1,
          explanation: "Magnesium loses its 2 outer electrons → Mg²⁺. Oxygen gains 2 electrons to fill its outer shell → O²⁻. The compound formed is MgO.",
        },
      },
      {
        title: "Giant Ionic Lattice Structure",
        content: `<p>Ionic compounds form a <strong>giant ionic lattice</strong> — a regular 3D arrangement of alternating positive and negative ions.</p>
<p>Each ion is surrounded by ions of the opposite charge. Millions of electrostatic attractions hold the whole structure together.</p>
<p><strong>Properties explained:</strong></p>
<ul>
  <li><strong>High melting/boiling points</strong> — many strong electrostatic forces to break</li>
  <li><strong>Brittle</strong> — if ions shift slightly, like charges align and repel, shattering the structure</li>
  <li><strong>Conduct electricity when dissolved or molten</strong> — ions are free to move and carry charge</li>
  <li><strong>Don't conduct when solid</strong> — ions are fixed in the lattice, can't move</li>
</ul>`,
        quickCheck: {
          question: "Why does solid sodium chloride not conduct electricity, but molten sodium chloride does?",
          options: ["Solid NaCl has no ions", "In solid NaCl, ions are fixed and can't move. In molten NaCl, ions are free to move and carry charge.", "Molten NaCl has more electrons", "Solid NaCl is too hot to conduct"],
          correct: 1,
          explanation: "Electrical conduction requires mobile charge carriers. In solid ionic compounds, ions are locked in the lattice. On melting, ions become free to move and carry electrical current.",
        },
      },
    ],
  },

  "moles": {
    estimatedMinutes: 18,
    keyPoints: [
      "A mole is 6.02 × 10²³ particles (Avogadro's number)",
      "Moles = mass ÷ relative formula mass (Mr)",
      "Moles = concentration × volume(L) for solutions",
      "Use mole ratios from balanced equations to find amounts",
    ],
    sections: [
      {
        title: "The Mole Concept",
        content: `<p>A <strong>mole</strong> is simply a specific number of particles: <strong>6.02 × 10²³</strong> (Avogadro's number). It's like a dozen (12) but much, much bigger — used because atoms are so tiny.</p>
<p>The beauty of the mole is this: <strong>1 mole of any substance = its relative formula mass in grams</strong>.</p>
<p>So 1 mole of carbon (Mr = 12) = 12 g. 1 mole of water (Mr = 18) = 18 g.</p>
<div class="formula-box">Moles = mass (g) ÷ relative formula mass (Mr)</div>
<p>Finding Mr: add up all the atomic masses in the formula. For H₂O: 2(1) + 16 = 18 g/mol.</p>`,
        quickCheck: {
          question: "How many moles are in 44 g of CO₂? (C = 12, O = 16, so Mr = 44)",
          options: ["0.5 mol", "1 mol", "2 mol", "44 mol"],
          correct: 1,
          explanation: "Moles = mass ÷ Mr = 44 ÷ 44 = 1 mol.",
        },
      },
      {
        title: "Using Mole Ratios in Equations",
        content: `<p>A balanced equation shows the <strong>mole ratio</strong> — how many moles of each substance react.</p>
<p><strong>Example:</strong> How many grams of H₂O form when 6 g of H₂ reacts with excess O₂?</p>
<p>The equation: 2H₂ + O₂ → 2H₂O</p>
<p><strong>Step 1:</strong> Find moles of H₂. Mr(H₂) = 2. Moles = 6 ÷ 2 = <strong>3 mol</strong></p>
<p><strong>Step 2:</strong> Use the ratio. 2H₂ : 2H₂O → ratio is 1:1. So 3 mol H₂ makes <strong>3 mol H₂O</strong></p>
<p><strong>Step 3:</strong> Convert to grams. Mr(H₂O) = 18. Mass = 3 × 18 = <strong>54 g</strong></p>
<div class="formula-box">Mass = moles × Mr</div>`,
        quickCheck: {
          question: "In the reaction 2Mg + O₂ → 2MgO, how many moles of MgO form from 2 mol of Mg?",
          options: ["1 mol", "2 mol", "4 mol", "0.5 mol"],
          correct: 1,
          explanation: "The ratio is 2Mg : 2MgO = 1:1. So 2 mol of Mg produces 2 mol of MgO.",
        },
      },
    ],
  },

  // ═══════════════════════════════════════════
  // PHYSICS
  // ═══════════════════════════════════════════

  "newtons-laws": {
    estimatedMinutes: 18,
    keyPoints: [
      "1st Law: balanced forces → no change in motion (constant velocity or at rest)",
      "2nd Law: F = ma (resultant force = mass × acceleration)",
      "3rd Law: every action has an equal and opposite reaction",
      "Weight = mg (mass × gravitational field strength)",
    ],
    sections: [
      {
        title: "Newton's First Law — Inertia",
        content: `<p><strong>Newton's First Law:</strong> An object at rest stays at rest, and an object moving at constant velocity continues at that velocity — <em>unless a resultant force acts on it</em>.</p>
<p>This is the law of <strong>inertia</strong>. Objects resist changes to their motion.</p>
<p><strong>Examples:</strong></p>
<ul>
  <li>A book on a table: weight down, normal force up — balanced → stays still ✓</li>
  <li>A spacecraft in deep space: no air resistance, no gravity → continues at constant velocity forever</li>
  <li>Seatbelts: when a car stops suddenly, your body keeps moving forward (inertia) — the seatbelt provides the force to stop you</li>
</ul>
<p><strong>Key distinction:</strong> An object moving at constant velocity has ZERO resultant force — it's not forceless, the forces are balanced.</p>`,
        quickCheck: {
          question: "A skydiver reaches terminal velocity. Which statement is true?",
          options: ["There are no forces acting", "The net force is upward", "Weight equals air resistance — zero resultant force", "The parachute must be open"],
          correct: 2,
          explanation: "At terminal velocity, the skydiver moves at constant speed — forces are balanced. Weight (down) = air resistance (up). Zero resultant force.",
        },
      },
      {
        title: "Newton's Second Law — F = ma",
        content: `<p><strong>Newton's Second Law:</strong> The resultant (net) force on an object equals its mass times its acceleration.</p>
<div class="formula-box">F = ma &nbsp;|&nbsp; a = F/m &nbsp;|&nbsp; m = F/a</div>
<p>Units: Force in Newtons (N), mass in kg, acceleration in m/s².</p>
<p><strong>Examples:</strong></p>
<ul>
  <li>Car: m=1000 kg, a=3 m/s² → F = 1000×3 = <strong>3000 N</strong></li>
  <li>Same force on a heavier car: more mass → less acceleration</li>
  <li>Same force on a lighter car: less mass → more acceleration</li>
</ul>
<p>Think of it like pushing a shopping trolley: <strong>more force = more acceleration; more mass = less acceleration</strong> for the same force.</p>`,
        quickCheck: {
          question: "A 60 kg person experiences a resultant force of 120 N. What is their acceleration?",
          options: ["0.5 m/s²", "2 m/s²", "60 m/s²", "7200 m/s²"],
          correct: 1,
          explanation: "a = F/m = 120 ÷ 60 = 2 m/s².",
        },
      },
      {
        title: "Newton's Third Law — Equal and Opposite",
        content: `<p><strong>Newton's Third Law:</strong> When object A exerts a force on object B, object B exerts an equal and opposite force on object A.</p>
<p>These are called <strong>action-reaction pairs</strong>. They are:</p>
<ul>
  <li>Equal in magnitude</li>
  <li>Opposite in direction</li>
  <li>Acting on <em>different</em> objects (never on the same object!)</li>
</ul>
<p><strong>Examples:</strong></p>
<ul>
  <li>You push on the ground → ground pushes back on you (lets you walk)</li>
  <li>Rocket expels gas downward → gas pushes rocket upward</li>
  <li>Earth pulls Moon → Moon pulls Earth (with equal force!)</li>
</ul>
<p><strong>Common mistake:</strong> Action-reaction pairs DO NOT cancel — they act on DIFFERENT objects!</p>`,
        quickCheck: {
          question: "A horse pulls a cart. By Newton's 3rd Law, the cart pulls the horse with an equal force. Why does the system still move?",
          options: ["The forces aren't actually equal", "They cancel out so nothing moves", "They act on different objects — the horse's feet push on the ground, which causes forward movement", "The horse is stronger than the cart"],
          correct: 2,
          explanation: "The cart's force on the horse and the horse's force on the cart are equal and opposite — but they act on DIFFERENT objects so don't cancel. The system accelerates because the horse's feet push backward on the ground, the ground pushes the horse forward.",
        },
      },
    ],
  },

  "circuits": {
    estimatedMinutes: 18,
    keyPoints: [
      "Series circuit: components in a single loop, same current throughout",
      "Parallel circuit: components in separate branches, voltage same across each",
      "Ohm's Law: V = IR (voltage = current × resistance)",
      "Series: resistances add. Parallel: total resistance is less than any individual branch",
    ],
    sections: [
      {
        title: "Series and Parallel Circuits",
        content: `<p>Two main ways to connect components:</p>
<p><strong>Series circuit:</strong> Everything in one loop.</p>
<ul>
  <li>Same <strong>current</strong> flows through all components</li>
  <li><strong>Voltage splits</strong> across components</li>
  <li>Total resistance = R₁ + R₂ + R₃ ...</li>
  <li>If one bulb breaks → all go out</li>
</ul>
<p><strong>Parallel circuit:</strong> Components in separate branches.</p>
<ul>
  <li><strong>Voltage same</strong> across each branch</li>
  <li><strong>Current splits</strong> between branches</li>
  <li>Total resistance is LESS than any single branch</li>
  <li>If one bulb breaks → others stay on (home wiring uses parallel!)</li>
</ul>`,
        quickCheck: {
          question: "In a parallel circuit, what is the same across all branches?",
          options: ["Current", "Resistance", "Voltage", "Power"],
          correct: 2,
          explanation: "In a parallel circuit, all branches are connected directly across the power supply, so the voltage (p.d.) is the same across each branch.",
        },
      },
      {
        title: "Ohm's Law — V = IR",
        content: `<p><strong>Ohm's Law</strong> connects the three key circuit quantities:</p>
<div class="formula-box">V = IR &nbsp;|&nbsp; I = V/R &nbsp;|&nbsp; R = V/I</div>
<p>V = voltage (Volts, V), I = current (Amperes/Amps, A), R = resistance (Ohms, Ω)</p>
<p><strong>Example:</strong> A 12 V battery powers a 4 Ω resistor. Find the current.</p>
<div class="formula-box">I = V/R = 12/4 = 3 A</div>
<p><strong>Ohmic conductors</strong> (like metal wire at constant temperature) obey Ohm's Law — their V/I graph is a straight line through the origin.</p>
<p><strong>Non-ohmic components:</strong> bulbs (resistance increases as temperature increases), diodes (only conduct in one direction).</p>`,
        quickCheck: {
          question: "A 6 Ω resistor has 2 A flowing through it. What is the voltage across it?",
          options: ["3 V", "4 V", "8 V", "12 V"],
          correct: 3,
          explanation: "V = IR = 2 × 6 = 12 V.",
        },
      },
    ],
  },
};
