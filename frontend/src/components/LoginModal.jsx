import { useForm } from "react-hook-form";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { userlogin } from "../store/slice";

// import { login } from "../api";

import CloseIcon from "../assets/icons/CloseIcon";

const LoginModal = ({ setLoginModalIsOpen }) => {

  const dispatch = useDispatch()

  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const [errorHTTP, setErroHTTP] = useState("");
  // const [formDatas, setFormDatas] = useState({
  //   email: "",
  //   password: "",
  // });

  const subForm = (data) => {

    setErroHTTP("")

    fetch(`${import.meta.env.VITE_API_HOST}users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.error) {
          setErroHTTP(res.error);
        } else {
          dispatch(userlogin({userId : res.user.id, token: res.token}));
          setLoginModalIsOpen(false)

        }
      })
  };

  return (
    <div className="modal_background">
      <div className="modal_container">
        <div className="modal_content">
          <div className="modal_header">
            <h2>Log in</h2>
            <button
              className="button_transparent"
              onClick={() => setLoginModalIsOpen(false)}
            >
              <CloseIcon />
            </button>
          </div>
          <form
            onSubmit={handleSubmit(subForm)}
            className="modal_form"
            action="submit"
          >
            
            <div className="modalForm_section">
              <div className="labelContainer">
                <label htmlFor="email">E-mail</label>
                <input
                  className={errors.email?.message ? "errorInput" : "input"}
                  id="email"
                  type="email"
                  enterKeyHint="next"
                  placeholder="youremail@email.com"
                  {...register("email", {
                    required: "please provide this field",
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: "please entry valid email",
                    },
                  })}
                />
                <p className="errorMessage">{errors.email?.message}</p>
              </div>
              <div className="labelContainer">
                <label htmlFor="password">Password</label>
                <input
                  className={errors.password?.message ? "errorInput" : "input"}
                  id="password"
                  type="password"
                  placeholder="***********"
                  {...register("password", {
                    required: "please provide this field",
                    pattern: {
                      value:
                        !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[_.@$!%*#?&])[A-Za-z\d_.@$!%*#?&]{8,}$/,
                      message: "please entry valid password",
                    },
                  })}
                />
                <p className="errorMessage">{errors.password?.message}</p>
              </div>
            </div>
            {errorHTTP ? <p className="errorMessage">{errorHTTP}</p> : ""}
            <button type="submit" className="checkForm-submit button-blue ">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
