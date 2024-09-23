import type { District } from '@app/api';
import type { SelectOption } from '@app/common';

export const formatDistrictListToSelect = (
  districts: District[],
): SelectOption[] => {
  if (!districts || !districts.length) {
    return [];
  }

  return districts.map<SelectOption>((district, index) => ({
    id: index,
    value: district.name,
    label: district.name,
  }));
};
