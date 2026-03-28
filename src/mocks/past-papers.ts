export interface PastPaperQuestion {
  id: string;
  number: string;
  type: "short" | "structured" | "essay" | "calculation" | "mcq";
  marks: number;
  question: string;
  parts?: PastPaperPart[];
  markScheme: string;
  hint?: string;
}

export interface PastPaperPart {
  label: string;
  marks: number;
  question: string;
  markScheme: string;
}

export interface PastPaper {
  id: string;
  subjectId: string;
  subjectName: string;
  year: number;
  session: "May/June" | "Oct/Nov" | "March";
  paperCode: string;
  level: "IGCSE" | "A-Level";
  duration: number;
  totalMarks: number;
  topics: string[];
  questions: PastPaperQuestion[];
}

export const PAST_PAPERS: PastPaper[] = [
  {
    id: "cs-2025-mj-p1",
    subjectId: "computer-science",
    subjectName: "Computer Science",
    year: 2025,
    session: "May/June",
    paperCode: "0478/11",
    level: "IGCSE",
    duration: 75,
    totalMarks: 40,
    topics: ["Data Representation", "Algorithms", "Programming", "Networks", "Security"],
    questions: [
      {
        id: "cs25-1",
        number: "1",
        type: "short",
        marks: 4,
        question: "A computer stores numbers using binary.\n(a) Convert the denary number 157 to an 8-bit binary number.\n(b) A pixel in a greyscale image is stored using 8 bits. State the maximum number of different shades of grey that can be represented.",
        markScheme: "(a) 157 in binary: 10011101 [2 marks: 1 for method, 1 for correct answer]\n(b) 2^8 = 256 different shades [2 marks]",
        hint: "For binary conversion, repeatedly divide by 2 and record remainders.",
      },
      {
        id: "cs25-2",
        number: "2",
        type: "structured",
        marks: 8,
        question: "A programmer writes a program to manage a school library. The program stores book titles, ISBN numbers, and availability status.",
        parts: [
          {
            label: "a",
            marks: 2,
            question: "State two appropriate data types that could be used in this program, giving an example of the data each would store.",
            markScheme: "String — for book title or author name [1 mark]; Boolean — for availability status (True/False) [1 mark]; Integer — for number of copies; Accept any valid data type with appropriate example.",
          },
          {
            label: "b",
            marks: 3,
            question: "Write pseudocode to search through an array of 100 book titles (stored in a 1D array called titles[0:99]) and output the position of a book matching a given searchTitle. If not found, output 'Not found'.",
            markScheme: "FOR i ← 0 TO 99 [1 mark for loop bounds]\n  IF titles[i] = searchTitle [1 mark for correct condition]\n    THEN OUTPUT i\n  ENDIF\nNEXTFOR\nOUTPUT 'Not found' (after the loop) [1 mark for output placement]",
          },
          {
            label: "c",
            marks: 3,
            question: "The library system now needs to be accessible from multiple computers across the school network. Explain the difference between a Local Area Network (LAN) and a Wide Area Network (WAN), and state which would be most appropriate for this system.",
            markScheme: "LAN: covers a small geographical area (e.g. one building/site) [1 mark]; WAN: covers a large geographical area, often connecting multiple sites [1 mark]; LAN is appropriate as the school is one site [1 mark]",
          },
        ],
        markScheme: "See individual parts above.",
      },
      {
        id: "cs25-3",
        number: "3",
        type: "calculation",
        marks: 6,
        question: "A sorting algorithm is used to sort the following list of numbers into ascending order:\n\n17, 4, 8, 23, 11, 6\n\n(a) Show the state of the list after the FIRST pass of a Bubble Sort algorithm.\n(b) State how many comparisons are made in the first pass.\n(c) Explain one advantage of Merge Sort over Bubble Sort for large datasets.",
        markScheme: "(a) After first pass: 4, 8, 17, 11, 6, 23 [2 marks: 1 for mostly correct, 2 for fully correct]\n(b) 5 comparisons (n-1 where n=6) [1 mark]\n(c) Merge sort is O(n log n) vs Bubble Sort O(n²) [1 mark]; so merge sort is significantly faster for large n [1 mark]; merge sort guarantees same performance regardless of initial order [1 mark — any valid advantage]",
      },
      {
        id: "cs25-4",
        number: "4",
        type: "structured",
        marks: 10,
        question: "A company stores customer data. A cyber attack has resulted in the theft of customer passwords.\n\n(a) Explain what is meant by 'hashing' a password and why it is used.\n(b) Explain how a 'brute force attack' works and describe one method to reduce its effectiveness.\n(c) The company decides to use two-factor authentication (2FA). Explain how 2FA improves security.\n(d) Describe one ethical issue raised by the company storing customer data.",
        markScheme: "(a) Hashing converts a password to a fixed-length string using a one-way function [1]; the hash is stored not the password, so even if the database is stolen, passwords cannot be recovered [1]\n(b) Brute force: trying every possible combination of characters until the correct password is found [1]; reduce effectiveness by limiting login attempts / using CAPTCHA / requiring longer passwords [1]\n(c) 2FA requires two separate forms of verification (e.g. password + SMS code) [1]; even if a password is stolen, an attacker cannot log in without the second factor [1]\n(d) Privacy concerns — storing data without adequate protection violates customers' right to privacy [1]; data breaches can cause financial/personal harm to customers [1]",
      },
      {
        id: "cs25-5",
        number: "5",
        type: "essay",
        marks: 12,
        question: "A social media platform uses algorithms to recommend content to users based on their browsing history and interactions.\n\nDiscuss the ethical and social implications of this practice. In your answer, consider both positive and negative impacts, and suggest how these concerns could be addressed. [12 marks]",
        markScheme: "Level 3 (9-12 marks): Detailed discussion of multiple ethical issues (privacy, filter bubbles, manipulation, misinformation), balanced view of positives (personalisation, relevant content), concrete suggestions for addressing concerns, well-structured argument.\nLevel 2 (5-8 marks): Some discussion of ethical issues with limited analysis, partial balance, some suggestions.\nLevel 1 (1-4 marks): Basic points about privacy or relevance with little analysis.\n\nKey points: privacy/data collection; filter bubbles limiting diverse viewpoints; algorithmic bias; mental health impacts (compulsive use); positive: personalised learning/entertainment; suggestions: transparency, opt-out options, regulation, algorithmic diversity.",
      },
    ],
  },
  {
    id: "maths-2025-mj-p1",
    subjectId: "maths",
    subjectName: "Mathematics",
    year: 2025,
    session: "May/June",
    paperCode: "0580/21",
    level: "IGCSE",
    duration: 90,
    totalMarks: 70,
    topics: ["Number", "Algebra", "Geometry", "Statistics", "Trigonometry"],
    questions: [
      {
        id: "maths25-1",
        number: "1",
        type: "calculation",
        marks: 4,
        question: "Without a calculator, work out:\n\n(a) 3⅔ + 1¾\n\n(b) 2.8 × 10³ ÷ (4 × 10⁻²)\n\nGive your answer to (b) in standard form.",
        markScheme: "(a) 3⅔ + 1¾ = 11/3 + 7/4 = 44/12 + 21/12 = 65/12 = 5 5/12 [2 marks]\n(b) 2.8 × 10³ ÷ (4 × 10⁻²) = 0.7 × 10⁵ = 7 × 10⁴ [2 marks: 1 for 7, 1 for ×10⁴]",
      },
      {
        id: "maths25-2",
        number: "2",
        type: "calculation",
        marks: 6,
        question: "Solve the following:\n\n(a) 5x − 3 = 2(x + 6)\n\n(b) Solve the quadratic equation: 2x² − 5x − 3 = 0\n\n(c) Find the integer values of x that satisfy: −2 < 3x + 1 ≤ 10",
        markScheme: "(a) 5x − 3 = 2x + 12 → 3x = 15 → x = 5 [2 marks]\n(b) 2x² − 5x − 3 = 0; (2x + 1)(x − 3) = 0; x = −½ or x = 3 [2 marks]\n(c) −2 < 3x + 1 ≤ 10; −3 < 3x ≤ 9; −1 < x ≤ 3; integers: 0, 1, 2, 3 [2 marks]",
      },
      {
        id: "maths25-3",
        number: "3",
        type: "structured",
        marks: 8,
        question: "A triangle ABC has AB = 9 cm, BC = 7 cm, and angle ABC = 68°.",
        parts: [
          {
            label: "a",
            marks: 3,
            question: "Using the cosine rule, calculate the length of AC. Give your answer correct to 3 significant figures.",
            markScheme: "AC² = 9² + 7² − 2(9)(7)cos68° [1 mark for formula]\n= 81 + 49 − 126cos68°\n= 130 − 126 × 0.3746...\n= 130 − 47.2... = 82.8...\nAC = √82.8 = 9.09 cm [2 marks: 1 for substitution, 1 for answer]",
          },
          {
            label: "b",
            marks: 3,
            question: "Calculate angle BAC. Give your answer correct to 1 decimal place.",
            markScheme: "Using sine rule: sinA/BC = sinB/AC\nsinA/7 = sin68°/9.09\nsinA = 7 × sin68°/9.09 = 0.7142...\nA = 45.6° [3 marks: 1 for method, 1 for sinA value, 1 for answer]",
          },
          {
            label: "c",
            marks: 2,
            question: "Calculate the area of triangle ABC.",
            markScheme: "Area = ½ × 9 × 7 × sin68° = ½ × 63 × 0.9272 = 29.2 cm² [2 marks]",
          },
        ],
        markScheme: "See parts above.",
      },
      {
        id: "maths25-4",
        number: "4",
        type: "calculation",
        marks: 10,
        question: "A company makes two products, X and Y.\n\n• Each unit of X requires 2 hours of machine time and 3 hours of labour.\n• Each unit of Y requires 4 hours of machine time and 1 hour of labour.\n• Available: 24 hours machine time and 15 hours labour.\n\n(a) Write two inequalities, using x for units of X and y for units of Y, to represent the machine time and labour constraints.\n(b) The profit is £5 per unit of X and £8 per unit of Y. Write an expression for the total profit P.\n(c) By drawing the constraints on a grid (or by testing corner points), find the values of x and y that maximise the profit. State the maximum profit.",
        markScheme: "(a) Machine: 2x + 4y ≤ 24 i.e. x + 2y ≤ 12 [1]; Labour: 3x + y ≤ 15 [1]\n(b) P = 5x + 8y [1]\n(c) Corner points of feasible region:\n(0, 6): P = 0 + 48 = 48\n(0, 0): P = 0\n(5, 0): P = 25\n(18/5, 21/5) from x+2y=12 and 3x+y=15 → solving: x = 18/5 = 3.6, y = 4.2... \nBut x, y must be integers: test (3, 4): 2(3)+4(4)=22≤24 ✓; 3(3)+4=13≤15 ✓; P = 15+32 = 47\nTest (4, 4): 2(4)+4(4)=24 ✓; 3(4)+4=16 > 15 ✗ — not feasible\nTest (4, 3): 2(4)+4(3)=20 ✓; 3(4)+3=15 ✓; P = 20+24 = 44\nOptimal continuous: x=3.6, y=4.2 → maximum profit £49.60 [for continuous]; integer: x=3, y=4, P=£47 [award marks for valid method and correct conclusion]",
      },
      {
        id: "maths25-5",
        number: "5",
        type: "structured",
        marks: 12,
        question: "The table shows the scores of 40 students in a test marked out of 50.\n\nScore (x): 10≤x<20, 20≤x<30, 30≤x<40, 40≤x<50\nFrequency: 4, 12, 18, 6\n\n(a) Write down the modal class.\n(b) Calculate an estimate for the mean score.\n(c) A histogram is drawn. The bar for 20≤x<30 has height 2.4 cm. Calculate the height of the bar for 30≤x<40.\n(d) Find an estimate for the median.\n(e) A student is chosen at random from those who scored 30 or more. Find the probability that this student scored 40 or more.",
        markScheme: "(a) Modal class: 30 ≤ x < 40 [1]\n(b) Mean = (4×15 + 12×25 + 18×35 + 6×45) / 40 = (60+300+630+270)/40 = 1260/40 = 31.5 [3 marks]\n(c) Height ∝ frequency density. For 20–30: h₁ = 2.4, f₁=12. For 30–40: h₂/18 = 2.4/12, h₂ = 3.6 cm [2 marks]\n(d) 20th value in 30–40 class. 4+12=16 values below 30, need 4 more into 30–40 class. Median = 30 + (4/18)×10 = 30 + 2.22 = 32.2 [3 marks]\n(e) P = 6/(18+6) = 6/24 = ¼ [2 marks]",
      },
    ],
  },
  {
    id: "maths-2025-mj-p2",
    subjectId: "maths",
    subjectName: "Mathematics",
    year: 2025,
    session: "May/June",
    paperCode: "0580/22",
    level: "IGCSE",
    duration: 90,
    totalMarks: 70,
    topics: ["Geometry", "Trigonometry", "Pythagoras", "Area & Volume", "Angles"],
    questions: [
      {
        id: "maths25p2-1",
        number: "1",
        type: "calculation",
        marks: 6,
        question: "ABCD is a parallelogram where AB = 8 cm, AD = 5 cm, and angle DAB = 112°.\n\n(a) Calculate the length of diagonal BD.\n(b) Calculate the area of the parallelogram.\n(c) A second parallelogram is mathematically similar to ABCD with AB = 12 cm. Find the ratio of their areas.",
        markScheme: "(a) BD² = 8² + 5² − 2(8)(5)cos112° = 64 + 25 − 80cos112° = 89 − 80(−0.3746) = 89 + 29.97 = 118.97; BD = 10.9 cm [2]\n(b) Area = 8 × 5 × sin112° = 40 × 0.9272 = 37.1 cm² [2]\n(c) Scale factor = 12/8 = 1.5; area ratio = 1.5² = 2.25 : 1 or 9:4 [2]",
      },
      {
        id: "maths25p2-2",
        number: "2",
        type: "structured",
        marks: 10,
        question: "A lighthouse stands on top of a cliff. From a boat at sea, the angle of elevation to the top of the lighthouse is 34° and to the base of the lighthouse (top of the cliff) is 28°. The boat is 200 m from the base of the cliff.",
        parts: [
          {
            label: "a",
            marks: 3,
            question: "Calculate the height of the cliff to the nearest metre.",
            markScheme: "tan28° = height/200; height = 200 × tan28° = 200 × 0.5317 = 106 m [3: 1 for correct trig ratio, 1 for substitution, 1 for answer]",
          },
          {
            label: "b",
            marks: 3,
            question: "Calculate the height of the lighthouse alone.",
            markScheme: "Height to top of lighthouse = 200 × tan34° = 200 × 0.6745 = 134.9 m; Height of lighthouse = 134.9 − 106 = 29 m [3]",
          },
          {
            label: "c",
            marks: 4,
            question: "Later, the boat moves to a new position. The bearing of the lighthouse from the new position is 042° and the bearing from a point P (which is 150 m due north of the boat) is 056°. Calculate the distance from the new boat position to the lighthouse.",
            markScheme: "Angle at boat = 042°; angle at P looking to lighthouse = 056°; angle between the two directions = 56° − 42° = 14°; using triangle: angle at lighthouse = 180° − 42° − (180° − 56°) ...solve using sine rule with the 150m baseline [4: award for correct triangle setup (2) and sine rule application (2)]",
          },
        ],
        markScheme: "See parts above.",
      },
      {
        id: "maths25p2-3",
        number: "3",
        type: "calculation",
        marks: 8,
        question: "A solid is made by joining a cone on top of a cylinder. The cylinder has radius 4 cm and height 9 cm. The cone has the same base radius and a slant height of 6.5 cm.\n\n(a) Calculate the perpendicular height of the cone.\n(b) Calculate the total volume of the solid. Give your answer in terms of π.\n(c) The solid is melted down and recast into small spheres of radius 0.5 cm. How many complete spheres can be made?",
        markScheme: "(a) h² = 6.5² − 4² = 42.25 − 16 = 26.25; h = √26.25 = 5.12 cm [2]\n(b) V(cylinder) = π(4²)(9) = 144π; V(cone) = ⅓π(4²)(5.12) = 27.3π; Total ≈ 171.3π cm³ [3]\n(c) V(sphere) = 4/3π(0.5)³ = π/6; Number = 171.3π ÷ (π/6) = 171.3 × 6 = 1027.8 → 1027 spheres [3]",
      },
      {
        id: "maths25p2-4",
        number: "4",
        type: "structured",
        marks: 10,
        question: "In the diagram, O is the centre of a circle. Points A, B, C, and D lie on the circle. Angle AOC = 132° and angle DBC = 47°.",
        parts: [
          {
            label: "a",
            marks: 2,
            question: "Find angle ADC, giving a reason.",
            markScheme: "Angle ADC = 132°/2 = 66° [1]; angle at centre = twice angle at circumference [1]",
          },
          {
            label: "b",
            marks: 2,
            question: "Find angle ABC, giving a reason.",
            markScheme: "Angle ABC = 180° − 66° = 114° [1]; opposite angles of a cyclic quadrilateral sum to 180° [1]",
          },
          {
            label: "c",
            marks: 3,
            question: "OA = OC = 7 cm. Find the length of chord AC, given angle AOC = 132°.",
            markScheme: "Using cosine rule: AC² = 7² + 7² − 2(7)(7)cos132° = 49 + 49 − 98cos132° = 98 − 98(−0.6691) = 98 + 65.57 = 163.57; AC = 12.8 cm [3]",
          },
          {
            label: "d",
            marks: 3,
            question: "Angle DBC = 47°. Find angle DOC and explain the circle theorem used.",
            markScheme: "Angle DOC = 2 × 47° = 94° [2]; angle at centre is twice the angle at the circumference subtended by the same arc [1]",
          },
        ],
        markScheme: "See parts above.",
      },
      {
        id: "maths25p2-5",
        number: "5",
        type: "calculation",
        marks: 10,
        question: "Vectors and Transformations:\n\n(a) OA = (3, −2) and OB = (−1, 5). Find the magnitude of AB.\n\n(b) The point P(2, 3) is transformed by the matrix M = [[0, −1],[1, 0]]. Find the image of P and describe the transformation fully.\n\n(c) Triangle T has vertices at (1,1), (3,1), (3,4). It is enlarged by scale factor −2 from centre (0,0). Find the vertices of the image T'.\n\n(d) Describe fully the single transformation that maps T onto T'.",
        markScheme: "(a) AB = OB − OA = (−4, 7); |AB| = √(16+49) = √65 = 8.06 [2]\n(b) M × (2,3)ᵀ = (−3, 2); image is (−3, 2); rotation of 90° anticlockwise about origin [3]\n(c) Multiply each vertex by −2: (1,1)→(−2,−2), (3,1)→(−6,−2), (3,4)→(−6,−8) [3]\n(d) Enlargement, scale factor −2, centre (0,0) — this is an enlargement with a rotation of 180° [2]",
      },
    ],
  },
  {
    id: "maths-2025-mj-p3",
    subjectId: "maths",
    subjectName: "Mathematics",
    year: 2025,
    session: "May/June",
    paperCode: "0580/23",
    level: "IGCSE",
    duration: 90,
    totalMarks: 70,
    topics: ["Statistics", "Probability", "Graphs & Functions", "Number", "Sequences"],
    questions: [
      {
        id: "maths25p3-1",
        number: "1",
        type: "structured",
        marks: 12,
        question: "The ages (in years) of 80 members of a sports club are recorded in the table below.\n\nAge (a): 16≤a<25 | 25≤a<35 | 35≤a<50 | 50≤a<70\nFrequency: 18      | 24       | 22       | 16",
        parts: [
          {
            label: "a",
            marks: 1,
            question: "Write down the modal class.",
            markScheme: "25 ≤ a < 35 [1]",
          },
          {
            label: "b",
            marks: 3,
            question: "Calculate an estimate for the mean age.",
            markScheme: "Mean = (18×20.5 + 24×30 + 22×42.5 + 16×60) / 80 = (369 + 720 + 935 + 960)/80 = 2984/80 = 37.3 years [3: 1 for midpoints, 1 for ∑fx, 1 for dividing by 80]",
          },
          {
            label: "c",
            marks: 4,
            question: "Draw a histogram to represent this data. The bar for 25 ≤ a < 35 has a frequency density of 2.4. Calculate the frequency densities for all other bars.",
            markScheme: "FD = frequency/class width; 16≤a<25: 18/9 = 2.0; 25≤a<35: 24/10 = 2.4 ✓; 35≤a<50: 22/15 = 1.47; 50≤a<70: 16/20 = 0.8 [4: 1 per correct FD]",
          },
          {
            label: "d",
            marks: 2,
            question: "Find an estimate for the median age.",
            markScheme: "40th value lies in 25≤a<35 class. 18 below, need 22nd into this class. Median = 25 + (22/24)×10 = 25 + 9.17 = 34.2 [2]",
          },
          {
            label: "e",
            marks: 2,
            question: "Two members are selected at random. Find the probability that both are aged under 35.",
            markScheme: "P = (42/80) × (41/79) = 1722/6320 = 0.272 [2]",
          },
        ],
        markScheme: "See parts above.",
      },
      {
        id: "maths25p3-2",
        number: "2",
        type: "structured",
        marks: 10,
        question: "A bag contains 5 red, 4 blue, and 3 green counters. Two counters are drawn without replacement.",
        parts: [
          {
            label: "a",
            marks: 4,
            question: "Complete the probability tree diagram for the first and second draws. (Calculate all branch probabilities.)",
            markScheme: "First draw: P(R) = 5/12, P(B) = 4/12, P(G) = 3/12. Second draw (given R first): P(R) = 4/11, P(B) = 4/11, P(G) = 3/11; (given B first): P(R) = 5/11, P(B) = 3/11, P(G) = 3/11; (given G first): P(R) = 5/11, P(B) = 4/11, P(G) = 2/11 [4: 1 per correct set of branches]",
          },
          {
            label: "b",
            marks: 3,
            question: "Calculate the probability that both counters are the same colour.",
            markScheme: "P(RR) = 5/12 × 4/11 = 20/132; P(BB) = 4/12 × 3/11 = 12/132; P(GG) = 3/12 × 2/11 = 6/132; Total = 38/132 = 19/66 [3]",
          },
          {
            label: "c",
            marks: 3,
            question: "Calculate the probability that at least one counter is red.",
            markScheme: "P(at least one red) = 1 − P(no red) = 1 − (7/12 × 6/11) = 1 − 42/132 = 90/132 = 15/22 [3]",
          },
        ],
        markScheme: "See parts above.",
      },
      {
        id: "maths25p3-3",
        number: "3",
        type: "calculation",
        marks: 10,
        question: "Graphs and Functions:\n\n(a) The nth term of a sequence is given by Tₙ = n² − 3n + 5.\n    (i) Find T₁, T₂, T₃, T₄.\n    (ii) Find the value of n for which Tₙ = 45.\n\n(b) f(x) = 2x − 1 and g(x) = x² + 3.\n    (i) Find f(g(2)).\n    (ii) Find gf(x) and simplify.\n    (iii) Solve f⁻¹(x) = 4.",
        markScheme: "(a)(i) T₁=3, T₂=3, T₃=5, T₄=9 [2]; (ii) n²−3n+5=45 → n²−3n−40=0 → (n−8)(n+5)=0 → n=8 [2]\n(b)(i) g(2)=7; f(7)=13 [1]; (ii) gf(x) = g(2x−1) = (2x−1)²+3 = 4x²−4x+4 [2]; (iii) f⁻¹(x)=(x+1)/2; (x+1)/2=4 → x=7 [3]",
      },
      {
        id: "maths25p3-4",
        number: "4",
        type: "structured",
        marks: 10,
        question: "A company's profit P (in £ thousands) over t years is modelled by P = 2t³ − 9t² + 12t + 5 for 0 ≤ t ≤ 4.",
        parts: [
          {
            label: "a",
            marks: 3,
            question: "Complete the table of values and draw the graph.\n\nt: 0, 1, 2, 3, 4\nP: ?, ?, ?, ?, ?",
            markScheme: "t=0: P=5; t=1: P=2−9+12+5=10; t=2: P=16−36+24+5=9; t=3: P=54−81+36+5=14; t=4: P=128−144+48+5=37 [3: 1 per 3 correct values]",
          },
          {
            label: "b",
            marks: 3,
            question: "Use calculus to find the value of t where the rate of profit increase is at a minimum. Justify your answer.",
            markScheme: "dP/dt = 6t²−18t+12 [1]; d²P/dt² = 12t−18; set dP/dt = 0: 6t²−18t+12=0 → t²−3t+2=0 → (t−1)(t−2)=0 → t=1 or t=2 [1]; d²P/dt²|t=1 = −6 < 0 (max); d²P/dt²|t=2 = +6 > 0 (min) → minimum rate at t=2 [1]",
          },
          {
            label: "c",
            marks: 4,
            question: "Find the total profit made between t=1 and t=3 using integration.",
            markScheme: "∫₁³ (2t³−9t²+12t+5)dt = [t⁴/2 − 3t³ + 6t² + 5t]₁³ [2]; At t=3: 81/2−81+54+15=40.5−81+54+15=28.5; At t=1: 0.5−3+6+5=8.5; Total = 28.5−8.5 = 20 [£20,000] [2]",
          },
        ],
        markScheme: "See parts above.",
      },
      {
        id: "maths25p3-5",
        number: "5",
        type: "calculation",
        marks: 8,
        question: "Number and Proportion:\n\n(a) A house is valued at £320,000. Its value increases by 3.5% per year. Find its value after 6 years, giving your answer to the nearest pound.\n\n(b) The same house was bought 5 years ago for £265,000. Find the percentage increase in value from the original purchase price to the current value (£320,000).\n\n(c) Two quantities x and y are in inverse proportion. When x = 4, y = 15. Find y when x = 12, and find x when y = 4.",
        markScheme: "(a) 320000 × 1.035⁶ = 320000 × 1.2293 = £393,380 [3]\n(b) % increase = (320000−265000)/265000 × 100 = 55000/265000 × 100 = 20.75% [2]\n(c) y = k/x; 15 = k/4 → k = 60; y = 60/12 = 5; x = 60/4 = 15 [3]",
      },
    ],
  },
  {
    id: "cs-2025-mj-alevel",
    subjectId: "computer-science",
    subjectName: "Computer Science",
    year: 2025,
    session: "May/June",
    paperCode: "9618/12",
    level: "A-Level",
    duration: 120,
    totalMarks: 75,
    topics: ["Data types", "OOP", "Recursion", "Databases", "Ethics"],
    questions: [
      {
        id: "csal25-1",
        number: "1",
        type: "structured",
        marks: 10,
        question: "A school uses an object-oriented program to manage student records.\n\nThe class diagram shows:\nClass: Student\nAttributes: studentID: STRING, name: STRING, grades: ARRAY OF INTEGER\nMethods: getAverage(): REAL, addGrade(g: INTEGER): VOID, toString(): STRING",
        parts: [
          {
            label: "a",
            marks: 4,
            question: "Write pseudocode for the method getAverage() that returns the mean of all values in the grades array. Assume the array has a property .length.",
            markScheme: "total ← 0 [1]\nFOR i ← 0 TO grades.length − 1 [1]\n  total ← total + grades[i] [1]\nNEXT i\nRETURN total / grades.length [1]",
          },
          {
            label: "b",
            marks: 2,
            question: "Explain the concept of encapsulation and state one benefit of using it in this program.",
            markScheme: "Encapsulation: bundling data (attributes) and methods together in a class, hiding internal details [1]; Benefit: prevents direct access to grades from outside the class, protecting data integrity [1]",
          },
          {
            label: "c",
            marks: 4,
            question: "A Teacher class needs to be created that inherits from a Person base class. Describe the relationship between the classes and explain two benefits of using inheritance here.",
            markScheme: "Teacher IS-A Person (inheritance relationship) [1]; Teacher inherits attributes/methods from Person (e.g. name, ID) [1]; Benefit 1: code reuse — no need to rewrite common attributes [1]; Benefit 2: polymorphism — a Person reference can hold a Teacher object, allowing flexible design [1]",
          },
        ],
        markScheme: "See parts above.",
      },
      {
        id: "csal25-2",
        number: "2",
        type: "calculation",
        marks: 12,
        question: "A recursive function calculates the Fibonacci sequence, where F(0)=0, F(1)=1, and F(n) = F(n-1) + F(n-2).\n\n(a) Write a recursive pseudocode function FIBONACCI(n) that returns the nth Fibonacci number.\n(b) Trace the execution of FIBONACCI(4), showing all recursive calls.\n(c) State one advantage and one disadvantage of using recursion to solve this problem.\n(d) Rewrite the algorithm using iteration instead of recursion.",
        markScheme: "(a) FUNCTION FIBONACCI(n : INTEGER) RETURNS INTEGER\n  IF n <= 1 THEN RETURN n [1 for base cases]\n  ELSE RETURN FIBONACCI(n-1) + FIBONACCI(n-2) [2 for recursive call]\nENDFUNCTION\n\n(b) FIBONACCI(4)\n = FIBONACCI(3) + FIBONACCI(2)\n = [FIBONACCI(2)+FIBONACCI(1)] + [FIBONACCI(1)+FIBONACCI(0)]\n = [[FIBONACCI(1)+FIBONACCI(0)]+1] + [1+0]\n = [[1+0]+1] + 1 = [1+1]+1 = 3 [2 marks for correct trace]\n\n(c) Advantage: code is simpler/more elegant [1]; Disadvantage: exponential time complexity O(2^n), very slow for large n; risk of stack overflow [1]\n\n(d) i←0; j←1; FOR k←2 TO n: temp←i+j; i←j; j←temp; RETURN j [3 marks for correct iterative solution]",
      },
      {
        id: "csal25-3",
        number: "3",
        type: "essay",
        marks: 15,
        question: "Artificial Intelligence (AI) systems are increasingly being used to make decisions that affect people's lives, such as in medical diagnosis, recruitment, and criminal justice.\n\nDiscuss the ethical implications of using AI in decision-making processes. Your answer should include consideration of:\n• Bias and fairness\n• Transparency and explainability\n• Accountability and legal responsibility\n• Potential benefits and risks to society [15 marks]",
        markScheme: "Level 4 (12-15): Comprehensive, well-structured discussion covering all four bullet points with examples. Balanced view, sophisticated analysis, clear conclusions.\nLevel 3 (8-11): Good coverage of most points, some examples, reasonable balance.\nLevel 2 (4-7): Basic discussion of 2-3 points, limited examples.\nLevel 1 (1-3): Superficial mention of issues.\n\nKey content: Bias from training data (historical discrimination); explainability problem with neural networks; who is legally responsible when AI makes a wrong medical diagnosis; benefits (faster, more consistent decisions); risks (reinforcing discrimination, job losses, privacy).",
      },
    ],
  },
  {
    id: "bio-2025-mj-p1",
    subjectId: "biology",
    subjectName: "Biology",
    year: 2025,
    session: "May/June",
    paperCode: "0610/21",
    level: "IGCSE",
    duration: 75,
    totalMarks: 60,
    topics: ["Cell Biology", "Nutrition", "Respiration", "Genetics", "Ecosystems"],
    questions: [
      {
        id: "bio25-1",
        number: "1",
        type: "structured",
        marks: 8,
        question: "An experiment is carried out to investigate the effect of light intensity on the rate of photosynthesis in pondweed.",
        parts: [
          {
            label: "a",
            marks: 2,
            question: "State the equation for photosynthesis, using words.",
            markScheme: "Carbon dioxide + water → glucose + oxygen [2 marks: 1 for reactants, 1 for products]",
          },
          {
            label: "b",
            marks: 3,
            question: "Describe and explain what happens to the rate of photosynthesis as light intensity increases from low to high, and then becomes very high.",
            markScheme: "As light increases, rate of photosynthesis increases [1] because more light energy is available for the light-dependent reactions [1]; at very high light intensity, rate plateaus/stops increasing [1] because another factor becomes limiting (CO₂ concentration or temperature) [1] — 3 marks max",
          },
          {
            label: "c",
            marks: 3,
            question: "Describe the role of chlorophyll in photosynthesis.",
            markScheme: "Chlorophyll is a pigment [1] found in chloroplasts [1] that absorbs light energy [1] and uses it to split water (photolysis)/drive the light-dependent reactions [1] — 3 marks max",
          },
        ],
        markScheme: "See parts above.",
      },
      {
        id: "bio25-2",
        number: "2",
        type: "short",
        marks: 6,
        question: "Explain how meiosis leads to genetic variation in offspring. Refer in your answer to crossing over and independent assortment.",
        markScheme: "Crossing over: homologous chromosomes pair up and exchange segments [1]; this creates new combinations of alleles on chromosomes [1].\nIndependent assortment: homologous pairs align randomly at the metaphase plate [1]; so different combinations of maternal and paternal chromosomes end up in gametes [1].\nResult: gametes contain unique combinations of alleles [1]; fertilisation with another unique gamete further increases variation [1]",
      },
      {
        id: "bio25-3",
        number: "3",
        type: "calculation",
        marks: 6,
        question: "In pea plants, tall (T) is dominant over dwarf (t).\n\n(a) A tall plant (Tt) is crossed with a dwarf plant (tt). Draw a Punnett square to show the expected offspring and give the expected ratio of tall to dwarf plants.\n\n(b) In a sample of 120 offspring from this cross, how many would you expect to be tall?\n\n(c) The actual result showed 65 tall and 55 dwarf. Suggest why the results differ from the expected ratio.",
        markScheme: "(a) Punnett square: Tt × tt → Tt, Tt, tt, tt; 1:1 ratio tall:dwarf [2 marks]\n(b) 50% of 120 = 60 tall [1 mark]\n(c) Sample size is relatively small [1]; random fertilisation means exact ratios are unlikely [1]; results are due to chance variation [1] — max 2 marks",
      },
    ],
  },
  {
    id: "physics-2025-mj-p1",
    subjectId: "physics",
    subjectName: "Physics",
    year: 2025,
    session: "May/June",
    paperCode: "0625/21",
    level: "IGCSE",
    duration: 75,
    totalMarks: 60,
    topics: ["Forces", "Electricity", "Waves", "Thermal Physics", "Nuclear Physics"],
    questions: [
      {
        id: "phys25-1",
        number: "1",
        type: "calculation",
        marks: 8,
        question: "A car of mass 1400 kg accelerates from rest to 28 m/s in 8 seconds.\n\n(a) Calculate the acceleration of the car.\n(b) Calculate the resultant force acting on the car.\n(c) The car then brakes and stops in 4 seconds. Calculate the braking force, assuming it is constant.\n(d) Calculate the braking distance, assuming uniform deceleration.",
        markScheme: "(a) a = (v−u)/t = 28/8 = 3.5 m/s² [1]\n(b) F = ma = 1400 × 3.5 = 4900 N [2]\n(c) a = −28/4 = −7 m/s²; F = 1400 × 7 = 9800 N [2]\n(d) v² = u² + 2as; 0 = 28² − 2×7×s; s = 784/14 = 56 m [2] OR s = (u+v)/2 × t = 14 × 4 = 56 m",
      },
      {
        id: "phys25-2",
        number: "2",
        type: "structured",
        marks: 10,
        question: "A circuit contains a 12V battery, a 40Ω resistor and a 20Ω resistor connected in series.",
        parts: [
          {
            label: "a",
            marks: 2,
            question: "Calculate the total resistance of the circuit.",
            markScheme: "Total resistance = 40 + 20 = 60 Ω [2 marks]",
          },
          {
            label: "b",
            marks: 3,
            question: "Calculate the current through the circuit and the voltage across each resistor.",
            markScheme: "I = V/R = 12/60 = 0.2 A [1]; V₁ = 0.2 × 40 = 8 V [1]; V₂ = 0.2 × 20 = 4 V [1]",
          },
          {
            label: "c",
            marks: 3,
            question: "The two resistors are now connected in parallel instead. Calculate the total resistance and the current from the battery.",
            markScheme: "1/R = 1/40 + 1/20 = 1/40 + 2/40 = 3/40; R = 40/3 = 13.3 Ω [2]; I = 12/13.3 = 0.9 A [1]",
          },
          {
            label: "d",
            marks: 2,
            question: "Calculate the power dissipated by the 40Ω resistor in the parallel circuit.",
            markScheme: "V across each = 12V; P = V²/R = 144/40 = 3.6 W [2] OR I = 12/40 = 0.3 A; P = I²R = 0.09×40 = 3.6 W",
          },
        ],
        markScheme: "See parts above.",
      },
    ],
  },
  {
    id: "chem-2025-mj-p1",
    subjectId: "chemistry",
    subjectName: "Chemistry",
    year: 2025,
    session: "May/June",
    paperCode: "0620/21",
    level: "IGCSE",
    duration: 75,
    totalMarks: 60,
    topics: ["Atomic Structure", "Bonding", "Electrolysis", "Rates of Reaction", "Organic Chemistry"],
    questions: [
      {
        id: "chem25-1",
        number: "1",
        type: "short",
        marks: 6,
        question: "An atom of element X has the electronic configuration 2, 8, 6.\n\n(a) State the period and group in which element X is found in the periodic table.\n(b) State how many protons, neutrons and electrons are in the ion X²⁻ if the mass number is 32.\n(c) Explain, using your knowledge of electronic configuration, why element X reacts with element Y (configuration 2, 8, 1) to form a compound. Include the type of bonding in your answer.",
        markScheme: "(a) Period 3, Group VI [2 marks]\n(b) Protons = 16 (from atomic number = period 3, group 6: Z=16) [1]; Neutrons = 32−16 = 16 [1]; Electrons = 16+2 = 18 [1]\n(c) X needs 2 electrons to complete outer shell [1]; Y has 1 electron to donate [1]; ionic bonding forms as electrons transfer from Y to X [1] — so 2 atoms of Y react with 1 of X forming Y₂X [1] — max 3 marks for c",
      },
      {
        id: "chem25-2",
        number: "2",
        type: "structured",
        marks: 8,
        question: "Electrolysis of aqueous copper sulfate using copper electrodes is carried out.",
        parts: [
          {
            label: "a",
            marks: 3,
            question: "Describe what happens at each electrode during electrolysis. Include the relevant half-equations.",
            markScheme: "Cathode (negative): Cu²⁺ + 2e⁻ → Cu (copper deposited) [1 for observation, 1 for half-equation]; Anode (positive): Cu → Cu²⁺ + 2e⁻ (copper dissolves) [1 for observation, 1 for half-equation] — max 3",
          },
          {
            label: "b",
            marks: 2,
            question: "State what happens to the concentration of copper sulfate solution during this electrolysis and explain why.",
            markScheme: "Concentration remains constant [1]; copper dissolved at anode = copper deposited at cathode, so [Cu²⁺] unchanged [1]",
          },
          {
            label: "c",
            marks: 3,
            question: "If platinum electrodes are used instead, describe how the observations at each electrode change, and explain why the concentration of the solution changes.",
            markScheme: "Anode: oxygen gas produced (not copper dissolving) [1]; Cathode: copper still deposits [1]; Concentration of CuSO₄ decreases [1] as Cu²⁺ is removed at cathode but not replaced at anode [1] — max 3",
          },
        ],
        markScheme: "See parts above.",
      },
    ],
  },
  {
    id: "hist-2025-mj-p1",
    subjectId: "history",
    subjectName: "History",
    year: 2025,
    session: "May/June",
    paperCode: "0470/12",
    level: "IGCSE",
    duration: 120,
    totalMarks: 60,
    topics: ["Weimar & Nazi Germany", "Cold War", "Medicine"],
    questions: [
      {
        id: "hist25-1",
        number: "1",
        type: "short",
        marks: 4,
        question: "Describe two problems faced by the Weimar Republic in the years 1919–1923.",
        markScheme: "Any two from: resentment over Treaty of Versailles / War Guilt Clause [1+1 developed point]; Hyperinflation 1923 — Ruhr invasion, money printed, savings wiped out [1+1]; political violence — Spartacist uprising, Kapp Putsch, Munich Beer Hall Putsch [1+1]; weak proportional representation system leading to unstable coalitions [1+1] — 2 marks per problem: 1 for identification, 1 for development",
      },
      {
        id: "hist25-2",
        number: "2",
        type: "essay",
        marks: 16,
        question: "'Hitler became Chancellor in January 1933 mainly because of the Great Depression.' How far do you agree with this statement? Explain your answer.\n[16 marks]",
        markScheme: "Level 4 (13-16): Sustained, analytical argument. Considers multiple factors (Depression, propaganda, weakness of Weimar, backroom deals, fear of communism). Clear judgement on relative importance with strong evidence.\nLevel 3 (9-12): Several relevant factors with some analysis. Some prioritisation.\nLevel 2 (5-8): Describes some factors with limited analysis.\nLevel 1 (1-4): Basic, mostly descriptive.\n\nAGREE: Depression caused 6 million unemployed; people blamed Weimar and turned to extremes; Nazi votes rose from 2.6% to 37.4% 1928–1932.\nDISAGREE: Propaganda/Goebbels; SA intimidation; appeal of Hitler's personality; backroom deal between Papen and Hindenburg; fear of communist alternative; structural weaknesses of Weimar predated Depression.",
      },
    ],
  },
];

export function getPapersForSubject(subjectId: string): PastPaper[] {
  return PAST_PAPERS.filter((p) => p.subjectId === subjectId);
}

export function getAllSubjectsWithPapers(): string[] {
  return [...new Set(PAST_PAPERS.map((p) => p.subjectId))];
}
