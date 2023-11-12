import { useState } from "react";
import CheckoutForm from "../components/CheckoutForm";
import CheckoutValidationModal from "../components/CheckoutValidationModal";
import LoginModal from "../components/LoginModal";
import SignInModal from "../components/SignInModal";

const Checkout = () => {
  const [isValid, setIsValid] = useState(false);
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false)
  const [signInModalIsOpen, setSignInModalIsOpen] = useState(false);

  return (
    <>
      <main className="page-container checkout-container">
        <div className="page-content">
          <CheckoutForm
            setIsValid={setIsValid}
            setSignInModalIsOpen={setSignInModalIsOpen}
            setLoginModalIsOpen={setLoginModalIsOpen}
          />
          {isValid ? <CheckoutValidationModal /> : ""}
        </div>
      </main>
      {loginModalIsOpen ? <LoginModal setLoginModalIsOpen={setLoginModalIsOpen}/> : ""}
      {signInModalIsOpen ? (
        <SignInModal setSignInModalIsOpen={setSignInModalIsOpen} />
      ) : (
        ""
      )}
    </>
  );
};

export default Checkout;
