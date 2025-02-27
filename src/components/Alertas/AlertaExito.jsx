import React from "react";

const AlertaExito = ({ mensaje }) => {
    return (
        <div className="alert alert-success d-flex align-items-center" role="alert">
            <i className="bi bi-check-circle-fill me-2"></i>
            {mensaje}
        </div>
    );
};

export default AlertaExito;
