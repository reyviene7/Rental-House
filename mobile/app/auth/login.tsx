// app/(auth)/login.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Home, User, Mail, Lock } from 'lucide-react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';

// ———— FORM VALIDATION SCHEMA ————
const loginSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginScreen() {
  const [role, setRole] = useState<'owner' | 'renter'>('owner');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: '', password: '' },
  });

  // ———— HANDLE LOGIN ————
  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    try {
      // In real app: map username → email via Firestore lookup or use email directly
      const email = `${data.username}@rentsync.app`; // temp mapping
      await signInWithEmailAndPassword(auth, email, data.password);

      // Navigate based on role (you'll enhance with custom claims)
      router.replace(role === 'owner' ? '/admin' : '/client');
    } catch (error: any) {
      alert(error.message || 'Login failed');
    } finally {
      setLoading(false);
      reset();
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            paddingHorizontal: 24, // px-6 => 24
          }}
        >
          {/* Header */}
          <Text className="text-5xl font-bold text-white text-center mb-10 mt-8">
            Sign Up!
          </Text>

          {/* Role Toggle */}
          <View className="flex-row bg-[#1A1A1A] rounded-2xl p-1 mb-8">
            <TouchableOpacity
              onPress={() => setRole('owner')}
              className={`flex-1 flex-row items-center justify-center py-4 rounded-xl space-x-2 ${
                role === 'owner' ? 'bg-[#2A2A2A]' : ''
              }`}
            >
              <Home size={20} color={role === 'owner' ? 'white' : '#888'} />
              <Text
                className={`font-medium ${
                  role === 'owner' ? 'text-white' : 'text-gray-500'
                }`}
              >
                Owner
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setRole('renter')}
              className={`flex-1 flex-row items-center justify-center py-4 rounded-xl space-x-2 ${
                role === 'renter' ? 'bg-[#2A2A2A]' : ''
              }`}
            >
              <User size={20} color={role === 'renter' ? 'white' : '#888'} />
              <Text
                className={`font-medium ${
                  role === 'renter' ? 'text-white' : 'text-gray-500'
                }`}
              >
                Renter
              </Text>
            </TouchableOpacity>
          </View>

          {/* Form */}
          <View className="space-y-5">
            {/* Username */}
            <Controller
              control={control}
              name="username"
              render={({ field }) => (
                <View>
                  <Text className="text-sm text-gray-400 mb-1">Username</Text>
                  <View className="flex-row items-center bg-[#1A1A1A] rounded-lg px-4 h-12">
                    <Mail size={18} color="#888" className="mr-3" />
                    <TextInput
                      {...field}
                      placeholder="you_now_apelop"
                      placeholderTextColor="#666"
                      className="flex-1 text-white"
                      autoCapitalize="none"
                      onChangeText={field.onChange}
                    />
                  </View>
                  {errors.username && (
                    <Text className="text-red-500 text-xs mt-1">
                      {errors.username.message}
                    </Text>
                  )}
                </View>
              )}
            />

            {/* Password */}
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <View>
                  <Text className="text-sm text-gray-400 mb-1">Password</Text>
                  <View className="flex-row items-center bg-[#1A1A1A] rounded-lg px-4 h-12">
                    <Lock size={18} color="#888" className="mr-3" />
                    <TextInput
                      {...field}
                      placeholder="••••••••••••"
                      placeholderTextColor="#666"
                      secureTextEntry
                      className="flex-1 text-white"
                      onChangeText={field.onChange}
                    />
                  </View>
                  {errors.password && (
                    <Text className="text-red-500 text-xs mt-1">
                      {errors.password.message}
                    </Text>
                  )}
                </View>
              )}
            />
          </View>

          {/* Info Section */}
          <View className="mt-10 space-y-6">
            <View>
              <Text className="text-white font-semibold mb-2">Sign In</Text>
              <Text className="text-gray-400 text-sm leading-5">
                <Text className="font-medium text-white">Owners</Text>
                {'\n'}
                Create account by invite personal inform.
                {'\n'}
                <Text className="text-gray-500">
                  Name: Email, EmailInd Phone
                </Text>
              </Text>
            </View>

            <View>
              <Text className="text-gray-400 text-sm leading-5">
                <Text className="font-medium text-white">Renters</Text>
                {'\n'}
                Receive account from owners to access the access platform's
                satures.
              </Text>
            </View>
          </View>

          {/* Sign Up Button */}
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            disabled={loading}
            className="mt-10 bg-white rounded-full py-4 items-center justify-center"
          >
            <Text className="text-black font-bold text-lg">
              {loading ? 'Signing In...' : 'Sign Up'}
            </Text>
          </TouchableOpacity>

          {/* Footer Link */}
          <View className="mt-6 items-center">
            <Text className="text-gray-500 text-xs">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-white underline">
                Log in
              </Link>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}