import { IssuesFormMenuType } from '@/types/uiTypes';
import {
  Button,
  ChevronDownIcon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/icons';

export const IssueFromMenu = ({
  title,
  list,
  onSelect,
  buttonProps,
  isDisabled,
}: IssuesFormMenuType) => {
  const handleSelect = (value: string) => {
    if (onSelect) {
      onSelect(value);
    }
  };
  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon />}
        w="100%"
        disabled={isDisabled}
        {...buttonProps}
      >
        {title}
      </MenuButton>
      <MenuList>
        {Object.entries(list).map(([id, name]) => (
          <MenuItem key={id} onClick={() => handleSelect(id)}>
            {name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};
