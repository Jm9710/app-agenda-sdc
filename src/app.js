import React from "react";
import ReactDOM from "react-dom";
import ApiComponent from "./ApiComponent";

const App = () => {
    return (
        <div>
            <ApiComponent />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
