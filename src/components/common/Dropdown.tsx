// src/components/common/Dropdown.tsx

import React from "react";
import DropDownPicker, { ItemType } from "react-native-dropdown-picker";
import { StyleSheet } from "react-native";
import { COLORS } from "../../constants";

interface DropdownProps {
  open: boolean;
  value: any;
  items: ItemType<any>[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setValue: (value: any) => void;
  setItems?: React.Dispatch<React.SetStateAction<ItemType<any>[]>>;
  style?: object;
  dropDownContainerStyle?: object;
  placeholder?: string;
  placeholderStyle?: object;
}

const Dropdown: React.FC<DropdownProps> = ({
  open,
  value,
  items,
  setOpen,
  setValue,
  setItems,
  style,
  dropDownContainerStyle,
  placeholder = "Select an option",
  placeholderStyle,
}) => {
  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      style={[styles.dropdown, style]}
      dropDownContainerStyle={[styles.dropdownContainer, dropDownContainerStyle]}
      placeholder={placeholder}
      placeholderStyle={[styles.placeholder, placeholderStyle]}
    />
  );
};

const styles = StyleSheet.create({
  dropdown: {
    borderColor: COLORS.gray,
    borderRadius: 10,
    height: 50,
  },
  dropdownContainer: {
    borderColor: COLORS.gray,
    borderRadius: 10,
  },
  placeholder: {
    color: COLORS.darkGray,
    fontSize: 14,
  },
});

export default Dropdown;
