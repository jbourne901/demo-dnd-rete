import React, {useState, useEffect} from "react";
import {Socket as ReteSocket} from "rete";
import "./app.css";
import { createEditor } from "../../rete";


const App = ()  => {
    const [numSocket, setNumSocket] = useState<ReteSocket|undefined>(undefined);
    useEffect( () => {
      const ns = new ReteSocket("Number value");
      setNumSocket(ns);
    }, []);
    if(!numSocket) {
      return null;
    }
    return (      
      <div className="app">
        <div
          className="app-container"
          ref={(element) => createEditor(element, numSocket)}
        />
      </div>
    );
};

export default App;