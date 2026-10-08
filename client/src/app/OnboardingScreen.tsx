import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef } from 'react';
import {
  FlatList,
  Image,
  Pressable,
  Text,
  useWindowDimensions,
  View,
  Platform

} from 'react-native';
import '../global.css'


import { ButtonLogin } from '@/components/ui/buttons';
import { DataItem } from '@/data/loginData';
import { data } from '@/utils/loginUtil';
import { AppleIcon, UserIcon } from '@/utils/buttonLoginUtil';
import { router } from 'expo-router';



export default function OnboardingScreen() {
  const { width } = useWindowDimensions();
  const itemWidth = Math.max(width - 48, 0);
  const listRef = useRef<FlatList<DataItem>>(null);
  const currentIndexRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndexRef.current + 1) % data.length;

      listRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
      currentIndexRef.current = nextIndex;

    }, 5000);

    return () => clearInterval(interval);
  }, [data.length]);

  const renderItem = ({ item }: { item: DataItem }) => (
    <View
      className="w-full max-w-md flex flex-col items-center justify-center"
      style={{ width: itemWidth }}
    >
      <Image
        source={item.image}
        className="w-full  h-96"
      />
      <Text className="text-center text-3xl font-bold text-primary">
        {item.title}
      </Text>
      <Text className="text-center text-base max-w-xs font-semibold mt-2">
        {item.description}
      </Text>
    </View>
  );

  return (
    <View className="flex-1 items-center justify-between px-6 bg-white py-16">
      <FlatList
        ref={listRef}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        className="w-full"
        contentContainerStyle={{ alignItems: 'center' }}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onMomentumScrollEnd={(event) => {
          const index = Math.round(
            event.nativeEvent.contentOffset.x / itemWidth
          );
          currentIndexRef.current = index;

        }}

      />

      <View className="max-w-2xl w-full flex flex-col items-center justify-center gap-4 ">
        <ButtonLogin
          icon={require('../../src/images/icons/google.png')}
          text="Continue com Google"
          onPress={() => console.log('Google login pressed')}
          className={Platform.OS === 'android' ? 'bg-tertiary' : 'bg-quaternary'}
        />

        <ButtonLogin
          icon={AppleIcon}
          text="Continue como Apple"
          onPress={() => console.log('Google login pressed')}
          className={Platform.OS === 'ios' ? 'bg-tertiary' : 'bg-quaternary'}
        />

        <ButtonLogin
          icon={UserIcon}
          text="Continue como Convidado"
          className="bg-quaternary"
          onPress={() => console.log('Google login pressed')}
        />
        <View className="flex flex-row items-center justify-center gap-2">
          <Text className="text-center text-base max-w-xs font-semibold ">
            Já possui uma conta?{' '}
          </Text>
          <Pressable onPress={() => router.push('/Auth/Login')}>
            <Text className="text-primary font-bold">Entrar</Text>
          </Pressable>
        </View>
      </View>


      <StatusBar style="auto" />
    </View>
  );
}
