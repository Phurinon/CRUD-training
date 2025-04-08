import React, { useEffect, useState } from "react";
import axios from "axios";
import { remove, create, getData } from "../Functions/user";
import { Link } from "react-router-dom";

const FormUser = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [data, setData] = useState([]);
  const [form, setForm] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    getData()
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    create(form)
      .then((res) => {
        console.log(res);
        loadData();
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = async (id) => {
    remove(id)
      .then((res) => {
        console.log(res);
        loadData();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="px-4">
      FormUser
      <br />
      <form className="mb-2" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={(e) => handleChange(e)}
          className="border mb-2"
        />
        <br />
        <input
          type="text"
          name="email"
          placeholder="Email"
          onChange={(e) => handleChange(e)}
          className="border mb-2"
        />
        <br />
        <input
          type="text"
          name="age"
          placeholder="Age"
          onChange={(e) => handleChange(e)}
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
      <br />
      <table className="border-collapse border border-gray-400 ...">
        <thead>
          <tr>
            <th className="border border-gray-300 ...">No.</th>
            <th className="border border-gray-300 ...">Name</th>
            <th className="border border-gray-300 ...">Email</th>
            <th className="border border-gray-300 ...">Age</th>
            <th className="border border-gray-300 ...">Delete</th>
            <th className="border border-gray-300 ...">Edit</th>
          </tr>
        </thead>
        <tbody className="">
          {data
            ? data.map((item, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 text-center px-2">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300  px-2">{item.name}</td>
                  <td className="border border-gray-300  px-2">{item.email}</td>
                  <td className="border border-gray-300  px-2">{item.age}</td>
                  <td
                    className="border border-gray-300 text-red-700 px-2"
                    onClick={() => handleDelete(item.id)}
                  >
                    delete
                  </td>
                  <td className="border border-gray-300 text-blue-700 px-2">
                    <Link to={"/edit/" + item.id}>edit</Link>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default FormUser;
