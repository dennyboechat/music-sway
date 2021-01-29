import React from 'react';
import { Text, Layout } from '@ui-kitten/components';
import Accordion from 'react-native-collapsible/Accordion';
import { orderBy, filter, find } from 'lodash'
import SongsList from '../components/SongsList';
import { TouchableOpacity } from 'react-native';

const PlaylistsScreen = props => {

    const [activeSections, setActiveSections] = React.useState([]);
    const { playlists, songs } = props;

    if (!playlists || playlists.length === 0) {
        return (
            <Layout style={{ flex: 1 }}>
                <Text>{'No Playlists'}</Text>
            </Layout>
        );
    }

    let sortedPlaylists = orderBy(playlists, ['name'], ['asc']);

    const sections = sortedPlaylists.map(playlist => {
        let filteredSongs;
        if (playlist.songs && songs && songs.length > 0) {
            filteredSongs = filter(songs, song => {
                return find(playlist.songs, playlistSong => {
                    return song.id === playlistSong.songId;
                });
            });
        }
        let songsList;
        if (filteredSongs) {
            songsList = <SongsList songs={filteredSongs} filterValue={null} />;
        } else {
            songsList = <Text>{'No Songs'}</Text>;
        }
        return {
            title: playlist.name,
            content: songsList
        }
    });

    const renderHeader = section => {
        return (
            <Text category='label'>{section.title}</Text>
        );
    };

    const renderContent = section => {
        return section.content;
    };

    const updateSections = activeSections => {
        setActiveSections(activeSections);
    };

    return (
        <Layout style={{ flex: 1 }}>
            <Accordion
                activeSections={activeSections}
                sections={sections}
                renderHeader={renderHeader}
                renderContent={renderContent}
                onChange={updateSections}
                touchableComponent={(props) => <TouchableOpacity {...props} />}
            />
        </Layout>
    );
}

export default PlaylistsScreen;