import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForNewValue(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+': return firstValue + secondValue;
      case '-': return firstValue - secondValue;
      case '×': return firstValue * secondValue;
      case '÷': return firstValue / secondValue;
      default: return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const result = calculate(previousValue, inputValue, operation);

      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
    }
  };

  const clearAll = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  const Button = ({ title, onPress, style = {} }: any) => (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.display}>
        <Text style={styles.displayText}>{display}</Text>
      </View>

      <View style={styles.buttonsContainer}>
        <View style={styles.row}>
          <Button title="AC" onPress={clearAll} style={styles.functionButton} />
          <View style={styles.placeholder} />
          <View style={styles.placeholder} />
          <Button title="÷" onPress={() => inputOperation('÷')} style={styles.operationButton} />
        </View>

        <View style={styles.row}>
          <Button title="7" onPress={() => inputNumber('7')} />
          <Button title="8" onPress={() => inputNumber('8')} />
          <Button title="9" onPress={() => inputNumber('9')} />
          <Button title="×" onPress={() => inputOperation('×')} style={styles.operationButton} />
        </View>

        <View style={styles.row}>
          <Button title="4" onPress={() => inputNumber('4')} />
          <Button title="5" onPress={() => inputNumber('5')} />
          <Button title="6" onPress={() => inputNumber('6')} />
          <Button title="-" onPress={() => inputOperation('-')} style={styles.operationButton} />
        </View>

        <View style={styles.row}>
          <Button title="1" onPress={() => inputNumber('1')} />
          <Button title="2" onPress={() => inputNumber('2')} />
          <Button title="3" onPress={() => inputNumber('3')} />
          <Button title="+" onPress={() => inputOperation('+')} style={styles.operationButton} />
        </View>

        <View style={styles.row}>
          <Button title="0" onPress={() => inputNumber('0')} style={styles.zeroButton} />
          <View style={styles.placeholder} />
          <Button title="=" onPress={performCalculation} style={styles.equalsButton} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  display: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 20,
  },
  displayText: {
    color: 'white',
    fontSize: 48,
  },
  buttonsContainer: {
    flex: 2,
    padding: 10,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 50,
    margin: 5,
    height: 70,
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
  },
  functionButton: {
    backgroundColor: '#A5A5A5',
  },
  operationButton: {
    backgroundColor: '#FF9500',
  },
  equalsButton: {
    backgroundColor: '#FF9500',
  },
  zeroButton: {
    flex: 2,
  },
  placeholder: {
    flex: 1,
    margin: 5,
  },
});