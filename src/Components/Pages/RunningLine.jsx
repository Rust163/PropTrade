import {useState, React} from "react";
import '../../styles/RunningLine.css'
import { motion } from "framer-motion";

function RunningLine() {
  const [activBatton, setActivButton] = useState("Взлеты дня");
  const items = [
    { name: "CHMK", price: "7200,0", change: "+9,67%" },
    { name: "OZPH", price: "52,29", change: "+8,94%" },
    { name: "DIOD", price: "11,65", change: "+7,67%" },
    { name: "MISB", price: "46,5", change: "+6,65%" },
    { name: "GEMA", price: "140,2", change: "+6,45%" },
  ];
  const items2 = [
    { name: "AAPL", price: "290,0", change: "-12,67%" },
    { name: "OZPH", price: "52,29", change: "+8,94%" },
    { name: "DIOD", price: "11,65", change: "+7,67%" },
    { name: "MISB", price: "46,5", change: "+6,65%" },
    { name: "GEMA", price: "140,2", change: "+6,45%" },
  ];
  const items3 = [
    { name: "MOEX", price: "2500,0", change: "+19,67%" },
    { name: "S&P500", price: "1236,29", change: "-18,94%" },
    { name: "DIOD", price: "11,65", change: "+7,67%" },
    { name: "MISB", price: "46,5", change: "+6,65%" },
    { name: "GEMA", price: "140,2", change: "+6,45%" },
  ];

  return (
    <div className="running-line-box pt-5">
        <div className="btn-box">
            <button id="items" className="btnB " onClick={() => setActivButton("Взлеты дня")}>Взлеты дня</button>
            <button id="items2" className="btnB" onClick={() => setActivButton("Падения дня")}>Падения дня</button>
            <button id="items3" className="btnB" onClick={() => setActivButton("Индексы")}>Индексы</button>
        </div>
        {activBatton === "Взлеты дня" && 
      <motion.div
        className="motion-items"
        initial={{ x: "100%" }}
        animate={{ x: "-100%" }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      >
        
        {[...items, ...items].map((item, index) => (
          <div key={index} className="item-box">
            <span className="name-color">{item.name}</span>
            <br/>
            <span className="price-color">{item.price}</span>
            <span className="change-color">{item.change}</span>
          </div>
        ))}
      </motion.div>}
      {activBatton === "Падения дня" && 
      <motion.div
        className="motion-items"
        initial={{ x: "100%" }}
        animate={{ x: "-100%" }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      >
        
        {[...items2, ...items2].map((item, index) => (
          <div key={index} className="item-box">
            <span className="name-color">{item.name}</span>
            <br/>
            <span className="price-color">{item.price}</span>
            <span className="change-color2">{item.change}</span>
          </div>
        ))}
      </motion.div>}
      {activBatton === "Индексы" && 
      <motion.div
        className="motion-items"
        initial={{ x: "100%" }}
        animate={{ x: "-100%" }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      >
        
        {[...items3, ...items3].map((item, index) => (
          <div key={index} className="item-box">
            <span className="name-color">{item.name}</span>
            <br/>
            <span className="price-color">{item.price}</span>
            <span className="change-color">{item.change}</span>
          </div>
        ))}
      </motion.div>}
    </div>
  );
};



export default RunningLine;
