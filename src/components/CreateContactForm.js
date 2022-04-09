import React, { useState } from "react";
import api from "../services/api";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { InputMask } from "primereact/inputmask";

const CreateContactForm = (props) => {
  const [data, setData] = useState({
    name: "",
    email: "",
    celPhone: "",
    phone: "",
  });

  function handler(e) {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
  }

  const createContactHandler = async (e) => {
    e.preventDefault();
    await api.post("contact", {
      name: data.name,
      email: data.email,
      celPhone: data.celPhone,
      phone: data.phone,
    });
    props.contacts.push(data);
    props.setContacts(props.contacts);
    props.onHide(true);
  };

  return (
    <form onSubmit={createContactHandler}>
      <div className="new-contact_controls">
        <div className="new-contact__control">
          <label>Nome</label>
          <InputText
            type="text"
            onChange={(e) => handler(e)}
            id="name"
            value={data.name}
          />
        </div>
        <div className="new-contact__control">
          <label>Email</label>
          <InputText
            type="text"
            onChange={(e) => handler(e)}
            id="email"
            value={data.email}
          />
        </div>
        <div className="new-contact__control">
          <label>Celular</label>
          <InputMask
            mask="(99)99999-9999"
            onChange={(e) => handler(e)}
            id="celPhone"
            value={data.celPhone}
          />
          <div className="new-contact__control">
            <label>Telefone residencial</label>
            <InputMask
              mask="(99)9999-9999"
              onChange={(e) => handler(e)}
              id="phone"
              value={data.phone}
            />
          </div>
        </div>
        <div className="new-contact__actions">
          <Button
            icon="pi pi-check"
            className="p-button-rounded p-button-outlined"
            type="submit"
          />
        </div>
      </div>
    </form>
  );
};

export default CreateContactForm;
