import { StatusBar } from 'expo-status-bar';
import {
  Keyboard,
  Pressable,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import '../../global.css';

import { AuthOptions } from '@/components/auth/authOptions';
import { router } from 'expo-router';
import { FormRegister } from '@/components/auth/formRegister';




export default function RegisterScreen() {


  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      accessible={false}
      className="flex-1 items-center justify-center bg-white px-6  gap-6"
    >
      <View className="flex-1 items-center justify-center bg-white -mt-10 px-6  gap-6">
        <FormRegister />
        <View className="flex flex-row items-center justify-center gap-2">
          <View className="h-[1px] w-16 bg-gray-300" />
          <Text className="text-sm font-semibold text-gray-500">Ou</Text>
          <View className="h-[1px] w-16 bg-gray-300" />
        </View>

        <AuthOptions guest={true} />
        <View className="flex flex-row items-center justify-center gap-2">
          <Text className="text-center text-base max-w-xs font-semibold ">
            Já possui uma conta?{' '}
          </Text>
          <Pressable onPress={() => router.push('/Auth/Login')}>
            <Text className="text-primary font-bold">Entrar</Text>
          </Pressable>
        </View>
        <StatusBar style="auto" />
      </View>

    </TouchableWithoutFeedback>
  );
}