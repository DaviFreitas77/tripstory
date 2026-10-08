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
import { AuthOptions } from '@/components/auth/authOptions';



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
      className="w-full flex flex-col items-center justify-center"
      style={{ width: itemWidth }}
    >
      <Image
        source={item.image}
        className="w-full aspect-[4/3] max-h-96"
        resizeMode="contain"
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
    <View className="flex-1 flex items-center justify-center px-6 bg-white py-16 
     md:py-36 ">
      <View className='w-full flex flex-col justify-center items-center gap-16'>
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
        <AuthOptions guest={false} />
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
    </View>
  );
}
