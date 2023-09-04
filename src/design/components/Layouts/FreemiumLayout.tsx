import { ReactNode } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Box, Pressable, Text } from "native-base";

export type FremiumLayoutProps = {
  title: string;
  onPress: () => void;
  children: ReactNode;
};

export const FreemiumLayout = ({
  children,
  title,
  onPress,
}: FremiumLayoutProps) => {
  const insets = useSafeAreaInsets();
  return (
    <>
      <Box flex="1" mt={insets.top}>
        {children}
      </Box>
    </>
  );
  return (
    <>
      <Box flex="1" mt={insets.top}>
        {children}
      </Box>
      <Pressable
        bottom={0}
        position="relative"
        width="100%"
        height="10%"
        borderTopRadius={32}
        backgroundColor="#E19DF9"
        justifyContent="center"
        alignItems="center"
        pt="2"
        pb={insets.bottom}
        onPress={onPress}
        shadow="7"
      >
        <Text fontWeight={700} fontSize="xl" color="#DCFEFF">
          {title}
        </Text>
      </Pressable>
    </>
  );
};
