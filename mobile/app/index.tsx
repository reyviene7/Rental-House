// app/index.tsx
import { useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { router } from 'expo-router';
import { useAuthStore } from '@/stores/authStore';
import Animated, {
  FadeIn,
  FadeInDown,
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated';

export default function WelcomeScreen() {
  const { loading } = useAuthStore();

  // Auto-redirect after 2.5s if not loading
  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        router.replace('/auth/login');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  const logoScale = useSharedValue(0.8);

  useEffect(() => {
    logoScale.value = withTiming(1, { duration: 800 });
  }, []);

  const animatedLogoStyle = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value }],
  }));

  return (
    <View className="flex-1 bg-black justify-center items-center px-8">
      {/* Animated Logo */}
      <Animated.View
        entering={FadeIn.duration(600)}
        style={animatedLogoStyle}
        className="mb-8"
      >
        <View className="w-32 h-32 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl items-center justify-center shadow-2xl">
          <Text className="text-white text-5xl font-bold">RS</Text>
        </View>
      </Animated.View>

      {/* App Name */}
      <Animated.Text
        entering={FadeInDown.delay(300).duration(600)}
        className="text-5xl font-bold text-white tracking-tight"
      >
        RentSync
      </Animated.Text>

      {/* Tagline */}
      <Animated.Text
        entering={FadeInDown.delay(500).duration(600)}
        className="text-lg text-gray-400 mt-3 text-center"
      >
        Bills in sync. Homes in harmony.
      </Animated.Text>

      {/* Loading Indicator */}
      {loading && (
        <Animated.View
          entering={FadeInDown.delay(800).duration(600)}
          className="mt-12"
        >
          <View className="flex-row space-x-2">
            {[0, 1, 2].map((i) => (
              <View
                key={i}
                className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 150}ms` }}
              />
            ))}
          </View>
        </Animated.View>
      )}
    </View>
  );
}