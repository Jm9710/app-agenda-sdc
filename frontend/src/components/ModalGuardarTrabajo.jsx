import React from "react";

const ModalAgregarTrabajo = () => {
    return (
<div 
    className="modal fade"
    id="modalGuardarTrabajo"
    tabIndex="-1"
    aria-labelledby="modalGuardarTrabajoLabel"
    aria-hidden="true"
>
    <div className="modal-dialog">
        <div className="modal-content">
            <div className="modal-body">
                <div className="mb-3 text-center fs-3">
                    Trabajo creado con éxito!
                </div>
                <div 
                    className="mb-3 d-flex justify-content-center align-items-center"
                    style={{
                        height: "200px",
                        overflow: "hidden",
                        borderRadius: "20px"
                    }}
                >
                    <img 
                        src="/images/succes.gif" 
                        alt="success" 
                        style={{
                            height: "100%",
                            width: "auto"
                        }} 
                    />
                </div>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary"
                data-bs-dismiss="modal">
                    Cerrar
                </button>
            </div>
        </div>
    </div>
</div>

    )
}

export default ModalAgregarTrabajo;