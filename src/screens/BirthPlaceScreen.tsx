import { useCallback, useContext, useState } from "react";
import { Box, Spinner } from "native-base";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "@/navigation/types";
import { Birthplace, UserContext, UserDetails } from "@/context/UserContext";
import { InputText } from "@/components/Input/InputText";
import { Submit } from "@/components/Buttons/Submit";
import { Progress } from "@/components/Progress";
import { SafeAreaLayout } from "@/components/Layouts/SafeAreaLayout";
import { InputPlaceAutocomplete } from "@/components/Input/InputPlaceAutocomplete";

type Props = NativeStackScreenProps<AuthStackParamList, "BirthPlace">;

export const BirthPlaceScreen = ({ route, navigation }: Props) => {
  const { user, updateUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [birthplace, setBirthplace] = useState<Birthplace>({
    birthplace: user?.birthplace || "",
    birthplace_pos_lat: user?.birthplace_pos_lat || 0,
    birthplace_pos_lon: user?.birthplace_pos_lon || 0,
  });

  const onSubmit = useCallback(async () => {
    if (user) {
      setIsLoading(true);
      await updateUser({
        id: user.id,
        username: route.params.username,
        birthday: new Date(route.params.birthday),
        ...birthplace,
        rooms: [],
      });
      setIsLoading(false);
    }
  }, [user, birthplace]);

  return (
    <SafeAreaLayout>
      <Box my="12" width="70%" flex="1" mx="auto">
        <Progress value={80} />
        <InputPlaceAutocomplete
          mt="16"
          label="AND IN WHICH CITY?"
          placeholder="Roubaix"
          input={{
            value: birthplace,
            onChange: setBirthplace,
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
    </SafeAreaLayout>
  );
};
