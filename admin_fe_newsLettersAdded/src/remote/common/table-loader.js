import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const TableLoader = ({ rows, columns }) => {
  return (
    <tbody className="border-ab-gray-dark text-ab-sm border-t">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <tr key={rowIndex}>
          {Array.from({ length: columns }).map((_, colIndex) => (
            <td
              key={colIndex}
              className={`px-4 py-3 ${colIndex !== 0 && "border-l"}`}
            >
              <Skeleton height={16}/>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableLoader;
