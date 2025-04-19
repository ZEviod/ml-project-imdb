// Dummy sentiment analysis function to simulate backend functionality
// In a real app, this would make a fetch request to a backend service
// that uses the trained ML model for sentiment analysis

export function analyzeSentiment(text: string): {
  score: number;
  label: string;
} {
  // Rule-based algorithm for general sentiment analysis
  // This is just for demo purposes; a real app would use a trained model API

  const positiveWords: string[] = [
    'good',
    'great',
    'excellent',
    'amazing',
    'wonderful',
    'best',
    'love',
    'perfect',
    'fantastic',
    'outstanding',
    'awesome',
    'terrific',
    'delightful',
    'happy',
    'pleased',
    'joy',
    'enjoyable',
    'superb',
    'impressive',
    'positive',
    'satisfied',
    'pleased',
    'thrilled',
    'ecstatic',
    'fabulous',
    'brilliant',
    'exceptional',
    'incredible',
    'marvelous',
    'splendid',
  ];

  const negativeWords: string[] = [
    'bad',
    'terrible',
    'awful',
    'horrible',
    'worst',
    'poor',
    'hate',
    'disappointing',
    'mediocre',
    'subpar',
    'negative',
    'dislike',
    'unfortunate',
    'sad',
    'unhappy',
    'frustrating',
    'disappointed',
    'waste',
    'annoying',
    'failure',
    'awful',
    'dreadful',
    'miserable',
    'unpleasant',
    'unsatisfactory',
    'inferior',
    'lousy',
    'unacceptable',
    'disgusting',
    'repulsive',
  ];

  const sentimentAmplifiers: { [key: string]: number } = {
    very: 0.2,
    extremely: 0.3,
    really: 0.15,
    so: 0.15,
    absolutely: 0.25,
    completely: 0.2,
    totally: 0.2,
    incredibly: 0.25,
    exceptionally: 0.25,
    particularly: 0.15,
    especially: 0.15,
    remarkably: 0.2,
  };

  const lowerText = text.toLowerCase();
  let positiveCount = 0;
  let negativeCount = 0;
  let amplifierScore = 0;

  // Count positive and negative words
  positiveWords.forEach((word: string) => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    const matches = lowerText.match(regex);
    if (matches) {
      positiveCount += matches.length;
    }
  });

  negativeWords.forEach((word: string) => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    const matches = lowerText.match(regex);
    if (matches) {
      negativeCount += matches.length;
    }
  });

  // Check for sentiment amplifiers
  Object.entries(sentimentAmplifiers).forEach(([amplifier, weight]) => {
    const regex = new RegExp(`\\b${amplifier}\\b`, 'gi');
    const matches = lowerText.match(regex);
    if (matches) {
      amplifierScore += weight * matches.length;
    }
  });

  // Check for negations
  const negations: string[] = [
    'not',
    'no',
    'never',
    "don't",
    "doesn't",
    "didn't",
    'cannot',
    "can't",
    "won't",
    'hardly',
    'barely',
    'scarcely',
    'seldom',
    'rarely',
  ];

  negations.forEach((negation: string) => {
    const regex = new RegExp(
      `${negation} [a-z]+ (${positiveWords.join('|')})`,
      'gi'
    );
    const matches = lowerText.match(regex);
    if (matches) {
      positiveCount -= matches.length;
      negativeCount += matches.length;
    }
  });

  // Calculate base score (0-1 scale)
  let totalWords = positiveCount + negativeCount;
  let score = 0.5; // Default neutral

  if (totalWords > 0) {
    score = positiveCount / totalWords;
  }

  // Add amplifier score
  score = Math.max(0, Math.min(1, score + amplifierScore));

  // Add randomness to simulate ML variability
  const randomness = Math.random() * 0.1 - 0.05; // ±0.05
  score = Math.max(0, Math.min(1, score + randomness));

  // Determine label
  let label = 'Neutral';
  if (score >= 0.65) {
    label = 'Positive';
  } else if (score <= 0.35) {
    label = 'Negative';
  }

  return { score, label };
}
