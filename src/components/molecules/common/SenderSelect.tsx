import { useEffect, useState, useCallback } from 'react';
import { Autocomplete, AutocompleteItem } from '@nextui-org/react';
import { debounce } from 'lodash';
import { useSenderList } from '@/data/information';

interface ItemsProps {
  label: string;
  value: any;
}

interface SenderSelectProps {
  placeholder: string;
  value: string | undefined;
  selectedValue: any | null;
  handleInputValue?: (value: string) => void;
  handleChangeValue?: (value: any) => void;
  handleResetValue?: () => void;
}

const SenderSelect = ({
  placeholder,
  value,
  selectedValue,
  handleInputValue,
  handleChangeValue,
  handleResetValue,
}: SenderSelectProps) => {
  const [filter, setFilter] = useState<string>('');
  const [items, setItems] = useState<ItemsProps[]>([]);

  const { senderListData } = useSenderList({
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
    if (senderListData?.data?.data?.length) {
      const mappingItems: ItemsProps[] = senderListData.data.data.map(
        (data: any) => ({
          label: data?.nama,
          value: data,
        })
      );
      setItems(mappingItems);
    }
  }, [senderListData]);

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
      aria-label='Sender selection'
      allowsCustomValue={true}
      items={items}
      placeholder={placeholder}
      defaultSelectedKey={
        selectedValue ? selectedValue.id.toString() : undefined
      }
      selectedKey={selectedValue ? selectedValue.id.toString() : undefined}
      value={value}
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

export default SenderSelect;
