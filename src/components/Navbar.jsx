import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-around bg-slate-900 text-white p-4 sticky top-0">
      <div className="font-bold text-2xl">
        <span className="text-green-500">&lt;</span>Pass<span className="text-green-500">OP/&gt;</span>
      </div>
      <button className="flex items-center gap-1 bg-green-500 px-2  rounded-2xl text-sm  border-2 border-white">
        <img className="w-7" src="/images/github.png" alt="github" />
        Github
      </button>
    </nav>
  );
};

export default Navbar;
