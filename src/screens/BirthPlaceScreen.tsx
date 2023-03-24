import { useCallback, useContext, useState } from "react";
import { Box, Spinner } from "native-base";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "@/navigation/types";
import { UserContext } from "@/context/UserContext";
import { InputText } from "@/components/Input/InputText";
import { Submit } from "@/components/Buttons/Submit";
import { Progress } from "@/components/Progress";

type Props = NativeStackScreenProps<AuthStackParamList, "BirthPlace">;
export const BirthPlaceScreen = ({ route, navigation }: Props) => {
  const { user, updateUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [birthPlace, setBirthPlace] = useState<string>(user?.birthplace || "");

  const onSubmit = useCallback(async () => {
    if (user) {
      setIsLoading(true);
      await updateUser({
        id: user.id,
        username: route.params.username,
        birthplace: birthPlace,
        birthday: new Date(route.params.birthday),
        rooms: [],
      });
      setIsLoading(false);
    }
  }, [user, birthPlace]);

  return (
    <Box my="12" width="70%" flex="1" mx="auto">
      <Progress value={80} />
      <InputText
        mt="16"
        label="AND IN WHICH CITY?"
        placeholder="Roubaix"
        input={{
          value: birthPlace,
          onChangeText: setBirthPlace,
        }}
      />
      <Box mt="auto">
        {isLoading ? (
          <Spinner />
        ) : (
          <Submit onPress={onSubmit} title="DONE!" width="100%" />
        )}
      </Box>
    </Box>
  );
};
