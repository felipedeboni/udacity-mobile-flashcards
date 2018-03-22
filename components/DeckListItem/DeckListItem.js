import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ListItem, Body, Right, H3, Icon } from 'native-base'
import { altBgColor, borderColor, textColor, altTextColor } from '../../utils/colors'

const DeckListItem = ({ deck, navigation }) => (
  <ListItem style={styles.listitem}>
    <TouchableOpacity
      onPress={() => navigation.navigate('DeckDetails', { title: deck.title })}
      style={styles.touchable}
    >
    <Body>
      <H3 style={styles.title}>{deck.title}</H3>
      <Text style={styles.text}>{deck.questions.length} card{deck.questions.length === 1 ? '' : 's'}</Text>
    </Body>
    <Right>
      <Icon name="arrow-forward" style={{color: altTextColor}}/>
    </Right>
  </TouchableOpacity>
 </ListItem>
);

const styles = StyleSheet.create({
  touchable: {
    flex: 1,
    flexDirection: 'row'
  },
  listitem: {
    backgroundColor: altBgColor,
    marginLeft: 0,
    paddingLeft: 15,
    borderBottomColor: borderColor
  },
  title: {
    fontSize: 18,
    color: textColor
  },
  text: {
    color: altTextColor,
    fontSize: 15
  }
})

export default DeckListItem;
