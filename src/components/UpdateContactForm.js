import { useState } from "react";

const UpdateContactForm = (props) => {
  const [updateData, setUpdateData] = useState({
    name: "",
    email: "",
    celPhone: "",
    phone: "",
  });

  const updateContactHandler = async (e) => {
    await api.patch("contact", {
      name: updateData.name,
      email: updateData.email,
      celPhone: updateData.celPhone,
      phone: updateData.phone,
    });
  };

  function handler(e) {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setUpdateData(newData);
  }

  return (
    <form onSubmit={updateContactHandler}>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Nome</label>
          <input
            type="text"
            onChange={(e) => handler(e)}
            id="name"
            value={props.name}
          />
        </div>
        <div className="new-expense__control">
          <label>Email</label>
          <input
            type="text"
            onChange={(e) => handler(e)}
            id="email"
            value={props?.email}
          />
        </div>
        <div className="new-expense__control">
          <label>Celular</label>
          <input
            type="number"
            onChange={(e) => handler(e)}
            id="celPhone"
            value={props?.celPhone}
          />
        </div>
      </div>
      <div className="new-expense__actions">
        <button type="submit"></button>
      </div>
    </form>
  );
};

export default UpdateContactForm;
