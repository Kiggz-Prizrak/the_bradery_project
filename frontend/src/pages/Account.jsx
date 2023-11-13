import { useLoaderData } from "react-router-dom";
import LoginModal from "../components/LoginModal";
import SignInModal from "../components/SignInModal";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserData } from "../api";
import OrderSection from "../components/OrdersSection";

const Account = () => {
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
  const [signInModalIsOpen, setSignInModalIsOpen] = useState(false);

  const isLoged = useSelector((state) => state.userData.isLoged);

  const userLog = useSelector((state) => state.userData);

  const [userInfo, setUserInfo] = useState({});
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_HOST}users/${userLog.userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${userLog.token}` },
    })
      .then((res) => res.json())
      .then((res) => setUserInfo(res))
      .catch((error) => console.log(error));

    fetch(`${import.meta.env.VITE_API_HOST}orders`, {
      headers: { Authorization: `Bearer ${userLog.token}` },
    })
      .then((res) => res.json())
      .then((res) => setOrderList(res))
      .catch((error) => console.log(error));
  }, []);

  console.log(orderList);
  return (
    <>
      <main>
        {isLoged ? (
          ""
        ) : (
          <>
            <div className="checkoutForm_buttonLog">
              <button
                className="button-blue"
                onClick={(e) => {
                  e.preventDefault();
                  setSignInModalIsOpen(true);
                }}
              >
                Create your account
              </button>
              <button
                className="button-blue"
                onClick={(e) => {
                  e.preventDefault();
                  setLoginModalIsOpen(true);
                }}
              >
                Log in
              </button>
            </div>
          </>
        )}

        <div>
          {" "}
          <h1>Page utilisateur</h1>
          <h2>Bonjour {userInfo?.firstName} </h2>
        </div>
        <OrderSection orders={orderList} />
      </main>
      {loginModalIsOpen ? (
        <LoginModal setLoginModalIsOpen={setLoginModalIsOpen} />
      ) : (
        ""
      )}
      {signInModalIsOpen ? (
        <SignInModal
          setSignInModalIsOpen={setSignInModalIsOpen}
          setLoginModalIsOpen={setLoginModalIsOpen}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default Account;
