import React from 'react';
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent } from 'react-native';

interface CustomButtonProps {
  backgroundColor?: string;
  title: string;
  disabled?: boolean;
  borderColor?: string;
  onPress?: (event: GestureResponderEvent) => void;
  color?: string;
  style?: object;
  textStyle?: object;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  backgroundColor = '#636466',
  title = '',
  disabled = false,
  borderColor = '#555759',
  onPress = () => {},
  color = '#e8e9ea',
  style = {},
  textStyle = {}
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor,
          borderColor,
          opacity: disabled ? 0.3 : 1
        },
        style
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={[styles.buttonText, { color }, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 2,
    height: 40,
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '500',
  },
});

export default CustomButton;