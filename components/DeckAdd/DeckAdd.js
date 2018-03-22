import React, { Component } from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet } from 'react-native';
import { Button, Form, Item, Input, Text, Label } from 'native-base';
import { bgColor, lightBlue } from '../../utils/colors';

class DeckAdd extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      valid: false
    };
  }

  handleTextChange = value => {
    this.setState({
      title: value,
      valid: this.isValid(value)
    });
  };

  handleSubmit = () => {
    const { addDeckHandler, navigation } = this.props;
    const { title, valid } = this.state;

    if (!valid) {
      return false;
    }

    this.input.wrappedInstance.blur();
    addDeckHandler(title.trim())
      .then(() => this.resetState())
      .then(() => navigation.navigate('DeckDetails', { title, refresh: true }));
  };

  isValid = value => {
    value = value.trim();
    const { decks } = this.props;
    return (
      !!value &&
      (!decks || typeof decks.find(_ => _.title === value) === 'undefined')
    );
  };

  resetState = () => {
    this.setState({
      title: '',
      valid: false
    });
  };

  render() {
    const { valid, title } = this.state;
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        {/* https://github.com/facebook/react-native/issues/11071 */}
        <ScrollView keyboardShouldPersistTaps="handled" style={{ padding: 30 }}>
          <Form>
            <Item stackedLabel last style={{ padding: 0 }}>
              <Label>Deck Name</Label>
              <Input
                ref={input => {
                  this.input = input;
                }}
                onChangeText={this.handleTextChange}
                maxLength={50}
                value={title}
                blurOnSubmit={true}
                returnKeyType="send"
                onSubmitEditing={this.handleSubmit}
              />
            </Item>
            <Button
              block
              primary={valid}
              disabled={!valid}
              style={{ marginTop: 15 }}
              onPress={this.handleSubmit}
            >
              <Text style={valid ? {} : styles.btnTextDisabled}>
                Create Deck
              </Text>
            </Button>
          </Form>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: bgColor,
    flex: 1
  },
  input: {
    borderBottomColor: lightBlue
  },
  btnTextDisabled: {
    color: 'rgba(255, 255, 255, 0.2)'
  }
});

export default DeckAdd;
