import React from "react";

const SubTableItem = ({ emailId, createdAt, unSubScribe, id }) => {
  return (
    <tr className="bg-white border-b text-left">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        {emailId}
      </th>
      <td className="px-6 py-4 hidden sm:table-cell">
        {new Date(createdAt).toDateString()}
      </td>
      <td className="px-6 py-4 cursor-pointer" onClick={() => unSubScribe(id)}>
        X
      </td>
    </tr>
  );
};

export default SubTableItem;
