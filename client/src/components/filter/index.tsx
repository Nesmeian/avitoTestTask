import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Button,
  Checkbox,
  CheckboxIcon,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { filterMenuBtnStyles } from './styles';

export const Filter = () => {
  const filtersArr = [
    'Фильтр 1',
    'Фильтр 2',
    'Фильтр 3',
    'Фильтр 4',
    'Фильтр 5',
  ];
  return (
    <Menu closeOnSelect={false}>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon transition="transform 0.1s" />}
        {...filterMenuBtnStyles}
      >
        <HStack flexWrap="wrap" p="10px 0" rowGap="4px" columnGap="8px">
          <Text color="rgba(0, 0, 0, 0.64)" noOfLines={1}>
            Выберите из списка...
          </Text>
        </HStack>
      </MenuButton>
      <MenuList w="auto" zIndex={30}>
        {filtersArr.map((value, i) => (
          <MenuItem
            key={value}
            background={i % 2 == 0 ? 'rgba(0, 0, 0, 0.06);' : 'white'}
          >
            <Checkbox
              width="100%"
              colorScheme="customgreen"
              icon={
                <CheckboxIcon
                  sx={{
                    color: 'black',
                  }}
                />
              }
            >
              {value}
            </Checkbox>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};
