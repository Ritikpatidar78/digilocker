import React from "react";
import { Link } from "react-router-dom";

const Document = ({ doc, index }) => {
  return (
    <tr>
      <th scope="row"> {index + 1} </th>
      <td>{doc.title}</td>
      <td>{new Date(doc.createdAt).toLocaleDateString("en-IN")}</td>

      <td>
        <Link to={`/singledocument/${doc._id}`} className="btn btn-sm btn-dark">
          View
        </Link>
      </td>
    </tr>
  );
};

export default Document;
