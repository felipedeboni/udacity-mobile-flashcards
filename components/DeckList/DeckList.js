import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { DeckListItem } from '../';
import { bgColor, textColor } from '../../utils/colors'

const DeckList = ({ decks, navigation }) => {
  const renderItem = ({ item, ...props }) => {
    return <DeckListItem deck={item} navigation={navigation} {...props} />;
  };

  if ( typeof decks !== 'undefined' ) {
    if ( decks.length === 0 ) {
      return (
        <View style={[styles.container, {flex: 1, alignItems: 'center', justifyContent: 'center' }]}>
          <TouchableOpacity onPress={() => navigation.navigate('DeckAdd')}>
            <Text style={{ color: textColor, fontSize: 17 }}>Tap here to add your first deck</Text>
          </TouchableOpacity>
        </View>
      )
    } else {
      return (
        <FlatList
          data={decks}
          keyExtractor={(item, index) => index}
          renderItem={renderItem}
          style={styles.container}
        />
      )
    }
  }

  return <View style={[styles.container, {flex: 1}]}></View>
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: bgColor
  }
})

export default DeckList;
