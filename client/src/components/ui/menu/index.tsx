import {
  Button,
  ChevronDownIcon,
  Menu as MenuComponent,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/icons';
import { useState } from 'react';

export const Menu = ({ title, list }: { title: string; list: string[] }) => {
  const [selectItem, setSelectItem] = useState('');
  return (
    <MenuComponent>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />} w="100%">
        {selectItem ? selectItem : title}
      </MenuButton>
      <MenuList>
        {list.map((e) => (
          <MenuItem onClick={() => setSelectItem(e)}>{e}</MenuItem>
        ))}
      </MenuList>
    </MenuComponent>
  );
};
