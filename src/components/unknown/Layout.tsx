import React from 'react';
import {SafeAreaView, View} from 'react-native';

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({children}) => {
  return (
    <View className="flex-1 px-5 py-4 bg-gray-300 ">
      <SafeAreaView className="flex-1">{children}</SafeAreaView>
    </View>
  );
};

export default Layout;
