// Dummy sentiment analysis function to simulate backend functionality
// In a real app, this would make a fetch request to a backend service
// that uses the trained ML model for sentiment analysis

export function analyzeSentiment(text: string): {
  score: number;
  label: string;
} {
  // Simple rule-based algorithm to simulate sentiment scoring
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
  ];

  const lowerText = text.toLowerCase();
  let positiveCount = 0;
  let negativeCount = 0;

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

  // Check for negations (simple approach)
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
  ];

  negations.forEach((negation: string) => {
    const regex = new RegExp(
      `${negation} [a-z]+ (${positiveWords.join('|')})`,
      'gi'
    );
    const matches = lowerText.match(regex);
    if (matches) {
      // Reduce positive count and increase negative for negated positive words
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

  // Adjust based on sentiment amplifiers
  const amplifiers: string[] = [
    'very',
    'extremely',
    'really',
    'so',
    'absolutely',
    'completely',
    'totally',
  ];
  let amplifierCount = 0;

  amplifiers.forEach((amplifier: string) => {
    const regex = new RegExp(`\\b${amplifier}\\b`, 'gi');
    const matches = lowerText.match(regex);
    if (matches) {
      amplifierCount += matches.length;
    }
  });

  // Amplify the deviation from neutral (0.5)
  if (amplifierCount > 0 && score !== 0.5) {
    const deviation = score - 0.5;
    const amplification = Math.min(amplifierCount * 0.1, 0.3); // Cap the amplification
    score = 0.5 + deviation * (1 + amplification);
  }

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
