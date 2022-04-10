import api from "../services/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const UpdateList = (props) => {
  const deleteContactHandler = async (id) => {
    await api.delete(`/contact/${id}`);
    props.setContacts(props.contacts.filter((contact) => contact._id !== id));
  };

  const textEditor = (options) => {
    return (
      <InputText
        type="text"
        value={options.value}
        onChange={(e) => options.editorCallback(e.target.value)}
      />
    );
  };

  const deleteButton = (rowData) => {
    return (
      <i
        className="pi pi-trash"
        onClick={() => deleteContactHandler(rowData._id)}
      ></i>
    );
  };

  const onRowEditComplete = async (e, _id) => {
    let { newData, index } = e;
    props.contacts[index] = newData;
    const obj = {
      name: newData.name,
      email: newData.email,
      celPhone: newData.celPhone,
      phone: newData.phone,
    };
    await api.patch(`/contact/${newData._id}`, obj).then(() => {
      props.setContacts(props.contacts);
    });
  };

  return (
    <div>
      <div className="card p-fluid">
        <DataTable
          value={props.contacts}
          responsiveLayout="scroll"
          selectionAutoFocus="false"
          editMode="row"
          dataKey="id"
          size="small"
          onRowEditComplete={onRowEditComplete}
        >
          <Column
            align="center"
            field="name"
            header="Nome"
            style={{ width: "20%" }}
            editor={(options) => textEditor(options)}
          ></Column>
          <Column
            align="center"
            field="email"
            header="Email"
            style={{ width: "20%" }}
            editor={(options) => textEditor(options)}
          ></Column>
          <Column
            align="center"
            field="celPhone"
            header="Celular"
            style={{ width: "20%" }}
            editor={(options) => textEditor(options)}
          ></Column>
          <Column
            align="center"
            field="phone"
            header="Telefone Residencial"
            editor={(options) => textEditor(options)}
          ></Column>
          <Column
            align="center"
            header="Edit"
            rowEditor
            headerStyle={{ width: "10%", minWidth: "8rem" }}
            bodyStyle={{ textAlign: "center" }}
          ></Column>
          <Column
            frozen="true"
            body={deleteButton}
            header="Delete"
            align="center"
          ></Column>
        </DataTable>
      </div>
    </div>
  );
};

export default UpdateList;
