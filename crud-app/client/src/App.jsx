import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

import User from "./getUser/User";
import Adduser from "./addUser/Adduser.jsx";
import Updateuser from "./Updateuser/Updateuser.jsx"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<User />} />
          <Route path="/add" element={<Adduser />} />
          <Route path="/update/:id" element={<Updateuser />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
