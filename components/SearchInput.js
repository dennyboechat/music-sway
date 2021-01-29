import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Icon, Input } from '@ui-kitten/components';

const SearchInput = props => {

    const { searchValue, setSearchValue } = props;

    const clearSearch = () => {
        setSearchValue('');
    };

    const onSearch = (value) => {
        setSearchValue(value);
    };

    const renderClearIcon = (props) => (
        <TouchableWithoutFeedback onPress={clearSearch}>
            <Icon {...props} name={'close-outline'} />
        </TouchableWithoutFeedback>
    );

    return (
        <Input
            id="searchInput"
            key="searchInput"
            value={searchValue}
            placeholder='Search'
            accessoryLeft={props => <Icon {...props} name={'search-outline'} />}
            accessoryRight={searchValue && renderClearIcon}
            onChangeText={nextValue => onSearch(nextValue)}
            size='large'
        />
    );
}

export default SearchInput;