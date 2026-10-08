import { Platform, Pressable, View, Text } from "react-native";
import { ButtonLogin } from "../ui/buttons";
import { AppleIcon, UserIcon } from "@/utils/buttonLoginUtil";
import { router } from "expo-router";

interface AuthOptionsProps {
    guest:boolean;
}
export function AuthOptions({ guest }: AuthOptionsProps) {
    return (

        <View className=" max-w-2xl w-full flex flex-col items-center justify-center gap-4 ">
            <ButtonLogin
                icon={require('../../../src/images/icons/google.png')}
                text="Continue com Google"
                onPress={() => console.log('Google login pressed')}
                className={Platform.OS === 'android' ? 'bg-tertiary' : 'bg-quaternary'}
            />

            <ButtonLogin
                icon={AppleIcon}
                text="Continue com Apple"
                onPress={() => console.log('Google login pressed')}
                className={Platform.OS === 'ios' ? 'bg-tertiary' : 'bg-quaternary'}
            />

            <ButtonLogin
                icon={UserIcon}
                text="Continue como Convidado"
                className={`bg-quaternary ${guest ? 'hidden' : ''}`}
                onPress={() => console.log('Google login pressed')}
            />

        </View>



    );

}