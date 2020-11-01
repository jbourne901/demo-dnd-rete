import React from "react";
import "./app.css";
import { createEditor } from "../../rete";
import { FlowchartComponentTemplate } from "../../types/flowchart/flowchart-component-template";
import { Flowchart } from "../../types/flowchart/flowchart";
import NumComponent from "../num-component";
import AddComponent from "../add-component";

const templates: FlowchartComponentTemplate[] = [
  new NumComponent(Flowchart.socketType),
  new AddComponent(Flowchart.socketType)
];
 
const schema=`
{
  "id":"solo@0.1.0",
  "nodes":{
    "1": { "id" :1,
           "data": {"num":5},
           "inputs":{},
           "outputs":{ 
               "num":{
                  "connections":[
                     { "node":3,
                       "input":"num1",
                       "data":{}
                     }
                  ]
                }
            },
            "position":[80,200],
            "name":"Number1"
          },
      "2": { "id": 2,
            "data": {"num":3 },
            "inputs":{},
            "outputs":{ 
               "num": {
                 "connections":[
                   {
                      "node":3,
                      "input":"num2",
                      "data":{}
                    }
                  ]
                }
              },
              "position":[80,400],
              "name":"Number1"
            },
        "3": { "id":3,
               "data": {
                 "num1":0,
                 "num2":0,
                 "preview":0
                },
                "inputs": {
                  "num1":{
                    "connections":[
                      {"node":1,
                       "output":"num",
                       "data":{}
                      }
                    ]
                  },
                  "num2":{
                    "connections":[
                      { "node":2,
                        "output":"num",
                         "data": {}
                      }
                    ]
                  }
                },
                "outputs": {
                  "num":{
                    "connections":[]
                  }
                },
                "position":[500,240],
                "name":"Add"
            }
  }
}`;

const App = ()  => {
    return (      
      <div className="app">
        <div
          className="app-container"
          ref={(element) => createEditor(element, templates, schema)}
        />
      </div>
    );
};

export default App;