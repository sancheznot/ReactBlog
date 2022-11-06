import React from "react";
import { BrowserRouter, Routes, Navigate, Route } from "react-router-dom";
import { Home } from "../components/pages/Home";
import { Articles } from "../components/pages/Articles";
import { Create } from "../components/pages/Create";
import { Article } from "../components/pages/Article";

export const Routing = () => {
  return (
    <BrowserRouter>
      {/* Layout */}

        {/* Principal content and router */}
      <section id="content" className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/create" element={<Create />} />
          <Route path="/article/:id" element={<Article />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </section>
    </BrowserRouter>
  );
};
