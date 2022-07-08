import DataTable from "react-data-table-component";
import "./TableUI.css";

const TableUI = ({ 
    filterUsers, userId, search, 
    handleDelete, setSearch, handleEdit, 
    handleSingleDelete 
}) => {

    /*  {<--  table column structure  -->}   */
    const columns = [
        {
            name: "Name",
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: "Email",
            selector: (row) => row.email,
        },
        {
            name: "Role",
            selector: (row) => row.role,
        },
        {
            name: "Actions",
            cell: (row) => [
                <input key={1} type={'button'} id={row.id} value='Edit' onClick={handleEdit} />,
                <input 
                    key={2} 
                    type={'button'} 
                    id={row.id} 
                    value='Delete' 
                    onClick={handleSingleDelete} 
                />
            ]
        },
    ]

    return (
        <>
            <DataTable 
                className="dataTable"
                columns={columns} 
                data={filterUsers} 
                pagination 
                fixedHeader
                fixedHeaderScrollHeight="560px"
                selectableRows
                onSelectedRowsChange= {e => {
                    e.selectedRows.map(e => userId.push(e.id));
                }}
                selectableRowsHighlight
                highlightOnHover
                subHeader
                subHeaderComponent={
                    <input 
                        className="form-control" 
                        type="text" 
                        placeholder="Search by name" 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                }
            />
            <button className="delete-btn" onClick={handleDelete}>
                Delete
            </button>
        </>
    )
}

export default TableUI;