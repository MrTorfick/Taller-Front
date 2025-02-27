import React from "react";

const Spinner = () => {
    return (
        <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: "100px" }}>
            <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}>
            </div>
            <p className="mt-2 text-primary fw-semibold text-uppercase">Cargando...</p>

        </div>
    );
};

export default Spinner;
