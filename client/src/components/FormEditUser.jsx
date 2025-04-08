import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { read, update } from "../Functions/user";

const FormEditUser = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    age: "",
  });

  useEffect(() => {
    loadData(params.id);
  }, []);

  const loadData = async (id) => {
    read(id).then((res) => {
      setData(res.data);
    });
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    update(params.id, data)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="px-4">
      <form className="my-2" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={(e) => handleChange(e)}
          value={data.name}
          className="border mb-2"
        />
        <br />
        <input
          type="text"
          name="email"
          placeholder="Email"
          onChange={(e) => handleChange(e)}
          value={data.email}
          className="border mb-2"
        />
        <br />
        <input
          type="text"
          name="age"
          placeholder="Age"
          onChange={(e) => handleChange(e)}
          value={data.age}
          className="border mb-2"
        />
        <br />
        {/* <input
          type="text"
          name="address"
          placeholder="Address"
          onChange={(e) => handleChange(e)}
          className="border mb-2"
        />
        <br /> */}
        <button className="my-2 border rounded bg-blue-400 px-1">Submit</button>
      </form>
    </div>
  );
};

export default FormEditUser;
