import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {category_button} from '../../styles/component_styles';

function CategoryButton({title, selected, onSelect}) {
  return (
    <TouchableOpacity
      style={[
        category_button.container,
        selected && category_button.activeContainer,
      ]}
      onPress={onSelect}>
      <Text
        style={[category_button.text, selected && category_button.activeText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

export {CategoryButton};
