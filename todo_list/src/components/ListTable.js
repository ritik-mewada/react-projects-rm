import React from "react";
import { MDBBtn, MDBTable, MDBTableBody, MDBTableHead } from "mdb-react-ui-kit";

const ListTable = ({ items, removeItem, editItem }) => {
    return (
        <MDBTable className="mb-4">
            <MDBTableHead>
                <tr>
                    <th scope="col">No.</th>
                    <th scope="col">Todo item</th>
                    <th scope="col">Actions</th>
                </tr>
            </MDBTableHead>
            <MDBTableBody>
                {items.map((item, index) => {
                    const { id, title } = item;
                    return (
                        <tr key={id}>
                            <td>{index + 1}</td>
                            <td>{title}</td>
                            <td>
                                <MDBBtn
                                    type="button"
                                    color="danger"
                                    onClick={() => editItem(id)}
                                >
                                    Edit
                                </MDBBtn>

                                <MDBBtn
                                    type="button"
                                    color="success"
                                    className="ms-1"
                                    onClick={() => removeItem(id)}
                                >
                                    Delete
                                </MDBBtn>
                            </td>
                        </tr>
                    );
                })}
            </MDBTableBody>
        </MDBTable>
    );
};

export default ListTable;
// {/* <tr>
//                     {/* <th scope="row">3</th> */}
//                     <td>Sign up for online course</td>
//                     {/* <td>In progress</td> */}
//                     <td>
//                         <MDBBtn type="submit" color="danger">
//                             Edit
//                         </MDBBtn>

//                         <MDBBtn type="submit" color="success" className="ms-1">
//                             Delete
//                         </MDBBtn>
//                     </td>
//                 </tr> */}
