import React from 'react';
import { orderBy, filter, find, remove, cloneDeep } from 'lodash'
import { TouchableHighlight } from 'react-native';
import { Text, Layout, List, ListItem, Card } from '@ui-kitten/components';
import Collapsible from 'react-native-collapsible';

const SongsList = props => {

    const [collapsedSongs, setCollapsedSongs] = React.useState([]);

    const { songs, filterValue } = props;

    if (!songs) {
        return null;
    }

    const isCollapsedSong = (songId) => {
        return find(collapsedSongs, song => {
            return song === songId;
        }) ? true : false;
    }

    const onClickPanel = (songId) => {
        let collapsedSongsCopy = cloneDeep(collapsedSongs);
        const isCollapsed = isCollapsedSong(songId);
        if (isCollapsed) {
            remove(collapsedSongsCopy, id => { return id === songId; });
        } else {
            collapsedSongsCopy.push(songId);
        }
        setCollapsedSongs(collapsedSongsCopy);
    }

    let sortedSongs = orderBy(songs, ['title'], ['asc']);
    if (filterValue && filterValue.length > 0) {
        sortedSongs = filter(sortedSongs, song => { return song.title.toLowerCase().includes(filterValue.toLowerCase()) || song.artist.toLowerCase().includes(filterValue.toLowerCase()); });
    }

    const renderItem = ({ item }) => (
        <ListItem
            description={(evaProps) =>
                <Layout style={{ backgroundColor: 'transparent' }}>
                    <TouchableHighlight onPress={() => onClickPanel(item.id)}>
                        <>
                            <Text key={item.id + '_title'}>{item.title}</Text>
                            <Text key={item.id + '_artist'} appearance='hint' category='s2' style={{ marginBottom: 5 }}>{item.artist}</Text>
                        </>
                    </TouchableHighlight>
                    <Collapsible key={item.id} collapsed={!isCollapsedSong(item.id)}>
                        <Card key={item.id + '_menuGroupChords'} style={{ backgroundColor: 'transparent' }} title="Chords">
                            <Text appearance='hint'>{'Guitar Chords'}</Text>
                            <Text>{item.chords}</Text>
                        </Card>
                        <Card key={item.id + '_menuGroupHarmonica'} style={{ backgroundColor: 'transparent' }} title="Harmonica">
                            <Text appearance='hint'>{'Harmonica'}</Text>
                            <Text>{item.harmonica}</Text>
                        </Card>
                        <Card key={item.id + '_menuGroupLyrics'} style={{ backgroundColor: 'transparent' }} title="Lyrics">
                            <Text appearance='hint'>{'Lyrics'}</Text>
                            <Text>{item.lyrics}</Text>
                        </Card>
                    </Collapsible>
                </Layout>
            }
        />
    );

    return (
        <List
            data={sortedSongs}
            renderItem={renderItem}
        />
    );
}

export default SongsList;