// UncompletedTodosScreen.tsx
import React, { useState } from "react";
import ToDoList from "../components/ToDoList";

import { useNavigation } from "@react-navigation/native";
import {
  HeaderButton,
  HeaderButtonProps,
  HeaderButtons,
  Item,
} from "react-navigation-header-buttons";
import { AntDesign } from "@expo/vector-icons";

const UncompletedTodosScreen: React.FC = () => {
  const navigation = useNavigation();
  const [isSearchIconVisible, setIsSearchIconVisible] = useState<boolean>(true);

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons
          HeaderButtonComponent={(props: HeaderButtonProps) => (
            <HeaderButton
              IconComponent={AntDesign}
              color="black"
              iconSize={23}
              {...props}
            />
          )}
        >
          {isSearchIconVisible ? (
            <Item
              title="Plus"
              iconName="plus"
              IconComponent={AntDesign}
              onPress={() => {
                setIsSearchIconVisible(false);
              }}
            />
          ) : (
            <Item
              title="Search"
              iconName="search1"
              IconComponent={AntDesign}
              onPress={() => {
                setIsSearchIconVisible(true);
              }}
            />
          )}
        </HeaderButtons>
      ),
    });
  }, [navigation, isSearchIconVisible]);
  return (
    <ToDoList
      filterCompleted={false}
      isSearchIconVisible={isSearchIconVisible}
    />
  );
};

export default UncompletedTodosScreen;
