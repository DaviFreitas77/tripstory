import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Modal,
  Platform,
  Pressable,
  Text,
  View,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface FloatingDateInputProps {
  value: string;
  onChange: (date: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  error?: string;
}

export function FloatingDateInput({
  value,
  onChange,
  onBlur,
  placeholder = 'Data de nascimento',
  error,
}: FloatingDateInputProps) {
  const [focused, setFocused] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  const [tempDate, setTempDate] = useState(
    value ? new Date(value) : new Date()
  );

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

  const formattedDate = value
    ? new Date(value).toLocaleDateString('pt-BR')
    : '';

  function openPicker() {
    setTempDate(value ? new Date(value) : new Date());
    setFocused(true);
    setShowPicker(true);
  }

  function handleChange(
    event: any,
    selectedDate?: Date
  ) {
    if (Platform.OS === 'android') {
      setShowPicker(false);

      if (event.type === 'set' && selectedDate) {
        onChange(selectedDate.toISOString());
        setFocused(false);
        onBlur?.();
      }

      return;
    }

    if (selectedDate) {
      setTempDate(selectedDate);
    }
  }

  function cancel() {
    setShowPicker(false);

    if (!value) {
      setFocused(false);
    }

    onBlur?.();
  }

  function confirm() {
    onChange(tempDate.toISOString());
    setShowPicker(false);
    setFocused(false);
    onBlur?.();
  }

  return (
    <View className="mb-2 flex flex-col justify-center items-center w-full">

      {/* INPUT */}

      <View className="relative max-w-2xl w-full">
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

        <Pressable
          onPress={openPicker}
          className={`h-16 w-full justify-center rounded-full border px-5 ${
            focused
              ? 'border-black'
              : 'border-gray-300'
          }`}
        >
          <Text
            className={
              value
                ? 'text-base text-black'
                : 'text-base text-gray-400'
            }
          >
            {formattedDate}
          </Text>
        </Pressable>
      </View>

      {/* ERROR */}

      <Text
        className="mt-1 px-4 text-sm text-red-500"
        style={{ opacity: error ? 1 : 0 }}
      >
        {error || ' '}
      </Text>

      {/* PICKER */}

      {Platform.OS === 'android' && showPicker ? (
        <DateTimePicker
          value={tempDate}
          mode="date"
          onChange={handleChange}
          themeVariant="light"
        />
      ) : null}

      {Platform.OS === 'ios' ? (
        <Modal
          visible={showPicker}
          transparent
          animationType="slide"
          onRequestClose={cancel}
        >
          <View className="flex-1 justify-end">
            <Pressable
              onPress={cancel}
              className="absolute inset-0 bg-black/40"
            />

            <View className="rounded-t-[32px] bg-white px-5 pb-8 pt-4">
              <View className="mb-5 h-1 w-10 self-center rounded-full bg-gray-300" />

              <View className="mb-2 flex-row items-center justify-between">
                <Pressable onPress={cancel}>
                  <Text className="text-base font-medium text-gray-500">
                    Cancelar
                  </Text>
                </Pressable>

                <Text className="text-base font-bold text-black">
                  {placeholder}
                </Text>

                <Pressable onPress={confirm}>
                  <Text className="text-base font-bold text-primary">
                    OK
                  </Text>
                </Pressable>
              </View>

              <View className="items-center">
                <DateTimePicker
                  value={tempDate}
                  mode="date"
                  display="spinner"
                  onChange={handleChange}
                  themeVariant="light"
                />
              </View>
            </View>
          </View>
        </Modal>
      ) : null}
    </View>
  );
}