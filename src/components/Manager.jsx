import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Manager = () => {
  const ref = useRef();
  const typeRef = useRef();
  const [form, setForm] = useState({
    site: "",
    username: "",
    password: "",
    id: uuidv4(),
  });
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let password = localStorage.getItem("passwords");
    if (password) {
      setPasswordArray(JSON.parse(password));
    }
  }, []);

  const showPassword = () => {
    if (ref.current.src.includes("/images/eye.png")) {
      ref.current.src = "/images/hide.png";
      typeRef.current.type = "text";
    } else {
      ref.current.src = "/images/eye.png";
      typeRef.current.type = "Password";
    }
  };

  const handelChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const savePassword = () => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      setPasswordArray([...passwordArray, form]);
      localStorage.setItem(
        "passwords",
        JSON.stringify([...passwordArray, form])
      );
      setForm({ site: "", username: "", password: "" });
      toast("Password Saved!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast("Error: length should > 3!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };
  const handelDelete = (id) => {
    setPasswordArray(passwordArray.filter((item) => item.id != id));
    localStorage.setItem(
      "passwords",
      JSON.stringify(passwordArray.filter((item) => item.id != id))
    );
    toast("Password Deleted!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  const handelEdit = (id) => {
    setForm(passwordArray.filter((item) => item.id === id)[0]);
    setPasswordArray(passwordArray.filter((item) => item.id != id));
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    toast("copy to clipboard!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="absolute inset-0 -z-10 h-full w-full">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
      </div>
      <div className="flex flex-col items-center mx-auto w-fit pt-8">
        <h1 className="font-bold text-3xl">
          <span className="text-green-500">&lt;</span>Pass
          <span className="text-green-500">OP/&gt;</span>
        </h1>
        <h2>Your Own Password Manager</h2>
      </div>
      <div className="flex flex-col items-center gap-5 px-3 md:px-0 md:w-2/3 mx-auto mt-5">
        <input
          onChange={handelChange}
          type="text"
          name="site"
          id="site"
          value={form.site}
          placeholder="Enter website URL"
          className="border-2 border-green-300 rounded-2xl w-full px-3"
        />
        <div className="flex flex-col md:flex-row gap-2 w-full">
          <input
            onChange={handelChange}
            type="text"
            value={form.username}
            name="username"
            id="username"
            placeholder="Enter Username"
            className="border-2 border-green-300 rounded-2xl md:w-5/6 px-3"
          />
          <div className="relative">
            <input
              onChange={handelChange}
              ref={typeRef}
              type="password"
              value={form.password}
              name="password"
              id="password"
              placeholder="Enter Password"
              className="border-2 border-green-300 rounded-2xl px-3 w-full"
            />
            <span onClick={showPassword} className="absolute right-2 top-[6px]">
              <img
                ref={ref}
                className="w-4 cursor-pointer"
                src="/images/eye.png"
                alt="eye"
              />
            </span>
          </div>
        </div>
        <button
          onClick={savePassword}
          className="flex items-center gap-1 bg-green-400 px-4 py-1  rounded-2xl  border border-black w-fit font-semibold"
        >
          <img className="w-6" src="/images/save.png" alt="save" />
          Save
        </button>
      </div>
      <div className="px-3 md:w-2/3 md:px-0  mx-auto mt-5 min-h-[49vh]">
        <h2 className="font-bold text-xl mb-2">Your Passwords</h2>
        {passwordArray.length == 0 && <div>No Password to show</div>}
        {passwordArray.length > 0 && (
          <table className="table-auto w-full rounded-md overflow-hidden">
            <thead className="bg-green-800 text-white">
              <tr className="py-2">
                <th className="py-2">Site</th>
                <th className="py-2">Username</th>
                <th className="py-2">Password</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-green-200">
              {passwordArray.map((item) => {
                return (
                  <tr key={item.id}>
                    <td className="text-center py-2 border border-white">
                      <div className="flex justify-center gap-1">
                        <span>{item.site}</span>
                        <img
                          onClick={() => {
                            copyText(item.site);
                          }}
                          className="cursor-pointer w-4"
                          src="/images/copy.png"
                          alt="copy"
                        />
                      </div>
                    </td>
                    <td className="text-center py-2 border border-white">
                      <div className="flex justify-center gap-1">
                        <span>{item.username}</span>
                        <img
                          onClick={() => {
                            copyText(item.username);
                          }}
                          className="cursor-pointer w-4"
                          src="/images/copy.png"
                          alt="copy"
                        />
                      </div>
                    </td>
                    <td className="text-center py-2 border border-white">
                      <div className="flex justify-center gap-1">
                        <span>{"*".repeat(item.password.length)}</span>
                        <img
                          onClick={() => {
                            copyText(item.password);
                          }}
                          className="cursor-pointer w-4"
                          src="/images/copy.png"
                          alt="copy"
                        />
                      </div>
                    </td>
                    <td className="flex justify-center gap-3 py-2 border border-white">
                      <img
                        onClick={() => {
                          handelEdit(item.id);
                        }}
                        className="cursor-pointer"
                        src="/images/edit.png"
                        alt="edit"
                      />
                      <img
                        onClick={() => {
                          handelDelete(item.id);
                        }}
                        className="cursor-pointer"
                        src="/images/delete.png"
                        alt="delete"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default Manager;
