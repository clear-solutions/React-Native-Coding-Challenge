import {FC, ReactNode} from 'react';
import {View} from 'react-native';

interface SafeAreaWrapperProps {
  children: ReactNode;
}

const SafeAreaWrapper: FC<SafeAreaWrapperProps> = ({children}) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#121212',
        paddingTop: 50,
      }}>
      {children}
    </View>
  );
};

export default SafeAreaWrapper;
