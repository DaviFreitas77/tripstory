import {
  Image,
  ImageRequireSource,
  Text,
  TouchableOpacity,
} from "react-native";
import { SvgProps } from "react-native-svg";

type Icon = ImageRequireSource | React.FC<SvgProps>;

interface ButtonLoginProps {
  icon?: Icon;
  text: string;
  onPress: () => void;
  className?: string;
  classNameText?: string;
}

export function ButtonLogin({
  icon,
  text,
  onPress,
  className = "",
  classNameText = "",
}: ButtonLoginProps) {
  const isSvg = typeof icon === "function";

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      className={`w-full flex-row items-center justify-center rounded-full   py-3 ${className}`}
    >
      {icon && (
        isSvg ? (
          (() => {
            const Icon = icon;
            return <Icon width={40} height={40} />;
          })()
        ) : (
          <Image
            source={icon}
            className="h-10 w-10"
            resizeMode="contain"
          />
        )
      )}

      <Text
        className={`text-lg font-semibold ${classNameText} ${icon ? "ml-2 text-black" : "flex-1 text-center text-black"
          }`}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}