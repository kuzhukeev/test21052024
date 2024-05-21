import { DataItem } from './DataItem';

export interface PaginatedTableProps {
  data: DataItem[];
  itemsPerPage: number;
}
