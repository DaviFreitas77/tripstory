import React, { useEffect, useRef } from 'react';
import {
  Animated,
  KeyboardTypeOptions,
  Text,
  TextInput,
  View,
} from 'react-native';

interface FloatingInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onBlur: () => void;
  placeholder?: string;
  error?: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
}

export function FloatingInput({
  value,
  onChangeText,
  onBlur,
  secureTextEntry = false,
  keyboardType = 'default',
  placeholder = 'Email',
  error,
}: FloatingInputProps) {
  const [focused, setFocused] = React.useState(false);

  const animatedValue = useRef(
    new Animated.Value(value ? 1 : 0)
  ).current;

  const isFloating = focused || value.length > 0;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isFloating ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFloating]);

  const labelTop = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [18, -9],
  });

  const labelFontSize = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [16, 12],
  });

  const labelColor = focused ? '#000' : '#6B7280';

  return (
    <View className="mb-2 flex flex-col justify-center items-center w-full">
      <View className="relative w-full max-w-2xl">
        <Animated.Text
          style={{
            position: 'absolute',
            left: 20,
            top: labelTop,
            fontSize: labelFontSize,
            color: labelColor,
            backgroundColor: '#fff',
            paddingHorizontal: 5,
            zIndex: 10,
          }}
        >
          {placeholder}
        </Animated.Text>

        <TextInput
          className={`h-16 w-full text-base rounded-full border px-5 mb-5 ${
            focused
              ? 'border-black'
              : 'border-gray-300'
          }`}
          style={{ paddingVertical: 0, textAlignVertical: 'center' }}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
            onBlur();
          }}
          keyboardType={keyboardType}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      {/* <View className="w-full max-w-2xl mb-2">
        <Text
          className="mt-1 h-.5 text-start px-4 text-sm text-red-500"
          style={{ opacity: error ? 1 : 0 }}
          accessibilityElementsHidden={!error}
        >
          {error || ' '}
        </Text>
      </View> */}
    </View>
  );
}