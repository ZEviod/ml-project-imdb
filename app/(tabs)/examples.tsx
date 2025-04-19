import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ExternalLink, ThumbsUp, ThumbsDown } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Components
import { MainLayout } from '@/components/MainLayout';
import { useTheme } from '@/contexts/ThemeContext';

export default function ExamplesScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { darkMode } = useTheme();

  const categoryExamples = [
    {
      category: 'Product Reviews',
      examples: [
        {
          text: 'This product exceeded all my expectations. The quality is outstanding and customer service was excellent!',
          sentiment: 'positive',
        },
        {
          text: "I'm extremely disappointed with this purchase. It broke after one week and customer service was unhelpful.",
          sentiment: 'negative',
        },
      ],
    },
    {
      category: 'Restaurant Feedback',
      examples: [
        {
          text: 'The food was delicious and the staff was very friendly. Will definitely come back again!',
          sentiment: 'positive',
        },
        {
          text: "Poor service, mediocre food, and overpriced. I wouldn't recommend this place to anyone.",
          sentiment: 'negative',
        },
      ],
    },
    {
      category: 'Movie Reviews',
      examples: [
        {
          text: "A masterpiece of storytelling with stunning visuals and a compelling screenplay. One of the best films I've seen this year!",
          sentiment: 'positive',
        },
        {
          text: 'This movie was a complete waste of time. Predictable plot, wooden acting and terrible dialogue.',
          sentiment: 'negative',
        },
      ],
    },
    {
      category: 'Social Media Comments',
      examples: [
        {
          text: 'This post made my day! So inspiring and uplifting! Thanks for sharing!',
          sentiment: 'positive',
        },
        {
          text: 'What a terrible take. This is exactly the kind of content that ruins platforms like this.',
          sentiment: 'negative',
        },
      ],
    },
  ];

  const handleTryExample = (text: string) => {
    // Navigate to analysis screen with the example text
    router.push({
      pathname: '/',
      params: { text },
    });
  };

  return (
    <MainLayout
      title="Examples"
      subtitle="See how sentiment analysis works with these examples"
      darkMode={darkMode}
    >
      <ScrollView
        style={[styles.scrollView, darkMode && styles.darkScrollView]}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 24 },
        ]}
      >
        <View
          style={[
            styles.instructionContainer,
            darkMode && styles.darkInstructionContainer,
          ]}
        >
          <Text
            style={[
              styles.instructionText,
              darkMode && styles.darkInstructionText,
            ]}
          >
            Tap on any example to see how our sentiment analysis works. These
            examples show how the analyzer detects positive and negative
            sentiment in different contexts.
          </Text>
        </View>

        <View style={styles.categoriesContainer}>
          {categoryExamples.map((category, index) => (
            <View
              key={index}
              style={[
                styles.categorySection,
                darkMode && styles.darkCategorySection,
              ]}
            >
              <LinearGradient
                colors={
                  darkMode ? ['#1E293B', '#0F172A'] : ['#1E40AF', '#3B82F6']
                }
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.categoryHeader}
              >
                <Text style={styles.categoryTitle}>{category.category}</Text>
              </LinearGradient>

              {category.examples.map((example, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={[
                    styles.exampleCard,
                    darkMode && styles.darkExampleCard,
                  ]}
                  onPress={() => handleTryExample(example.text)}
                >
                  <View style={styles.exampleContent}>
                    <View style={styles.sentimentIndicator}>
                      {example.sentiment === 'positive' ? (
                        <ThumbsUp size={18} color="#10B981" />
                      ) : (
                        <ThumbsDown size={18} color="#EF4444" />
                      )}
                    </View>
                    <Text
                      style={[
                        styles.exampleText,
                        darkMode && styles.darkExampleText,
                      ]}
                    >
                      {example.text}
                    </Text>
                  </View>
                  <View style={styles.tryButtonContainer}>
                    <Text
                      style={[
                        styles.tryButtonText,
                        darkMode && styles.darkTryButtonText,
                      ]}
                    >
                      Try It
                    </Text>
                    <ExternalLink
                      size={14}
                      color={darkMode ? '#60A5FA' : '#1E40AF'}
                    />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  darkScrollView: {
    backgroundColor: '#0F172A',
  },
  scrollContent: {
    paddingBottom: 24,
  },
  instructionContainer: {
    backgroundColor: '#F0F9FF',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
  },
  darkInstructionContainer: {
    backgroundColor: '#1E293B',
    borderLeftColor: '#60A5FA',
  },
  instructionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 22,
    color: '#334155',
  },
  darkInstructionText: {
    color: '#E2E8F0',
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  categorySection: {
    marginBottom: 24,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  darkCategorySection: {
    backgroundColor: '#1E293B',
    shadowOpacity: 0.2,
  },
  categoryHeader: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  categoryTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  exampleCard: {
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    padding: 16,
  },
  darkExampleCard: {
    borderBottomColor: '#334155',
  },
  exampleContent: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  sentimentIndicator: {
    width: 30,
    marginRight: 8,
    alignItems: 'center',
    paddingTop: 2,
  },
  exampleText: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 20,
    color: '#334155',
  },
  darkExampleText: {
    color: '#E2E8F0',
  },
  tryButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  tryButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#1E40AF',
    marginRight: 4,
  },
  darkTryButtonText: {
    color: '#60A5FA',
  },
});
