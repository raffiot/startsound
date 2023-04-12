import { Box, Flex, Image, Text } from "native-base";
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
    <Flex justifyContent="center" alignItems="center">
      <Box>
        <Image
          source={{
            uri: image,
          }}
          alt="music_cover"
          width={128}
          height={128}
        />
        <SpotifyPlay
          isPlaying={isPlaying}
          onPress={onPress}
          style={{
            position: "absolute",
            bottom: 32,
            left: 32,
          }}
        />
      </Box>
      <Box>
        <Text fontSize="lg">{`${title} - ${artist}`}</Text>
      </Box>
    </Flex>
  );
};
