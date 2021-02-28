import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {suggestion_item} from '../../styles/component_styles';

const SuggestionItem = ({imageURL}) => {
  return (
    <TouchableOpacity style={suggestion_item.container}>
      <Image
        source={{uri: imageURL}}
        style={suggestion_item.image}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
};

export {SuggestionItem};
