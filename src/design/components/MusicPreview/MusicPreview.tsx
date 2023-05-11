import { Box, Image, Pressable, Text } from "native-base";
import { SpotifyPlay } from "../Buttons/SpotifyPlay";

export type MusicPreviewProps = {
  title: string;
  artist: string;
  image: string;
  isPlaying: boolean;
  onPress: () => void;
};
export const MusicPreview = ({
  title,
  artist,
  image,
  isPlaying,
  onPress,
}: MusicPreviewProps) => {
  return (
    <Box
      justifyContent="flex-start"
      alignItems="flex-start"
      backgroundColor="lightRose"
      p="4"
      maxW="80%"
      flexWrap="wrap"
      rounded="xl"
    >
      <Box>
        <Pressable pb="2">
          <Image
            source={require("../../../../assets/button-icons/Spotify_Logo_CMYK_Black.png")}
            alt="spotify_link"
            style={{ width: 128, height: 38 }}
            resizeMode="cover"
          />
        </Pressable>
      </Box>
      <Box flexDir="row" alignItems="flex-end">
        <Image
          source={{
            uri: image,
          }}
          alt="music_cover"
          width={128}
          height={128}
        />
        <Box
          pl="4"
          justifyContent="flex-start"
          alignItems="flex-start"
          flex={1}
        >
          <Text
            fontSize="lg"
            color="aqua"
            adjustsFontSizeToFit={true}
            numberOfLines={2}
          >
            {title}
          </Text>
          <Text color="aqua" adjustsFontSizeToFit={true} numberOfLines={1}>
            {artist}
          </Text>
          <Box pt="2">
            <SpotifyPlay isPlaying={isPlaying} onPress={onPress} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
