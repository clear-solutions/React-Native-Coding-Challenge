import React, {useState} from 'react';
import {View, Text, TextInput} from 'react-native';

interface Props {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  placeholder?: string;
  disabled?: boolean;
}

const StyledTextInput: React.FC<Props> = ({
  label,
  value,
  onChangeText,
  onFocus,
  onBlur,
  placeholder,
  disabled,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    if (onFocus) {
      onFocus();
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (onBlur) {
      onBlur();
    }
  };

  return (
    <View className="mb-3 px-4">
      <Text className="text-black text-lg mb-2 text-center">{label}</Text>
      <TextInput
        className={`h-10 border-2 border-gray-400 rounded-md p-2 ${
          isFocused && 'border-gray-800'
        }`}
        value={value}
        onChangeText={onChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        editable={!disabled}
      />
    </View>
  );
};

export default StyledTextInput;
