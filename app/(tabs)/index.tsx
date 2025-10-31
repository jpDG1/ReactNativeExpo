import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  StatusBar
} from 'react-native';
import CustomButton from '@/components/ui/CustomButton';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);
  const [memory, setMemory] = useState<number>(0);
  const [isRadians, setIsRadians] = useState(true);

  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;


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
      case '÷': return secondValue !== 0 ? firstValue / secondValue : 0;
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

  const calculatePercentage = () => {
    const value = parseFloat(display);
    setDisplay(String(value / 100));
  };

  const scientificFunction = (func: string) => {
    const value = parseFloat(display);
    let result: number;
    const angle = isRadians ? value : value * Math.PI / 180;

    switch (func) {
      case 'x²': result = Math.pow(value, 2); break;
      case 'x³': result = Math.pow(value, 3); break;
      case 'xⁿ': result = Math.pow(value, 2); break;
      case 'eˣ': result = Math.exp(value); break;
      case '10ˣ': result = Math.pow(10, value); break;
      case '²√': result = Math.sqrt(value); break;
      case '³√': result = Math.cbrt(value); break;
      case 'ʸ√': result = Math.pow(value, 1/2); break;
      case '¹/x': result = 1 / value; break;
      case 'sin': result = Math.sin(angle); break;
      case 'cos': result = Math.cos(angle); break;
      case 'tan': result = Math.tan(angle); break;
      case 'sinh': result = Math.sinh(value); break;
      case 'cosh': result = Math.cosh(value); break;
      case 'tanh': result = Math.tanh(value); break;
      case 'ln': result = Math.log(value); break;
      case 'log': result = Math.log10(value); break;
      case 'π': result = Math.PI; break;
      case 'e': result = Math.E; break;
      case 'rand': result = Math.random(); break;
      default: result = value;
    }
    setDisplay(String(result));
    setWaitingForNewValue(true);
  };


  const Button = ({ title, onPress, style = {}, textStyle = {} }: any) => (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );

  const ScientificButton = ({ title, func, style = {} }: any) => (
    <Button
      title={title}
      onPress={() => scientificFunction(func)}
      style={[styles.scientificButton, style]}
      textStyle={styles.scientificButtonText}
    />
  );


  const renderPortraitCalculator = () => (
    <View style={styles.portraitContainer}>
      <View style={styles.portraitRow}>
        <Button title="AC" onPress={clearAll} style={styles.portraitFunctionButton} />
        <View style={styles.portraitPlaceholder} />
        <View style={styles.portraitPlaceholder} />
        <Button title="÷" onPress={() => inputOperation('÷')} style={styles.portraitOperationButton} />
      </View>
      <View style={styles.portraitRow}>
        <Button title="7" onPress={() => inputNumber('7')} style={styles.portraitNumberButton} />
        <Button title="8" onPress={() => inputNumber('8')} style={styles.portraitNumberButton} />
        <Button title="9" onPress={() => inputNumber('9')} style={styles.portraitNumberButton} />
        <Button title="×" onPress={() => inputOperation('×')} style={styles.portraitOperationButton} />
      </View>
      <View style={styles.portraitRow}>
        <Button title="4" onPress={() => inputNumber('4')} style={styles.portraitNumberButton} />
        <Button title="5" onPress={() => inputNumber('5')} style={styles.portraitNumberButton} />
        <Button title="6" onPress={() => inputNumber('6')} style={styles.portraitNumberButton} />
        <Button title="-" onPress={() => inputOperation('-')} style={styles.portraitOperationButton} />
      </View>
      <View style={styles.portraitRow}>
        <Button title="1" onPress={() => inputNumber('1')} style={styles.portraitNumberButton} />
        <Button title="2" onPress={() => inputNumber('2')} style={styles.portraitNumberButton} />
        <Button title="3" onPress={() => inputNumber('3')} style={styles.portraitNumberButton} />
        <Button title="+" onPress={() => inputOperation('+')} style={styles.portraitOperationButton} />
      </View>
      <View style={styles.portraitRow}>
        <Button title="0" onPress={() => inputNumber('0')} style={[styles.portraitNumberButton, styles.portraitZeroButton]} />
        <View style={styles.portraitPlaceholder} />
        <Button title="=" onPress={performCalculation} style={styles.portraitEqualsButton} />
      </View>
    </View>
  );


  const renderLandscapeCalculator = () => (
    <View style={styles.landscapeContainer}>

      <View style={styles.landscapeRow}>
        <Button title="(" onPress={() => inputNumber('(')} style={styles.scientificButton} />
        <Button title=")" onPress={() => inputNumber(')')} style={styles.scientificButton} />
        <Button title="mc" onPress={() => setMemory(0)} style={styles.scientificButton} />
        <Button title="m+" onPress={() => setMemory(memory + parseFloat(display))} style={styles.scientificButton} />
        <Button title="m-" onPress={() => setMemory(memory - parseFloat(display))} style={styles.scientificButton} />
        <Button title="mr" onPress={() => setDisplay(String(memory))} style={styles.scientificButton} />
        <Button title="AC" onPress={clearAll} style={styles.functionButton} />
        <Button title="%" onPress={calculatePercentage} style={styles.functionButton} />
        <View style={styles.operationColumn}>
          <Button title="÷" onPress={() => inputOperation('÷')} style={styles.operationButton} />
        </View>
      </View>


      <View style={styles.landscapeRow}>
        <ScientificButton title="2nd" func="x²" style={styles.scientificButton} />
        <ScientificButton title="x²" func="x²" />
        <ScientificButton title="x³" func="x³" />
        <ScientificButton title="xⁿ" func="xⁿ" />
        <ScientificButton title="eˣ" func="eˣ" />
        <ScientificButton title="10ˣ" func="10ˣ" />
        <Button title="7" onPress={() => inputNumber('7')} style={styles.numberButton} />
        <Button title="8" onPress={() => inputNumber('8')} style={styles.numberButton} />
        <Button title="9" onPress={() => inputNumber('9')} style={styles.numberButton} />
        <View style={styles.operationColumn}>
          <Button title="×" onPress={() => inputOperation('×')} style={styles.operationButton} />
        </View>
      </View>


      <View style={styles.landscapeRow}>
        <ScientificButton title="¹/x" func="¹/x" />
        <ScientificButton title="²√" func="²√" />
        <ScientificButton title="³√" func="³√" />
        <ScientificButton title="ʸ√" func="ʸ√" />
        <ScientificButton title="ln" func="ln" />
        <ScientificButton title="log" func="log" />
        <Button title="4" onPress={() => inputNumber('4')} style={styles.numberButton} />
        <Button title="5" onPress={() => inputNumber('5')} style={styles.numberButton} />
        <Button title="6" onPress={() => inputNumber('6')} style={styles.numberButton} />
        <View style={styles.operationColumn}>
          <Button title="-" onPress={() => inputOperation('-')} style={styles.operationButton} />
        </View>
      </View>


      <View style={styles.landscapeRow}>
        <Button title="x!" onPress={() => {}} style={styles.scientificButton} />
        <ScientificButton title="sin" func="sin" />
        <ScientificButton title="cos" func="cos" />
        <ScientificButton title="tan" func="tan" />
        <ScientificButton title="e" func="e" />
        <Button title="EE" onPress={() => {}} style={styles.scientificButton} />
        <Button title="1" onPress={() => inputNumber('1')} style={styles.numberButton} />
        <Button title="2" onPress={() => inputNumber('2')} style={styles.numberButton} />
        <Button title="3" onPress={() => inputNumber('3')} style={styles.numberButton} />
        <View style={styles.operationColumn}>
          <Button title="+" onPress={() => inputOperation('+')} style={styles.operationButton} />
        </View>
      </View>


      <View style={styles.landscapeRow}>
        <Button
          title="Rad"
          onPress={() => setIsRadians(!isRadians)}
          style={isRadians ? styles.activeButton : styles.scientificButton}
        />
        <ScientificButton title="sinh" func="sinh" />
        <ScientificButton title="cosh" func="cosh" />
        <ScientificButton title="tanh" func="tanh" />
        <ScientificButton title="π" func="π" />
        <ScientificButton title="Rand" func="rand" />
        <Button title="0" onPress={() => inputNumber('0')} style={[styles.numberButton, styles.zeroButton]} />
        <Button title="." onPress={() => inputNumber('.')} style={styles.numberButton} />
        <View style={styles.operationColumn}>
          <Button title="=" onPress={performCalculation} style={styles.equalsButton} />
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={[styles.display, isLandscape && styles.landscapeDisplay]}>
        <Text style={[styles.displayText, isLandscape && styles.landscapeDisplayText]}>
          {display}
        </Text>
        {isLandscape && (
          <Text style={styles.modeText}>{isRadians ? 'Rad' : 'Deg'}</Text>
        )}
      </View>
      {isLandscape ? renderLandscapeCalculator() : renderPortraitCalculator()}
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
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  landscapeDisplay: {
    flex: 0.8,
    paddingVertical: 15,
  },
  displayText: {
    color: 'white',
    fontSize: 80,
    fontWeight: '300',
  },
  landscapeDisplayText: {
    fontSize: 50,
  },
  modeText: {
    color: '#ff9500',
    fontSize: 16,
    marginTop: 5,
  },


  portraitContainer: {
    flex: 2,
    padding: 10,
  },
  portraitRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  portraitNumberButton: {
    backgroundColor: '#505050',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    marginHorizontal: 6,
    height: 80,
  },
  portraitFunctionButton: {
    backgroundColor: '#a5a5a5',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    marginHorizontal: 6,
    height: 80,
  },
  portraitOperationButton: {
    backgroundColor: '#ff9500',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    marginHorizontal: 6,
    height: 80,
  },
  portraitEqualsButton: {
    backgroundColor: '#ff9500',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    marginHorizontal: 6,
    height: 80,
  },
  portraitZeroButton: {
    flex: 2,
  },
  portraitPlaceholder: {
    flex: 1,
    marginHorizontal: 6,
  },


  landscapeContainer: {
    flex: 4,
    padding: 8,
  },
  landscapeRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 2,
    height: 40,
  },
  numberButton: {
    backgroundColor: '#505050',
  },
  scientificButton: {
    backgroundColor: '#333333',
  },
  functionButton: {
    backgroundColor: '#a5a5a5',
  },
  operationColumn: {
    flex: 1,
    marginHorizontal: 2,
  },
  operationButton: {
    backgroundColor: '#ff9500',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    height: 40,
  },
  equalsButton: {
    backgroundColor: '#ff9500',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    height: 40,
  },
  activeButton: {
    backgroundColor: '#ff9500',
  },
  zeroButton: {
    flex: 2,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
  scientificButtonText: {
    fontSize: 14,
    fontWeight: '400',
  },
});