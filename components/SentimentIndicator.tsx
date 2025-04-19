import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

interface SentimentIndicatorProps {
  score: number; // 0 to 1
  label: string;
}

export const SentimentIndicator: React.FC<SentimentIndicatorProps> = ({
  score,
  label,
}) => {
  const progress = useSharedValue(0);
  const scale = useSharedValue(0.95);

  // Animate the indicator when score changes
  useEffect(() => {
    progress.value = withTiming(score, { 
      duration: 1000, 
      easing: Easing.bezierFn(0.16, 1, 0.3, 1) 
    });
    
    scale.value = withSequence(
      withTiming(1.05, { duration: 400, easing: Easing.out(Easing.back()) }),
      withTiming(1, { duration: 300 })
    );
  }, [score]);

  // Animated styles for the progress bar
  const progressStyle = useAnimatedStyle(() => {
    return {
      width: `${progress.value * 100}%`,
    };
  });

  // Animated style for the score container
  const scoreContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });
  
  // Get color based on score
  const getColor = () => {
    if (score >= 0.7) return ['#10B981', '#059669']; // Very positive
    if (score >= 0.5) return ['#3B82F6', '#1D4ED8']; // Positive
    if (score >= 0.4) return ['#A3A3A3', '#737373']; // Neutral
    if (score >= 0.3) return ['#F97316', '#EA580C']; // Negative
    return ['#EF4444', '#B91C1C']; // Very negative
  };

  // Get emoji based on score
  const getEmoji = () => {
    if (score >= 0.7) return '😄'; // Very positive
    if (score >= 0.5) return '🙂'; // Positive
    if (score >= 0.4) return '😐'; // Neutral
    if (score >= 0.3) return '🙁'; // Negative
    return '😞'; // Very negative
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.scoreContainer, scoreContainerStyle]}>
        <LinearGradient
          colors={getColor()}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.scoreGradient}
        >
          <Text style={styles.emoji}>{getEmoji()}</Text>
          <Text style={styles.score}>{Math.round(score * 100)}%</Text>
          <Text style={styles.label}>{label}</Text>
        </LinearGradient>
      </Animated.View>
      
      <View style={styles.barContainer}>
        <View style={styles.barBackground} />
        <Animated.View style={[styles.barProgress, progressStyle]}>
          <LinearGradient
            colors={getColor()}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.barGradient}
          />
        </Animated.View>
        
        {/* Scale markers */}
        <View style={styles.markers}>
          <Text style={styles.markerText}>Negative</Text>
          <Text style={styles.markerText}>Positive</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  scoreContainer: {
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  scoreGradient: {
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  emoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  score: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  barContainer: {
    width: '100%',
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    position: 'relative',
  },
  barBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
  },
  barProgress: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    borderRadius: 4,
  },
  barGradient: {
    flex: 1,
  },
  markers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingHorizontal: 4,
  },
  markerText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#64748B',
  },
});