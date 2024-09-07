import { useEffect, useState, useCallback } from 'react';
import { Autocomplete, AutocompleteItem } from '@nextui-org/react';
import { debounce } from 'lodash';
import { useRecipientList } from '@/data/information';

interface ItemsProps {
  label: string;
  value: any;
}

interface RecipientSelectProps {
  placeholder: string;
  selectedValue: any | null;
  handleInputValue?: (value: string) => void;
  handleChangeValue?: (value: any) => void;
  handleResetValue?: () => void;
}

const RecipientSelect = ({
  placeholder,
  selectedValue,
  handleInputValue,
  handleChangeValue,
  handleResetValue,
}: RecipientSelectProps) => {
  const [filter, setFilter] = useState<string>('');
  const [items, setItems] = useState<ItemsProps[]>([]);

  const { recipientListData } = useRecipientList({
    limit: 50,
    page: 1,
    nama: filter,
  });

  useEffect(() => {
    if (selectedValue) {
      setItems((prevItems) => {
        const isAlreadyAdded = prevItems.some(
          (item) => item.value.id === selectedValue.id
        );
        if (!isAlreadyAdded) {
          return [
            ...prevItems,
            {
              label: selectedValue.nama,
              value: selectedValue,
            },
          ];
        }
        return prevItems;
      });
    }
  }, [selectedValue]);

  useEffect(() => {
    if (recipientListData?.data?.data?.length) {
      const mappingItems: ItemsProps[] = recipientListData.data.data.map(
        (dataRecipient: any) => ({
          label: dataRecipient?.nama,
          value: dataRecipient,
        })
      );
      setItems(mappingItems);
    }
  }, [recipientListData]);

  const handleSelectionChange = (key: React.Key | null) => {
    if (key) {
      const selectedItem = items.find((item) => item.value.id === Number(key));
      if (selectedItem && handleChangeValue) {
        handleChangeValue(selectedItem.value);
      }
    } else {
      if (handleResetValue) {
        handleResetValue();
      }
    }
  };

  const debouncedInputChange = useCallback(
    debounce((value: string) => {
      setFilter(value);
      handleInputValue?.(value);
    }, 500),
    [handleInputValue]
  );

  const handleInputChange = (value: string) => {
    debouncedInputChange(value);
  };

  return (
    <Autocomplete
      aria-label='Recipient selection'
      items={items}
      placeholder={placeholder}
      defaultSelectedKey={
        selectedValue ? selectedValue.id.toString() : undefined
      }
      selectedKey={selectedValue ? selectedValue.id.toString() : undefined}
      onSelectionChange={handleSelectionChange}
      onInputChange={handleInputChange}
    >
      {(item) => (
        <AutocompleteItem key={item.value.id.toString()}>
          {item.label}
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
};

export default RecipientSelect;
