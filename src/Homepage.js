import React from 'react';


const Home = () => {

  const LogOut = async () => {
    await logoutMicroApps(availableServices);
    try {
      const localKeys = Object.keys(localStorage)
      localKeys.map(s => localStorage.removeItem(s))
      sessionStorage.clear()
    } catch (error) {
      localStorage.removeItem("react-token");
      localStorage.removeItem("user-info");
      localStorage.removeItem('shell.auth');
      sessionStorage.clear()
    }
    window.open(
      `http://192.168.0.119:8080/realms/test/protocol/openid-connect/logout?redirect_uri=http://localhost:3000`,
      "_self"
    );
  };

  return (
    <div>
      <h1 className="text-green-800 text-4xl">Welcome to the Homepage</h1>
      <button onClick={LogOut}>LogOut</button>
    </div>
  );
};

export default Home;