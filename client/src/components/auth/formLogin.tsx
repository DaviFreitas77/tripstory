
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema, LoginFormData } from '@/schemas/authSchema';
import {
    Button,
    Keyboard,
    Pressable,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { ButtonLogin } from '../ui/buttons';
import { FloatingInput } from '../ui/floatingInput';

export function FormLogin() {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: yupResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });
    
    const onSubmit = (data: LoginFormData) => {
        console.log(data);
    };

    return (
        <View
            className="relative w-full items-center justify-between" >
            <View className="w-full max-w-2xl flex flex-col items-center justify-center">
                <Text className="mb-2 text-3xl font-bold text-primary text-center">
                    Bem vindo de volta!
                </Text>
                <Text className="mb-14 text-base text-secondary text-center">
                    Suas histórias de viagem estão esperando por você
                </Text>

                <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <View className="w-full">
                            <FloatingInput
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                placeholder="Email"
                                keyboardType="email-address"
                                error={errors.email?.message}
                            />
                        </View>
                    )}
                />

                <Controller
                    control={control}
                    name="password"
                    render={({ field: { onChange, onBlur, value, } }) => (
                        <View className="w-full">
                            <FloatingInput
                                value={value}
                                onChangeText={onChange}
                                secureTextEntry={true}
                                onBlur={onBlur}
                                placeholder="Senha"
                                keyboardType="default"
                                error={errors.password?.message}
                            />
                        </View>
                    )}
                />
                <ButtonLogin onPress={handleSubmit(onSubmit)} text="Entrar" className="w-full bg-primary h-16" classNameText='font-bold text-white text-lg' />


            </View>


        </View>
    )
}