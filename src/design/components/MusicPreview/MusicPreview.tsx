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
    <Flex
      justifyContent="center"
      alignItems="center"
      backgroundColor="lightRose"
      p="4"
      rounded="xl"
    >
      <Box>
        <Image
          source={{
            uri: image,
          }}
          alt="music_cover"
          width={128}
          height={128}
        />
      </Box>
      <Box flexDir="row" pt="2">
        <SpotifyPlay isPlaying={isPlaying} onPress={onPress} />
        <Box pl="4">
          <Text fontSize="lg" color="aqua">
            {title}
          </Text>
          <Text color="aqua">{artist}</Text>
        </Box>
      </Box>
    </Flex>
  );
};
