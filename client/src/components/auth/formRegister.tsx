
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RegisterFormData, registerSchema } from '@/schemas/authSchema';
import {
    Platform,
    Pressable,
    Text,
    View,
} from 'react-native';
import { ButtonLogin } from '../ui/buttons';
import { FloatingInput } from '../ui/floatingInput';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FloatingDateInput } from '../ui/dateInput';

export function FormRegister() {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: yupResolver(registerSchema),
        defaultValues: {
            email: '',
            password: '',
            name: '',
            dateOfBirth: new Date("2004-07-27"),
        },
    });

    const onSubmit = (data: RegisterFormData) => {
        console.log(data);
    };
    return (
        <View
            className=" w-full  items-center justify-between ">
            <View className="w-full ">
                <Text className="mb-2 text-3xl font-bold text-primary text-center">
                    Comece sua jornada !
                </Text>
                <Text className="mb-14 text-base text-secondary text-center">
                    Crie sua conta e comece a guardar suas memórias.
                </Text>

                <Controller
                    control={control}
                    name="name"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <View >
                            <FloatingInput
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                placeholder="Nome"

                            />
                        </View>
                    )}
                />

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

                            />
                        </View>
                    )}
                />
                <Controller
                    control={control}
                    name="dateOfBirth"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <View >
                            <FloatingDateInput
                                value={value.toString()}
                                onChange={onChange}
                                onBlur={onBlur}
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


                                />
                            </View>
                        </View>
                    )}
                />

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