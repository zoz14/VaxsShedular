function Logout(props) {
    const handleLogout = () => {
      localStorage.removeItem('userToken');
      props.history.push('/Login');
    };
  
    return (
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    );
  }
  
  export default Logout; 