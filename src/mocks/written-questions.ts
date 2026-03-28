export interface ShortQuestion {
  id: string;
  question: string;
  type: "short";
  sampleAnswer: string;
  markingPoints: string[];
  points: 2;
  subjectId: string;
}

export interface LongQuestion {
  id: string;
  question: string;
  type: "long";
  sampleAnswer: string;
  markingPoints: string[];
  points: 3;
  subjectId: string;
}

export interface EssayQuestion {
  id: string;
  question: string;
  type: "essay";
  sampleAnswer: string;
  minWords: number;
  keyPoints: string[];
  points: number;
  subjectId: string;
}

/* ======================== SHORT ANSWER QUESTIONS ======================== */

export const SHORT_QUESTIONS: ShortQuestion[] = [
  /* MATHS */
  { id: "sm1", subjectId: "maths", type: "short", points: 2, question: "A rectangle has length 9 cm and width 4 cm. Calculate its area and perimeter.", sampleAnswer: "Area = 9 × 4 = 36 cm². Perimeter = 2(9 + 4) = 26 cm.", markingPoints: ["Area = 36 cm²", "Perimeter = 26 cm"] },
  { id: "sm2", subjectId: "maths", type: "short", points: 2, question: "Solve the equation: 4x + 3 = 19.", sampleAnswer: "4x = 16, so x = 4.", markingPoints: ["4x = 16", "x = 4"] },
  { id: "sm3", subjectId: "maths", type: "short", points: 2, question: "Find the gradient of the line passing through points (2, 5) and (6, 13).", sampleAnswer: "Gradient = (13 − 5) ÷ (6 − 2) = 8 ÷ 4 = 2.", markingPoints: ["Correct gradient formula applied", "Gradient = 2"] },
  { id: "sm4", subjectId: "maths", type: "short", points: 2, question: "A bag contains 4 red, 3 blue and 3 green balls. What is the probability of picking a red ball?", sampleAnswer: "P(red) = 4/10 = 2/5 = 0.4", markingPoints: ["Correct fraction 4/10", "Simplified to 2/5 or 0.4"] },
  { id: "sm5", subjectId: "maths", type: "short", points: 2, question: "Expand and simplify: 3(x + 4) − 2(x − 1).", sampleAnswer: "3x + 12 − 2x + 2 = x + 14.", markingPoints: ["Correctly expands brackets", "x + 14"] },
  { id: "sm6", subjectId: "maths", type: "short", points: 2, question: "The nth term of a sequence is 5n − 2. Find the 8th term.", sampleAnswer: "5(8) − 2 = 40 − 2 = 38.", markingPoints: ["Substitutes n = 8", "Answer 38"] },
  { id: "sm7", subjectId: "maths", type: "short", points: 2, question: "Calculate the mean of: 6, 9, 12, 7, 11.", sampleAnswer: "Mean = (6 + 9 + 12 + 7 + 11) ÷ 5 = 45 ÷ 5 = 9.", markingPoints: ["Sum = 45", "Mean = 9"] },
  { id: "sm8", subjectId: "maths", type: "short", points: 2, question: "Factorise fully: 6x² + 9x.", sampleAnswer: "3x(2x + 3)", markingPoints: ["Common factor 3x taken out", "3x(2x + 3)"] },
  { id: "sm9", subjectId: "maths", type: "short", points: 2, question: "Express 0.000047 in standard form.", sampleAnswer: "4.7 × 10⁻⁵", markingPoints: ["4.7 × 10⁻⁵"] },
  { id: "sm10", subjectId: "maths", type: "short", points: 2, question: "A car travels 150 miles in 2.5 hours. Calculate its average speed.", sampleAnswer: "Speed = 150 ÷ 2.5 = 60 mph.", markingPoints: ["Speed = distance ÷ time", "60 mph"] },

  /* ENGLISH LANGUAGE */
  { id: "sel1", subjectId: "english-lang", type: "short", points: 2, question: "Identify the technique used in: 'The wind whispered through the trees.' Explain its effect in two sentences.", sampleAnswer: "Personification — the wind is given the human ability to whisper. This creates a quiet, mysterious atmosphere as though nature itself is communicating.", markingPoints: ["Correctly identifies personification", "Explains the atmospheric or emotive effect"] },
  { id: "sel2", subjectId: "english-lang", type: "short", points: 2, question: "What is the difference between a simile and a metaphor? Give one example of each.", sampleAnswer: "A simile compares using 'like' or 'as' (e.g. 'as brave as a lion'). A metaphor says something IS something else (e.g. 'he was a lion in battle').", markingPoints: ["Correct definition of simile with example", "Correct definition of metaphor with example"] },
  { id: "sel3", subjectId: "english-lang", type: "short", points: 2, question: "From the phrase 'She sat alone, her hands trembling,' what can we infer about the character?", sampleAnswer: "We can infer she is nervous, frightened or emotionally distressed. The trembling hands suggest a physical response to a strong emotion.", markingPoints: ["Valid inference (nervous/scared/distressed)", "Linked to evidence from the phrase"] },
  { id: "sel4", subjectId: "english-lang", type: "short", points: 2, question: "Give two features of a formal letter that distinguish it from an informal one.", sampleAnswer: "Formal letters use a professional address/date at the top, formal salutation ('Dear Sir/Madam'), formal register, and sign off 'Yours faithfully/sincerely'.", markingPoints: ["One valid formal feature", "Second distinct formal feature"] },
  { id: "sel5", subjectId: "english-lang", type: "short", points: 2, question: "What is the effect of using a rhetorical question in a persuasive text?", sampleAnswer: "A rhetorical question engages the reader directly, making them consider an idea without expecting a reply. It creates emphasis and nudges the reader toward the writer's viewpoint.", markingPoints: ["Engages/involves the reader", "Creates emphasis or persuasive effect"] },
  { id: "sel6", subjectId: "english-lang", type: "short", points: 2, question: "What technique is being used in: 'The massive, monstrous, menacing machine'?", sampleAnswer: "Alliteration — the repetition of the 'm' sound at the start of multiple words. This creates a heavy, threatening rhythm that emphasises the machine's dangerous nature.", markingPoints: ["Identifies alliteration", "Effect: threatening/heavy/emphasises danger"] },

  /* ENGLISH LITERATURE */
  { id: "slit1", subjectId: "english-lit", type: "short", points: 2, question: "How does Shakespeare present Lady Macbeth as ambitious in Act 1? Use one quotation.", sampleAnswer: "Lady Macbeth calls on supernatural spirits to 'unsex me here' and 'fill me from the crown to the toe top-full of direst cruelty.' This shows her extreme ambition — she wants to rid herself of any compassion that might prevent her from seizing power.", markingPoints: ["Valid quotation from Act 1", "Linked to theme of ambition with explanation"] },
  { id: "slit2", subjectId: "english-lit", type: "short", points: 2, question: "What does the dagger hallucination in Macbeth suggest about his mental state?", sampleAnswer: "The dagger hallucination suggests Macbeth is suffering profound guilt and psychological anxiety before the murder. It shows his tortured conscience making him see things that aren't real.", markingPoints: ["Identifies hallucination as psychological/guilt-related", "Links to mental deterioration or tortured conscience"] },
  { id: "slit3", subjectId: "english-lit", type: "short", points: 2, question: "State two ways in which the Jacobean audience would have found Macbeth shocking.", sampleAnswer: "Killing a king violated the Divine Right of Kings — a sin against God. Additionally, showing witches on stage tapped into very real contemporary fears about the supernatural, especially given King James I's obsession with witchcraft.", markingPoints: ["Regicide violating Divine Right", "Witchcraft being a genuine contemporary fear"] },

  /* BIOLOGY */
  { id: "sbio1", subjectId: "biology", type: "short", points: 2, question: "State two differences between a plant cell and an animal cell.", sampleAnswer: "Plant cells have a cell wall (made of cellulose) and chloroplasts; animal cells do not. Plant cells also have a permanent vacuole, which animal cells lack.", markingPoints: ["Cell wall / chloroplasts absent in animal cells", "Permanent vacuole absent in animal cells"] },
  { id: "sbio2", subjectId: "biology", type: "short", points: 2, question: "Describe what happens during osmosis.", sampleAnswer: "Osmosis is the movement of water molecules from a region of higher water potential (more dilute) to a region of lower water potential (more concentrated) through a partially permeable membrane.", markingPoints: ["Water moves down concentration gradient", "Through partially permeable membrane"] },
  { id: "sbio3", subjectId: "biology", type: "short", points: 2, question: "What is the function of mitochondria in a cell?", sampleAnswer: "Mitochondria are the site of aerobic respiration. They produce ATP (energy) from glucose and oxygen, providing energy for all cellular processes.", markingPoints: ["Site of aerobic respiration", "Produces ATP/energy"] },
  { id: "sbio4", subjectId: "biology", type: "short", points: 2, question: "Give two ways the digestive system is adapted to absorb nutrients efficiently.", sampleAnswer: "The small intestine has villi and microvilli that massively increase surface area for absorption. Additionally, a rich blood supply maintains the concentration gradient for rapid diffusion.", markingPoints: ["Villi/microvilli increase surface area", "Rich blood supply maintains concentration gradient"] },
  { id: "sbio5", subjectId: "biology", type: "short", points: 2, question: "State the word equation for aerobic respiration.", sampleAnswer: "Glucose + Oxygen → Carbon dioxide + Water (+ energy released as ATP).", markingPoints: ["Correct reactants (glucose + oxygen)", "Correct products (CO₂ + water)"] },

  /* CHEMISTRY */
  { id: "sch1", subjectId: "chemistry", type: "short", points: 2, question: "An element has 11 protons and a mass number of 23. How many neutrons and electrons does a neutral atom have?", sampleAnswer: "Neutrons = 23 − 11 = 12. Electrons = 11 (same as protons in a neutral atom).", markingPoints: ["Neutrons = 12", "Electrons = 11"] },
  { id: "sch2", subjectId: "chemistry", type: "short", points: 2, question: "Describe what happens when sodium reacts with water.", sampleAnswer: "Sodium floats on the water and reacts vigorously, producing hydrogen gas and sodium hydroxide solution. The heat produced may ignite the hydrogen, causing it to burn with a small flame.", markingPoints: ["Produces hydrogen gas", "Produces sodium hydroxide / exothermic / vigorous reaction"] },
  { id: "sch3", subjectId: "chemistry", type: "short", points: 2, question: "What is the difference between an ionic bond and a covalent bond?", sampleAnswer: "Ionic bonding involves the transfer of electrons between a metal and non-metal, forming oppositely charged ions attracted by electrostatic forces. Covalent bonding involves the sharing of electrons between two non-metals.", markingPoints: ["Ionic: electron transfer, between metal and non-metal", "Covalent: electron sharing, between non-metals"] },
  { id: "sch4", subjectId: "chemistry", type: "short", points: 2, question: "What does pH measure and what are the pH values for acids, neutral, and alkalis?", sampleAnswer: "pH measures hydrogen ion concentration. Acids have pH below 7, neutral substances have pH = 7, and alkalis have pH above 7.", markingPoints: ["pH measures H⁺ ion concentration", "Correct classification: acid <7, neutral = 7, alkali >7"] },

  /* PHYSICS */
  { id: "sphy1", subjectId: "physics", type: "short", points: 2, question: "A force of 450 N acts on a 90 kg object. Calculate the acceleration.", sampleAnswer: "a = F ÷ m = 450 ÷ 90 = 5 m/s².", markingPoints: ["Uses F = ma correctly", "a = 5 m/s²"] },
  { id: "sphy2", subjectId: "physics", type: "short", points: 2, question: "State Newton's Third Law and give a real-life example.", sampleAnswer: "For every action, there is an equal and opposite reaction. Example: when you push on the ground with your feet, the ground pushes back upwards on you with equal force.", markingPoints: ["Correct statement of Third Law", "Valid real-life example"] },
  { id: "sphy3", subjectId: "physics", type: "short", points: 2, question: "A wave has frequency 50 Hz and wavelength 4 m. Calculate its wave speed.", sampleAnswer: "v = f × λ = 50 × 4 = 200 m/s.", markingPoints: ["Uses v = fλ correctly", "v = 200 m/s"] },
  { id: "sphy4", subjectId: "physics", type: "short", points: 2, question: "What is the difference between series and parallel circuits?", sampleAnswer: "In a series circuit, components are connected in one loop — current is the same everywhere but voltage is shared. In a parallel circuit, components are on separate branches — voltage is the same across each branch but current splits.", markingPoints: ["Series: same current, shared voltage", "Parallel: same voltage, split current"] },

  /* HISTORY */
  { id: "shi1", subjectId: "history", type: "short", points: 2, question: "Give two reasons why hyperinflation occurred in Germany in 1923.", sampleAnswer: "Germany printed more money to pay war reparations (following the French and Belgian occupation of the Ruhr after Germany defaulted), causing the currency to collapse in value.", markingPoints: ["Government printed excessive money", "Reparations burden / Ruhr occupation"] },
  { id: "shi2", subjectId: "history", type: "short", points: 2, question: "What was the significance of the Reichstag Fire of 1933 for Hitler's rise to power?", sampleAnswer: "Hitler used the fire to claim a communist uprising was planned. He pressured Hindenburg to sign the Reichstag Fire Decree, suspending civil liberties and allowing mass arrests of communist opponents.", markingPoints: ["Used to justify emergency decree/suspension of civil liberties", "Enabled arrest of political opponents"] },

  /* ECONOMICS */
  { id: "sec1", subjectId: "economics", type: "short", points: 2, question: "Define opportunity cost and give an example.", sampleAnswer: "Opportunity cost is the value of the next best alternative foregone when making a decision. For example, if the government spends £5bn on hospitals, the opportunity cost might be new schools that could have been built instead.", markingPoints: ["Correct definition: next best alternative forgone", "Valid economic example"] },
  { id: "sec2", subjectId: "economics", type: "short", points: 2, question: "What happens to the demand curve if consumers' incomes rise (for a normal good)?", sampleAnswer: "The demand curve shifts rightward (increases). With higher income, consumers can afford to buy more of the good at every price level.", markingPoints: ["Demand curve shifts right", "Because consumers can afford more / income effect"] },

  /* BUSINESS */
  { id: "sbus1", subjectId: "business", type: "short", points: 2, question: "What are the four elements of the Marketing Mix (4Ps)?", sampleAnswer: "Product, Price, Place, and Promotion. Together they form the strategy a business uses to market its goods or services to customers.", markingPoints: ["All four Ps named correctly", "Brief explanation of mix concept"] },
  { id: "sbus2", subjectId: "business", type: "short", points: 2, question: "Explain the difference between fixed costs and variable costs.", sampleAnswer: "Fixed costs stay the same regardless of output level (e.g. rent, salaries). Variable costs change directly with output (e.g. raw materials, packaging).", markingPoints: ["Fixed costs: don't change with output, example", "Variable costs: change with output, example"] },
];

/* ======================== LONG ANSWER QUESTIONS ======================== */

export const LONG_QUESTIONS: LongQuestion[] = [
  /* MATHS */
  { id: "lm1", subjectId: "maths", type: "long", points: 3, question: "A car travels 90 miles at 60 mph then a further 60 miles at 40 mph. Calculate the total journey time and the average speed for the whole journey.", sampleAnswer: "Time 1 = 90/60 = 1.5 hrs. Time 2 = 60/40 = 1.5 hrs. Total time = 3 hrs. Total distance = 150 miles. Average speed = 150/3 = 50 mph.", markingPoints: ["Correct time for each leg", "Total time = 3 hours", "Average speed = 50 mph"] },
  { id: "lm2", subjectId: "maths", type: "long", points: 3, question: "Solve the simultaneous equations: 3x + 2y = 17 and 5x − 2y = 7. Show all working.", sampleAnswer: "Adding both equations: 8x = 24, x = 3. Substituting: 3(3) + 2y = 17, 9 + 2y = 17, 2y = 8, y = 4. Solution: x = 3, y = 4.", markingPoints: ["Correct elimination step", "x = 3", "y = 4"] },
  { id: "lm3", subjectId: "maths", type: "long", points: 3, question: "The circumference of a circle is 62.8 cm. Find the radius and then the area of the circle. Give answers to 1 decimal place. (π ≈ 3.14)", sampleAnswer: "C = 2πr → 62.8 = 2 × 3.14 × r → r = 62.8/6.28 = 10 cm. Area = πr² = 3.14 × 100 = 314.0 cm².", markingPoints: ["Correctly uses C = 2πr to find radius = 10 cm", "Correctly uses A = πr²", "Area = 314.0 cm²"] },
  { id: "lm4", subjectId: "maths", type: "long", points: 3, question: "Using the quadratic formula, solve: 2x² + 5x − 3 = 0. Give your answers to 2 decimal places.", sampleAnswer: "a=2, b=5, c=−3. Discriminant = 25 + 24 = 49. x = (−5 ± 7)/4. x = 2/4 = 0.5 or x = −12/4 = −3.", markingPoints: ["Correctly identifies a, b, c and uses formula", "x = 0.5", "x = −3"] },

  /* ENGLISH LANGUAGE */
  { id: "lel1", subjectId: "english-lang", type: "long", points: 3, question: "Analyse the effect of the following sentence: 'The old house stood like a broken tooth against the grey November sky.' Comment on technique, effect, and what it suggests about the setting.", sampleAnswer: "The simile 'like a broken tooth' is striking — it's an unexpected, uncomfortable comparison that suggests decay, ugliness, and damage. The house is personified as wounded. The 'grey November sky' creates a cold, desolate atmosphere that reinforces the sense of abandonment. Together, these create a tone of menace and neglect.", markingPoints: ["Identifies technique (simile) correctly", "Explains the effect: decay/ugliness/discomfort", "Comments on atmosphere created by the wider sentence"] },
  { id: "lel2", subjectId: "english-lang", type: "long", points: 3, question: "Explain three features of persuasive writing and why each one is effective.", sampleAnswer: "1) Rhetorical questions engage readers directly, making them feel involved and nudging agreement. 2) Emotive language creates strong feelings (e.g. 'innocent victims') that bypass rational thinking. 3) Facts and statistics lend authority and make the argument seem evidence-based.", markingPoints: ["First feature clearly explained with effect", "Second feature clearly explained with effect", "Third feature clearly explained with effect"] },
  { id: "lel3", subjectId: "english-lang", type: "long", points: 3, question: "What makes narrative writing effective? Explain three key techniques a writer should use to engage their reader.", sampleAnswer: "Effective narrative uses: 1) A strong opening that hooks the reader (in medias res, intriguing character, mystery). 2) Vivid descriptive language using figurative techniques to help readers visualise the world. 3) Carefully paced structure with tension, revelation or turning points to maintain engagement.", markingPoints: ["Technique 1 named and explained effectively", "Technique 2 named and explained effectively", "Technique 3 named and explained effectively"] },

  /* ENGLISH LITERATURE */
  { id: "llit1", subjectId: "english-lit", type: "long", points: 3, question: "How does Shakespeare use the witches in Act 1 of Macbeth to establish the theme of appearance vs reality? Refer to specific language.", sampleAnswer: "The witches open with the paradox 'Fair is foul, and foul is fair' — establishing immediately that things are not what they seem. Their ambiguous prophecies appear promising but conceal destruction, embodying the theme. The word 'fair' connotes beauty and truth while 'foul' suggests corruption; by conflating them, Shakespeare signals that the morally good and evil will be indistinguishable.", markingPoints: ["References 'Fair is foul' paradox correctly", "Explains what the paradox means thematically", "Close language analysis of specific words"] },
  { id: "llit2", subjectId: "english-lit", type: "long", points: 3, question: "How does Shakespeare present Macbeth's psychological deterioration between Act 2 and Act 5?", sampleAnswer: "In Act 2, Macbeth is wracked with guilt — hallucinating the dagger and unable to say 'Amen.' By Act 3, he orders Banquo's murder with cold efficiency. By Act 5, he is nihilistic — 'Life is a tale told by an idiot.' This arc shows ambition destroying his humanity and moral compass.", markingPoints: ["Reference to Act 2 with evidence", "Reference to middle acts showing escalation", "Reference to Act 5 showing complete moral collapse"] },

  /* BIOLOGY */
  { id: "lbio1", subjectId: "biology", type: "long", points: 3, question: "Describe the role of enzymes in digestion, including where specific enzymes act and what they break down.", sampleAnswer: "Amylase (produced in the salivary glands and pancreas) breaks down starch into sugars in the mouth and small intestine. Proteases (e.g. pepsin in the stomach) break down proteins into amino acids. Lipase (from the pancreas) breaks down lipids into fatty acids and glycerol in the small intestine.", markingPoints: ["Amylase: location and substrate/product", "Protease: location and substrate/product", "Lipase: location and substrate/product"] },
  { id: "lbio2", subjectId: "biology", type: "long", points: 3, question: "Explain the process of natural selection using an example.", sampleAnswer: "Natural selection occurs when variation exists in a population. Individuals with advantageous traits (e.g. antibiotic-resistant bacteria) are more likely to survive, reproduce, and pass on their advantageous alleles. Over generations, the proportion with the advantageous trait increases. Example: bacteria with random mutations for antibiotic resistance survive treatment and reproduce, making the whole population resistant.", markingPoints: ["Variation exists in population", "Those with advantageous traits survive and reproduce more", "Advantageous traits inherited by offspring over generations"] },

  /* CHEMISTRY */
  { id: "lch1", subjectId: "chemistry", type: "long", points: 3, question: "Explain how ionic bonds are formed between sodium and chlorine to form sodium chloride. Include details about electron transfer.", sampleAnswer: "Sodium (atomic number 11) has one outer electron; chlorine has seven outer electrons and needs one more to complete its shell. Sodium transfers its outer electron to chlorine. Sodium becomes Na⁺ (positive ion) and chlorine becomes Cl⁻ (negative ion). The oppositely charged ions are held together by strong electrostatic attraction — this is the ionic bond.", markingPoints: ["Sodium loses one electron → Na⁺", "Chlorine gains one electron → Cl⁻", "Electrostatic attraction between opposite ions"] },
  { id: "lch2", subjectId: "chemistry", type: "long", points: 3, question: "Describe and explain the trend in reactivity down Group 1 (alkali metals). Refer to electron structure.", sampleAnswer: "Reactivity increases down Group 1 (Li < Na < K < Rb). As you go down, each element has more electron shells — the outer electron is further from the nucleus and shielded by more inner electrons. This means the nuclear attraction on the outer electron is weaker, so it is lost more easily in reactions, making the element more reactive.", markingPoints: ["Reactivity increases down Group 1", "More electron shells / outer electron further from nucleus", "Less nuclear attraction / more shielding → easier to lose electron"] },

  /* PHYSICS */
  { id: "lph1", subjectId: "physics", type: "long", points: 3, question: "A ball is dropped from rest and falls freely for 3 seconds (g = 10 m/s²). Calculate the velocity after 3 seconds and the distance fallen. Show all working.", sampleAnswer: "v = u + at = 0 + 10 × 3 = 30 m/s. Distance: s = ut + ½at² = 0 + ½ × 10 × 9 = 45 m.", markingPoints: ["v = 30 m/s using v = u + at", "Uses s = ut + ½at²", "s = 45 m"] },
  { id: "lph2", subjectId: "physics", type: "long", points: 3, question: "Explain what is meant by terminal velocity and how a falling skydiver reaches it. Describe what happens to forces during the fall.", sampleAnswer: "When a skydiver first jumps, gravity (weight) is much larger than air resistance, so they accelerate downwards. As speed increases, air resistance increases too. Eventually, air resistance equals weight — the resultant force is zero. By Newton's First Law, the skydiver then continues at constant velocity: this is terminal velocity.", markingPoints: ["Initially weight > air resistance → acceleration", "As speed increases, air resistance increases", "At terminal velocity: air resistance = weight, resultant force = 0, constant speed"] },

  /* HISTORY */
  { id: "lhi1", subjectId: "history", type: "long", points: 3, question: "Explain why the Weimar Republic was unstable in its early years (1919–1923). Give three specific reasons.", sampleAnswer: "1) The 'stab in the back' myth led many Germans to distrust the new government, which had signed the humiliating Armistice. 2) The harsh Treaty of Versailles — reparations, loss of territory, military restrictions — caused economic strain and national resentment. 3) Proportional representation led to fragile coalition governments that struggled to take decisive action, making the Republic seem weak.", markingPoints: ["Stab in the back / lack of legitimacy", "Treaty of Versailles burdens", "Proportional representation / political instability"] },

  /* ECONOMICS */
  { id: "lec1", subjectId: "economics", type: "long", points: 3, question: "Explain using a diagram what happens to price and quantity when the government imposes a tax on a good. What are the effects on consumers and producers?", sampleAnswer: "A tax shifts the supply curve leftward (tax = added cost to producers). This raises the equilibrium price and reduces the equilibrium quantity. Consumers pay a higher price; producers receive less per unit after the tax. The tax revenue goes to government. There is a welfare loss (deadweight loss) as fewer mutually beneficial transactions occur.", markingPoints: ["Supply curve shifts left / price rises / quantity falls", "Consumers pay higher price", "Producers receive less (after tax) / deadweight loss mentioned"] },

  /* BUSINESS */
  { id: "lbu1", subjectId: "business", type: "long", points: 3, question: "Analyse the advantages and disadvantages of a business using penetration pricing when launching a new product.", sampleAnswer: "Advantages: A low initial price attracts a large market share quickly, undercutting competitors and getting consumers to try the product. It can also deter new entrants. Disadvantages: Low prices reduce profit margins initially, which may not cover launch costs. When prices are raised later, brand-loyal customers may react negatively. The product may also be seen as low-quality.", markingPoints: ["At least one clear advantage explained", "At least one clear disadvantage explained", "Both sides evaluated in context"] },
];

/* ======================== ESSAY QUESTIONS ======================== */

export const ESSAY_QUESTIONS: EssayQuestion[] = [
  /* ENGLISH LITERATURE */
  {
    id: "ees1", subjectId: "english-lit", type: "essay", points: 12, minWords: 300,
    question: "How does Shakespeare present the theme of ambition in Macbeth? Explore how this theme is developed through characters, language, and dramatic structure.",
    sampleAnswer: "Shakespeare presents ambition as a destructive force that corrupts even honourable men. Macbeth begins as a 'brave' and 'valiant' warrior — his ambition is initially modest. However, the witches' prophecies awaken his 'vaulting ambition' (Act 1, Sc 7), and Lady Macbeth accelerates this by attacking his masculinity. The word 'vaulting' is crucial — it suggests ambition that leaps beyond reason and control...",
    keyPoints: ["Ambition presented as destructive/corrupting force", "Analysis of Macbeth's character change", "Role of Lady Macbeth in accelerating ambition", "Key quotations analysed with language focus", "How the play's structure shows consequences of ambition"]
  },
  {
    id: "ees2", subjectId: "english-lit", type: "essay", points: 12, minWords: 300,
    question: "How does Shakespeare present the relationship between Macbeth and Lady Macbeth? How does it change throughout the play?",
    sampleAnswer: "At the start, Lady Macbeth appears to be the dominant partner — she reads his letter and immediately plans to 'chastise' his 'milk of human kindness.' She uses emotional manipulation and gender-based insults to push him toward murder...",
    keyPoints: ["Lady Macbeth dominant in Act 1", "Manipulation through gender and emotion", "Their relationship after Duncan's murder", "Macbeth becomes more independent and cold", "Lady Macbeth's psychological breakdown in Act 5"]
  },
  {
    id: "ees3", subjectId: "english-lit", type: "essay", points: 12, minWords: 300,
    question: "How does the context of Jacobean England shape the themes and dramatic impact of Macbeth? Consider witchcraft, the divine right of kings, and contemporary anxieties.",
    sampleAnswer: "Written in 1606, Macbeth speaks directly to Jacobean preoccupations. King James I had written Daemonologie about witchcraft, making the three witches immediately relevant and frightening...",
    keyPoints: ["King James I and witchcraft context", "Divine Right of Kings / regicide as ultimate sin", "Gunpowder Plot of 1605 / political anxiety", "Great Chain of Being disrupted", "How context heightens dramatic impact"]
  },

  /* ENGLISH LANGUAGE */
  {
    id: "eel1", subjectId: "english-lang", type: "essay", points: 12, minWords: 350,
    question: "Write a vivid descriptive piece about a place that holds a special memory for you. Use a range of language techniques.",
    sampleAnswer: "The old bookshop smells of stories — of yellowed pages and ambition. It is small and overcrowded, every shelf groaning under the weight of a thousand imagined worlds...",
    keyPoints: ["Engages the senses (sight, smell, sound, touch)", "Uses figurative language (metaphor, simile, personification)", "Creates a clear atmosphere/mood", "Varied sentence structures for effect", "Shows rather than tells"]
  },
  {
    id: "eel2", subjectId: "english-lang", type: "essay", points: 12, minWords: 350,
    question: "Write a persuasive article for a school magazine arguing that schools should reduce homework and invest more in physical activity. Include evidence and rhetorical devices.",
    sampleAnswer: "Every evening, across the country, students sit hunched over desks, sacrificing sleep, social connection, and sunshine for worksheets. But what if this mountain of homework is making us worse, not better?...",
    keyPoints: ["Clear thesis/argument maintained throughout", "Uses rhetorical questions and direct address", "Includes evidence or statistics (can be invented)", "Considers counter-argument and refutes it", "Varied persuasive techniques: rule of three, anecdote, emotive language"]
  },

  /* HISTORY */
  {
    id: "ehi1", subjectId: "history", type: "essay", points: 15, minWords: 400,
    question: "To what extent was the Great Depression the main reason for Hitler's rise to power by 1933? Consider multiple factors in your response.",
    sampleAnswer: "The Great Depression was certainly the single most important factor enabling Hitler's rise to power. Before 1929, the Nazi Party had only 2.6% of the vote. But with 6 million unemployed by 1932, desperate Germans turned to extremist solutions...",
    keyPoints: ["The Great Depression as primary cause", "Nazi propaganda and ideology (Goebbels' role)", "Weaknesses of Weimar Republic (proportional representation)", "Von Papen/Hindenburg miscalculation", "Nazi street violence and intimidation", "Balanced conclusion evaluating relative importance"]
  },
  {
    id: "ehi2", subjectId: "history", type: "essay", points: 15, minWords: 400,
    question: "How did Nazi Germany control and manipulate its population between 1933 and 1939? Evaluate the methods used.",
    sampleAnswer: "The Nazi regime maintained control through a combination of propaganda, fear, indoctrination, and terror. Goebbels' Ministry of Propaganda controlled all media — newspapers, radio, film — projecting an image of a unified, strong Germany...",
    keyPoints: ["Propaganda and media control (Goebbels)", "Terror and fear (SS, Gestapo, concentration camps)", "Youth indoctrination (Hitler Youth, League of German Girls)", "Legal changes removing freedoms (Enabling Act)", "Volksgemeinschaft and appealing to national pride"]
  },

  /* ECONOMICS */
  {
    id: "eec1", subjectId: "economics", type: "essay", points: 15, minWords: 400,
    question: "Evaluate the view that free market economies always lead to better economic outcomes than planned economies. Use economic theory and real-world examples.",
    sampleAnswer: "Free market economies, where prices are determined by supply and demand with minimal government intervention, have produced remarkable growth in countries like the United States and Singapore. However, they also generate significant inequalities and market failures...",
    keyPoints: ["Advantages of free markets: efficiency, consumer choice, innovation, price signals", "Disadvantages: inequality, market failure, public goods underprovision", "Advantages of planned economies: equity, stability in essentials", "Real-world examples (USSR collapse, Scandinavian mixed economies)", "Balanced conclusion: most economies are mixed"]
  },

  /* BIOLOGY */
  {
    id: "ebio1", subjectId: "biology", type: "essay", points: 12, minWords: 300,
    question: "Discuss the ethical issues surrounding the use of embryonic stem cells in medical research and treatment. Consider both sides of the argument.",
    sampleAnswer: "Stem cells have extraordinary potential — they can theoretically develop into any cell type in the body, offering treatments for conditions like Parkinson's, diabetes, and spinal injury. However, using embryonic stem cells raises profound ethical questions...",
    keyPoints: ["Medical benefits of stem cell therapy", "Embryonic stem cells: ethical objections (destruction of embryo)", "Counter-arguments: embryos from IVF would be discarded anyway", "Adult stem cells as alternative", "Regulation and ethical oversight needed", "Personal viewpoint acknowledged"]
  },

  /* MATHS */
  {
    id: "emth1", subjectId: "maths", type: "essay", points: 10, minWords: 250,
    question: "Explain, using examples, how quadratic equations can be solved using three different methods. Discuss which method is most efficient in different situations.",
    sampleAnswer: "Quadratic equations (ax² + bx + c = 0) can be solved by factorising, completing the square, or using the quadratic formula. Factorising is fastest when the equation factors neatly into integers...",
    keyPoints: ["Factorising: method explained with example", "Completing the square: method explained with example", "Quadratic formula: method explained with correct formula", "Comparison of when each method is most efficient", "Discriminant mentioned and its significance explained"]
  },
];

/* Helper function to get written questions for mock exam by subject */
export function getWrittenQuestionsForSubjects(
  subjectIds: string[],
  shortCount: number,
  longCount: number,
  essayCount: number
): { shorts: ShortQuestion[]; longs: LongQuestion[]; essays: EssayQuestion[] } {
  const filterBySubject = <T extends { subjectId: string }>(arr: T[]) =>
    subjectIds.length === 0 ? arr : arr.filter((q) => subjectIds.includes(q.subjectId));

  const shuffle = <T>(arr: T[]) => [...arr].sort(() => Math.random() - 0.5);

  const shorts = shuffle(filterBySubject(SHORT_QUESTIONS)).slice(0, shortCount);
  const longs = shuffle(filterBySubject(LONG_QUESTIONS)).slice(0, longCount);
  const essays = shuffle(filterBySubject(ESSAY_QUESTIONS)).slice(0, essayCount);

  return { shorts, longs, essays };
}
