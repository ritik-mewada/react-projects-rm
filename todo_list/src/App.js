import React, { useState, useEffect } from "react";
import Alert from "./components/Alert";
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBContainer,
    MDBInput,
    MDBRow,
} from "mdb-react-ui-kit";
import ListTable from "./components/ListTable";

const getLocalStorage = () => {
    let list = localStorage.getItem("list");
    if (list) {
        return (list = JSON.parse(localStorage.getItem("list")));
    } else {
        return [];
    }
};

const App = () => {
    const [name, setName] = useState("");
    const [list, setList] = useState(getLocalStorage());
    const [isEditing, setIsEditing] = useState(false);
    const [editID, setEditID] = useState(null);
    const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

    useEffect(() => {
        localStorage.setItem("list", JSON.stringify(list));
    }, [list]);

    // Submit Handler function
    const submitHandler = (e) => {
        e.preventDefault();
        if (!name) {
            showAlert(true, "danger", "Please enter a todo list");
        } else if (name && isEditing) {
            setList(
                list.map((item) => {
                    if (item.id === editID) {
                        return { ...item, title: name };
                    }
                    return item;
                })
            );
            setName("");
            setEditID(null);
            setIsEditing(false);
            showAlert(true, "info", "Item Name Updated");
        } else {
            showAlert(true, "success", "Item Added to the List");
            const newItem = {
                id: new Date().getTime().toString(),
                title: name,
            };
            setList([...list, newItem]);
            setName("");
        }
    };

    // Show Alert Function
    const showAlert = (show = false, type = "", msg = "") => {
        setAlert({ show, type, msg });
    };

    // Remove Item function
    const removeItem = (id) => {
        showAlert(true, "danger", "Item Removed from the List");
        setList(list.filter((item) => item.id !== id));
    };

    // Edit Item Function
    const editItem = (id) => {
        const editItem = list.find((item) => item.id === id);
        setIsEditing(true);
        setEditID(id);
        setName(editItem.title);
    };

    // Clear List Function
    const clearList = () => {
        showAlert(true, "danger", "Cleared the Todo List");
        setList([]);
    };

    return (
        <section className="vh-100" style={{ backgroundColor: "#eee" }}>
            <MDBContainer className="py-5 h-100">
                <form action="#" onSubmit={submitHandler}>
                    <MDBRow className="d-flex justify-content-center align-items-center">
                        <MDBCol lg="9" xl="7">
                            <MDBCard className="rounded-3">
                                <MDBCardBody className="p-4">
                                    {alert.show && (
                                        <Alert
                                            {...alert}
                                            removeAlert={showAlert}
                                            list={list}
                                        />
                                    )}
                                    <h4 className="text-center my-3 pb-3">
                                        To Do App
                                    </h4>
                                    <MDBRow className="row-cols-lg-auto g-3 justify-content-center align-items-center mb-4 pb-2">
                                        <MDBCol size="12">
                                            <MDBInput
                                                label="Enter a task here"
                                                id="form1"
                                                type="text"
                                                onChange={(e) =>
                                                    setName(e.target.value)
                                                }
                                                value={name}
                                            />
                                        </MDBCol>
                                        <MDBCol size="12">
                                            <MDBBtn type="submit">
                                                {isEditing
                                                    ? "Edit"
                                                    : "Add Task"}
                                            </MDBBtn>
                                        </MDBCol>
                                    </MDBRow>
                                    {list.length > 0 && (
                                        <div style={{ marginTop: "2rem" }}>
                                            <ListTable
                                                items={list}
                                                removeItem={removeItem}
                                                editItem={editItem}
                                            />
                                            <div className="text-center">
                                                <button
                                                    className="btn btn-warning"
                                                    onClick={clearList}
                                                >
                                                    Clear All
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </form>
            </MDBContainer>
        </section>
    );
};

export default App;
