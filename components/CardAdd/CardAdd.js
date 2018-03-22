import React, { PureComponent } from 'react';
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet
} from 'react-native';
import { Button, Form, Item, Input, Text, Label } from 'native-base';
import { bgColor, lightBlue } from '../../utils/colors';

class CardAdd extends PureComponent {
  constructor(props) {
    super(props);

    this.inputs = {};
    this.state = {
      question: '',
      answer: '',
      valid: false
    };
  }

  handleSubmit = () => {
    const { addCardHandler, deck } = this.props;
    const { question, answer } = this.state;
    addCardHandler(deck.title, { question, answer });
  };

  focusNextField = field => {
    this.inputs[field].wrappedInstance.focus();
  };

  handleTextChange = (key, value) => {
    this.setState(state => {
      let newState = {
        ...state,
        [key]: value.replace(/\n/g, ' ')
      };
      newState.valid = !!newState.question && !!newState.answer;

      return newState;
    });
  };

  render() {
    const { valid } = this.state;

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        {/* https://github.com/facebook/react-native/issues/11071 */}
        <ScrollView keyboardShouldPersistTaps="handled" style={{ padding: 30 }}>
          <Form>
            <View style={styles.inputContainer}>
              <Item stackedLabel last style={{ padding: 0 }}>
                <Label>Question</Label>
                <Input
                  ref={input => {
                    this.inputs['question'] = input;
                  }}
                  onChangeText={value =>
                    this.handleTextChange('question', value)
                  }
                  onSubmitEditing={() => {
                    this.focusNextField('answer');
                  }}
                  returnKeyType="next"
                />
              </Item>
            </View>
            <View style={styles.inputContainer}>
              <Item stackedLabel last style={{ padding: 0 }}>
                <Label>Answer</Label>
                <Input
                  ref={input => {
                    this.inputs['answer'] = input;
                  }}
                  onSubmitEditing={() => {
                    valid && this.handleSubmit();
                  }}
                  value={this.state.answer}
                  blurOnSubmit={true}
                  multiline
                  maxLength={200}
                  style={{ paddingBottom: 15 }}
                  onChangeText={value => this.handleTextChange('answer', value)}
                  returnKeyType="send"
                />
              </Item>
            </View>

            <Button
              block
              primary={valid}
              disabled={!valid}
              onPress={this.handleSubmit}
            >
              <Text style={valid ? {} : styles.btnTextDisabled}>
                Create Question
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
  inputContainer: {
    marginBottom: 15
  },
  input: {
    borderBottomColor: lightBlue
  },
  btnTextDisabled: {
    color: 'rgba(255, 255, 255, 0.2)'
  }
});

export default CardAdd;
