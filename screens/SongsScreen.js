import React, { useState } from 'react';
import SearchInput from '../components/SearchInput';
import SongsList from '../components/SongsList';
import { Layout } from '@ui-kitten/components';

const SongsScreen = props => {

    const [searchSongValue, setSearchSongValue] = useState('');
    const { songs } = props;

    return (
        <Layout style={{ flex: 1 }}>
            <SearchInput searchValue={searchSongValue} setSearchValue={setSearchSongValue} />
            <SongsList songs={songs} filterValue={searchSongValue} />
        </Layout>
    );
}

export default SongsScreen;