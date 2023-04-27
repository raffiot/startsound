import { Birthplace, UserDetails } from "@/context/UserContext";
import Constants from "expo-constants";
import {
  Text,
  Input,
  Flex,
  IFlexProps,
  IInputProps,
  ScrollView,
} from "native-base";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

export type InputPlaceAutocompleteProps = {
  label: string;
  placeholder: string;
  input: {
    value: Birthplace;
    onChange: (birthplace: Birthplace) => void;
  };
} & IFlexProps;
export const InputPlaceAutocomplete = ({
  label,
  placeholder,
  input: { onChange },
  ...props
}: InputPlaceAutocompleteProps) => {
  return (
    <Flex {...props}>
      <Text pb="2" fontSize="2xl" fontWeight="bold">
        {label}
      </Text>
      <Flex height="lg">
        <GooglePlacesAutocomplete
          textInputProps={{
            InputComp: Input,
            flex: 1,
            borderWidth: 0,
            px: 4,
            height: 63,
            backgroundColor: "lightRose",
            placeholderTextColor: "lightGray",
            rounded: "2xl",
          }}
          styles={{
            textInput: {
              backgroundColor: "lightRose",
              fontSize: 24,
            },
          }}
          GooglePlacesDetailsQuery={{ fields: "geometry" }}
          fetchDetails={true}
          placeholder={placeholder}
          onPress={(value, details = null) => {
            if (
              details?.geometry?.location?.lat &&
              details?.geometry?.location?.lng
            ) {
              onChange({
                birthplace: value.description,
                birthplace_pos_lat: details?.geometry?.location?.lat || 0,
                birthplace_pos_lon: details?.geometry?.location?.lng || 0,
              });
            }
          }}
          keyboardShouldPersistTaps="always"
          listViewDisplayed={false}
          query={{
            key: Constants.manifest?.extra?.googleAPIKey,
            language: "en",
          }}
        />
      </Flex>
    </Flex>
  );
};
