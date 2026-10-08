import { StatusBar } from 'expo-status-bar';
import {
  Keyboard,
  Pressable,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import '../../global.css';
import { FormLogin } from '@/components/auth/formLogin';
import { AuthOptions } from '@/components/auth/authOptions';
import { router } from 'expo-router';



export default function LoginScreen() {
  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      accessible={false}
      className="flex-1 items-center justify-center bg-white px-6  gap-6"
    >
      <View className="flex-1 items-center justify-center bg-white -mt-10 px-6  gap-6">
        <FormLogin />
        <View className="flex flex-row items-center justify-center gap-2">
          <View className="h-[1px] w-16 bg-gray-300" />
          <Text className="text-sm font-semibold text-gray-500">Ou</Text>
          <View className="h-[1px] w-16 bg-gray-300" />
        </View>

        <AuthOptions  guest={false} />
        <View className="flex flex-row items-center justify-center gap-2">
          <Text className="text-center text-base max-w-xs font-semibold ">
            Não possui uma conta?{' '}
          </Text>
          <Pressable onPress={() => router.push('/Auth/Register')}>
            <Text className="text-primary font-bold">Registrar-se</Text>
          </Pressable>
        </View>
        <StatusBar style="auto" />
      </View>

    </TouchableWithoutFeedback>
  );
}