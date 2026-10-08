
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema, LoginFormData } from '@/schemas/authSchema';
import {
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
            <View className="w-full ">
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
                        <View >
                            <FloatingInput
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                placeholder="Email"
                                error={errors.email?.message}
                            />
                        </View>
                    )}
                />
                <Controller
                    control={control}
                    name="password"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <View >

                            <View >
                                <FloatingInput
                                    value={value}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    placeholder="Senha"
                                    error={errors.password?.message}
                                />
                            </View>
                        </View>
                    )}
                />
                <Pressable className="mt-[-10px] mb-6 self-end">
                    <Text className="font-semibold text-primary">
                        Esqueci minha senha
                    </Text>
                </Pressable>
                <ButtonLogin
                    text="Entrar"
                    onPress={handleSubmit(onSubmit)}
                    className="bg-primary h-16"
                    classNameText="text-lg text-white"
                />

            </View>


        </View>
    )
}