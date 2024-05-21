import React, { useState } from 'react';
import { DataItem } from '../types/DataItem';
import { PaginatedTableProps } from '../types/PaginatedTableProps';

export default function PaginatedTable({ data, itemsPerPage }: PaginatedTableProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedItem, setSelectedItem] = useState<DataItem | null>(null);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentData.map((item) => (
          <div 
            key={item.id}
            className="bg-white p-4 rounded-lg shadow-md cursor-pointer"
            onClick={() => setSelectedItem(item)}
          >
            <h2 className="text-lg font-bold mb-4">{item.name}</h2>
            <p className="mb-1 flex items-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M17 1H7C6.44775 1 6 1.44922 6 2V2.5H18V2C18 1.70312 17.8701 1.4375 17.6641 1.25391C17.4873 1.09375 17.2549 1 17 1ZM5 2.5V3.5V18.5V19.5V22C5 23.1055 5.89551 24 7 24H17C17.6602 24 18.2456 23.6797 18.6099 23.1875C18.855 22.8555 19 22.4453 19 22V19.5V18.5V3.5V3V2C19 0.894531 18.1045 0 17 0H7C6.5498 0 6.13428 0.148438 5.7998 0.398438C5.31396 0.761719 5 1.34375 5 2V2.5ZM6 3.5V18.5H18V3.5H6ZM6 22V19.5H18V22C18 22.5508 17.5522 23 17 23H7C6.69092 23 6.41455 22.8594 6.23145 22.6367C6.08691 22.4648 6 22.2422 6 22ZM13 21C13 21.5508 12.5522 22 12 22C11.4478 22 11 21.5508 11 21C11 20.4492 11.4478 20 12 20C12.5522 20 13 20.4492 13 21Z" fill="#432EAB"/>
              </svg>
              <span className="ml-2">{item.phone}</span>
            </p>
            <p className="mb-1 flex items-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M23 7V17C23 17.5523 22.5523 18 22 18L2 18C1.44772 18 0.999999 17.5523 0.999999 17L1 7C1 6.89068 1.01754 6.78546 1.04996 6.687L10.4171 14.351C11.338 15.1045 12.6624 15.1045 13.5833 14.351L22.9501 6.68727C22.9825 6.78565 23 6.89078 23 7ZM22.1891 6.01786L12.9501 13.5771C12.3975 14.0292 11.6029 14.0292 11.0504 13.5771L1.81123 6.01779C1.87236 6.00611 1.93547 6 2 6L22 6C22.0647 6 22.1279 6.00614 22.1891 6.01786ZM22 5C23.1046 5 24 5.89543 24 7V17C24 18.1046 23.1046 19 22 19L2 19C0.895429 19 0 18.1046 0 17V7C0 5.89543 0.895432 5 2 5H22Z" fill="#432EAB"/>
              </svg>
              <span className="truncate-email ml-2">{item.email}</span>
            </p>
          </div>
        ))}
      </div>
      <div className="flex justify-end mt-10 space-x-2">
        <button
          onClick={handlePrevPage}
          className="bg-blue-500 text-white py-2 px-4 rounded disabled:opacity-50"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="self-center">Page {currentPage} of {totalPages}</span>
        <button
          onClick={handleNextPage}
          className="bg-blue-500 text-white py-2 px-4 rounded disabled:opacity-50"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
      
      {selectedItem && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={handleCloseModal}>
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-2xl font-bold mb-6">{selectedItem.name}</h2>
            <p className="mb-2"><strong>Phone:</strong> {selectedItem.phone}</p>
            <p className="mb-2"><strong>Email:</strong> {selectedItem.email}</p>
            <p className="mb-2"><strong>Address:</strong> {selectedItem.address}</p>
            <p className="mb-2"><strong>Position:</strong> {selectedItem.position_name}</p>
            <p className="mb-2"><strong>Department:</strong> {selectedItem.department}</p>
            <p className="mb-6"><strong>Hire Date:</strong> {selectedItem.hire_date}</p>
            <div><div className="mb-1"><strong>Additional Info:</strong></div> {selectedItem.additional_info}</div>
          </div>
        </div>
      )}
    </>
  );
}
