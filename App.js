import React, { useState } from 'react';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, IconRegistry, Icon } from '@ui-kitten/components';
import { BottomNavigation, BottomNavigationTab } from '@ui-kitten/components';
import { getSongs, getPlaylists } from './service/utils';
import SongsScreen from './screens/SongsScreen';
import PlaylistScreen from './screens/PlaylistScreen';
import SettingsScreen from './screens/SettingsScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Theme from './service/enum/theme';

export default () => {

  const [songs, setSongs] = useState(getSongs());
  const [playlists, setPlaylists] = useState(getPlaylists());
  const [settings, setSettings] = useState({ theme: Theme.DARK });

  const { Navigator, Screen } = createBottomTabNavigator();

  const BottomTabBar = ({ navigation, state }) => (
    <BottomNavigation
      selectedIndex={state.index}
      onSelect={index => navigation.navigate(state.routeNames[index])}
      appearance="noIndicator"
    >
      <BottomNavigationTab key="SONGS" title="SONGS" icon={props => <Icon {...props} name='music' />} />
      <BottomNavigationTab key="PLAYLISTS" title="PLAYLISTS" icon={props => <Icon {...props} name='list' />} />
      <BottomNavigationTab key="SETTINGS" title="SETTINGS" icon={props => <Icon {...props} name='settings-outline' />} />
    </BottomNavigation>
  );

  const songsScreen = () => (
    <SongsScreen songs={songs} />
  );

  const playlistsScreen = () => (
    <PlaylistScreen playlists={playlists} songs={songs} />
  );

  const settingsScreen = () => (
    <SettingsScreen settings={settings} setSettings={setSettings} />
  );

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva[settings.theme]}>
        <NavigationContainer>
          <Navigator tabBar={props => <BottomTabBar {...props} />}>
            <Screen name='songs' component={songsScreen} />
            <Screen name='playlists' component={playlistsScreen} />
            <Screen name='settings' component={settingsScreen} />
          </Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    </>
  )
}
