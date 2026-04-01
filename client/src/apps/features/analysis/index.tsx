import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";

import PageWrapper from "@/components/layout/PageWrapper";
import { removeDefaultConsentLink } from "@/lib/consent";

import Analysis from "./pages/Analysis";
import * as styles from "./index.module.css";

import "@/i18n";
import "@/index.css";

const root = ReactDOM.createRoot(
    document.querySelector(".root")!
);

function App() {
    useEffect(() => {
        removeDefaultConsentLink();
    }, []);

    return <PageWrapper
        className={styles.wrapper}
        footerClassName={styles.footer}
    >
        <Analysis />
    </PageWrapper>;
}

root.render(<App />);
