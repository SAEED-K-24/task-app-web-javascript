import "../css/navbar.css";

function Navbar({ activeTab, setActiveTab }) {
  
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="navbar">
      <div className="all">
        <a 
        //   href="#all" 
          className={activeTab === 'all' ? 'active' : ''}
          onClick={() => handleTabClick('all')}
        >
          All Task
        </a>
      </div>
      <div className="in-progress">
        <a 
        //   href="#in-progress" 
          className={activeTab === 'in-progress' ? 'active' : ''}
          onClick={() => handleTabClick('in-progress')}
        >
          In Progress
        </a>
      </div>
      <div className="completed">
        <a 
        //   href="#completed" 
          className={activeTab === 'completed' ? 'active' : ''}
          onClick={() => handleTabClick('completed')}
        >
          Completed
        </a>
      </div>
    </div>
  );
}

export default Navbar;