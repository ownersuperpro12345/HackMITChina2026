export interface QuickCheck {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface LessonSection {
  title: string;
  content: string;
  quickCheck?: QuickCheck;
}

export interface InteractiveLesson {
  id: string;
  subjectId: string;
  subjectName: string;
  topicId: string;
  topicName: string;
  title: string;
  estimatedMinutes: number;
  xpReward: number;
  keyPoints: string[];
  sections: LessonSection[];
  relatedTopics: { id: string; name: string; subjectId: string }[];
}

export const LESSONS: Record<string, InteractiveLesson> = {
  "algebra": {
    id: "algebra",
    subjectId: "maths",
    subjectName: "Mathematics",
    topicId: "algebra",
    topicName: "Algebra",
    title: "Solving Quadratic Equations",
    estimatedMinutes: 20,
    xpReward: 30,
    keyPoints: [
      "A quadratic has the form ax² + bx + c = 0",
      "Three methods: factorising, completing the square, quadratic formula",
      "The discriminant b² - 4ac determines the number of solutions",
      "Discriminant > 0: two solutions; = 0: one; < 0: no real solutions",
    ],
    sections: [
      {
        title: "What is a Quadratic?",
        content: `<p>A <strong>quadratic equation</strong> is any equation where the highest power of <em>x</em> is 2. The standard form is:</p>
<div class="formula-box">ax² + bx + c = 0</div>
<p>For example: <strong>x² + 5x + 6 = 0</strong> is quadratic, but <strong>3x + 5 = 0</strong> is not (highest power is 1).</p>
<p>The constants <em>a</em>, <em>b</em>, and <em>c</em> can be any numbers, but <strong>a must not equal 0</strong> — otherwise it's no longer quadratic.</p>`,
        quickCheck: {
          question: "Which of these is a quadratic equation?",
          options: ["5x + 2 = 0", "x³ - x = 4", "2x² - 3x + 1 = 0", "x⁴ = 16"],
          correct: 2,
          explanation: "2x² - 3x + 1 = 0 has the highest power of x equal to 2, making it quadratic.",
        },
      },
      {
        title: "Method 1 — Factorising",
        content: `<p>Factorising is the quickest method when it works. We split the quadratic into two brackets.</p>
<p><strong>Example:</strong> Solve x² + 5x + 6 = 0</p>
<p>We need two numbers that <em>multiply</em> to give <strong>+6</strong> and <em>add</em> to give <strong>+5</strong>.</p>
<p>Those numbers are <strong>+2</strong> and <strong>+3</strong>:</p>
<div class="formula-box">(x + 2)(x + 3) = 0</div>
<p>So either <strong>x + 2 = 0 → x = −2</strong>, or <strong>x + 3 = 0 → x = −3</strong>.</p>
<p>Always set each bracket equal to zero separately!</p>`,
        quickCheck: {
          question: "Factorise x² − 7x + 12 = 0. What are the solutions?",
          options: ["x = 3 and x = 4", "x = −3 and x = −4", "x = 6 and x = 2", "x = 1 and x = 12"],
          correct: 0,
          explanation: "We need numbers that multiply to +12 and add to −7: those are −3 and −4. So (x−3)(x−4) = 0, giving x = 3 or x = 4.",
        },
      },
      {
        title: "Method 2 — The Quadratic Formula",
        content: `<p>When factorising is tricky, the <strong>quadratic formula always works</strong>:</p>
<div class="formula-box">x = (−b ± √(b² − 4ac)) / 2a</div>
<p><strong>Example:</strong> Solve 2x² − 7x + 3 = 0</p>
<p>Here a = 2, b = −7, c = 3. Substituting:</p>
<div class="formula-box">x = (7 ± √(49 − 24)) / 4 = (7 ± √25) / 4 = (7 ± 5) / 4</div>
<p>So <strong>x = 12/4 = 3</strong> or <strong>x = 2/4 = ½</strong>.</p>
<p>Always identify a, b, c first — and be careful with negative signs!</p>`,
        quickCheck: {
          question: "For 3x² + 2x − 1 = 0, what are the values of a, b, and c?",
          options: ["a=3, b=2, c=−1", "a=3, b=−2, c=1", "a=2, b=3, c=−1", "a=1, b=2, c=3"],
          correct: 0,
          explanation: "Reading directly from the standard form ax² + bx + c = 0: a=3, b=2, c=−1.",
        },
      },
      {
        title: "The Discriminant",
        content: `<p>The expression <strong>b² − 4ac</strong> is called the <em>discriminant</em>. It tells us how many solutions exist <em>before</em> we solve.</p>
<ul>
  <li><strong>b² − 4ac &gt; 0</strong>: Two distinct real solutions</li>
  <li><strong>b² − 4ac = 0</strong>: Exactly one repeated solution</li>
  <li><strong>b² − 4ac &lt; 0</strong>: No real solutions</li>
</ul>
<p><strong>Example:</strong> For x² + 2x + 5 = 0: discriminant = 4 − 20 = −16 &lt; 0, so <strong>no real solutions</strong>.</p>`,
        quickCheck: {
          question: "The discriminant of a quadratic is 0. What does this mean?",
          options: ["No solutions", "Exactly one repeated solution", "Two different solutions", "The equation is linear"],
          correct: 1,
          explanation: "When b² − 4ac = 0, the ± gives the same answer both times: one repeated solution.",
        },
      },
    ],
    relatedTopics: [
      { id: "geometry", name: "Geometry & Measures", subjectId: "maths" },
      { id: "graphs", name: "Graphs & Functions", subjectId: "maths" },
      { id: "number", name: "Number", subjectId: "maths" },
    ],
  },

  "geometry": {
    id: "geometry",
    subjectId: "maths",
    subjectName: "Mathematics",
    topicId: "geometry",
    topicName: "Geometry & Measures",
    title: "Geometry & Measures — Complete Guide",
    estimatedMinutes: 30,
    xpReward: 40,
    keyPoints: [
      "Angles in a triangle sum to 180°; in a quadrilateral to 360°",
      "Area of circle = πr²; circumference = 2πr",
      "Volume of a prism = cross-section area × length",
      "Pythagoras: a² + b² = c² for right-angled triangles",
      "SOH CAH TOA — links angles to sides in right-angled triangles",
    ],
    sections: [
      {
        title: "Angles — Rules and Properties",
        content: `<p>Angle rules are the foundation of geometry. You must know these cold:</p>
<ul>
  <li><strong>Angles on a straight line</strong> sum to 180°</li>
  <li><strong>Angles around a point</strong> sum to 360°</li>
  <li><strong>Vertically opposite angles</strong> are equal</li>
  <li><strong>Angles in a triangle</strong> sum to 180°</li>
  <li><strong>Angles in a quadrilateral</strong> sum to 360°</li>
</ul>
<p><strong>Parallel lines:</strong> When a transversal crosses parallel lines:</p>
<ul>
  <li><strong>Alternate angles</strong> (Z-angles) are equal</li>
  <li><strong>Co-interior angles</strong> (C-angles) add up to 180°</li>
  <li><strong>Corresponding angles</strong> (F-angles) are equal</li>
</ul>
<p><strong>Polygons:</strong> Sum of interior angles = (n − 2) × 180°, where n = number of sides. For a regular polygon, each interior angle = (n − 2) × 180° ÷ n.</p>`,
        quickCheck: {
          question: "A regular hexagon has 6 sides. What is each interior angle?",
          options: ["90°", "108°", "120°", "135°"],
          correct: 2,
          explanation: "Sum of interior angles = (6 − 2) × 180° = 720°. Each angle = 720° ÷ 6 = 120°.",
        },
      },
      {
        title: "Area & Perimeter",
        content: `<p>Learn these area formulas — they are used constantly:</p>
<ul>
  <li><strong>Rectangle:</strong> A = length × width</li>
  <li><strong>Triangle:</strong> A = ½ × base × height</li>
  <li><strong>Parallelogram:</strong> A = base × perpendicular height</li>
  <li><strong>Trapezium:</strong> A = ½(a + b) × h, where a and b are the parallel sides</li>
  <li><strong>Circle:</strong> A = πr² | Circumference = 2πr (or πd)</li>
</ul>
<p><strong>Compound shapes:</strong> Split into simpler shapes, find each area, then add or subtract as needed.</p>
<p><strong>Arc length</strong> = (θ/360) × 2πr &nbsp;|&nbsp; <strong>Sector area</strong> = (θ/360) × πr², where θ is the angle in degrees.</p>
<div class="formula-box">Always include units! Area uses units², e.g. cm², m²</div>`,
        quickCheck: {
          question: "A circle has radius 5 cm. What is its area? (use π ≈ 3.14)",
          options: ["15.7 cm²", "31.4 cm²", "78.5 cm²", "25 cm²"],
          correct: 2,
          explanation: "A = πr² = 3.14 × 5² = 3.14 × 25 = 78.5 cm².",
        },
      },
      {
        title: "Volume & Surface Area of 3D Shapes",
        content: `<p>Volume tells us how much space a 3D shape occupies. Surface area is the total area of all faces.</p>
<ul>
  <li><strong>Cuboid:</strong> V = l × w × h</li>
  <li><strong>Prism:</strong> V = cross-section area × length</li>
  <li><strong>Cylinder:</strong> V = πr²h | Curved surface area = 2πrh</li>
  <li><strong>Cone:</strong> V = ⅓πr²h | Curved surface area = πrl, where l = slant height</li>
  <li><strong>Sphere:</strong> V = ⁴⁄₃πr³ | Surface area = 4πr²</li>
  <li><strong>Pyramid:</strong> V = ⅓ × base area × height</li>
</ul>
<p><strong>Compound volumes:</strong> Add volumes of combined shapes, or subtract for hollow shapes.</p>
<div class="formula-box">Volume uses units³, e.g. cm³, m³</div>`,
        quickCheck: {
          question: "A cylinder has radius 3 cm and height 10 cm. What is its volume? (π ≈ 3.14)",
          options: ["94.2 cm³", "188.4 cm³", "282.6 cm³", "942 cm³"],
          correct: 2,
          explanation: "V = πr²h = 3.14 × 3² × 10 = 3.14 × 9 × 10 = 282.6 cm³.",
        },
      },
      {
        title: "Pythagoras' Theorem",
        content: `<p><strong>Pythagoras' Theorem</strong> applies to <em>right-angled triangles only</em>.</p>
<div class="formula-box">a² + b² = c²</div>
<p>Where <strong>c</strong> is the <em>hypotenuse</em> — always the side opposite the right angle and the longest side.</p>
<p><strong>Finding the hypotenuse:</strong> c = √(a² + b²)</p>
<p><strong>Finding a shorter side:</strong> a = √(c² − b²)</p>
<p><strong>Example:</strong> A right-angled triangle has legs 6 cm and 8 cm. Find the hypotenuse.</p>
<div class="formula-box">c = √(6² + 8²) = √(36 + 64) = √100 = 10 cm</div>
<p>Pythagoras also works in 3D — apply it twice to find diagonals of cuboids.</p>`,
        quickCheck: {
          question: "A right-angled triangle has legs 5 cm and 12 cm. What is the hypotenuse?",
          options: ["10 cm", "11 cm", "13 cm", "17 cm"],
          correct: 2,
          explanation: "c = √(5² + 12²) = √(25 + 144) = √169 = 13 cm. A classic 5-12-13 Pythagorean triple.",
        },
      },
      {
        title: "Trigonometry — SOH CAH TOA",
        content: `<p>Trigonometry links the angles and sides of <strong>right-angled triangles</strong>. Label the sides first:</p>
<ul>
  <li><strong>Hypotenuse (H)</strong> — opposite the right angle, always longest</li>
  <li><strong>Opposite (O)</strong> — the side opposite the angle you are using</li>
  <li><strong>Adjacent (A)</strong> — the side next to the angle you are using</li>
</ul>
<div class="formula-box">sin θ = O/H &nbsp;|&nbsp; cos θ = A/H &nbsp;|&nbsp; tan θ = O/A</div>
<p>Memory aid: <strong>SOH CAH TOA</strong></p>
<p><strong>Finding a side:</strong> Rearrange the formula. E.g. if sin 30° = x/10, then x = 10 × sin 30° = 5.</p>
<p><strong>Finding an angle:</strong> Use inverse trig. E.g. if sin θ = 0.5, then θ = sin⁻¹(0.5) = 30°.</p>
<p>For non-right-angled triangles at IGCSE, you may need the <strong>Sine Rule</strong> or <strong>Cosine Rule</strong>.</p>`,
        quickCheck: {
          question: "In a right-angled triangle, the angle is 40°, the hypotenuse is 15 cm. Which formula gives the opposite side?",
          options: ["Opposite = 15 × cos 40°", "Opposite = 15 × sin 40°", "Opposite = 15 × tan 40°", "Opposite = 15 ÷ sin 40°"],
          correct: 1,
          explanation: "sin θ = O/H, so O = H × sin θ = 15 × sin 40°. SOH: sin = Opposite over Hypotenuse.",
        },
      },
    ],
    relatedTopics: [
      { id: "algebra", name: "Algebra", subjectId: "maths" },
      { id: "statistics", name: "Statistics & Probability", subjectId: "maths" },
      { id: "number", name: "Number", subjectId: "maths" },
    ],
  },

  "statistics": {
    id: "statistics",
    subjectId: "maths",
    subjectName: "Mathematics",
    topicId: "statistics",
    topicName: "Statistics & Probability",
    title: "Statistics & Probability — Complete Guide",
    estimatedMinutes: 28,
    xpReward: 38,
    keyPoints: [
      "Mean = sum of values ÷ number of values; Median = middle value; Mode = most frequent",
      "Histograms use frequency density = frequency ÷ class width",
      "Box plots show: minimum, Q1, median, Q3, maximum",
      "For mutually exclusive events: P(A or B) = P(A) + P(B)",
      "Positive correlation: as x increases, y increases; negative: as x increases, y decreases",
    ],
    sections: [
      {
        title: "Averages — Mean, Median, Mode & Range",
        content: `<p>Averages summarise a data set. Know all three and when to use them:</p>
<ul>
  <li><strong>Mean:</strong> Add all values and divide by the count. Most commonly used, but affected by extreme values (outliers).</li>
  <li><strong>Median:</strong> Order the data, find the middle value. For n values, the median is at position (n+1)/2. Not affected by outliers.</li>
  <li><strong>Mode:</strong> The value that appears most often. Data can have no mode, one mode, or more than one.</li>
  <li><strong>Range:</strong> Maximum − Minimum. Measures spread, not an average.</li>
</ul>
<div class="formula-box">Mean = Σx / n &nbsp;|&nbsp; Median = value at position (n+1)/2</div>
<p><strong>For grouped data:</strong> Use midpoints of each class interval to estimate the mean: Mean ≈ Σ(midpoint × frequency) ÷ Σfrequency.</p>
<p><strong>Choosing the right average:</strong> Mean for symmetric data, Median when outliers exist, Mode for categorical data.</p>`,
        quickCheck: {
          question: "Find the median of: 3, 7, 2, 9, 5, 1, 8",
          options: ["5", "6", "7", "3.5"],
          correct: 0,
          explanation: "Order the data: 1, 2, 3, 5, 7, 8, 9. There are 7 values, so the median is at position (7+1)/2 = 4th value = 5.",
        },
      },
      {
        title: "Frequency Tables & Histograms",
        content: `<p><strong>Frequency tables</strong> organise data into class intervals, showing how many values fall in each group.</p>
<p><strong>Histograms</strong> are like bar charts but for continuous data. Key difference: bars touch each other.</p>
<div class="formula-box">Frequency Density = Frequency ÷ Class Width</div>
<p>The <em>y-axis</em> of a histogram always shows <strong>Frequency Density</strong>, not frequency. The area of each bar represents frequency.</p>
<p><strong>Reading a histogram:</strong> Frequency = Frequency Density × Class Width. To find the number of values in a class, multiply the bar height by the bar width.</p>
<p><strong>Example:</strong> A bar from 10 to 20 (width = 10) has frequency density 3. Frequency = 3 × 10 = 30 values in that class.</p>`,
        quickCheck: {
          question: "A histogram bar spans from 20 to 30 and has a frequency density of 4. How many values are in this class?",
          options: ["4", "10", "40", "24"],
          correct: 2,
          explanation: "Frequency = Frequency Density × Class Width = 4 × (30 − 20) = 4 × 10 = 40.",
        },
      },
      {
        title: "Box Plots & Cumulative Frequency",
        content: `<p>A <strong>cumulative frequency graph</strong> plots running totals. It's used to estimate the median and quartiles.</p>
<ul>
  <li><strong>Median</strong> — read off at ½ × total frequency</li>
  <li><strong>Lower Quartile (Q1)</strong> — at ¼ × total frequency</li>
  <li><strong>Upper Quartile (Q3)</strong> — at ¾ × total frequency</li>
  <li><strong>Interquartile Range (IQR)</strong> = Q3 − Q1</li>
</ul>
<p>A <strong>box plot (box-and-whisker diagram)</strong> shows five key values:</p>
<div class="formula-box">Minimum | Q1 | Median | Q3 | Maximum</div>
<p>The box spans from Q1 to Q3 (showing the IQR). Whiskers extend to the minimum and maximum. The IQR shows where the middle 50% of data lies.</p>
<p>Box plots allow easy comparison between two data sets — compare medians and IQRs.</p>`,
        quickCheck: {
          question: "In a box plot, Q1 = 15 and Q3 = 35. What is the Interquartile Range?",
          options: ["15", "20", "35", "50"],
          correct: 1,
          explanation: "IQR = Q3 − Q1 = 35 − 15 = 20. The IQR represents the spread of the middle 50% of the data.",
        },
      },
      {
        title: "Probability & Tree Diagrams",
        content: `<p>Probability measures how likely an event is — always between 0 and 1.</p>
<div class="formula-box">P(event) = number of favourable outcomes ÷ total outcomes</div>
<p><strong>Key rules:</strong></p>
<ul>
  <li>P(not A) = 1 − P(A)</li>
  <li><strong>Mutually exclusive events</strong> (can't both happen): P(A or B) = P(A) + P(B)</li>
  <li><strong>Independent events</strong> (one doesn't affect the other): P(A and B) = P(A) × P(B)</li>
</ul>
<p><strong>Tree diagrams</strong> help with two or more events. Multiply along branches to find the probability of combined outcomes. Add the relevant branch probabilities for "or" situations.</p>
<p><strong>Without replacement:</strong> When drawing two items without replacing the first, the second probability changes — adjust the denominator.</p>`,
        quickCheck: {
          question: "A bag has 3 red and 5 blue balls. Two balls are drawn without replacement. What is P(both red)?",
          options: ["9/64", "3/28", "6/64", "3/8"],
          correct: 1,
          explanation: "P(first red) = 3/8. After removing one red, P(second red) = 2/7. P(both red) = 3/8 × 2/7 = 6/56 = 3/28.",
        },
      },
      {
        title: "Scatter Graphs & Correlation",
        content: `<p>Scatter graphs show the relationship between two variables. Each point represents one pair of values.</p>
<p><strong>Types of correlation:</strong></p>
<ul>
  <li><strong>Positive correlation:</strong> As x increases, y increases. Points slope upward. Example: height vs shoe size.</li>
  <li><strong>Negative correlation:</strong> As x increases, y decreases. Points slope downward. Example: altitude vs temperature.</li>
  <li><strong>No correlation:</strong> No obvious pattern. Example: shoe size vs exam score.</li>
</ul>
<p>Correlation can be <strong>strong</strong> (points close to the line) or <strong>weak</strong> (points spread out).</p>
<p><strong>Line of best fit:</strong> Draw a straight line through the middle of the data (roughly equal numbers of points on each side). Use it to make predictions.</p>
<div class="formula-box">Important: Correlation does NOT mean causation!</div>`,
        quickCheck: {
          question: "As the number of hours studied increases, exam scores increase. What type of correlation is this?",
          options: ["Negative correlation", "No correlation", "Positive correlation", "Inverse correlation"],
          correct: 2,
          explanation: "When both variables increase together, it's positive correlation. The scatter graph points would slope upward from left to right.",
        },
      },
    ],
    relatedTopics: [
      { id: "algebra", name: "Algebra", subjectId: "maths" },
      { id: "geometry", name: "Geometry & Measures", subjectId: "maths" },
      { id: "number", name: "Number", subjectId: "maths" },
    ],
  },

  "reading-skills": {
    id: "reading-skills",
    subjectId: "english-lang",
    subjectName: "English Language",
    topicId: "reading-skills",
    topicName: "Reading Skills",
    title: "Inference and Implicit Meaning",
    estimatedMinutes: 18,
    xpReward: 25,
    keyPoints: [
      "Inference means reading between the lines — finding meaning not directly stated",
      "Use evidence (quotations) to support every inference you make",
      "Look for connotations — what a word suggests beyond its dictionary meaning",
      "Always link back to the writer's purpose and effect on the reader",
    ],
    sections: [
      {
        title: "What is Inference?",
        content: `<p><strong>Inference</strong> means drawing a conclusion from evidence that isn't directly stated in the text. It's sometimes called 'reading between the lines'.</p>
<p>When a writer says a character 'clutched the letter, hands trembling', they don't explicitly say the character is nervous — but we <em>infer</em> it from those details.</p>
<p>In GCSE exams, questions like <em>"What do you infer about..."</em> or <em>"What impressions do you get..."</em> require you to make inferences supported by evidence.</p>`,
        quickCheck: {
          question: "A text reads: 'She glanced at the door three times before speaking.' What can we infer?",
          options: [
            "She is bored",
            "She is anxious or cautious about being overheard",
            "She wants to leave the room",
            "She is checking the time",
          ],
          correct: 1,
          explanation: "The repeated glancing at the door suggests she is nervous or cautious — perhaps worried someone might enter or hear her.",
        },
      },
      {
        title: "Using Textual Evidence",
        content: `<p>Every inference you make must be backed up by a <strong>quotation or reference</strong> from the text. This is the P-E-E structure:</p>
<ul>
  <li><strong>Point</strong> — the inference or idea you want to make</li>
  <li><strong>Evidence</strong> — a short, precise quotation from the text</li>
  <li><strong>Explanation</strong> — how the evidence supports your point</li>
</ul>
<p><strong>Weak answer:</strong> "The character seems nervous."</p>
<p><strong>Strong answer:</strong> "The character appears nervous, as suggested by 'hands trembling', which implies she is struggling to maintain her composure."</p>`,
        quickCheck: {
          question: "Which answer best uses P-E-E structure?",
          options: [
            "The mood is tense and scary.",
            "The writer uses lots of description to create atmosphere.",
            "The setting feels threatening, shown by 'the shadows clung to every corner', suggesting darkness consumes the space.",
            "There is tension in the story because bad things happen.",
          ],
          correct: 2,
          explanation: "Option 3 makes a clear point, embeds a precise quotation, and explains how it creates the effect — that's strong P-E-E technique.",
        },
      },
      {
        title: "Connotations and Word Choice",
        content: `<p><strong>Connotations</strong> are the extra layers of meaning a word carries beyond its literal definition. Writers choose words deliberately for their connotations.</p>
<p>For example, 'walked' and 'skulked' both describe movement, but 'skulked' connotes secrecy, shame, or guilt. That choice tells us something about the character.</p>
<p>When analysing, ask yourself: <em>Why did the writer choose this specific word? What does it suggest?</em></p>
<div class="formula-box">Technique → Quotation → Effect on reader</div>`,
        quickCheck: {
          question: "The writer describes a building as 'looming'. What connotations does this word carry?",
          options: ["Warmth and safety", "Smallness and fragility", "Menace, threat, or oppressiveness", "Age and history"],
          correct: 2,
          explanation: "'Looming' suggests something large and threatening hanging over the character — it creates a sense of danger or oppressive power.",
        },
      },
      {
        title: "Writer's Purpose and Effect",
        content: `<p>Always think about the <strong>writer's purpose</strong> — why they wrote what they wrote — and the <strong>effect on the reader</strong>.</p>
<p>Common purposes: to inform, to persuade, to entertain, to shock, to create sympathy, to build tension.</p>
<p>Sentence starters that show sophisticated analysis:</p>
<ul>
  <li>"The writer uses... to suggest..."</li>
  <li>"This creates a sense of... for the reader..."</li>
  <li>"The effect of this is..."</li>
  <li>"This could imply that the writer wants the reader to feel..."</li>
</ul>`,
        quickCheck: {
          question: "Which phrase best links language to effect on the reader?",
          options: [
            "The writer uses a metaphor.",
            "There is a metaphor in the text.",
            "The metaphor 'iron fist' implies ruthless control, causing the reader to feel uneasy about the character's power.",
            "The writer uses a metaphor to make it more interesting.",
          ],
          correct: 2,
          explanation: "Option 3 identifies the technique, uses the quotation, and explains the specific effect on the reader — this is what examiners reward.",
        },
      },
    ],
    relatedTopics: [
      { id: "writing-skills", name: "Writing Skills", subjectId: "english-lang" },
      { id: "language-techniques", name: "Language Techniques", subjectId: "english-lang" },
      { id: "macbeth", name: "Macbeth", subjectId: "english-lit" },
    ],
  },

  "macbeth": {
    id: "macbeth",
    subjectId: "english-lit",
    subjectName: "English Literature",
    topicId: "macbeth",
    topicName: "Macbeth",
    title: "Ambition and Power in Macbeth",
    estimatedMinutes: 22,
    xpReward: 30,
    keyPoints: [
      "Macbeth's ambition is the primary driver of the tragedy",
      "Lady Macbeth manipulates Macbeth by questioning his masculinity",
      "The witches represent fate vs. free will — a key debate in the play",
      "Shakespeare wrote for a Jacobean audience who feared regicide",
    ],
    sections: [
      {
        title: "Context: Why Ambition Matters",
        content: `<p>Shakespeare wrote Macbeth around <strong>1606</strong>, shortly after the <em>Gunpowder Plot</em> — a failed attempt to assassinate King James I. Regicide (killing a king) was the ultimate crime in Jacobean England.</p>
<p>This context is crucial: Shakespeare's audience would have been horrified by Macbeth's ambition because it leads to the murder of a king. The play was partly a warning about unchecked ambition.</p>
<p>King James I was also fascinated by witchcraft, making the witches especially significant to a contemporary audience.</p>`,
        quickCheck: {
          question: "Why would a Jacobean audience find Macbeth's actions particularly shocking?",
          options: [
            "He is a soldier",
            "He murders a king, which was seen as the worst possible crime",
            "He listens to the witches",
            "He is brave in battle",
          ],
          correct: 1,
          explanation: "Regicide was considered a crime against God and the natural order in Jacobean England — especially sensitive after the 1605 Gunpowder Plot.",
        },
      },
      {
        title: "Macbeth's Ambition — Key Quotations",
        content: `<p>Macbeth is <strong>brave and loyal</strong> at the start of the play, but his 'vaulting ambition' overrides his moral conscience.</p>
<p>Key quote: <em>"I have no spur / To prick the sides of my intent, but only / Vaulting ambition, which o'erleaps itself"</em> (Act 1, Scene 7)</p>
<p>Macbeth <strong>knows</strong> his only motive is ambition — there is no just reason for murder. The metaphor of a horse 'vaulting' too high suggests ambition that goes beyond control and leads to a fall.</p>
<p>This self-awareness makes Macbeth a tragic figure: unlike a villain, he understands the evil he's doing.</p>`,
        quickCheck: {
          question: "What does the metaphor 'vaulting ambition, which o'erleaps itself' suggest?",
          options: [
            "Macbeth is physically strong",
            "Ambition that overreaches and causes its own downfall",
            "Macbeth wants to ride a horse",
            "His ambition is admirable and controlled",
          ],
          correct: 1,
          explanation: "The image of a horse jumping too high and falling on the other side suggests ambition that goes too far and ultimately destroys itself — foreshadowing Macbeth's fate.",
        },
      },
      {
        title: "Lady Macbeth — The Greater Ambition?",
        content: `<p>Lady Macbeth is arguably more ambitious than Macbeth in Act 1. She calls on spirits to <em>"unsex me here"</em> and fill her with cruelty — she wants to suppress her femininity to commit murder.</p>
<p>She manipulates Macbeth by attacking his masculinity: <em>"When you durst do it, then you were a man."</em></p>
<p>However, by Act 5, the roles have reversed. Lady Macbeth is destroyed by guilt (the sleepwalking scene), while Macbeth has become desensitised to violence.</p>
<p>Shakespeare seems to suggest that ambition without conscience leads to psychological destruction.</p>`,
        quickCheck: {
          question: "How does Lady Macbeth persuade Macbeth to commit murder?",
          options: [
            "She threatens him with the witches",
            "She tells him he will become king peacefully",
            "She questions his masculinity and bravery",
            "She says he has no choice",
          ],
          correct: 2,
          explanation: "Lady Macbeth knows her husband's weakness — his pride in his masculinity. She says he was only brave when he planned the murder, implying cowardice if he backs out.",
        },
      },
      {
        title: "How to Structure an Essay Response",
        content: `<p>For a 30-mark Macbeth essay, structure is everything. A strong response has:</p>
<ul>
  <li><strong>Introduction</strong>: State your overall argument — don't just repeat the question</li>
  <li><strong>Paragraph 1</strong>: First key point with quotation and analysis</li>
  <li><strong>Paragraph 2</strong>: Second point — perhaps with an alternative view</li>
  <li><strong>Paragraph 3</strong>: Context (Jacobean values, Shakespeare's intentions)</li>
  <li><strong>Conclusion</strong>: Summarise and give your overall judgement</li>
</ul>
<div class="formula-box">Point → Quotation → Analysis → Context → Link back</div>`,
        quickCheck: {
          question: "What should you always include alongside a quotation in a literature essay?",
          options: [
            "The act and scene number only",
            "Just the quotation, nothing else",
            "Analysis of language, technique, and effect on the reader",
            "A retelling of what happens next in the story",
          ],
          correct: 2,
          explanation: "Quotations alone get no marks — you must analyse the specific language, identify the technique, and explain the effect on the reader or audience.",
        },
      },
    ],
    relatedTopics: [
      { id: "jekyll-hyde", name: "Jekyll & Hyde", subjectId: "english-lit" },
      { id: "aqa-anthology", name: "Poetry Anthology", subjectId: "english-lit" },
      { id: "reading-skills", name: "Reading Skills", subjectId: "english-lang" },
    ],
  },

  "cell-biology": {
    id: "cell-biology",
    subjectId: "biology",
    subjectName: "Biology",
    topicId: "cell-biology",
    topicName: "Cell Biology",
    title: "Cell Structure and Function",
    estimatedMinutes: 18,
    xpReward: 25,
    keyPoints: [
      "Eukaryotic cells (animals/plants) have a nucleus; prokaryotic (bacteria) do not",
      "Plant cells have a cell wall, chloroplasts, and a permanent vacuole",
      "The cell membrane controls what enters and leaves the cell",
      "Mitochondria produce ATP through respiration — the cell's energy currency",
    ],
    sections: [
      {
        title: "Animal vs Plant Cells",
        content: `<p>All living things are made of <strong>cells</strong>. There are two main types at GCSE:</p>
<p><strong>Animal cells</strong> contain: nucleus, cytoplasm, cell membrane, mitochondria, ribosomes.</p>
<p><strong>Plant cells</strong> contain: all of the above PLUS a cell wall (made of cellulose), chloroplasts (for photosynthesis), and a permanent vacuole filled with cell sap.</p>
<p>Both are <em>eukaryotic</em> — they have a proper nucleus surrounded by a nuclear membrane.</p>`,
        quickCheck: {
          question: "Which structure is found in plant cells but NOT in animal cells?",
          options: ["Nucleus", "Mitochondria", "Chloroplasts", "Ribosomes"],
          correct: 2,
          explanation: "Chloroplasts are only found in plant cells (and some algae). They contain chlorophyll and are the site of photosynthesis.",
        },
      },
      {
        title: "The Role of Organelles",
        content: `<p>Each part of a cell has a specific function:</p>
<ul>
  <li><strong>Nucleus</strong> — contains DNA (genetic instructions); controls cell activity</li>
  <li><strong>Mitochondria</strong> — site of aerobic respiration; produces ATP (energy)</li>
  <li><strong>Ribosomes</strong> — where proteins are made (protein synthesis)</li>
  <li><strong>Cell membrane</strong> — controls movement of substances in and out</li>
  <li><strong>Vacuole</strong> — stores water and maintains turgor pressure in plants</li>
</ul>`,
        quickCheck: {
          question: "Where does aerobic respiration take place in a cell?",
          options: ["Nucleus", "Ribosomes", "Vacuole", "Mitochondria"],
          correct: 3,
          explanation: "Mitochondria are the site of aerobic respiration, where glucose and oxygen are converted into ATP (energy), carbon dioxide, and water.",
        },
      },
      {
        title: "Prokaryotic Cells — Bacteria",
        content: `<p><strong>Prokaryotic cells</strong> (like bacteria) are much simpler than eukaryotic cells:</p>
<ul>
  <li>No true nucleus — DNA floats freely in the cytoplasm as a loop</li>
  <li>No membrane-bound organelles</li>
  <li>Have a cell wall (but made of peptidoglycan, not cellulose)</li>
  <li>Much smaller — typically 1–10 micrometres</li>
  <li>May have a flagellum for movement and plasmids (small extra DNA rings)</li>
</ul>
<div class="formula-box">Eukaryotic = membrane-bound nucleus | Prokaryotic = no nucleus</div>`,
        quickCheck: {
          question: "How does a bacterial cell differ from a plant cell?",
          options: [
            "Bacteria have mitochondria; plants do not",
            "Bacteria have no nucleus; plant cells have a true nucleus",
            "Bacteria have chloroplasts; plants do not",
            "Bacteria have a vacuole; plants do not",
          ],
          correct: 1,
          explanation: "The key difference is that bacteria are prokaryotes — their DNA is not enclosed in a nucleus. Plants are eukaryotes with a proper membrane-bound nucleus.",
        },
      },
    ],
    relatedTopics: [
      { id: "organisation", name: "Organisation", subjectId: "biology" },
      { id: "bioenergetics", name: "Bioenergetics", subjectId: "biology" },
      { id: "atomic-structure", name: "Atomic Structure", subjectId: "chemistry" },
    ],
  },

  "atomic-structure": {
    id: "atomic-structure",
    subjectId: "chemistry",
    subjectName: "Chemistry",
    topicId: "atomic-structure",
    topicName: "Atomic Structure",
    title: "Atoms, Isotopes & the Periodic Table",
    estimatedMinutes: 16,
    xpReward: 25,
    keyPoints: [
      "An atom has a nucleus (protons + neutrons) with electrons in shells",
      "Atomic number = number of protons; mass number = protons + neutrons",
      "Isotopes are atoms of the same element with different numbers of neutrons",
      "The periodic table is ordered by atomic number",
    ],
    sections: [
      {
        title: "Structure of the Atom",
        content: `<p>An atom is made of three types of subatomic particles:</p>
<ul>
  <li><strong>Protons</strong> — positive charge (+1), found in the nucleus, mass = 1</li>
  <li><strong>Neutrons</strong> — no charge (0), found in the nucleus, mass = 1</li>
  <li><strong>Electrons</strong> — negative charge (−1), orbit the nucleus in shells, mass ≈ 0</li>
</ul>
<p>The <strong>atomic number</strong> is the number of protons. In a neutral atom, protons = electrons.</p>
<div class="formula-box">Mass number = Protons + Neutrons</div>`,
        quickCheck: {
          question: "An atom has atomic number 8 and mass number 16. How many neutrons does it have?",
          options: ["6", "8", "16", "24"],
          correct: 1,
          explanation: "Neutrons = Mass number − Atomic number = 16 − 8 = 8. This is an oxygen atom.",
        },
      },
      {
        title: "Isotopes",
        content: `<p><strong>Isotopes</strong> are atoms of the same element that have the <em>same number of protons</em> but <em>different numbers of neutrons</em>.</p>
<p>They have the same atomic number but different mass numbers.</p>
<p>For example, Carbon-12 and Carbon-14 are both carbon (6 protons), but Carbon-12 has 6 neutrons while Carbon-14 has 8 neutrons.</p>
<p>Isotopes have the same <strong>chemical properties</strong> (same electrons) but different <strong>physical properties</strong> (different masses).</p>`,
        quickCheck: {
          question: "Two atoms are isotopes of each other. What must be true?",
          options: [
            "Same number of neutrons, different protons",
            "Same number of protons, different neutrons",
            "Same mass number, different atomic number",
            "Different elements entirely",
          ],
          correct: 1,
          explanation: "Isotopes have the same atomic number (same element = same protons) but different mass numbers (different neutrons). Same element, different mass.",
        },
      },
      {
        title: "The Periodic Table",
        content: `<p>The <strong>Periodic Table</strong> arranges elements in order of increasing <em>atomic number</em>.</p>
<ul>
  <li><strong>Groups</strong> (vertical columns) — elements with the same number of outer electrons; similar chemical properties</li>
  <li><strong>Periods</strong> (horizontal rows) — elements with the same number of electron shells</li>
  <li><strong>Group 1</strong>: Alkali metals (very reactive) | <strong>Group 7</strong>: Halogens | <strong>Group 0</strong>: Noble gases (unreactive)</li>
</ul>
<p>Elements in the same group react similarly because they have the same number of electrons in their outer shell.</p>`,
        quickCheck: {
          question: "Why do elements in the same group of the periodic table have similar chemical properties?",
          options: [
            "They have the same mass number",
            "They are all metals",
            "They have the same number of electrons in their outer shell",
            "They have the same number of neutrons",
          ],
          correct: 2,
          explanation: "Chemical properties depend on the outer (valence) electrons. Elements in the same group all have the same number of outer electrons, so they react in similar ways.",
        },
      },
    ],
    relatedTopics: [
      { id: "bonding", name: "Bonding", subjectId: "chemistry" },
      { id: "quantitative", name: "Quantitative Chemistry", subjectId: "chemistry" },
      { id: "cell-biology", name: "Cell Biology", subjectId: "biology" },
    ],
  },

  "forces": {
    id: "forces",
    subjectId: "physics",
    subjectName: "Physics",
    topicId: "forces",
    topicName: "Forces",
    title: "Newton's Laws of Motion",
    estimatedMinutes: 20,
    xpReward: 28,
    keyPoints: [
      "Newton's First Law: an object stays at rest or in uniform motion unless acted on by a resultant force",
      "Newton's Second Law: F = ma (force = mass × acceleration)",
      "Newton's Third Law: every action has an equal and opposite reaction",
      "Weight is a force: W = mg (mass × gravitational field strength)",
    ],
    sections: [
      {
        title: "Newton's First Law",
        content: `<p><strong>Newton's First Law:</strong> An object will remain at rest, or continue moving at constant velocity, unless acted upon by a resultant (unbalanced) force.</p>
<p>This is sometimes called the <em>law of inertia</em>. An object resists changes to its motion.</p>
<p>Examples: A book sitting on a table (at rest, forces balanced). A spacecraft in deep space continues at the same speed and direction because there is no friction or air resistance.</p>
<p>If forces are <strong>balanced</strong> → no change in motion. If forces are <strong>unbalanced</strong> → acceleration.</p>`,
        quickCheck: {
          question: "A car travels at 30 m/s on a motorway. The engine force equals air resistance. What happens?",
          options: [
            "The car accelerates",
            "The car decelerates",
            "The car continues at 30 m/s",
            "The car stops immediately",
          ],
          correct: 2,
          explanation: "When resultant force = 0 (engine force = air resistance), by Newton's First Law the car continues at constant velocity — no change in motion.",
        },
      },
      {
        title: "Newton's Second Law — F = ma",
        content: `<p><strong>Newton's Second Law:</strong> The resultant force on an object is equal to its mass multiplied by its acceleration.</p>
<div class="formula-box">F = ma</div>
<p>Where F = Force (Newtons, N), m = mass (kg), a = acceleration (m/s²)</p>
<p><strong>Example:</strong> A 1200 kg car accelerates at 3 m/s². What is the resultant force?</p>
<div class="formula-box">F = 1200 × 3 = 3600 N</div>
<p>You can rearrange: <strong>a = F/m</strong> or <strong>m = F/a</strong>. Always check units!</p>`,
        quickCheck: {
          question: "A resultant force of 500 N acts on a 50 kg object. What is the acceleration?",
          options: ["10 m/s²", "25,000 m/s²", "0.1 m/s²", "450 m/s²"],
          correct: 0,
          explanation: "a = F/m = 500 ÷ 50 = 10 m/s². Newton's Second Law rearranged.",
        },
      },
      {
        title: "Weight vs Mass",
        content: `<p><strong>Mass</strong> is the amount of matter in an object — it never changes (measured in kg).</p>
<p><strong>Weight</strong> is a <em>force</em> caused by gravity pulling on a mass — it changes depending on the gravitational field strength (measured in Newtons, N).</p>
<div class="formula-box">W = mg</div>
<p>On Earth, g ≈ 9.8 N/kg (often rounded to 10 N/kg in calculations).</p>
<p><strong>Example:</strong> A person has mass 70 kg. Their weight on Earth = 70 × 9.8 = <strong>686 N</strong>. On the Moon (g ≈ 1.6 N/kg), their weight = 70 × 1.6 = <strong>112 N</strong>.</p>`,
        quickCheck: {
          question: "An astronaut has mass 80 kg. What is their weight on Earth? (g = 10 N/kg)",
          options: ["8 N", "80 N", "800 N", "8000 N"],
          correct: 2,
          explanation: "W = mg = 80 × 10 = 800 N. Note: mass stays 80 kg everywhere, but weight changes with gravitational field strength.",
        },
      },
    ],
    relatedTopics: [
      { id: "waves", name: "Waves", subjectId: "physics" },
      { id: "electricity", name: "Electricity", subjectId: "physics" },
      { id: "atomic-structure", name: "Atomic Structure", subjectId: "chemistry" },
    ],
  },

  "weimar-nazis": {
    id: "weimar-nazis",
    subjectId: "history",
    subjectName: "History",
    topicId: "weimar-nazis",
    topicName: "Weimar & Nazi Germany",
    title: "The Rise of Hitler and the Nazi Party",
    estimatedMinutes: 22,
    xpReward: 28,
    keyPoints: [
      "The Weimar Republic was established after WWI and faced enormous challenges",
      "Hyperinflation (1923) and the Great Depression (1929) created political instability",
      "Hitler exploited German resentment over the Treaty of Versailles",
      "The Nazis used propaganda, fear, and democratic weaknesses to seize power by 1933",
    ],
    sections: [
      {
        title: "Weimar Republic — Problems from Birth",
        content: `<p>The <strong>Weimar Republic</strong> (1919–1933) was Germany's first democratic government, established after defeat in WWI.</p>
<p>It faced problems immediately:</p>
<ul>
  <li>The <strong>Treaty of Versailles</strong> (1919) imposed humiliating terms: Germany lost territory, paid reparations of £6.6 billion, and accepted sole blame for WWI ('War Guilt Clause')</li>
  <li>Many Germans called Weimar leaders the 'November Criminals' for signing the armistice</li>
  <li>Proportional representation made it hard to form stable governments</li>
</ul>`,
        quickCheck: {
          question: "What was the 'War Guilt Clause' in the Treaty of Versailles?",
          options: [
            "Germany was allowed to keep its army",
            "Germany accepted sole responsibility for WWI",
            "Germany received financial help from the Allies",
            "Germany was given back lost territory",
          ],
          correct: 1,
          explanation: "Article 231 forced Germany to accept blame for WWI — used to justify reparations. This caused huge resentment among Germans, which the Nazis later exploited.",
        },
      },
      {
        title: "Hitler's Rise — Key Factors",
        content: `<p>Hitler became Chancellor in <strong>January 1933</strong>. Several factors enabled this:</p>
<ul>
  <li><strong>Economic crisis</strong>: The Great Depression (1929) caused mass unemployment — 6 million Germans out of work by 1932</li>
  <li><strong>Propaganda</strong>: Goebbels masterminded Nazi messaging; Hitler was portrayed as Germany's saviour</li>
  <li><strong>Fear</strong>: The SA (Stormtroopers) intimidated voters and opponents</li>
  <li><strong>Communist threat</strong>: Middle-class Germans feared a communist revolution — they saw the Nazis as protection</li>
  <li><strong>Political deals</strong>: Hindenburg appointed Hitler Chancellor, believing he could control him</li>
</ul>`,
        quickCheck: {
          question: "Why did many middle-class Germans support the Nazis in the early 1930s?",
          options: [
            "They agreed with Nazi racial policies",
            "They feared a communist takeover and wanted stability",
            "They were all unemployed",
            "They liked Hitler personally",
          ],
          correct: 1,
          explanation: "The Nazi Party positioned itself as a defence against communism. Middle-class Germans, who had savings and businesses to protect, feared a communist revolution more than the Nazis.",
        },
      },
      {
        title: "Consolidating Power — 1933",
        content: `<p>Once Chancellor, Hitler rapidly consolidated total power:</p>
<ul>
  <li><strong>Reichstag Fire</strong> (February 1933) — blamed on communists; used to pass the Reichstag Fire Decree, suspending civil liberties</li>
  <li><strong>Enabling Act</strong> (March 1933) — gave Hitler power to pass laws without the Reichstag; effectively ended democracy</li>
  <li><strong>Night of the Long Knives</strong> (1934) — Hitler eliminated rivals within his own party (SA leaders)</li>
  <li>When Hindenburg died (1934), Hitler merged the roles of Chancellor and President — becoming <em>Führer</em></li>
</ul>`,
        quickCheck: {
          question: "What was the significance of the Enabling Act (1933)?",
          options: [
            "It gave women the right to vote",
            "It allowed Hitler to pass laws without the Reichstag, ending democracy",
            "It started the rearmament programme",
            "It banned the Nazi Party",
          ],
          correct: 1,
          explanation: "The Enabling Act was the legal foundation of Nazi dictatorship. It allowed Hitler to govern by decree, bypassing the democratic parliament entirely.",
        },
      },
    ],
    relatedTopics: [
      { id: "cold-war", name: "Cold War 1945–1991", subjectId: "history" },
      { id: "medicine", name: "Medicine Through Time", subjectId: "history" },
      { id: "social-influence", name: "Social Influence", subjectId: "psychology" },
    ],
  },

  "programming": {
    id: "programming",
    subjectId: "computer-science",
    subjectName: "Computer Science",
    topicId: "programming",
    topicName: "Programming",
    title: "Variables, Data Types & Selection",
    estimatedMinutes: 20,
    xpReward: 28,
    keyPoints: [
      "Variables store data values that can change during a program",
      "Data types: integer, float, string, boolean, char",
      "Selection (if/elif/else) controls the flow of a program",
      "Comparison operators: ==, !=, >, <, >=, <=",
    ],
    sections: [
      {
        title: "Variables and Data Types",
        content: `<p>A <strong>variable</strong> is a named storage location in memory that holds a value. The value can change as the program runs.</p>
<p>Common <strong>data types</strong> in GCSE:</p>
<ul>
  <li><strong>Integer</strong> — whole numbers: 5, −12, 0</li>
  <li><strong>Float / Real</strong> — decimal numbers: 3.14, −0.5</li>
  <li><strong>String</strong> — text (in quotes): "Hello", "Year 11"</li>
  <li><strong>Boolean</strong> — True or False only</li>
  <li><strong>Char</strong> — a single character: 'A', '9'</li>
</ul>
<div class="formula-box">name = "Alice" | age = 16 | score = 9.5 | passed = True</div>`,
        quickCheck: {
          question: "What data type would you use to store a student's exam score like 87.5?",
          options: ["Integer", "Boolean", "Float / Real", "String"],
          correct: 2,
          explanation: "87.5 is a decimal number, so it should be stored as a Float (also called Real). An integer would lose the decimal part.",
        },
      },
      {
        title: "Selection — If Statements",
        content: `<p><strong>Selection</strong> allows a program to make decisions. We use <strong>if / elif / else</strong> statements.</p>
<div class="formula-box">if score >= 70:\n    print("Pass")\nelif score >= 40:\n    print("Near miss")\nelse:\n    print("Fail")</div>
<p>The program checks each condition in order. The first true condition runs its block; the rest are skipped.</p>
<p>Comparison operators: <strong>==</strong> (equals), <strong>!=</strong> (not equal), <strong>&gt;</strong>, <strong>&lt;</strong>, <strong>&gt;=</strong>, <strong>&lt;=</strong></p>
<p>Note: Use <strong>==</strong> to compare (not = which assigns a value).</p>`,
        quickCheck: {
          question: "What will the following print if age = 17?\nif age >= 18:\n    print('Adult')\nelse:\n    print('Minor')",
          options: ["Adult", "Minor", "Nothing", "Error"],
          correct: 1,
          explanation: "17 is not >= 18, so the condition is False. The else block runs, printing 'Minor'.",
        },
      },
      {
        title: "Nested Conditions and Logical Operators",
        content: `<p>You can combine conditions using <strong>logical operators</strong>:</p>
<ul>
  <li><strong>AND</strong> — both conditions must be true</li>
  <li><strong>OR</strong> — at least one condition must be true</li>
  <li><strong>NOT</strong> — reverses the condition</li>
</ul>
<div class="formula-box">if age >= 16 AND hasID == True:\n    print("Entry allowed")</div>
<p>You can also <strong>nest</strong> if statements inside each other for more complex logic — but keep it readable!</p>`,
        quickCheck: {
          question: "When does 'if x > 5 AND x < 10' evaluate to True?",
          options: ["When x = 5", "When x = 10", "When x = 7", "When x = 11"],
          correct: 2,
          explanation: "x must be greater than 5 AND less than 10. x = 7 satisfies both conditions. x = 5 or x = 10 fail because the conditions use strict inequality.",
        },
      },
    ],
    relatedTopics: [
      { id: "algorithms", name: "Algorithms", subjectId: "computer-science" },
      { id: "data-representation", name: "Data Representation", subjectId: "computer-science" },
      { id: "networks", name: "Networks", subjectId: "computer-science" },
    ],
  },
};

// Quiz questions per topic
export const QUIZ_QUESTIONS: Record<string, {
  id: string;
  type: "mcq" | "short-answer" | "multi-step";
  points: number;
  question: string;
  options?: string[];
  correctAnswer?: number | string;
  explanation?: string;
  steps?: { label: string; answer: string; points: number }[];
}[]> = {
  algebra: [
    { id: "a1", type: "mcq", points: 2, question: "Which of the following is a quadratic equation?", options: ["3x + 5 = 0", "x² + 4x − 7 = 0", "x³ − 2x = 0", "5x⁴ + 1 = 0"], correctAnswer: 1, explanation: "A quadratic has the highest power of x equal to 2." },
    { id: "a2", type: "mcq", points: 2, question: "What are the solutions to x² − 5x + 6 = 0?", options: ["x = 2 and x = 3", "x = −2 and x = −3", "x = 1 and x = 6", "x = −1 and x = −6"], correctAnswer: 0, explanation: "Factorising: (x − 2)(x − 3) = 0, so x = 2 or x = 3." },
    { id: "a3", type: "mcq", points: 2, question: "If the discriminant is negative, how many real solutions are there?", options: ["None", "One", "Two", "Three"], correctAnswer: 0, explanation: "A negative discriminant means the equation has no real solutions." },
    { id: "a4", type: "short-answer", points: 4, question: "Solve x² + 6x + 9 = 0. Show your working and state the number of solutions.", correctAnswer: "x = -3 (one repeated solution)", explanation: "x² + 6x + 9 = (x + 3)² = 0, so x = −3. Discriminant = 0, confirming one repeated solution." },
    { id: "a5", type: "multi-step", points: 6, question: "Use the quadratic formula to solve 2x² − 7x + 3 = 0.", steps: [{ label: "Identify a, b, c", answer: "a = 2, b = −7, c = 3", points: 1 }, { label: "Calculate discriminant b² − 4ac", answer: "49 − 24 = 25", points: 2 }, { label: "Apply quadratic formula", answer: "x = (7 ± 5) / 4", points: 1 }, { label: "State both solutions", answer: "x = 3 and x = 1/2", points: 2 }] },
    { id: "a6", type: "mcq", points: 2, question: "What does the discriminant b² − 4ac = 0 tell us?", options: ["Two distinct solutions", "One repeated solution", "No real solutions", "The equation cannot be solved"], correctAnswer: 1, explanation: "When the discriminant equals 0, there is exactly one repeated solution." },
    { id: "a7", type: "mcq", points: 2, question: "Factorise x² + 7x + 12.", options: ["(x + 3)(x + 4)", "(x + 2)(x + 6)", "(x + 1)(x + 12)", "(x + 7)(x + 5)"], correctAnswer: 0, explanation: "We need numbers that multiply to 12 and add to 7: 3 and 4. So (x + 3)(x + 4)." },
  ],
  "reading-skills": [
    { id: "rs1", type: "mcq", points: 2, question: "What does it mean to 'infer' from a text?", options: ["Copy a quotation", "Read between the lines to draw conclusions from evidence", "Summarise the plot", "Identify the writer's name"], correctAnswer: 1, explanation: "Inference means deducing meaning that isn't explicitly stated, using evidence from the text." },
    { id: "rs2", type: "mcq", points: 2, question: "A text says 'her smile never reached her eyes.' What do we infer?", options: ["She is happy", "Her smile is insincere or she is hiding sadness", "She has eye problems", "She is very tired"], correctAnswer: 1, explanation: "A smile that doesn't reach the eyes suggests it is forced or fake — implying hidden sadness or insincerity." },
    { id: "rs3", type: "short-answer", points: 4, question: "Explain the P-E-E structure and why it is important in reading responses.", correctAnswer: "Point, Evidence, Explanation — shows structured analysis", explanation: "P-E-E ensures you make a point, support it with a quotation (evidence), then explain how the evidence supports your point." },
    { id: "rs4", type: "mcq", points: 2, question: "What are connotations?", options: ["The literal dictionary meaning of a word", "The extra layers of meaning a word suggests beyond its definition", "The plot of a story", "The writer's biography"], correctAnswer: 1, explanation: "Connotations are the implied or associated meanings of a word — what it suggests beyond its literal definition." },
    { id: "rs5", type: "mcq", points: 2, question: "Which answer best shows writer's purpose?", options: ["The writer describes the setting.", "The writer uses darkness to create tension, making the reader feel uneasy about what might happen next.", "There is description in the text.", "The writer wrote this in the 19th century."], correctAnswer: 1, explanation: "Option 2 links technique (darkness), effect (tension), and reader response — showing awareness of writer's purpose." },
  ],
  macbeth: [
    { id: "m1", type: "mcq", points: 2, question: "When was Macbeth written/first performed?", options: ["Around 1606", "Around 1450", "Around 1750", "Around 1900"], correctAnswer: 0, explanation: "Macbeth was written around 1606, shortly after the Gunpowder Plot and early in James I's reign." },
    { id: "m2", type: "mcq", points: 2, question: "What does 'vaulting ambition, which o'erleaps itself' suggest about Macbeth?", options: ["He is physically strong", "His ambition is admirable", "His ambition is dangerously excessive and will cause his downfall", "He wants to be a better person"], correctAnswer: 2, explanation: "The metaphor of a horse jumping too high suggests ambition that goes beyond what is possible or safe, leading to a fall — foreshadowing Macbeth's fate." },
    { id: "m3", type: "mcq", points: 2, question: "Why does Lady Macbeth call spirits to 'unsex' her?", options: ["She wants to become a man", "She wants to suppress feminine compassion so she can commit murder", "She is performing a spell", "She wants to impress the witches"], correctAnswer: 1, explanation: "Lady Macbeth believes feminine emotions like compassion will prevent her from acting. She wants to remove 'human kindness' to go through with the murder plan." },
    { id: "m4", type: "short-answer", points: 5, question: "How does Shakespeare present ambition as destructive in Macbeth? Use one quotation and analyse the language.", correctAnswer: "Using evidence like 'vaulting ambition' with analysis of the metaphor and its implications", explanation: "A good answer should identify a technique (e.g. metaphor, imagery), embed a quotation, analyse specific word choices, and link to the theme of destructive ambition." },
    { id: "m5", type: "mcq", points: 2, question: "What is regicide?", options: ["Killing a soldier", "Killing a king or queen", "Killing a witch", "Killing an enemy in battle"], correctAnswer: 1, explanation: "Regicide means killing a king or queen. In Jacobean England, this was considered the worst possible crime — a sin against God and the natural order." },
  ],
  "cell-biology": [
    { id: "cb1", type: "mcq", points: 2, question: "Which structures are found in plant cells but NOT animal cells?", options: ["Nucleus and ribosomes", "Cell wall, chloroplasts, and permanent vacuole", "Mitochondria and cytoplasm", "Cell membrane and nucleus"], correctAnswer: 1, explanation: "Plant cells have three extra structures: cell wall (cellulose), chloroplasts (photosynthesis), and a permanent vacuole filled with cell sap." },
    { id: "cb2", type: "mcq", points: 2, question: "What is the function of mitochondria?", options: ["Protein synthesis", "Controlling the cell", "Site of aerobic respiration — producing ATP", "Photosynthesis"], correctAnswer: 2, explanation: "Mitochondria are where aerobic respiration occurs, converting glucose and oxygen into ATP (energy), CO₂ and water." },
    { id: "cb3", type: "mcq", points: 2, question: "How does a prokaryotic cell differ from a eukaryotic cell?", options: ["Prokaryotes are larger", "Prokaryotes have no membrane-bound nucleus", "Prokaryotes have chloroplasts", "Prokaryotes have more mitochondria"], correctAnswer: 1, explanation: "The defining feature of prokaryotes is having no true nucleus — DNA floats freely in the cytoplasm. Eukaryotes have DNA enclosed in a nuclear membrane." },
    { id: "cb4", type: "short-answer", points: 4, question: "Explain the role of the cell membrane in a cell.", correctAnswer: "Controls what enters and leaves the cell; partially permeable", explanation: "The cell membrane is partially permeable, controlling the movement of substances into and out of the cell by diffusion, osmosis, and active transport." },
    { id: "cb5", type: "mcq", points: 2, question: "What do ribosomes do?", options: ["Produce energy", "Make proteins", "Store water", "Control cell division"], correctAnswer: 1, explanation: "Ribosomes are the site of protein synthesis. They read the instructions from mRNA and assemble amino acids into proteins." },
  ],
  "atomic-structure": [
    { id: "as1", type: "mcq", points: 2, question: "An atom has atomic number 11 and mass number 23. How many neutrons does it have?", options: ["11", "12", "23", "34"], correctAnswer: 1, explanation: "Neutrons = mass number − atomic number = 23 − 11 = 12. This is sodium (Na)." },
    { id: "as2", type: "mcq", points: 2, question: "What are isotopes?", options: ["Different elements with the same mass", "Same element with different numbers of neutrons", "Atoms with no neutrons", "Ions with extra electrons"], correctAnswer: 1, explanation: "Isotopes are atoms of the same element (same protons) with different numbers of neutrons, giving different mass numbers." },
    { id: "as3", type: "mcq", points: 2, question: "Why do elements in the same group react similarly?", options: ["Same number of neutrons", "Same mass number", "Same number of outer shell electrons", "Same number of protons"], correctAnswer: 2, explanation: "Chemical reactions involve outer shell electrons. Same group = same number of outer electrons = similar reactions." },
    { id: "as4", type: "short-answer", points: 4, question: "Explain the difference between atomic number and mass number.", correctAnswer: "Atomic number = number of protons; mass number = protons + neutrons", explanation: "Atomic number determines the element (number of protons). Mass number is the total of protons and neutrons. Subtracting gives the number of neutrons." },
    { id: "as5", type: "mcq", points: 2, question: "What charge does an electron carry?", options: ["+1", "0", "−1", "+2"], correctAnswer: 2, explanation: "Electrons carry a negative charge of −1. Protons carry +1 and neutrons carry 0." },
  ],
  forces: [
    { id: "f1", type: "mcq", points: 2, question: "A 500 kg object accelerates at 4 m/s². What is the resultant force?", options: ["125 N", "496 N", "2000 N", "504 N"], correctAnswer: 2, explanation: "F = ma = 500 × 4 = 2000 N. Always use F = ma." },
    { id: "f2", type: "mcq", points: 2, question: "An astronaut has mass 80 kg. On the Moon (g = 1.6 N/kg), what is their weight?", options: ["80 N", "128 N", "800 N", "50 N"], correctAnswer: 1, explanation: "W = mg = 80 × 1.6 = 128 N. Mass stays 80 kg, but weight depends on the local gravitational field strength." },
    { id: "f3", type: "mcq", points: 2, question: "Newton's First Law states that an object will...", options: ["Always accelerate when moving", "Remain at rest or in uniform motion unless a resultant force acts", "Always move in a straight line", "Slow down and stop naturally"], correctAnswer: 1, explanation: "Newton's First Law (inertia): without a resultant force, an object's motion doesn't change — it stays still or continues at constant velocity." },
    { id: "f4", type: "multi-step", points: 6, question: "A car of mass 1200 kg accelerates from 0 to 30 m/s in 15 seconds.", steps: [{ label: "Calculate acceleration (a = Δv/t)", answer: "a = 30/15 = 2 m/s²", points: 2 }, { label: "Calculate resultant force (F = ma)", answer: "F = 1200 × 2 = 2400 N", points: 2 }, { label: "State the unit of force", answer: "Newtons (N)", points: 2 }] },
    { id: "f5", type: "mcq", points: 2, question: "What is the difference between mass and weight?", options: ["They are the same thing", "Mass is a force; weight is amount of matter", "Mass is the amount of matter (kg); weight is the gravitational force on it (N)", "Mass changes with location; weight does not"], correctAnswer: 2, explanation: "Mass (kg) measures the amount of matter — constant everywhere. Weight (N) is the gravitational force pulling on that mass — varies by location." },
  ],
};

// Legacy exports for backward compatibility
export const SAMPLE_LESSON = LESSONS["algebra"];
export const SAMPLE_QUIZ_QUESTIONS = QUIZ_QUESTIONS["algebra"];

export const SAMPLE_ESSAY = {
  id: "macbeth-power",
  subjectId: "english-lit",
  subjectName: "English Literature",
  title: "Macbeth Essay Question",
  question: "How does Shakespeare present the theme of ambition and its consequences in Macbeth? Refer to at least two moments from the play.",
  points: 20,
  suggestedTime: "25-30 minutes",
  wordGuide: "350-500 words",
  markScheme: [
    "Understanding of the text and relevant context (AO3)",
    "Analysis of Shakespeare's use of language and dramatic techniques (AO2)",
    "Clear, structured argument with relevant quotations (AO1)",
    "Exploration of how ambition is presented at different points in the play",
    "Understanding of how a contemporary audience might respond",
  ],
};

export const SAMPLE_FLASHCARDS = [
  { id: "fc1", term: "Quadratic Formula", definition: "x = (−b ± √(b² − 4ac)) / 2a — used to solve any quadratic equation ax² + bx + c = 0", subject: "Maths" },
  { id: "fc2", term: "Discriminant", definition: "The value b² − 4ac. Positive = 2 solutions, zero = 1 solution, negative = no real solutions", subject: "Maths" },
  { id: "fc3", term: "Mitosis", definition: "Cell division producing two genetically identical daughter cells. Used for growth and repair.", subject: "Biology" },
  { id: "fc4", term: "Ionic Bonding", definition: "Electrostatic attraction between oppositely charged ions. Occurs between metals and non-metals.", subject: "Chemistry" },
  { id: "fc5", term: "Newton's Second Law", definition: "F = ma — Force equals mass multiplied by acceleration. Units: Newtons (N)", subject: "Physics" },
  { id: "fc6", term: "Alliteration", definition: "Repetition of the same consonant sound at the beginning of nearby words. Creates rhythm or emphasis.", subject: "English" },
  { id: "fc7", term: "Photosynthesis Equation", definition: "6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂ (light energy required). Produces glucose and oxygen.", subject: "Biology" },
  { id: "fc8", term: "Ohm's Law", definition: "V = IR — Voltage equals current multiplied by resistance. Resistance is measured in Ohms (Ω).", subject: "Physics" },
  { id: "fc9", term: "Mole (Chemistry)", definition: "A unit representing 6.02 × 10²³ particles (Avogadro's number). Used to measure amounts of substance.", subject: "Chemistry" },
  { id: "fc10", term: "Linear Equation", definition: "An equation where the highest power of x is 1. Graph produces a straight line. Form: y = mx + c", subject: "Maths" },
];
