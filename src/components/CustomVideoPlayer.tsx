import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Video from 'react-native-video';

const VideoPlayer = ({ url }) => {
  const [paused, setPaused] = useState(true); // Control playback state

  useFocusEffect(
    useCallback(() => {
      // When the screen is focused, play the video
      setPaused(false);

      // When the screen is unfocused, pause the video
      return () => setPaused(true);
    }, [])
  );

  return (
    <View style={styles.container}>
      <Video
        source={{ uri: url }}
        paused={paused} // Control playback
        style={styles.video}
        controls
      // Other props
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  video: {
    width: '90%',
    height: 300,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});

export default VideoPlayer;
