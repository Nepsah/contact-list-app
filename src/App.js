import UpdateList from "./components/UpdateList";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { useState, useEffect } from "react";
import CreateContactForm from "./components/CreateContactForm";
import api from "./services/api";

const App = () => {
  const [displayModal, setDisplayModal] = useState(false);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    api.get("contact").then(({ data }) => {
      setContacts(data);
    });
  }, []);

  const dialogFuncMap = {
    displayModal: setDisplayModal,
  };

  const onClick = (name) => {
    dialogFuncMap[`${name}`](true);
  };

  const onHide = (name) => {
    dialogFuncMap[`${name}`](false);
  };

  return (
    <div>
      <UpdateList contacts={contacts} setContacts={setContacts} />
      <Dialog visible={displayModal} onHide={() => onHide("displayModal")}>
        <CreateContactForm
          className="new-contact"
          onHide={() => onHide("displayModal")}
          contacts={contacts}
          setContacts={setContacts}
        />
      </Dialog>
      <div className="card card-button">
        <Button
          className="p-button-success p-button-rounded"
          icon="pi pi-plus"
          onClick={() => onClick("displayModal")}
        />
      </div>
    </div>
  );
};

export default App;
