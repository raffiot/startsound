import { IPressableProps, Pressable, Text } from "native-base";

export type SubmitProps = {
  title: string;
} & IPressableProps;
export const Submit = ({ onPress, title, ...props }: SubmitProps) => {
  return (
    <Pressable
      onPress={onPress}
      px="4"
      py="2"
      rounded="lg"
      borderWidth={2}
      borderRadius="3xl"
      borderColor="aqua"
      alignItems="center"
      {...props}
    >
      <Text color="aqua" fontSize="2xl" fontWeight="500">
        {title}
      </Text>
    </Pressable>
  );
};
