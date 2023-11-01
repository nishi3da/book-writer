import React, { StrictMode } from "react";
import BookGrid from "./components/BookGrid/BookGrid";
import { createRoot } from "react-dom/client";

const rootElement = document.getElementById("book_root");
const root = createRoot(rootElement!);

root.render(
    <StrictMode>
        <BookGrid />
    </StrictMode>
);
