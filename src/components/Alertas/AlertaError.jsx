import React from "react";

const AlertaError = ({ mensaje }) => {
    return (
        <div className="alert alert-danger d-flex align-items-center" role="alert">
            <i className="bi bi-x-circle-fill me-2"></i>
            {mensaje}
        </div>
    );
};

export default AlertaError;
