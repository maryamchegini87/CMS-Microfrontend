import React from "react";

interface FilterFormProps {
  author: string;
  status: string;
  fromDate: string;
  toDate: string;
  onAuthorChange: (val: string) => void;
  onStatusChange: (val: string) => void;
  onFromDateChange: (val: string) => void;
  onToDateChange: (val: string) => void;
}

export const FilterForm: React.FC<FilterFormProps> = ({
  author,
  status,
  fromDate,
  toDate,
  onAuthorChange,
  onStatusChange,
  onFromDateChange,
  onToDateChange,
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <input
        type="text"
        placeholder="فیلتر نویسنده"
        value={author}
        onChange={(e) => onAuthorChange(e.target.value)}
        className="border px-2 py-1 rounded"
      />
      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        className="border px-2 py-1 rounded"
      >
        <option value="">همه وضعیت‌ها</option>
        <option value="draft">پیش‌نویس</option>
        <option value="published">منتشر شده</option>
      </select>
      <input
        type="date"
        value={fromDate}
        onChange={(e) => onFromDateChange(e.target.value)}
        className="border px-2 py-1 rounded"
      />
      <input
        type="date"
        value={toDate}
        onChange={(e) => onToDateChange(e.target.value)}
        className="border px-2 py-1 rounded"
      />
    </div>
  );
};