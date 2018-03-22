import React, { Component } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

class FlipCard extends Component {
  componentWillMount() {
    this.animatedValue = new Animated.Value(0);

    this.value = 0;

    this.animatedValue.addListener(({ value }) => {
      this.value = value;
    });

    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg']
    });

    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg']
    });

    this.frontOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [1, 0]
    });

    this.backOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [0, 1]
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.flipped !== this.props.flipped) {
      this.flipCard();
    }
  }

  flipCard = () => {
    if (this.value >= 90) {
      Animated.timing(this.animatedValue, {
        toValue: 0,
        timing: 800,
        useNativeDriver: true
      }).start();
    } else {
      Animated.timing(this.animatedValue, {
        toValue: 180,
        timing: 800,
        useNativeDriver: true
      }).start();
    }
  };

  render() {
    const { renderFront, renderBack } = this.props;

    const frontAnimatedStyle = {
      transform: [{ rotateY: this.frontInterpolate }],
      opacity: this.frontOpacity
    };
    const backAnimatedStyle = {
      transform: [{ rotateY: this.backInterpolate }],
      opacity: this.backOpacity
    };

    return (
      <View style={styles.container}>
        <Animated.View
          style={[styles.flipCard, styles.flipCardFront, frontAnimatedStyle]}
        >
          {renderFront()}
        </Animated.View>
        <Animated.View
          style={[backAnimatedStyle, styles.flipCard, styles.flipCardBottom]}
        >
          {renderBack()}
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    position: 'relative',
    alignItems: 'stretch',
    flexDirection: 'column',
    paddingTop: 50,
    paddingBottom: 30,
    paddingLeft: 30,
    paddingRight: 30
  },
  flipCard: {
    backfaceVisibility: 'hidden'
  },
  flipCardFront: {
    flexGrow: 1
  },
  flipCardBottom: {
    position: 'absolute',
    top: 50,
    left: 30,
    bottom: 30,
    right: 30
  }
});

export default FlipCard;
