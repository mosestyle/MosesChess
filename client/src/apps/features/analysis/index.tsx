import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";

import Analysis from "./pages/Analysis";

import "@/i18n";
import "@/index.css";

const root = ReactDOM.createRoot(
    document.querySelector(".root")!
);

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter basename="/MosesChess">
                <Suspense fallback={<div />}>
                    <Routes>
                        <Route path="/" element={<Analysis />} />
                        <Route path="/analysis" element={<Analysis />} />
                    </Routes>
                    <ToastContainer />
                </Suspense>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

root.render(<App />);
