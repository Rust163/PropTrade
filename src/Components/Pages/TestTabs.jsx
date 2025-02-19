import React, { useState } from "react";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("tab1");

  return (
    <div className="pt-5"> 
        
   
      {/* Кнопки вкладок */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <button onClick={() => setActiveTab("tab1")}>Вкладка 1</button>
        <button onClick={() => setActiveTab("tab2")}>Вкладка 2</button>
        <button onClick={() => setActiveTab("tab3")}>Вкладка 3</button>
      </div>

      {/* Контент вкладок */}
      {activeTab === "tab1" && <div>Контент первой вкладки</div>}
      {activeTab === "tab2" && <div>Контент второй вкладки</div>}
      {activeTab === "tab3" && <div>Контент третьей вкладки</div>}
    </div>
  );
};

export default Tabs;