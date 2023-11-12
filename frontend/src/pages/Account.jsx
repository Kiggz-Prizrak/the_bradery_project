import LoginModal from "../components/LoginModal";
import SignInModal from "../components/SignInModal";
import { useState } from "react";
import { useSelector } from "react-redux";

const Account = () => {
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
  const [signInModalIsOpen, setSignInModalIsOpen] = useState(false);

  const isLoged = useSelector((state) => state.userData.isLoged);
   const userData = useSelector((state) => state.userData);
console.log(userData);

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

        <div> <h1>Page utilisateur</h1>
        <h2>Bonjour {userData.firstname}</h2></div>

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
