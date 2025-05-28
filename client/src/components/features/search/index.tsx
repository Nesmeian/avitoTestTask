import { FormControl, Input } from '@chakra-ui/react';
import { searchStyle } from './style';

export const Search = () => {
  return (
    <FormControl>
      <Input {...searchStyle} placeholder="Поиск задачи" />
    </FormControl>
  );
};
