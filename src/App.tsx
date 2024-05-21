// App.tsx
import React, { useState, useEffect } from 'react';
import PaginatedTable from './components/PaginatedTable';
import SearchBar from './components/SearchBar';
import { DataItem } from './types/DataItem';
import { v4 as uuidv4 } from 'uuid';
import { legends } from './assets/legends';

export default function App() {
  const API_URL = import.meta.env.VITE_BASE_URL as string;

  const [data, setData] = useState<DataItem[]>([]);
  const [query, setQuery] = useState<string>('');
  const itemsPerPage = 18;

  async function getAllData() {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) {
        const message = `Что-то пошло не так: ${res.status} - ${res.statusText}`;
        throw new Error(message);
      }
      const data: DataItem[] = await res.json();
      
      const dataWithIdAndInfo = data.map(item => {
        const legend = legends.find(legendItem => legendItem.name === item.name);
        return {
          ...item,
          id: uuidv4(),
          additional_info: legend ? legend.additional_info : 'Нету дополнительной информации'
        };
      });

      setData(dataWithIdAndInfo);
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log('Неизвестная ошибка');
      }
    }
  }

  useEffect(() => {
    getAllData();
  }, []);

  const filteredData = data.filter(item =>
    Object.values(item).some(value =>
      value.toString().toLowerCase().includes(query.toLowerCase())
    )
  );

  return (
    <>
      <div className="container mx-auto p-4 max-w-custom">
        <SearchBar query={query} setQuery={setQuery} />
        <PaginatedTable data={filteredData} itemsPerPage={itemsPerPage} />
      </div>
    </>
  );
}
