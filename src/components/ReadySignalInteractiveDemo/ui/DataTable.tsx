import { motion } from 'framer-motion';
import { DataRow, formatColumnName, EXTERNAL_COLUMNS } from '../dataLoader';

interface DataTableProps {
  rows: DataRow[];
  columns: string[];
  showExternalBadges?: boolean;
  maxRows?: number;
  highlightTarget?: boolean;
}

export default function DataTable({
  rows,
  columns,
  showExternalBadges = false,
  maxRows = 10,
  highlightTarget = true,
}: DataTableProps) {
  const displayRows = rows.slice(0, maxRows);
  const hasMore = rows.length > maxRows;

  const isExternalColumn = (col: string) => {
    return EXTERNAL_COLUMNS.some(ext => 
      col.toLowerCase().includes(ext.toLowerCase()) || 
      ext.toLowerCase().includes(col.toLowerCase())
    );
  };

  const formatValue = (value: string | number, col: string): string => {
    if (typeof value === 'string') return value;
    if (col.toLowerCase().includes('sales')) return value.toLocaleString(undefined, { maximumFractionDigits: 0 });
    if (col.toLowerCase().includes('price')) return '$' + value.toFixed(2);
    if (col.toLowerCase().includes('spend')) return '$' + value.toLocaleString(undefined, { maximumFractionDigits: 0 });
    return value.toFixed(2);
  };

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              {columns.map((col, idx) => {
                const isExternal = isExternalColumn(col);
                const isTarget = col.toLowerCase().includes('sales');
                
                return (
                  <th
                    key={idx}
                    className="px-4 py-3 text-left font-semibold text-slate-700 whitespace-nowrap"
                  >
                    <div className="flex items-center gap-2">
                      <span className="truncate max-w-[150px]" title={formatColumnName(col)}>
                        {formatColumnName(col)}
                      </span>
                      {highlightTarget && isTarget && (
                        <span className="px-1.5 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-700 rounded">
                          TARGET
                        </span>
                      )}
                      {showExternalBadges && isExternal && (
                        <span className="px-1.5 py-0.5 text-[10px] font-bold bg-teal-100 text-teal-700 rounded">
                          RS
                        </span>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {displayRows.map((row, rowIdx) => (
              <motion.tr
                key={rowIdx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: rowIdx * 0.03 }}
                className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors"
              >
                {columns.map((col, colIdx) => {
                  const key = col.toLowerCase().replace(/ /g, '');
                  let value: string | number = '';
                  
                  if (col === 'Date' || col.toLowerCase() === 'date') {
                    value = row.date;
                  } else if (key === 'unitsales') {
                    value = row.unitSales;
                  } else if (key === 'priceperunit') {
                    value = row.pricePerUnit;
                  } else if (key === 'marketingspend') {
                    value = row.marketingSpend;
                  } else if (row[col] !== undefined) {
                    value = row[col];
                  }

                  const isExternal = isExternalColumn(col);

                  return (
                    <td
                      key={colIdx}
                      className={`px-4 py-2.5 font-mono text-slate-600 whitespace-nowrap ${
                        isExternal ? 'bg-teal-50/30' : ''
                      }`}
                    >
                      {formatValue(value, col)}
                    </td>
                  );
                })}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {hasMore && (
        <div className="px-4 py-2 bg-slate-50 border-t border-slate-200 text-center text-sm text-slate-500">
          Showing {displayRows.length} of {rows.length} rows
        </div>
      )}
    </div>
  );
}
