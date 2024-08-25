import { useEffect, useState, useCallback } from 'react';
import { Autocomplete, AutocompleteItem } from '@nextui-org/react';
import useLocation from '@/data/master-data/useLocation';
import { debounce } from 'lodash';

interface LocationDataProps {
  id: number;
  kecamatan: string;
  kota: string;
  provinsi: string;
}

interface ItemsProps {
  label: string;
  value: LocationDataProps;
}

interface LocationSelectProps {
  placeholder: string;
  selectedValue: LocationDataProps | null;
  handleChangeValue?: (value: LocationDataProps) => void;
  handleResetValue?: () => void;
}

const LocationSelect = ({
  placeholder,
  selectedValue,
  handleChangeValue,
  handleResetValue,
}: LocationSelectProps) => {
  const [filter, setFilter] = useState<string>('');
  const [items, setItems] = useState<ItemsProps[]>([]);

  const { locationData } = useLocation({ keyword: filter });

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
              label: `${selectedValue.kecamatan}, ${selectedValue.kota}, ${selectedValue.provinsi}`,
              value: selectedValue,
            },
          ];
        }
        return prevItems;
      });
    }
  }, [selectedValue]);

  useEffect(() => {
    if (locationData?.data?.length) {
      const mappingItems: ItemsProps[] = locationData.data.map(
        (dataLocation: LocationDataProps) => ({
          label: `${dataLocation.kecamatan}, ${dataLocation.kota}, ${dataLocation.provinsi}`,
          value: dataLocation,
        })
      );
      setItems(mappingItems);
    }
  }, [locationData]);

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
    }, 500),
    []
  );

  const handleInputChange = (value: string) => {
    debouncedInputChange(value);
  };

  return (
    <Autocomplete
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

export default LocationSelect;
