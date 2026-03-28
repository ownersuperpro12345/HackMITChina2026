export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  points: number;
}

export const QUESTION_BANK: Record<string, Question[]> = {

  /* ===================== MATHS — ALGEBRA ===================== */

  "linear-equations": [
    { id: "le1", question: "Solve: 3x + 7 = 22", options: ["x = 3", "x = 5", "x = 7", "x = 9"], correctAnswer: 1, explanation: "3x = 22 − 7 = 15, so x = 15 ÷ 3 = 5.", points: 2 },
    { id: "le2", question: "Solve: 2x − 4 = 10", options: ["x = 3", "x = 5", "x = 7", "x = 8"], correctAnswer: 2, explanation: "2x = 10 + 4 = 14, so x = 14 ÷ 2 = 7.", points: 2 },
    { id: "le3", question: "Solve: 5x + 3 = 3x + 11", options: ["x = 2", "x = 3", "x = 4", "x = 5"], correctAnswer: 2, explanation: "5x − 3x = 11 − 3, so 2x = 8, x = 4.", points: 2 },
    { id: "le4", question: "Solve: 4(x − 2) = 20", options: ["x = 3", "x = 5", "x = 7", "x = 9"], correctAnswer: 2, explanation: "4x − 8 = 20, so 4x = 28, x = 7.", points: 2 },
    { id: "le5", question: "Solve: x/3 + 5 = 9", options: ["x = 4", "x = 8", "x = 12", "x = 16"], correctAnswer: 2, explanation: "x/3 = 9 − 5 = 4, so x = 4 × 3 = 12.", points: 2 },
    { id: "le6", question: "Solve: 7 − 2x = 1", options: ["x = 2", "x = 3", "x = 4", "x = 5"], correctAnswer: 1, explanation: "−2x = 1 − 7 = −6, so x = −6 ÷ −2 = 3.", points: 2 },
    { id: "le7", question: "Which represents a linear equation?", options: ["x² + 3 = 7", "2x + 5 = 9", "x³ = 8", "x² − x = 0"], correctAnswer: 1, explanation: "A linear equation has highest power of x equal to 1. Only 2x + 5 = 9 qualifies.", points: 2 },
    { id: "le8", question: "Solve: 3(2x + 1) = 15", options: ["x = 1", "x = 2", "x = 3", "x = 4"], correctAnswer: 1, explanation: "6x + 3 = 15, so 6x = 12, x = 2.", points: 2 },
    { id: "le9", question: "A number multiplied by 4 then decreased by 6 equals 18. What is the number?", options: ["x = 4", "x = 5", "x = 6", "x = 7"], correctAnswer: 2, explanation: "4x − 6 = 18, 4x = 24, x = 6.", points: 2 },
    { id: "le10", question: "Solve: 2x/5 = 8", options: ["x = 16", "x = 20", "x = 24", "x = 32"], correctAnswer: 1, explanation: "2x = 8 × 5 = 40, so x = 40 ÷ 2 = 20.", points: 2 },
    { id: "le11", question: "Solve: x + 12 = 5", options: ["x = −7", "x = 7", "x = 17", "x = −17"], correctAnswer: 0, explanation: "x = 5 − 12 = −7.", points: 2 },
    { id: "le12", question: "Solve: 6x − 3 = 4x + 7", options: ["x = 4", "x = 5", "x = 6", "x = 7"], correctAnswer: 1, explanation: "6x − 4x = 7 + 3, so 2x = 10, x = 5.", points: 2 },
    { id: "le13", question: "What is the gradient of the line y = 3x + 7?", options: ["7", "3", "10", "−3"], correctAnswer: 1, explanation: "In y = mx + c, m is the gradient. Here m = 3.", points: 2 },
    { id: "le14", question: "Solve: 12 − x = 5x + 6", options: ["x = 1", "x = 2", "x = 3", "x = 4"], correctAnswer: 0, explanation: "12 − 6 = 5x + x, so 6 = 6x, x = 1.", points: 2 },
    { id: "le15", question: "If 3x + y = 10 and y = 4, what is x?", options: ["x = 1", "x = 2", "x = 3", "x = 4"], correctAnswer: 1, explanation: "3x + 4 = 10, 3x = 6, x = 2.", points: 2 },
    { id: "le16", question: "Solve: 2(x + 3) = 3(x − 1)", options: ["x = 7", "x = 8", "x = 9", "x = 10"], correctAnswer: 2, explanation: "2x + 6 = 3x − 3, so 9 = x.", points: 2 },
    { id: "le17", question: "Solve: 0.5x + 2 = 7", options: ["x = 5", "x = 8", "x = 10", "x = 14"], correctAnswer: 2, explanation: "0.5x = 5, so x = 10.", points: 2 },
    { id: "le18", question: "A bag of apples costs £x. 3 bags cost £18. What is x?", options: ["£4", "£5", "£6", "£7"], correctAnswer: 2, explanation: "3x = 18, x = 6.", points: 2 },
    { id: "le19", question: "Solve: x − (x + 3) = 2x − 1", options: ["x = −½", "x = ½", "x = 1", "x = −1"], correctAnswer: 3, explanation: "x − x − 3 = 2x − 1, so −3 = 2x − 1, −2 = 2x, x = −1.", points: 2 },
    { id: "le20", question: "Solve: (x + 2)/3 = 4", options: ["x = 8", "x = 10", "x = 12", "x = 14"], correctAnswer: 1, explanation: "x + 2 = 12, x = 10.", points: 2 },
    { id: "le21", question: "A rectangle has perimeter 28 cm. Its length is 4 cm more than its width. What is the width?", options: ["4 cm", "5 cm", "6 cm", "7 cm"], correctAnswer: 1, explanation: "Let width = w, length = w + 4. 2(2w + 4) = 28, 4w + 8 = 28, 4w = 20, w = 5.", points: 2 },
    { id: "le22", question: "Solve for y: 4y + 8 = 0", options: ["y = 2", "y = −2", "y = 4", "y = −4"], correctAnswer: 1, explanation: "4y = −8, y = −2.", points: 2 },
    { id: "le23", question: "First step to solve 2x − 6 = 10?", options: ["Divide both sides by 2", "Add 6 to both sides", "Subtract 10 from both sides", "Multiply both sides by 2"], correctAnswer: 1, explanation: "First, add 6 to both sides to get 2x = 16, then divide by 2 to get x = 8.", points: 2 },
    { id: "le24", question: "Solve: x/4 − 3 = 2", options: ["x = 4", "x = 8", "x = 16", "x = 20"], correctAnswer: 3, explanation: "x/4 = 5, so x = 20.", points: 2 },
    { id: "le25", question: "Solve: 5(x − 4) = 0", options: ["x = 0", "x = 4", "x = 5", "x = 20"], correctAnswer: 1, explanation: "x − 4 = 0, so x = 4.", points: 2 },
  ],

  "quadratics": [
    { id: "q1", question: "Factorise x² + 5x + 6.", options: ["(x+1)(x+6)", "(x+2)(x+3)", "(x+3)(x+2)", "(x−2)(x−3)"], correctAnswer: 1, explanation: "Two numbers that multiply to 6 and add to 5: 2 and 3. So (x+2)(x+3).", points: 2 },
    { id: "q2", question: "Solve x² − 7x + 12 = 0.", options: ["x=3 and x=4", "x=−3 and x=−4", "x=6 and x=2", "x=1 and x=12"], correctAnswer: 0, explanation: "(x−3)(x−4) = 0, so x = 3 or x = 4.", points: 2 },
    { id: "q3", question: "What is the discriminant for x² + 4x + 5 = 0?", options: ["−4", "−16", "4", "36"], correctAnswer: 0, explanation: "b² − 4ac = 16 − 20 = −4.", points: 2 },
    { id: "q4", question: "If the discriminant is negative, how many real solutions exist?", options: ["None", "One", "Two", "Infinite"], correctAnswer: 0, explanation: "A negative discriminant means no real solutions.", points: 2 },
    { id: "q5", question: "Using the quadratic formula, solve 2x² − 5x + 2 = 0.", options: ["x=2 and x=0.5", "x=1 and x=2", "x=−2 and x=0.5", "x=4 and x=1"], correctAnswer: 0, explanation: "x = (5 ± √(25−16))/4 = (5 ± 3)/4 giving x = 2 or x = 0.5.", points: 2 },
    { id: "q6", question: "What does a discriminant of zero tell us?", options: ["Two solutions", "One repeated solution", "No solutions", "Infinitely many"], correctAnswer: 1, explanation: "When b² − 4ac = 0, there is exactly one repeated solution.", points: 2 },
    { id: "q7", question: "Factorise x² − 9.", options: ["(x−3)²", "(x+3)(x−3)", "(x−9)(x+1)", "(x+9)(x−1)"], correctAnswer: 1, explanation: "Difference of two squares: x² − 9 = (x+3)(x−3).", points: 2 },
    { id: "q8", question: "What is x² + 6x + 9 as a perfect square?", options: ["(x+3)²", "(x+6)²", "(x+9)²", "(x+4.5)²"], correctAnswer: 0, explanation: "x² + 6x + 9 = (x+3)².", points: 2 },
    { id: "q9", question: "Which value of c makes x² + 8x + c a perfect square?", options: ["4", "8", "16", "64"], correctAnswer: 2, explanation: "Half of 8 is 4; 4² = 16. So c = 16 gives (x+4)².", points: 2 },
    { id: "q10", question: "Solve x² = 49.", options: ["x = 7 only", "x = −7 only", "x = ±7", "x = ±49"], correctAnswer: 2, explanation: "Taking square roots of both sides gives x = ±7.", points: 2 },
    { id: "q11", question: "Axis of symmetry for y = x² − 4x + 3?", options: ["x = −2", "x = 2", "x = 3", "x = 4"], correctAnswer: 1, explanation: "Axis of symmetry = −b/(2a) = 4/2 = 2.", points: 2 },
    { id: "q12", question: "Solve x² + x − 6 = 0.", options: ["x=2 and x=−3", "x=−2 and x=3", "x=3 and x=2", "x=−6 and x=1"], correctAnswer: 0, explanation: "(x+3)(x−2) = 0, so x = −3 or x = 2.", points: 2 },
    { id: "q13", question: "Expand (x + 5)².", options: ["x² + 25", "x² + 5x + 25", "x² + 10x + 25", "x² + 25x + 5"], correctAnswer: 2, explanation: "(x+5)² = x² + 10x + 25.", points: 2 },
    { id: "q14", question: "Discriminant of 3x² − 12x + 9 = 0?", options: ["0", "36", "144", "−36"], correctAnswer: 1, explanation: "b² − 4ac = 144 − 108 = 36.", points: 2 },
    { id: "q15", question: "Solve x² − 5x = 0.", options: ["x = 0 only", "x = 5 only", "x = 0 or x = 5", "x = ±5"], correctAnswer: 2, explanation: "Factorise: x(x−5) = 0, so x = 0 or x = 5.", points: 2 },
    { id: "q16", question: "y-intercept of y = 2x² − 8x + 6?", options: ["2", "−8", "6", "0"], correctAnswer: 2, explanation: "The y-intercept is when x = 0: y = 6.", points: 2 },
    { id: "q17", question: "What shape does a quadratic equation make?", options: ["Straight line", "Parabola", "Circle", "Hyperbola"], correctAnswer: 1, explanation: "Quadratic equations always produce a U-shaped curve called a parabola.", points: 2 },
    { id: "q18", question: "If a > 0 in ax² + bx + c, which way does the parabola open?", options: ["Downward", "Upward (U)", "Sideways", "Cannot tell"], correctAnswer: 1, explanation: "When a > 0, the parabola opens upward.", points: 2 },
    { id: "q19", question: "Solve 2x² = 18.", options: ["x = 3 only", "x = −3 only", "x = ±3", "x = ±9"], correctAnswer: 2, explanation: "x² = 9, so x = ±3.", points: 2 },
    { id: "q20", question: "Identify a, b, c in: −x² + 4x − 3 = 0.", options: ["a=1, b=4, c=3", "a=−1, b=4, c=−3", "a=−1, b=−4, c=3", "a=1, b=−4, c=3"], correctAnswer: 1, explanation: "a = −1, b = 4, c = −3.", points: 2 },
    { id: "q21", question: "Solve x² − 4x − 5 = 0.", options: ["x=5 and x=−1", "x=−5 and x=1", "x=5 and x=1", "x=−5 and x=−1"], correctAnswer: 0, explanation: "(x−5)(x+1) = 0, so x = 5 or x = −1.", points: 2 },
    { id: "q22", question: "What does ± mean in the quadratic formula?", options: ["Only add", "Only subtract", "Calculate both + and − for two answers", "Approximate"], correctAnswer: 2, explanation: "Calculate the formula twice — once adding, once subtracting — giving up to two solutions.", points: 2 },
    { id: "q23", question: "What are the roots of a quadratic?", options: ["The coefficients a, b, c", "The x-values where the graph crosses the x-axis", "The y-intercept", "The maximum point"], correctAnswer: 1, explanation: "Roots are the x-values where the quadratic equals zero.", points: 2 },
    { id: "q24", question: "Factorise 2x² + 7x + 3.", options: ["(2x+1)(x+3)", "(2x+3)(x+1)", "(x+7)(2x+3)", "(2x−1)(x−3)"], correctAnswer: 0, explanation: "(2x+1)(x+3) = 2x² + 7x + 3.", points: 2 },
    { id: "q25", question: "Completing the square converts ax² + bx + c into:", options: ["a(x+p)² + q form", "A linear equation", "A factorised pair", "A perfect square only"], correctAnswer: 0, explanation: "Completing the square gives a(x+p)² + q, making it easy to find vertex and solve.", points: 2 },
  ],

  "simultaneous-equations": [
    { id: "se1", question: "Solve: x + y = 10 and x − y = 4.", options: ["x=7, y=3", "x=3, y=7", "x=6, y=4", "x=4, y=6"], correctAnswer: 0, explanation: "Adding equations: 2x = 14, x = 7. Then y = 10 − 7 = 3.", points: 2 },
    { id: "se2", question: "Solve: 2x + y = 7 and x + y = 5.", options: ["x=1, y=5", "x=2, y=3", "x=3, y=1", "x=4, y=1"], correctAnswer: 1, explanation: "Subtracting equation 2 from 1: x = 2. Then y = 5 − 2 = 3.", points: 2 },
    { id: "se3", question: "Which method adds/subtracts equations to eliminate a variable?", options: ["Substitution", "Graphical", "Elimination", "Factorising"], correctAnswer: 2, explanation: "The elimination method involves adding or subtracting equations to remove one variable.", points: 2 },
    { id: "se4", question: "Solve: 3x + 2y = 16 and x + 2y = 8.", options: ["x=4, y=2", "x=2, y=4", "x=3, y=3", "x=6, y=1"], correctAnswer: 0, explanation: "Subtracting: 2x = 8, x = 4. Then 12 + 2y = 16, y = 2.", points: 2 },
    { id: "se5", question: "Two numbers add to 15 and their difference is 3. What are the numbers?", options: ["6 and 9", "8 and 7", "10 and 5", "12 and 3"], correctAnswer: 0, explanation: "x+y=15, x−y=3. Adding: 2x=18, x=9. Then y=6.", points: 2 },
    { id: "se6", question: "Solve: y = 2x and x + y = 9.", options: ["x=2, y=4", "x=3, y=6", "x=4, y=8", "x=1, y=2"], correctAnswer: 1, explanation: "Substituting y=2x: x + 2x = 9, 3x = 9, x = 3, y = 6.", points: 2 },
    { id: "se7", question: "Graphically, simultaneous equations have a solution at...", options: ["The y-intercept of both", "Where the two lines intersect", "The origin", "The steepest point"], correctAnswer: 1, explanation: "The solution is where the two lines meet — their point of intersection.", points: 2 },
    { id: "se8", question: "Solve: 4x − y = 10 and 2x + y = 8.", options: ["x=2, y=2", "x=3, y=2", "x=2, y=3", "x=4, y=6"], correctAnswer: 1, explanation: "Adding equations: 6x = 18, x = 3. Then 2(3) + y = 8, y = 2.", points: 2 },
    { id: "se9", question: "No solution means...", options: ["The lines are the same", "The lines are parallel and never meet", "Both equations are wrong", "x = 0"], correctAnswer: 1, explanation: "No solution: lines are parallel — same gradient but different y-intercepts.", points: 2 },
    { id: "se10", question: "Solve: x = 3y and 2x − y = 10.", options: ["x=6, y=2", "x=3, y=1", "x=9, y=3", "x=12, y=4"], correctAnswer: 0, explanation: "Substitute x = 3y: 6y − y = 10, 5y = 10, y = 2, x = 6.", points: 2 },
    { id: "se11", question: "Solve: 5x + 2y = 19 and 3x − 2y = 5.", options: ["x=3, y=2", "x=2, y=3", "x=4, y=0", "x=1, y=7"], correctAnswer: 0, explanation: "Adding: 8x = 24, x = 3. Then 15 + 2y = 19, y = 2.", points: 2 },
    { id: "se12", question: "Solve: x/2 + y = 5 and x + y = 8.", options: ["x=6, y=2", "x=2, y=6", "x=4, y=4", "x=3, y=5"], correctAnswer: 0, explanation: "Subtracting eq 1 from eq 2: x/2 = 3, x = 6. Then y = 8 − 6 = 2.", points: 2 },
    { id: "se13", question: "Which pair has infinitely many solutions?", options: ["y=2x+1 and y=2x+3", "y=x and y=−x", "y=2x+1 and 4x−2y=−2", "x+y=5 and x−y=3"], correctAnswer: 2, explanation: "y=2x+1 and 4x−2y=−2: rearranging second gives y=2x+1 — the same line! Infinite solutions.", points: 2 },
    { id: "se14", question: "Solve: x + y = 4 and y = x − 2.", options: ["x=3, y=1", "x=2, y=2", "x=4, y=0", "x=1, y=3"], correctAnswer: 0, explanation: "Substitute y = x − 2: x + x − 2 = 4, 2x = 6, x = 3, y = 1.", points: 2 },
    { id: "se15", question: "Solve: 2x + 3y = 12 and x = y.", options: ["x=2.4, y=2.4", "x=3, y=3", "x=4, y=4", "x=2, y=2"], correctAnswer: 0, explanation: "Substitute x = y: 2y + 3y = 12, 5y = 12, y = 2.4, x = 2.4.", points: 2 },
  ],

  "inequalities": [
    { id: "ineq1", question: "Solve: 3x + 2 > 11.", options: ["x > 3", "x < 3", "x > 4", "x ≥ 3"], correctAnswer: 0, explanation: "3x > 9, x > 3.", points: 2 },
    { id: "ineq2", question: "Solve: 5 − 2x ≤ 1.", options: ["x ≤ 2", "x ≥ 2", "x ≤ 3", "x ≥ 3"], correctAnswer: 1, explanation: "−2x ≤ −4, x ≥ 2 (flip sign when dividing by negative).", points: 2 },
    { id: "ineq3", question: "Integer values satisfying −2 < x ≤ 3?", options: ["−1, 0, 1, 2, 3", "−2, −1, 0, 1, 2, 3", "−1, 0, 1, 2", "0, 1, 2, 3"], correctAnswer: 0, explanation: "x > −2 (not including −2) and ≤ 3 (including 3): −1, 0, 1, 2, 3.", points: 2 },
    { id: "ineq4", question: "Solve: 4x − 3 < 2x + 5.", options: ["x < 2", "x < 4", "x > 4", "x < 1"], correctAnswer: 1, explanation: "2x < 8, x < 4.", points: 2 },
    { id: "ineq5", question: "When multiplying by a negative, what must you do to an inequality?", options: ["Nothing changes", "Flip the inequality sign", "Add the negative to both sides", "Keep the sign"], correctAnswer: 1, explanation: "Multiplying or dividing by a negative flips the direction of the inequality.", points: 2 },
    { id: "ineq6", question: "How to represent x > 2 on a number line?", options: ["Closed circle at 2, arrow left", "Open circle at 2, arrow right", "Closed circle at 2, arrow right", "Open circle at 2, arrow left"], correctAnswer: 1, explanation: "x > 2 (strict) uses an open circle (not included) with arrow going right.", points: 2 },
    { id: "ineq7", question: "Solve: 2(x + 1) ≥ 8.", options: ["x ≥ 2", "x ≥ 3", "x ≥ 4", "x ≥ 5"], correctAnswer: 1, explanation: "2x + 2 ≥ 8, 2x ≥ 6, x ≥ 3.", points: 2 },
    { id: "ineq8", question: "Which is NOT an inequality symbol?", options: ["&lt;", "≥", "≠", "="], correctAnswer: 3, explanation: "= is an equals sign, not an inequality. The others are inequality symbols.", points: 2 },
    { id: "ineq9", question: "Solve: −3x > 12.", options: ["x > −4", "x < −4", "x > 4", "x < 4"], correctAnswer: 1, explanation: "Dividing by −3 flips the sign: x < −4.", points: 2 },
    { id: "ineq10", question: "Integer values of n where 3 ≤ 2n − 1 < 9?", options: ["n = 2, 3, 4", "n = 2, 3, 4, 5", "n = 3, 4, 5", "n = 1, 2, 3, 4"], correctAnswer: 0, explanation: "Add 1: 4 ≤ 2n < 10. Divide by 2: 2 ≤ n < 5. Integer values: n = 2, 3, 4.", points: 2 },
    { id: "ineq11", question: "Solve: x/2 > 3.", options: ["x > 1.5", "x > 6", "x > 9", "x > 5"], correctAnswer: 1, explanation: "Multiply both sides by 2: x > 6.", points: 2 },
    { id: "ineq12", question: "Solve: 10 − 3x ≥ 1.", options: ["x ≤ 3", "x ≥ 3", "x ≤ −3", "x ≥ −3"], correctAnswer: 0, explanation: "−3x ≥ −9, dividing by −3 and flipping: x ≤ 3.", points: 2 },
    { id: "ineq13", question: "What does x < 5 AND x > 2 represent?", options: ["x = 3.5 only", "All x between 2 and 5 (exclusive)", "All x greater than 5", "No values of x"], correctAnswer: 1, explanation: "Combined: 2 < x < 5 — x must satisfy both conditions simultaneously.", points: 2 },
    { id: "ineq14", question: "Solve: 4(x + 2) > 3x + 11.", options: ["x > 3", "x > 2", "x > 1", "x > 4"], correctAnswer: 0, explanation: "4x + 8 > 3x + 11, x > 3.", points: 2 },
    { id: "ineq15", question: "A cinema requires age ≥ 15 for a film. Which inequality describes who can watch?", options: ["a > 15", "a ≥ 15", "a < 15", "a ≤ 15"], correctAnswer: 1, explanation: "Age must be at least 15 — this means ≥ 15 (including 15).", points: 2 },
  ],

  "sequences": [
    { id: "seq1", question: "Next term in 3, 7, 11, 15, ...?", options: ["17", "18", "19", "20"], correctAnswer: 2, explanation: "Common difference is 4, so the next term is 15 + 4 = 19.", points: 2 },
    { id: "seq2", question: "nth term of 5, 8, 11, 14, ...?", options: ["3n + 2", "3n + 5", "5n + 3", "2n + 3"], correctAnswer: 0, explanation: "First term = 5, common difference = 3. nth term = 3n + (5 − 3) = 3n + 2.", points: 2 },
    { id: "seq3", question: "10th term of nth term 4n − 1?", options: ["38", "39", "40", "41"], correctAnswer: 1, explanation: "4(10) − 1 = 40 − 1 = 39.", points: 2 },
    { id: "seq4", question: "Type of sequence: 2, 6, 18, 54, ...?", options: ["Arithmetic", "Geometric", "Fibonacci", "Square numbers"], correctAnswer: 1, explanation: "Each term is multiplied by 3 — geometric sequence with common ratio 3.", points: 2 },
    { id: "seq5", question: "Common difference in 20, 15, 10, 5, ...?", options: ["+5", "−5", "+10", "÷2"], correctAnswer: 1, explanation: "Each term decreases by 5, so common difference is −5.", points: 2 },
    { id: "seq6", question: "First 4 terms of 2n² + 1?", options: ["3, 9, 19, 33", "3, 8, 19, 33", "3, 9, 18, 33", "2, 9, 18, 32"], correctAnswer: 0, explanation: "n=1: 3, n=2: 9, n=3: 19, n=4: 33.", points: 2 },
    { id: "seq7", question: "Which term in 5n − 3 equals 47?", options: ["n=9", "n=10", "n=11", "n=12"], correctAnswer: 1, explanation: "5n − 3 = 47, 5n = 50, n = 10.", points: 2 },
    { id: "seq8", question: "5th term of Fibonacci: 1, 1, 2, 3, 5, ...?", options: ["7", "8", "5", "13"], correctAnswer: 2, explanation: "The 5th term is 5 — each term is the sum of the previous two.", points: 2 },
    { id: "seq9", question: "Which term in 6, 11, 16, 21, ... equals 101?", options: ["n=19", "n=20", "n=21", "n=22"], correctAnswer: 1, explanation: "nth term = 5n + 1. 5n + 1 = 101, 5n = 100, n = 20.", points: 2 },
    { id: "seq10", question: "Is the sequence 1/2, 1/4, 1/8, ... geometric?", options: ["Yes — common ratio 1/2", "No — it is arithmetic", "Yes — common ratio 2", "No — it is Fibonacci"], correctAnswer: 0, explanation: "Each term is multiplied by 1/2 — this is a geometric sequence with ratio 1/2.", points: 2 },
    { id: "seq11", question: "nth term of 10, 7, 4, 1, ...?", options: ["3n + 7", "−3n + 13", "3n + 10", "−3n + 10"], correctAnswer: 1, explanation: "First term = 10, d = −3. nth term = 10 + (n−1)(−3) = 10 − 3n + 3 = 13 − 3n.", points: 2 },
    { id: "seq12", question: "How many terms are in the sequence 5, 10, 15, ..., 100?", options: ["18", "19", "20", "21"], correctAnswer: 2, explanation: "nth term = 5n. 5n = 100, n = 20.", points: 2 },
    { id: "seq13", question: "Sum of first 5 terms of 2, 4, 6, 8, 10?", options: ["28", "30", "32", "25"], correctAnswer: 1, explanation: "2 + 4 + 6 + 8 + 10 = 30.", points: 2 },
    { id: "seq14", question: "Which sequence has nth term n²?", options: ["1, 4, 9, 16, 25", "2, 4, 6, 8, 10", "1, 3, 5, 7, 9", "0, 1, 4, 9, 16"], correctAnswer: 0, explanation: "1², 2², 3², 4², 5² = 1, 4, 9, 16, 25.", points: 2 },
    { id: "seq15", question: "A geometric sequence has first term 3 and ratio 2. What is the 4th term?", options: ["12", "18", "24", "48"], correctAnswer: 2, explanation: "3, 6, 12, 24. 4th term = 3 × 2³ = 24.", points: 2 },
  ],

  /* ===================== MATHS — CALCULUS (A-LEVEL) ===================== */

  "calculus-basics": [
    { id: "calc1", question: "Find dy/dx when y = 3x² + 5x − 7", options: ["6x + 5", "6x − 5", "3x + 5", "6x² + 5x"], correctAnswer: 0, explanation: "Power rule: dy/dx = 6x + 5.", points: 3 },
    { id: "calc2", question: "Derivative of y = x³?", options: ["x²", "2x²", "3x²", "3x"], correctAnswer: 2, explanation: "Power rule: 3x³⁻¹ = 3x².", points: 3 },
    { id: "calc3", question: "Integrate ∫ 6x² dx", options: ["2x³ + C", "6x³ + C", "2x² + C", "18x + C"], correctAnswer: 0, explanation: "∫xⁿ dx = xⁿ⁺¹/(n+1) + C. So 6x³/3 + C = 2x³ + C.", points: 3 },
    { id: "calc4", question: "Stationary point of y = x² − 6x + 5?", options: ["x = 2", "x = 3", "x = 4", "x = 5"], correctAnswer: 1, explanation: "dy/dx = 2x − 6. Set to 0: x = 3.", points: 3 },
    { id: "calc5", question: "What is ∫ (3x² + 4x) dx?", options: ["x³ + 2x² + C", "6x + 4 + C", "3x³ + 4x² + C", "x³ + 4x² + C"], correctAnswer: 0, explanation: "∫3x² dx = x³, ∫4x dx = 2x². Combined: x³ + 2x² + C.", points: 3 },
    { id: "calc6", question: "Find dy/dx when y = 5x⁴ − 2x² + 7", options: ["20x³ − 4x", "5x³ − 2x", "20x³ + 4x", "20x⁵ − 4x³"], correctAnswer: 0, explanation: "Power rule applied term by term: 20x³ − 4x.", points: 3 },
    { id: "calc7", question: "What does a derivative tell us about a function?", options: ["Its area under the curve", "The gradient (rate of change) at any point", "The maximum value only", "The x-intercepts"], correctAnswer: 1, explanation: "The derivative gives the gradient (slope) of the function at any given point.", points: 3 },
    { id: "calc8", question: "At a maximum point, the gradient is:", options: ["Positive", "Negative", "Zero then goes negative", "Zero then goes positive"], correctAnswer: 2, explanation: "At a maximum: gradient is 0 at the point, positive before it, negative after (decreasing).", points: 3 },
    { id: "calc9", question: "Integrate ∫ 1/x dx", options: ["x + C", "ln|x| + C", "−1/x² + C", "1/(2x²) + C"], correctAnswer: 1, explanation: "∫ 1/x dx = ln|x| + C. This is a standard result.", points: 3 },
    { id: "calc10", question: "Find the gradient of y = x² − 4x at x = 3.", options: ["−2", "0", "2", "6"], correctAnswer: 2, explanation: "dy/dx = 2x − 4. At x = 3: 2(3) − 4 = 2.", points: 3 },
  ],

  /* ===================== COMPUTER SCIENCE — PROGRAMMING ===================== */

  "variables-data-types": [
    { id: "vdt1", question: "Which data type stores 3.14?", options: ["Integer", "Boolean", "Float/Real", "String"], correctAnswer: 2, explanation: "3.14 is a decimal number — stored as float.", points: 2 },
    { id: "vdt2", question: "What data type stores True or False?", options: ["String", "Integer", "Boolean", "Char"], correctAnswer: 2, explanation: "Boolean stores only True or False.", points: 2 },
    { id: "vdt3", question: "Which variable name follows good convention?", options: ["1stScore", "first score", "firstScore", "First-Score"], correctAnswer: 2, explanation: "'firstScore' follows camelCase — no spaces, starts with letter.", points: 2 },
    { id: "vdt4", question: "What is assignment in programming?", options: ["Asking for input", "Storing a value in a variable", "Printing a value", "Comparing two values"], correctAnswer: 1, explanation: "Assignment stores a value in a variable using =.", points: 2 },
    { id: "vdt5", question: "What data type is 'Hello World'?", options: ["Integer", "String", "Boolean", "Float"], correctAnswer: 1, explanation: "Any text in quotes is a String.", points: 2 },
    { id: "vdt6", question: "Which is an integer?", options: ["3.14", "'Hello'", "True", "42"], correctAnswer: 3, explanation: "42 is a whole number — an integer.", points: 2 },
    { id: "vdt7", question: "What does 'casting' mean?", options: ["Sending data over network", "Converting a value between data types", "Assigning multiple values", "Declaring a variable"], correctAnswer: 1, explanation: "Casting converts between data types — e.g., int('5') converts string '5' to integer 5.", points: 2 },
    { id: "vdt8", question: "Result of int(3.9) in Python?", options: ["4", "3", "3.9", "Error"], correctAnswer: 1, explanation: "int() truncates the decimal — int(3.9) = 3.", points: 2 },
    { id: "vdt9", question: "Why should variable names be meaningful?", options: ["To save memory", "Code is readable and easier to maintain", "To run faster", "No impact"], correctAnswer: 1, explanation: "Meaningful names like 'studentScore' make code readable and easier to debug.", points: 2 },
    { id: "vdt10", question: "What does string concatenation do?", options: ["Multiplies strings", "Joins two strings together", "Converts string to integer", "Splits a string"], correctAnswer: 1, explanation: "Concatenation joins strings — 'Hello' + ' World' = 'Hello World'.", points: 2 },
    { id: "vdt11", question: "What is a constant in programming?", options: ["A frequently changing variable", "A named value that does not change", "A type of loop", "A data type"], correctAnswer: 1, explanation: "Constants remain fixed throughout the program — e.g., PI = 3.14159.", points: 2 },
    { id: "vdt12", question: "Which operator checks if two values are EQUAL?", options: ["=", "==", "!=", ">="], correctAnswer: 1, explanation: "== is the comparison operator. = is assignment. != means not equal.", points: 2 },
    { id: "vdt13", question: "Result of str(25)?", options: ["25", "'25'", "Twenty-five", "Error"], correctAnswer: 1, explanation: "str() converts to string. str(25) produces '25'.", points: 2 },
    { id: "vdt14", question: "How many values can a Boolean hold?", options: ["1", "2", "256", "Unlimited"], correctAnswer: 1, explanation: "Boolean can only be True or False — exactly 2 values.", points: 2 },
    { id: "vdt15", question: "Valid variable declaration?", options: ["my variable = 5", "5 = myVariable", "myVariable = 5", "variable my = 5"], correctAnswer: 2, explanation: "myVariable = 5 is correct. No spaces in name, name before the =.", points: 2 },
    { id: "vdt16", question: "What is the modulo operator (%) used for?", options: ["Division", "Finding the remainder after division", "Multiplication", "Exponentiation"], correctAnswer: 1, explanation: "% gives the remainder: 17 % 5 = 2. Used to check if numbers are even (n % 2 == 0).", points: 2 },
    { id: "vdt17", question: "What is the scope of a local variable?", options: ["The entire program", "Only within the function it was declared in", "Only in the main loop", "Anywhere in the class"], correctAnswer: 1, explanation: "Local variables are only accessible within the function/block where they are defined.", points: 2 },
    { id: "vdt18", question: "Which data type represents a single character like 'A'?", options: ["String", "Integer", "Char", "Boolean"], correctAnswer: 2, explanation: "A Char (character) stores a single character. A String is a sequence of characters.", points: 2 },
    { id: "vdt19", question: "What is a syntax error?", options: ["A logical mistake in the program", "A mistake breaking the programming language rules (e.g., missing bracket)", "A runtime crash", "A data type mismatch"], correctAnswer: 1, explanation: "Syntax errors occur when code violates language rules — like missing a colon or bracket. They prevent compilation.", points: 2 },
    { id: "vdt20", question: "x = 5; x = x + 3. What is x now?", options: ["5", "3", "8", "15"], correctAnswer: 2, explanation: "x starts at 5. x = x + 3 = 5 + 3 = 8. Assignment updates the variable.", points: 2 },
  ],

  "selection-cs": [
    { id: "sel1", question: "What does an IF statement do?", options: ["Repeat code a set number of times", "Execute code only if a condition is True", "Store a value in a variable", "Define a function"], correctAnswer: 1, explanation: "An IF statement checks a condition — if True, the code inside runs.", points: 2 },
    { id: "sel2", question: "age = 17: if age >= 18: print('Adult') else: print('Minor'). Output?", options: ["Adult", "Minor", "Nothing", "Error"], correctAnswer: 1, explanation: "17 is not >= 18, so else runs: 'Minor'.", points: 2 },
    { id: "sel3", question: "What does 'elif' mean?", options: ["A type of variable", "Else if — additional condition checked if previous was False", "End of loop", "An error type"], correctAnswer: 1, explanation: "elif (else if) checks another condition if the previous IF was False.", points: 2 },
    { id: "sel4", question: "When does 'x > 5 AND x < 10' evaluate to True?", options: ["x = 5", "x = 10", "x = 7", "x = 11"], correctAnswer: 2, explanation: "Both must be True: x = 7 is > 5 and < 10. x = 5 and 10 fail the strict inequalities.", points: 2 },
    { id: "sel5", question: "x = 3; if x > 5: print('Big') elif x > 1: print('Medium') else: print('Small'). Output?", options: ["Big", "Medium", "Small", "Error"], correctAnswer: 1, explanation: "x = 3: not > 5, but is > 1. elif is True, so 'Medium' is printed.", points: 2 },
    { id: "sel6", question: "What does the NOT operator do?", options: ["Checks if something equals nothing", "Reverses a boolean condition", "Combines two conditions", "Creates a loop"], correctAnswer: 1, explanation: "NOT reverses a boolean — NOT True = False, NOT False = True.", points: 2 },
    { id: "sel7", question: "What is a nested IF?", options: ["An if inside a loop", "An if statement inside another if statement", "Multiple elif conditions", "An if without else"], correctAnswer: 1, explanation: "Nested IFs have one IF inside another — used for multiple levels of conditions.", points: 2 },
    { id: "sel8", question: "Which operator means 'not equal to'?", options: ["==", ">=", "!=", "<>"], correctAnswer: 2, explanation: "!= means 'not equal to'. e.g., if x != 0: means 'if x is not zero'.", points: 2 },
    { id: "sel9", question: "All IF/ELIF conditions are False, no ELSE. What happens?", options: ["An error occurs", "Program crashes", "Block is skipped entirely", "Last elif runs anyway"], correctAnswer: 2, explanation: "Without an else, if no condition is True, the block is simply skipped.", points: 2 },
    { id: "sel10", question: "score = 75; if >= 90: A; elif >= 70: B; else: C. Grade?", options: ["A", "B", "C", "Error"], correctAnswer: 1, explanation: "75 is not >= 90, but IS >= 70. elif is True, grade = 'B'.", points: 2 },
    { id: "sel11", question: "What is the purpose of an ELSE clause?", options: ["To add more conditions", "To run code when NO IF or ELIF conditions are True", "To repeat code", "To end the program"], correctAnswer: 1, explanation: "ELSE is the fallback — it runs only when all previous conditions are False.", points: 2 },
    { id: "sel12", question: "Which logical operator requires BOTH conditions to be True?", options: ["OR", "NOT", "AND", "XOR"], correctAnswer: 2, explanation: "AND requires both conditions to be True for the overall expression to be True.", points: 2 },
    { id: "sel13", question: "What output? if 5 > 3: print('Yes') if 3 > 5: print('No')", options: ["Yes", "No", "Yes and No", "Nothing"], correctAnswer: 0, explanation: "5 > 3 is True so 'Yes' prints. 3 > 5 is False so 'No' does not print.", points: 2 },
    { id: "sel14", question: "OR operator returns True when:", options: ["Both conditions are True only", "At least one condition is True", "Neither condition is True", "Exactly one condition is True"], correctAnswer: 1, explanation: "OR: True if ANY condition is True. False only if ALL are False.", points: 2 },
    { id: "sel15", question: "x = 10. What does 'if x % 2 == 0' check?", options: ["If x is greater than 2", "If x equals 2", "If x is even (divisible by 2)", "If x is less than 0"], correctAnswer: 2, explanation: "x % 2 gives the remainder when dividing by 2. If it equals 0, the number is even.", points: 2 },
  ],

  "sorting-algorithms": [
    { id: "sort1", question: "In a bubble sort, what happens each pass?", options: ["Elements sorted into groups", "Adjacent elements compared and swapped if wrong order", "List divided in half", "Smallest element found first"], correctAnswer: 1, explanation: "Bubble sort repeatedly compares adjacent pairs and swaps them if wrong order.", points: 2 },
    { id: "sort2", question: "Time complexity of bubble sort (worst case)?", options: ["O(n)", "O(log n)", "O(n²)", "O(n log n)"], correctAnswer: 2, explanation: "Bubble sort is O(n²) — for n elements, up to n comparisons per pass.", points: 2 },
    { id: "sort3", question: "How does merge sort work?", options: ["Swaps adjacent elements", "Divides list in half recursively then merges sorted halves", "Finds minimum and places first", "Uses a pivot to partition"], correctAnswer: 1, explanation: "Merge sort uses divide and conquer: split, recursively sort, then merge.", points: 2 },
    { id: "sort4", question: "More efficient for large datasets?", options: ["Bubble sort — simpler", "Merge sort — O(n log n) vs O(n²)", "Identical performance", "Depends on hardware"], correctAnswer: 1, explanation: "Merge sort (O(n log n)) vastly outperforms bubble sort (O(n²)) for large data.", points: 2 },
    { id: "sort5", question: "Insertion sort works by:", options: ["Dividing in half repeatedly", "Comparing all pairs simultaneously", "Building sorted list one item at a time by inserting each in correct position", "Selecting minimum each pass"], correctAnswer: 2, explanation: "Insertion sort picks each element and inserts it into the correct position in the sorted portion.", points: 2 },
    { id: "sort6", question: "Selection sort selects... what... each pass?", options: ["The maximum element", "A random element", "The minimum (or maximum) element and places it in its sorted position", "The middle element"], correctAnswer: 2, explanation: "Selection sort finds the minimum unsorted element each pass and swaps it to the front.", points: 2 },
    { id: "sort7", question: "After how many passes of bubble sort is the array [3,1,4,2] guaranteed sorted?", options: ["1", "2", "3", "4"], correctAnswer: 2, explanation: "With n=4 elements, bubble sort needs at most n−1 = 3 passes to guarantee sorting.", points: 2 },
    { id: "sort8", question: "Trace bubble sort on [5, 3, 8, 1] — first pass result?", options: ["[1, 3, 5, 8]", "[3, 5, 1, 8]", "[3, 5, 8, 1]", "[3, 8, 1, 5]"], correctAnswer: 1, explanation: "Pass 1: (5,3)→swap:[3,5,8,1]; (5,8)→ok:[3,5,8,1]; (8,1)→swap:[3,5,1,8]. Result: [3,5,1,8].", points: 2 },
    { id: "sort9", question: "What advantage does insertion sort have over bubble sort for nearly-sorted data?", options: ["It uses less memory", "It is faster — often O(n) for nearly sorted data", "It is simpler to code", "It produces a stable sort"], correctAnswer: 1, explanation: "For nearly sorted data, insertion sort makes very few comparisons and swaps — approaching O(n) performance.", points: 2 },
    { id: "sort10", question: "What is a 'stable' sorting algorithm?", options: ["One that never crashes", "One that preserves the relative order of equal elements", "One with O(n log n) time", "One that uses recursion"], correctAnswer: 1, explanation: "A stable sort preserves the original order of records with equal keys — important when sorting complex data structures.", points: 2 },
  ],

  "binary": [
    { id: "bin1", question: "Binary representation of decimal 13?", options: ["1010", "1011", "1101", "1100"], correctAnswer: 2, explanation: "13 = 8+4+1 = 1101. Bit positions 8,4,2,1 → 1,1,0,1.", points: 2 },
    { id: "bin2", question: "Decimal value of binary 10110?", options: ["20", "22", "26", "18"], correctAnswer: 1, explanation: "10110 = 16+4+2 = 22.", points: 2 },
    { id: "bin3", question: "How many values can 8 bits store?", options: ["128", "256", "512", "64"], correctAnswer: 1, explanation: "8 bits = 2⁸ = 256 possible values (0–255).", points: 2 },
    { id: "bin4", question: "What is a 'bit'?", options: ["A type of chip", "The smallest unit of data — a single 0 or 1", "A group of 8 binary digits", "A unit of memory speed"], correctAnswer: 1, explanation: "A bit is the most basic unit of data — a single value that is 0 or 1.", points: 2 },
    { id: "bin5", question: "What is a 'byte'?", options: ["1 bit", "4 bits", "8 bits", "16 bits"], correctAnswer: 2, explanation: "A byte = 8 bits. Standard unit for memory and file sizes.", points: 2 },
    { id: "bin6", question: "Convert decimal 25 to binary.", options: ["10111", "11001", "11000", "10101"], correctAnswer: 1, explanation: "25 = 16+8+1 = 11001.", points: 2 },
    { id: "bin7", question: "What is the binary addition: 0101 + 0011?", options: ["1000", "0111", "1001", "1010"], correctAnswer: 0, explanation: "0101 (5) + 0011 (3) = 1000 (8).", points: 2 },
    { id: "bin8", question: "How many kilobytes in 1 megabyte?", options: ["100 KB", "512 KB", "1000 KB", "1024 KB"], correctAnswer: 3, explanation: "1 MB = 1024 KB (in binary terms). Some contexts use 1000 KB but in CS typically 1024.", points: 2 },
    { id: "bin9", question: "What is hexadecimal base?", options: ["Base 2", "Base 8", "Base 10", "Base 16"], correctAnswer: 3, explanation: "Hexadecimal is base 16 — uses digits 0-9 and A-F (A=10, B=11, ..., F=15).", points: 2 },
    { id: "bin10", question: "Binary number 11111111 in decimal?", options: ["127", "128", "255", "256"], correctAnswer: 2, explanation: "11111111 = 128+64+32+16+8+4+2+1 = 255. Maximum value for 8 bits.", points: 2 },
    { id: "bin11", question: "What does 'overflow' mean in binary?", options: ["Too many decimal places", "A result too large for the allocated bits — leading digits are lost", "Dividing by zero", "Negative number error"], correctAnswer: 1, explanation: "Overflow occurs when a result exceeds the maximum value storable in the available bits.", points: 2 },
    { id: "bin12", question: "Convert hex F to binary.", options: ["1010", "1110", "1111", "1100"], correctAnswer: 2, explanation: "Hex F = decimal 15 = binary 1111.", points: 2 },
  ],

  /* ===================== CS — ALGORITHMS ===================== */

  "searching-algorithms": [
    { id: "srch1", question: "What is linear search?", options: ["Halves the search space each step", "Checks each item in order until found", "Sorts then searches", "Uses a hash table"], correctAnswer: 1, explanation: "Linear search checks each item one by one from start to end — O(n) time.", points: 2 },
    { id: "srch2", question: "Binary search requires the list to be:", options: ["Unsorted", "Sorted", "An even number of elements", "Stored in a stack"], correctAnswer: 1, explanation: "Binary search only works on sorted data — it relies on being able to eliminate half the data each step.", points: 2 },
    { id: "srch3", question: "Time complexity of binary search?", options: ["O(n)", "O(n²)", "O(log n)", "O(1)"], correctAnswer: 2, explanation: "Binary search halves the search space each step — O(log n), much faster than linear O(n).", points: 2 },
    { id: "srch4", question: "Binary searching [1,3,5,7,9,11,13] for 7. First midpoint checked?", options: ["Index 0 (value 1)", "Index 3 (value 7)", "Index 6 (value 13)", "Index 2 (value 5)"], correctAnswer: 1, explanation: "Mid = (0+6)/2 = 3. Value at index 3 is 7 — found immediately!", points: 2 },
    { id: "srch5", question: "When is linear search preferred over binary search?", options: ["Always for speed", "When the list is sorted", "When the list is unsorted or very small", "Never — binary is always better"], correctAnswer: 2, explanation: "Linear search works on unsorted data and is simple. For small lists, sorting overhead makes binary search less efficient.", points: 2 },
  ],

  "pseudocode": [
    { id: "psd1", question: "What is pseudocode?", options: ["Code that doesn't work", "An informal description of an algorithm using structured plain English", "Binary code", "A specific programming language"], correctAnswer: 1, explanation: "Pseudocode describes algorithm logic in plain English without strict syntax rules — used for planning.", points: 2 },
    { id: "psd2", question: "What does OUTPUT do in pseudocode?", options: ["Takes user input", "Displays a value to the user", "Stores a value", "Ends the program"], correctAnswer: 1, explanation: "OUTPUT (or PRINT) displays data to the screen — equivalent to print() in Python.", points: 2 },
    { id: "psd3", question: "What does INPUT do in pseudocode?", options: ["Displays text", "Gets a value from the user and stores it", "Calculates a result", "Creates a variable"], correctAnswer: 1, explanation: "INPUT gets data from the user — equivalent to input() in Python.", points: 2 },
    { id: "psd4", question: "What shape represents a decision in a flowchart?", options: ["Rectangle", "Oval", "Diamond", "Parallelogram"], correctAnswer: 2, explanation: "A diamond (rhombus) represents a decision/condition in a flowchart. Rectangle = process, Oval = start/end, Parallelogram = input/output.", points: 2 },
    { id: "psd5", question: "FOR i ← 1 TO 5; OUTPUT i; ENDFOR. What is printed?", options: ["0 1 2 3 4", "1 2 3 4 5", "1 2 3 4", "0 1 2 3 4 5"], correctAnswer: 1, explanation: "The loop runs from 1 to 5 inclusive, printing each value: 1, 2, 3, 4, 5.", points: 2 },
  ],

  "iteration-cs": [
    { id: "iter1", question: "What is a FOR loop used for?", options: ["Repeating when condition is True", "Repeating a known number of times", "Selecting between options", "Calling a function"], correctAnswer: 1, explanation: "FOR loops (definite iteration) repeat a known number of times. WHILE loops repeat based on a condition.", points: 2 },
    { id: "iter2", question: "What is a WHILE loop?", options: ["Loops exactly 10 times", "Loops while a condition remains True (indefinite iteration)", "Runs code once then checks", "Only used for counting"], correctAnswer: 1, explanation: "WHILE loops continue as long as their condition is True — the number of iterations is not known in advance.", points: 2 },
    { id: "iter3", question: "What is an infinite loop?", options: ["A loop that runs 1000 times", "A loop whose condition never becomes False — runs forever", "A for loop", "A loop that counts backwards"], correctAnswer: 1, explanation: "An infinite loop's condition never becomes False (or it has no exit condition), so it runs indefinitely — usually a bug.", points: 2 },
    { id: "iter4", question: "What does 'break' do in a loop?", options: ["Pauses the loop for 1 second", "Exits the loop immediately", "Skips to the next iteration", "Restarts the loop"], correctAnswer: 1, explanation: "break immediately exits the enclosing loop, regardless of the condition.", points: 2 },
    { id: "iter5", question: "total = 0; for i in range(1,6): total += i. What is total?", options: ["10", "15", "20", "25"], correctAnswer: 1, explanation: "range(1,6) gives 1,2,3,4,5. Sum = 1+2+3+4+5 = 15.", points: 2 },
  ],

  "arrays-cs": [
    { id: "arr1", question: "What index does the first element of an array use?", options: ["1", "0", "-1", "Depends on language"], correctAnswer: 1, explanation: "Most programming languages use zero-based indexing — the first element is at index 0.", points: 2 },
    { id: "arr2", question: "Array = [10, 20, 30, 40]. What is array[2]?", options: ["10", "20", "30", "40"], correctAnswer: 2, explanation: "Index 2 refers to the 3rd element (0-based): 30.", points: 2 },
    { id: "arr3", question: "What is the length of ['a', 'b', 'c', 'd']?", options: ["3", "4", "5", "0"], correctAnswer: 1, explanation: "The array has 4 elements, so its length is 4.", points: 2 },
    { id: "arr4", question: "How do you access the last element of array A (length n) generically?", options: ["A[n]", "A[n-1]", "A[0]", "A[-n]"], correctAnswer: 1, explanation: "Last element = A[n-1] because indexing starts at 0. A[n] would be out of bounds.", points: 2 },
    { id: "arr5", question: "What is a 2D array?", options: ["An array with two data types", "An array of arrays — creates a table/grid structure", "An array with two elements", "A sorted array"], correctAnswer: 1, explanation: "A 2D array is an array where each element is itself an array — useful for grids, tables, matrices.", points: 2 },
  ],

  "functions-cs": [
    { id: "fnc1", question: "What is the difference between a function and a procedure?", options: ["Functions use loops; procedures don't", "Functions return a value; procedures don't", "Procedures are faster", "No difference"], correctAnswer: 1, explanation: "Functions return a value using return. Procedures (subroutines) execute code without returning a value.", points: 2 },
    { id: "fnc2", question: "What is a parameter?", options: ["The result of a function", "A variable that receives a value when a function is called", "A global variable", "A type of loop"], correctAnswer: 1, explanation: "Parameters are variables listed in the function definition that receive values (arguments) when the function is called.", points: 2 },
    { id: "fnc3", question: "What does 'return' do in a function?", options: ["Prints a value", "Ends the program", "Sends a value back to where the function was called", "Creates a new variable"], correctAnswer: 2, explanation: "return sends a value back from the function to the calling code and exits the function.", points: 2 },
    { id: "fnc4", question: "Why use functions in programming?", options: ["They make code longer", "To reuse code, make it readable, and break problems into smaller parts", "They are required in all programs", "To use more memory"], correctAnswer: 1, explanation: "Functions promote reusability, readability, and modular design — making programs easier to write and maintain.", points: 2 },
    { id: "fnc5", question: "What is recursion?", options: ["A loop that counts down", "A function that calls itself until a base case is reached", "A type of array", "Running code in parallel"], correctAnswer: 1, explanation: "Recursion is when a function calls itself. It needs a base case to stop — otherwise it runs infinitely.", points: 2 },
  ],

  "lan-wan": [
    { id: "nw1", question: "What does LAN stand for?", options: ["Large Area Network", "Local Area Network", "Long Address Network", "Link Access Node"], correctAnswer: 1, explanation: "LAN = Local Area Network. Covers a small area like a building, school, or home.", points: 2 },
    { id: "nw2", question: "What does WAN stand for?", options: ["Wide Area Network", "Wireless Access Node", "Web Area Network", "Wide Antenna Network"], correctAnswer: 0, explanation: "WAN = Wide Area Network. Covers large areas — the internet is the world's largest WAN.", points: 2 },
    { id: "nw3", question: "What device connects a LAN to the internet?", options: ["Switch", "Hub", "Router", "Bridge"], correctAnswer: 2, explanation: "A router connects a LAN to the internet (WAN) and directs data packets between networks.", points: 2 },
    { id: "nw4", question: "What is a star network topology?", options: ["All devices connected in a ring", "All devices connected to a central switch/hub", "All devices in a straight line", "Devices connected randomly"], correctAnswer: 1, explanation: "In a star topology, all devices connect to a central hub or switch. If one device fails, others still work.", points: 2 },
    { id: "nw5", question: "What is the main advantage of a star over bus topology?", options: ["Cheaper to set up", "More cable needed", "If one connection fails, others are unaffected", "Slower data transfer"], correctAnswer: 2, explanation: "Star topology is more reliable — a single connection failure doesn't disrupt the whole network.", points: 2 },
  ],

  /* ===================== MATHS — GEOMETRY (Topic 2) ===================== */

  "angles": [
    { id: "ang1", question: "Angles on a straight line add up to:", options: ["90°", "180°", "270°", "360°"], correctAnswer: 1, explanation: "Angles on a straight line always sum to 180°.", points: 2 },
    { id: "ang2", question: "Angles in a full turn add up to:", options: ["90°", "180°", "270°", "360°"], correctAnswer: 3, explanation: "A full turn = 360°.", points: 2 },
    { id: "ang3", question: "Angles in a triangle sum to:", options: ["90°", "180°", "270°", "360°"], correctAnswer: 1, explanation: "Interior angles of any triangle always sum to 180°.", points: 2 },
    { id: "ang4", question: "Angles in a quadrilateral sum to:", options: ["180°", "270°", "360°", "540°"], correctAnswer: 2, explanation: "Interior angles of a quadrilateral always sum to 360°.", points: 2 },
    { id: "ang5", question: "Two lines cross. One angle is 65°. The vertically opposite angle is:", options: ["25°", "65°", "115°", "125°"], correctAnswer: 1, explanation: "Vertically opposite angles are equal — both 65°.", points: 2 },
    { id: "ang6", question: "Alternate angles (Z-angles) formed by parallel lines are:", options: ["Supplementary (add to 180°)", "Equal", "Complementary (add to 90°)", "Twice each other"], correctAnswer: 1, explanation: "Alternate angles are equal — they are on opposite sides of the transversal.", points: 2 },
    { id: "ang7", question: "Co-interior angles (C-angles) on the same side of a transversal sum to:", options: ["90°", "180°", "270°", "360°"], correctAnswer: 1, explanation: "Co-interior (same side) angles add to 180°.", points: 2 },
    { id: "ang8", question: "Corresponding angles (F-angles) are:", options: ["Supplementary", "Equal", "Complementary", "Twice each other"], correctAnswer: 1, explanation: "Corresponding angles in the same position at each intersection are equal.", points: 2 },
    { id: "ang9", question: "A polygon has 6 sides. What is the sum of its interior angles?", options: ["540°", "720°", "900°", "1080°"], correctAnswer: 1, explanation: "Sum = (n − 2) × 180° = (6 − 2) × 180° = 720°.", points: 2 },
    { id: "ang10", question: "Each interior angle of a regular pentagon is:", options: ["100°", "108°", "110°", "120°"], correctAnswer: 1, explanation: "Sum = (5−2)×180° = 540°. Each angle = 540° ÷ 5 = 108°.", points: 2 },
    { id: "ang11", question: "An exterior angle of a regular hexagon is:", options: ["30°", "45°", "60°", "72°"], correctAnswer: 2, explanation: "Exterior angle = 360° ÷ 6 = 60°.", points: 2 },
    { id: "ang12", question: "In a triangle, two angles are 55° and 80°. The third angle is:", options: ["35°", "45°", "55°", "65°"], correctAnswer: 1, explanation: "180° − 55° − 80° = 45°.", points: 2 },
    { id: "ang13", question: "An isosceles triangle has one angle of 40°. If 40° is the apex angle, each base angle is:", options: ["50°", "60°", "70°", "80°"], correctAnswer: 2, explanation: "Base angles are equal: (180° − 40°) ÷ 2 = 70°.", points: 2 },
    { id: "ang14", question: "The exterior angle of a triangle equals:", options: ["The sum of adjacent interior angles", "The sum of the two non-adjacent interior angles", "The largest interior angle", "Half the interior sum"], correctAnswer: 1, explanation: "The exterior angle of a triangle = the sum of the two non-adjacent (remote interior) angles.", points: 2 },
    { id: "ang15", question: "A regular polygon has exterior angles of 24°. How many sides does it have?", options: ["12", "15", "18", "20"], correctAnswer: 1, explanation: "Number of sides = 360° ÷ exterior angle = 360° ÷ 24° = 15.", points: 2 },
  ],

  "area-perimeter": [
    { id: "ap1", question: "Area of a rectangle 8 cm × 5 cm?", options: ["26 cm²", "40 cm²", "13 cm²", "80 cm²"], correctAnswer: 1, explanation: "Area = length × width = 8 × 5 = 40 cm².", points: 2 },
    { id: "ap2", question: "Perimeter of a rectangle 8 cm × 5 cm?", options: ["13 cm", "26 cm", "40 cm", "20 cm"], correctAnswer: 1, explanation: "Perimeter = 2(l + w) = 2(8 + 5) = 26 cm.", points: 2 },
    { id: "ap3", question: "Area of a triangle with base 10 cm and height 6 cm?", options: ["60 cm²", "30 cm²", "16 cm²", "32 cm²"], correctAnswer: 1, explanation: "Area = ½ × base × height = ½ × 10 × 6 = 30 cm².", points: 2 },
    { id: "ap4", question: "Area of a circle with radius 5 cm? (π ≈ 3.14)", options: ["31.4 cm²", "78.5 cm²", "15.7 cm²", "157 cm²"], correctAnswer: 1, explanation: "A = πr² = π × 25 ≈ 78.5 cm².", points: 2 },
    { id: "ap5", question: "Circumference of a circle with diameter 10 cm? (π ≈ 3.14)", options: ["31.4 cm", "78.5 cm", "15.7 cm", "62.8 cm"], correctAnswer: 0, explanation: "C = πd = π × 10 ≈ 31.4 cm.", points: 2 },
    { id: "ap6", question: "Area of a trapezium with parallel sides 6 cm and 10 cm, height 4 cm?", options: ["40 cm²", "32 cm²", "24 cm²", "16 cm²"], correctAnswer: 1, explanation: "A = ½(a + b) × h = ½(6 + 10) × 4 = 32 cm².", points: 2 },
    { id: "ap7", question: "Area of a parallelogram with base 9 cm and height 4 cm?", options: ["26 cm²", "36 cm²", "45 cm²", "18 cm²"], correctAnswer: 1, explanation: "Area = base × height = 9 × 4 = 36 cm².", points: 2 },
    { id: "ap8", question: "A square has area 64 cm². What is its side length?", options: ["6 cm", "7 cm", "8 cm", "9 cm"], correctAnswer: 2, explanation: "Side = √64 = 8 cm.", points: 2 },
    { id: "ap9", question: "Radius of a circle with area 50.24 cm²? (π ≈ 3.14)", options: ["2 cm", "3 cm", "4 cm", "5 cm"], correctAnswer: 2, explanation: "r² = A/π = 50.24/3.14 = 16, so r = 4 cm.", points: 2 },
    { id: "ap10", question: "A compound shape is a rectangle (6 × 4) with a triangle on top (base 6, height 3). Total area?", options: ["33 cm²", "42 cm²", "48 cm²", "36 cm²"], correctAnswer: 0, explanation: "Rectangle: 6 × 4 = 24 cm². Triangle: ½ × 6 × 3 = 9 cm². Total = 33 cm².", points: 2 },
    { id: "ap11", question: "Perimeter of a semicircle with diameter 12 cm? (π ≈ 3.14)", options: ["30.84 cm", "37.68 cm", "18.84 cm", "56.52 cm"], correctAnswer: 0, explanation: "Half circumference = π × 6 ≈ 18.84 cm, plus diameter 12 cm = 30.84 cm.", points: 2 },
    { id: "ap12", question: "Area of a sector with radius 6 cm and angle 90°? (π ≈ 3.14)", options: ["9.42 cm²", "14.13 cm²", "28.26 cm²", "113.04 cm²"], correctAnswer: 2, explanation: "Area = (90/360) × π × 6² = ¼ × 113.04 ≈ 28.26 cm².", points: 2 },
  ],

  "volume": [
    { id: "vol1", question: "Volume of a cuboid 4 cm × 3 cm × 5 cm?", options: ["47 cm³", "60 cm³", "24 cm³", "12 cm³"], correctAnswer: 1, explanation: "V = l × w × h = 4 × 3 × 5 = 60 cm³.", points: 2 },
    { id: "vol2", question: "Volume of a cylinder with radius 3 cm and height 10 cm? (π ≈ 3.14)", options: ["282.6 cm³", "94.2 cm³", "188.4 cm³", "565.2 cm³"], correctAnswer: 0, explanation: "V = πr²h = π × 9 × 10 ≈ 282.6 cm³.", points: 2 },
    { id: "vol3", question: "Volume of a triangular prism with base area 15 cm² and length 8 cm?", options: ["23 cm³", "60 cm³", "90 cm³", "120 cm³"], correctAnswer: 3, explanation: "V = base area × length = 15 × 8 = 120 cm³.", points: 2 },
    { id: "vol4", question: "Volume of a cone with radius 4 cm and height 9 cm? (π ≈ 3.14)", options: ["150.72 cm³", "452.16 cm³", "602.88 cm³", "50.24 cm³"], correctAnswer: 0, explanation: "V = ⅓πr²h = ⅓ × π × 16 × 9 ≈ 150.72 cm³.", points: 2 },
    { id: "vol5", question: "Volume of a sphere with radius 3 cm? (π ≈ 3.14)", options: ["37.68 cm³", "75.36 cm³", "113.04 cm³", "226.08 cm³"], correctAnswer: 2, explanation: "V = (4/3)πr³ = (4/3) × π × 27 ≈ 113.04 cm³.", points: 2 },
    { id: "vol6", question: "Volume of a pyramid with square base 6 cm × 6 cm and height 8 cm?", options: ["288 cm³", "96 cm³", "144 cm³", "48 cm³"], correctAnswer: 1, explanation: "V = ⅓ × base area × height = ⅓ × 36 × 8 = 96 cm³.", points: 2 },
    { id: "vol7", question: "Surface area of a cube with side 4 cm?", options: ["16 cm²", "32 cm²", "64 cm²", "96 cm²"], correctAnswer: 3, explanation: "A cube has 6 faces, each 4 × 4 = 16 cm². Total = 6 × 16 = 96 cm².", points: 2 },
    { id: "vol8", question: "A cylinder has volume 314 cm³ and radius 5 cm. What is its height? (π ≈ 3.14)", options: ["2 cm", "4 cm", "6 cm", "8 cm"], correctAnswer: 1, explanation: "h = V ÷ (πr²) = 314 ÷ (3.14 × 25) = 4 cm.", points: 2 },
    { id: "vol9", question: "Units of volume are:", options: ["cm", "cm²", "cm³", "cm⁴"], correctAnswer: 2, explanation: "Volume is measured in cubic units — cm³, m³, etc.", points: 2 },
    { id: "vol10", question: "How many cm³ in 1 litre?", options: ["10", "100", "1000", "10000"], correctAnswer: 2, explanation: "1 litre = 1000 cm³ (also called 1000 millilitres).", points: 2 },
    { id: "vol11", question: "Surface area of a closed cylinder (radius 2 cm, height 5 cm)? (π ≈ 3.14)", options: ["62.8 cm²", "75.36 cm²", "87.92 cm²", "100.48 cm²"], correctAnswer: 2, explanation: "SA = 2πr² + 2πrh = 2π(4) + 2π(2)(5) = 8π + 20π = 28π ≈ 87.92 cm².", points: 2 },
    { id: "vol12", question: "Volume of a hemisphere with radius 6 cm? (π ≈ 3.14)", options: ["452.16 cm³", "226.08 cm³", "113.04 cm³", "678.24 cm³"], correctAnswer: 1, explanation: "V = ½ × (4/3)πr³ = ½ × (4/3) × π × 216 ≈ 226.08 cm³.", points: 2 },
  ],

  "pythagoras": [
    { id: "pyt1", question: "Pythagoras' theorem states:", options: ["a + b = c", "a² + b² = c²", "a² − b² = c²", "a × b = c²"], correctAnswer: 1, explanation: "a² + b² = c² where c is the hypotenuse (longest side).", points: 2 },
    { id: "pyt2", question: "In a right triangle, legs are 3 cm and 4 cm. Hypotenuse = ?", options: ["5 cm", "6 cm", "7 cm", "√7 cm"], correctAnswer: 0, explanation: "c² = 3² + 4² = 9 + 16 = 25, so c = 5 cm.", points: 2 },
    { id: "pyt3", question: "Hypotenuse is 13 cm, one leg is 5 cm. Other leg = ?", options: ["8 cm", "10 cm", "12 cm", "√194 cm"], correctAnswer: 2, explanation: "b² = 13² − 5² = 169 − 25 = 144, so b = 12 cm.", points: 2 },
    { id: "pyt4", question: "Can a triangle with sides 5, 12, 13 be right-angled?", options: ["No", "Yes, because 5² + 12² = 13²", "Yes, because 5 + 12 = 17", "Cannot tell"], correctAnswer: 1, explanation: "5² + 12² = 25 + 144 = 169 = 13². Yes, it's right-angled.", points: 2 },
    { id: "pyt5", question: "Diagonal of a square with side 6 cm? (give exact answer)", options: ["6√2 cm", "12 cm", "9 cm", "6 cm"], correctAnswer: 0, explanation: "d² = 6² + 6² = 72, so d = √72 = 6√2 cm.", points: 2 },
    { id: "pyt6", question: "In 3D: cuboid 3 × 4 × 12. Length of the space diagonal?", options: ["13 cm", "12 cm", "√153 cm", "√175 cm"], correctAnswer: 0, explanation: "d² = 3² + 4² + 12² = 9 + 16 + 144 = 169, so d = 13 cm.", points: 2 },
    { id: "pyt7", question: "Distance between points (1,1) and (4,5)?", options: ["3", "4", "5", "7"], correctAnswer: 2, explanation: "d = √((4−1)² + (5−1)²) = √(9 + 16) = √25 = 5.", points: 2 },
    { id: "pyt8", question: "A ladder 10 m long leans against a wall 6 m from the base. How high does it reach?", options: ["4 m", "6 m", "8 m", "10 m"], correctAnswer: 2, explanation: "h² = 10² − 6² = 100 − 36 = 64, so h = 8 m.", points: 2 },
    { id: "pyt9", question: "Which set of numbers is a Pythagorean triple?", options: ["2, 3, 4", "6, 8, 10", "5, 10, 13", "4, 5, 7"], correctAnswer: 1, explanation: "6² + 8² = 36 + 64 = 100 = 10². This is a valid triple.", points: 2 },
    { id: "pyt10", question: "Exact value of the hypotenuse when legs are 5 cm and 5 cm?", options: ["5√2 cm", "10 cm", "7 cm", "25 cm"], correctAnswer: 0, explanation: "c² = 25 + 25 = 50, so c = √50 = 5√2 cm.", points: 2 },
  ],

  "trigonometry": [
    { id: "trig1", question: "SOH stands for:", options: ["Sin = Opposite × Hypotenuse", "Sin = Opposite / Hypotenuse", "Sin = Opposite + Hypotenuse", "Sin = Other / Hyp"], correctAnswer: 1, explanation: "SOH: Sine = Opposite ÷ Hypotenuse.", points: 2 },
    { id: "trig2", question: "CAH stands for:", options: ["Cos = Adjacent − Hyp", "Cos = Adjacent + Hyp", "Cos = Adjacent / Hyp", "Cos = All / Hyp"], correctAnswer: 2, explanation: "CAH: Cosine = Adjacent ÷ Hypotenuse.", points: 2 },
    { id: "trig3", question: "TOA stands for:", options: ["Tan = Opposite × Adjacent", "Tan = Opposite + Adjacent", "Tan = Opposite / Adjacent", "Tan = Other / Adjacent"], correctAnswer: 2, explanation: "TOA: Tangent = Opposite ÷ Adjacent.", points: 2 },
    { id: "trig4", question: "In a right triangle, angle θ = 30°, hypotenuse = 10 cm. Opposite side = ?", options: ["3 cm", "5 cm", "7.07 cm", "8.66 cm"], correctAnswer: 1, explanation: "Opp = sin(30°) × hyp = 0.5 × 10 = 5 cm.", points: 2 },
    { id: "trig5", question: "In a right triangle, angle θ = 60°, adjacent = 6 cm. Hypotenuse = ?", options: ["3 cm", "6√3 cm", "10 cm", "12 cm"], correctAnswer: 3, explanation: "Hyp = Adj / cos(60°) = 6 / 0.5 = 12 cm.", points: 2 },
    { id: "trig6", question: "Find angle θ: opposite = 5 cm, adjacent = 5 cm.", options: ["30°", "45°", "60°", "75°"], correctAnswer: 1, explanation: "tan(θ) = 5/5 = 1, so θ = tan⁻¹(1) = 45°.", points: 2 },
    { id: "trig7", question: "sin(45°) = ", options: ["0.5", "√2/2", "√3/2", "1"], correctAnswer: 1, explanation: "sin(45°) = √2/2 ≈ 0.707.", points: 2 },
    { id: "trig8", question: "cos(60°) = ", options: ["0.5", "√2/2", "√3/2", "1"], correctAnswer: 0, explanation: "cos(60°) = 0.5.", points: 2 },
    { id: "trig9", question: "Which ratio do you use when you have Opposite and Hypotenuse?", options: ["Sine", "Cosine", "Tangent", "Any"], correctAnswer: 0, explanation: "When you have Opposite and Hypotenuse, use Sine (SOH).", points: 2 },
    { id: "trig10", question: "Adjacent = 8 cm, hyp = 10 cm. Find angle θ.", options: ["sin⁻¹(0.8)", "cos⁻¹(0.8)", "tan⁻¹(0.8)", "cos⁻¹(1.25)"], correctAnswer: 1, explanation: "cos(θ) = adj/hyp = 8/10 = 0.8, so θ = cos⁻¹(0.8) ≈ 36.9°.", points: 2 },
    { id: "trig11", question: "A 15 m ladder leans against a wall at 70° to the ground. How high up the wall does it reach?", options: ["5.1 m", "9.4 m", "12.9 m", "14.1 m"], correctAnswer: 3, explanation: "Height = 15 × sin(70°) ≈ 15 × 0.940 ≈ 14.1 m.", points: 2 },
    { id: "trig12", question: "tan(30°) = ", options: ["1/√2", "1/√3", "√3", "1"], correctAnswer: 1, explanation: "tan(30°) = 1/√3 ≈ 0.577.", points: 2 },
  ],

  /* ===================== MATHS — STATISTICS ===================== */

  "mean-median-mode": [
    { id: "mmm1", question: "Mean of 4, 7, 2, 9, 8?", options: ["5", "6", "7", "8"], correctAnswer: 1, explanation: "Sum = 30. Mean = 30 ÷ 5 = 6.", points: 2 },
    { id: "mmm2", question: "Median of 3, 7, 1, 9, 5?", options: ["3", "5", "7", "6"], correctAnswer: 1, explanation: "Ordered: 1, 3, 5, 7, 9. Middle value = 5.", points: 2 },
    { id: "mmm3", question: "Mode of 2, 4, 4, 6, 8, 4, 2?", options: ["2", "4", "6", "8"], correctAnswer: 1, explanation: "4 appears 3 times — the most frequent value, so mode = 4.", points: 2 },
    { id: "mmm4", question: "Range of 12, 7, 19, 3, 15?", options: ["12", "14", "16", "19"], correctAnswer: 2, explanation: "Range = max − min = 19 − 3 = 16.", points: 2 },
    { id: "mmm5", question: "Median of an even number of values is:", options: ["The lower middle value", "The higher middle value", "The mean of the two middle values", "The most common value"], correctAnswer: 2, explanation: "For even data sets, median = mean of the two middle values when data is ordered.", points: 2 },
    { id: "mmm6", question: "5 values sum to 40. The 5th value is 12. What is the mean of the first 4 values?", options: ["5", "7", "8", "10"], correctAnswer: 2, explanation: "Sum of first 4 = 40 − 12 = 28. Mean = 28 ÷ 4 = 7.", points: 2 },
    { id: "mmm7", question: "A data set has two modes. It is called:", options: ["Unimodal", "Bimodal", "Multimodal", "No mode"], correctAnswer: 1, explanation: "When data has exactly two modes, it is bimodal.", points: 2 },
    { id: "mmm8", question: "Which average is most affected by extreme values (outliers)?", options: ["Mode", "Median", "Mean", "Range"], correctAnswer: 2, explanation: "The mean is most affected by outliers because it uses all values in its calculation.", points: 2 },
    { id: "mmm9", question: "Mean of 10, 20, 30, 40, 50 is 30. A new value of 30 is added. New mean?", options: ["25", "28", "30", "35"], correctAnswer: 2, explanation: "Sum of 6 values = 150 + 30 = 180. New mean = 180 ÷ 6 = 30 (unchanged).", points: 2 },
    { id: "mmm10", question: "Ordered data: 2, 5, 8, 11, 14, 17. What is the median?", options: ["8", "9", "9.5", "11"], correctAnswer: 2, explanation: "Two middle values are 8 and 11. Median = (8 + 11) ÷ 2 = 9.5.", points: 2 },
    { id: "mmm11", question: "The IQR (interquartile range) is:", options: ["Q3 − Q1", "Q1 + Q3", "Q2 − Q1", "Range ÷ 2"], correctAnswer: 0, explanation: "IQR = Q3 − Q1. It measures the spread of the middle 50% of data.", points: 2 },
    { id: "mmm12", question: "Data: 3, 3, 5, 7, 7. Which average would a company prefer to advertise an employee's 'typical' salary if salaries were: £20k, £20k, £30k, £40k, £200k?", options: ["Mean", "Median", "Mode", "Range"], correctAnswer: 1, explanation: "The £200k outlier drags the mean up. The median (£30k) better represents the typical salary.", points: 2 },
  ],

  "histograms": [
    { id: "hist1", question: "In a histogram, the y-axis shows:", options: ["Frequency", "Frequency density", "Cumulative frequency", "Relative frequency"], correctAnswer: 1, explanation: "Histograms use frequency density on the y-axis, not raw frequency, to account for different class widths.", points: 2 },
    { id: "hist2", question: "Frequency density formula is:", options: ["Frequency ÷ Class Width", "Class Width ÷ Frequency", "Frequency × Class Width", "Frequency + Class Width"], correctAnswer: 0, explanation: "Frequency Density = Frequency ÷ Class Width.", points: 2 },
    { id: "hist3", question: "A class has frequency density 4 and class width 5. What is the frequency?", options: ["0.8", "1.25", "9", "20"], correctAnswer: 3, explanation: "Frequency = Frequency Density × Class Width = 4 × 5 = 20.", points: 2 },
    { id: "hist4", question: "A bar in a histogram is 3 cm wide and 6 cm tall (frequency density). Frequency = ?", options: ["2", "9", "18", "3"], correctAnswer: 2, explanation: "Frequency = Frequency Density × Class Width = 6 × 3 = 18.", points: 2 },
    { id: "hist5", question: "In a histogram, what does the AREA of each bar represent?", options: ["Frequency density", "Class width", "Frequency", "Cumulative frequency"], correctAnswer: 2, explanation: "Area = frequency density × class width = frequency. So area represents frequency.", points: 2 },
    { id: "hist6", question: "Why are frequency densities used instead of frequencies in histograms?", options: ["They are easier to calculate", "To allow fair comparison between classes of different widths", "They are always whole numbers", "To make the bars equal height"], correctAnswer: 1, explanation: "With unequal class widths, frequency density allows a fair visual comparison — otherwise wider classes would appear to have more data than they do.", points: 2 },
    { id: "hist7", question: "A histogram has bars for 0-2, 2-5, 5-10. Which class is widest?", options: ["0–2", "2–5", "5–10", "All equal"], correctAnswer: 2, explanation: "5−10 has a class width of 5; 0−2 has width 2; 2−5 has width 3.", points: 2 },
    { id: "hist8", question: "Class 10 ≤ x < 20 has frequency 30. Its frequency density is:", options: ["3", "300", "0.3", "10"], correctAnswer: 0, explanation: "FD = 30 ÷ 10 = 3.", points: 2 },
    { id: "hist9", question: "What does cumulative frequency represent?", options: ["Frequency of a single class", "Running total of frequencies up to a value", "Average frequency per class", "Number of classes"], correctAnswer: 1, explanation: "Cumulative frequency adds up all the frequencies from the start up to a given point.", points: 2 },
    { id: "hist10", question: "A cumulative frequency graph (ogive) is used to estimate:", options: ["The mode", "The mean", "The median and quartiles", "The frequency density"], correctAnswer: 2, explanation: "The ogive (cf curve) lets you estimate median (at n/2), Q1 (at n/4), Q3 (at 3n/4), and the IQR.", points: 2 },
  ],

  "box-plots": [
    { id: "bp1", question: "A box plot shows:", options: ["Only the mean", "Min, Q1, Median, Q3, Max", "Frequency of each value", "Mean and standard deviation"], correctAnswer: 1, explanation: "A box plot (box-and-whisker diagram) displays the 5-number summary: Min, Q1, Median, Q3, Max.", points: 2 },
    { id: "bp2", question: "The box in a box plot shows:", options: ["Min to max", "Q1 to Q3 (the IQR)", "Mean ± 1 standard deviation", "Lower to upper quartile around the median"], correctAnswer: 1, explanation: "The box spans from Q1 to Q3, covering the middle 50% of the data (the IQR).", points: 2 },
    { id: "bp3", question: "Q1 = 15, Q3 = 35. What is the IQR?", options: ["15", "20", "25", "35"], correctAnswer: 1, explanation: "IQR = Q3 − Q1 = 35 − 15 = 20.", points: 2 },
    { id: "bp4", question: "An outlier is often defined as a value more than:", options: ["1 × IQR from Q1 or Q3", "1.5 × IQR from Q1 or Q3", "2 × IQR from Q1 or Q3", "The range from the median"], correctAnswer: 1, explanation: "Standard definition: outlier if value < Q1 − 1.5×IQR or > Q3 + 1.5×IQR.", points: 2 },
    { id: "bp5", question: "A skewed right (positively skewed) box plot has:", options: ["A long whisker on the left", "A long whisker on the right", "Equal whiskers on both sides", "No box"], correctAnswer: 1, explanation: "Positive skew = tail stretches to the right = longer right whisker.", points: 2 },
    { id: "bp6", question: "The line inside the box of a box plot shows:", options: ["The mean", "The mode", "The median (Q2)", "The range"], correctAnswer: 2, explanation: "The line inside the box marks the median (Q2), the middle value.", points: 2 },
    { id: "bp7", question: "Two box plots are compared. Box A's box is wider than Box B's. This means:", options: ["A has a higher mean", "A has more data points", "A has a larger IQR (more spread in the middle 50%)", "A is skewed right"], correctAnswer: 2, explanation: "A wider box means a larger IQR — the middle 50% of A's data is more spread out.", points: 2 },
    { id: "bp8", question: "From a box plot: min=2, Q1=6, Q2=10, Q3=14, max=18. What is the range?", options: ["8", "12", "16", "18"], correctAnswer: 2, explanation: "Range = Max − Min = 18 − 2 = 16.", points: 2 },
    { id: "bp9", question: "What percentage of data lies within the box (Q1 to Q3)?", options: ["25%", "50%", "75%", "100%"], correctAnswer: 1, explanation: "The box covers from Q1 to Q3, which contains the middle 50% of the data.", points: 2 },
    { id: "bp10", question: "A symmetric box plot (whiskers and box equal on both sides) suggests the data is:", options: ["Positively skewed", "Negatively skewed", "Approximately normal/symmetric", "Bimodal"], correctAnswer: 2, explanation: "Equal whiskers and centred median suggests the data is roughly symmetrically distributed.", points: 2 },
  ],

  "probability-trees": [
    { id: "ptree1", question: "On a probability tree, all branches from a single point must:", options: ["Sum to 0", "Sum to 0.5", "Sum to 1", "Be equal"], correctAnswer: 2, explanation: "All branches from a single point represent all possible outcomes, so they must sum to 1.", points: 2 },
    { id: "ptree2", question: "Probability of picking a red ball (P=0.3) AND then a blue ball (P=0.4) from independent bags:", options: ["0.7", "0.12", "0.3", "0.4"], correctAnswer: 1, explanation: "For independent events: P(A and B) = P(A) × P(B) = 0.3 × 0.4 = 0.12.", points: 2 },
    { id: "ptree3", question: "Bag has 3 red, 2 blue. One taken, NOT replaced. P(red then red)?", options: ["9/25", "9/20", "6/20", "3/10"], correctAnswer: 2, explanation: "P(red then red) = 3/5 × 2/4 = 6/20 = 3/10.", points: 2 },
    { id: "ptree4", question: "P(A) = 0.6, P(B|A) = 0.4, P(B|not A) = 0.3. P(not A) = ?", options: ["0.4", "0.6", "0.3", "0.7"], correctAnswer: 0, explanation: "P(not A) = 1 − P(A) = 1 − 0.6 = 0.4.", points: 2 },
    { id: "ptree5", question: "In a two-stage tree, to find P(B) overall, you:", options: ["Add all P(B) values on the tree", "Multiply the branch probabilities and add across paths that lead to B", "Subtract from 1", "Use the largest branch probability"], correctAnswer: 1, explanation: "To find a total probability, multiply along each path to B, then add those path probabilities together.", points: 2 },
    { id: "ptree6", question: "P(A) = 0.5, P(B|A) = 0.7, P(B|A') = 0.2. P(A and B) = ?", options: ["0.35", "0.14", "0.10", "0.49"], correctAnswer: 0, explanation: "P(A and B) = P(A) × P(B|A) = 0.5 × 0.7 = 0.35.", points: 2 },
    { id: "ptree7", question: "In the same tree above, P(A' and B) = ?", options: ["0.35", "0.14", "0.10", "0.20"], correctAnswer: 2, explanation: "P(A' and B) = P(A') × P(B|A') = 0.5 × 0.2 = 0.10.", points: 2 },
    { id: "ptree8", question: "P(B) for the tree above is:", options: ["0.35 + 0.14 = 0.49", "0.35 + 0.10 = 0.45", "0.7 + 0.2 = 0.9", "0.5 + 0.1 = 0.6"], correctAnswer: 1, explanation: "P(B) = P(A and B) + P(A' and B) = 0.35 + 0.10 = 0.45.", points: 2 },
    { id: "ptree9", question: "A bag has 4 red and 6 blue balls. Two are drawn without replacement. P(both same colour)?", options: ["0.4 × 0.4", "12/90 + 30/90", "6/15", "4/10 × 3/9 + 6/10 × 5/9"], correctAnswer: 3, explanation: "P(RR) = 4/10 × 3/9 = 12/90. P(BB) = 6/10 × 5/9 = 30/90. Total = 42/90 = 7/15.", points: 2 },
    { id: "ptree10", question: "Drawing WITH replacement means:", options: ["The ball is always red", "The probabilities change for each draw", "The probabilities stay the same for each draw", "Only 2 draws are possible"], correctAnswer: 2, explanation: "With replacement: the item is put back, so the composition of the bag is the same each time — probabilities don't change.", points: 2 },
  ],

  "scatter-graphs": [
    { id: "sg1", question: "A scatter graph shows:", options: ["Frequencies of single variable", "Relationship between two variables", "Cumulative data", "Proportions of categories"], correctAnswer: 1, explanation: "A scatter graph plots pairs of data values to show the relationship between two variables.", points: 2 },
    { id: "sg2", question: "Positive correlation means:", options: ["As x increases, y decreases", "As x increases, y increases", "x and y are unrelated", "Both variables are constant"], correctAnswer: 1, explanation: "Positive correlation: as one variable increases, the other tends to increase too.", points: 2 },
    { id: "sg3", question: "Negative correlation means:", options: ["As x increases, y increases", "As x decreases, y decreases", "As x increases, y decreases", "No pattern between x and y"], correctAnswer: 2, explanation: "Negative correlation: as one variable increases, the other tends to decrease.", points: 2 },
    { id: "sg4", question: "What does a line of best fit do?", options: ["Connects all the dots", "Passes through all extreme points", "Passes as close as possible to all points, showing the trend", "Connects only the outliers"], correctAnswer: 2, explanation: "A line of best fit passes through the middle of the data, showing the overall trend.", points: 2 },
    { id: "sg5", question: "Points scattered randomly with no pattern show:", options: ["Strong positive correlation", "Strong negative correlation", "No correlation", "Perfect correlation"], correctAnswer: 2, explanation: "When points show no pattern, there is no correlation between the two variables.", points: 2 },
    { id: "sg6", question: "The value predicted from a line of best fit WITHIN the data range is called:", options: ["Extrapolation", "Interpolation", "Correlation", "Regression"], correctAnswer: 1, explanation: "Interpolation = estimating within the data range. Extrapolation = estimating beyond the data range (less reliable).", points: 2 },
    { id: "sg7", question: "Which correlation coefficient means PERFECT positive correlation?", options: ["r = 0", "r = 0.5", "r = −1", "r = 1"], correctAnswer: 3, explanation: "r = 1 means perfect positive correlation. r = −1 means perfect negative. r = 0 means no correlation.", points: 2 },
    { id: "sg8", question: "A point that doesn't fit the general pattern is called an:", options: ["Extrapolation", "Interpolation", "Outlier", "Median point"], correctAnswer: 2, explanation: "An outlier is a data point that lies well away from the general pattern of the scatter graph.", points: 2 },
    { id: "sg9", question: "Can correlation prove causation?", options: ["Yes, always", "No — correlation only shows a relationship, not cause and effect", "Only if r = 1", "Only if both variables are continuous"], correctAnswer: 1, explanation: "Correlation shows two variables are related, but it does NOT prove that one causes the other.", points: 2 },
    { id: "sg10", question: "Height vs shoe size tends to show:", options: ["No correlation", "Negative correlation", "Positive correlation", "Perfect correlation"], correctAnswer: 2, explanation: "Taller people tend to have larger feet — positive correlation (though not perfect).", points: 2 },
  ],

};

// Helper to shuffle and pick N questions
export function getQuizQuestions(subtopicId: string, count = 15): Question[] {
  const bank = QUESTION_BANK[subtopicId] ?? [];
  const shuffled = [...bank].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
