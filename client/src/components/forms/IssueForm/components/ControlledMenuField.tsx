import { ControlledMenuFieldProps } from '@/types/form';
import { FormControl, FormLabel } from '@chakra-ui/react';
import { Controller } from 'react-hook-form';
import { IssueFromMenu } from '../ui/menu';

export const ControlledMenuField = ({
  name,
  label,
  list,
  control,
  error,
  isDisabled,
}: ControlledMenuFieldProps) => {
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel>{label}</FormLabel>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState }) => (
          <IssueFromMenu
            title={list[field.value] || label}
            list={list}
            onSelect={field.onChange}
            isDisabled={isDisabled}
            buttonProps={{
              borderWidth: '1px',
              borderColor: fieldState.invalid ? 'red.500' : 'gray.200',
              _hover: {
                borderColor: fieldState.invalid ? 'red.600' : 'gray.300',
              },
            }}
          />
        )}
      />
    </FormControl>
  );
};
