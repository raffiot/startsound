import { ReactNode } from "react";
import { Box } from "native-base";

export const SafeAreaLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Box flex="1" safeArea>
      {children}
    </Box>
  );
};
