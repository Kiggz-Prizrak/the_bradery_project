import { useForm } from "react-hook-form";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { userlogin } from "../store/slice";

import CloseIcon from "../assets/icons/CloseIcon";

const SignInModal = ({ setSignInModalIsOpen }) => {
  const dispatch = useDispatch();

  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const [errorHTTP, setErroHTTP] = useState("");


  // const [formDatas, setFormDatas] = useState({
  //   firstname: "",
  //   lastname: "",
  //   email: "",
  //   password: "",
  // });

  const subForm = (data) => {
    setErroHTTP("");
    console.log(data);
  };

  return (
    <div className="modal_background">
      <div className="modal_container">
        <div className="modal_content">
          <div className="modal_header">
            <h2>Sign in</h2>
            <button
              className="button_transparent"
              onClick={() => setSignInModalIsOpen(false)}
            >
              <CloseIcon />
            </button>
          </div>

          <form
            onSubmit={handleSubmit(subForm)}
            className="modal_form"
            action="submit"
          >
            <p className="subtitle">Create you account</p>
            <div className="checkForm-section">
              <div className="labelContainer">
                <label htmlFor="firstname">firstname</label>
                <input
                  className={errors.firstname?.message ? "errorInput" : "input"}
                  id="firstname"
                  type="text"
                  placeholder="your firstname"
                  enterKeyHint="next"
                  {...register("firstname", {
                    required: "please provide this field",
                    pattern: {
                      value:
                        !/^[\wàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ\d '-]+$/,
                      message: "please provide valid data",
                    },
                  })}
                />
                <p className="errorMessage">{errors.firstname?.message}</p>
              </div>
              <div className="labelContainer">
                <label htmlFor="lastname">Lastname</label>
                <input
                  className={errors.lastname?.message ? "errorInput" : "input"}
                  id="lastname"
                  type="text"
                  placeholder="your lastname"
                  enterKeyHint="next"
                  {...register("lastname", {
                    required: "please provide this field",
                    pattern: {
                      value:
                        !/^[\wàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ\d '-]+$/,
                      message: "please provide valid data",
                    },
                  })}
                />
                <p className="errorMessage">{errors.lastname?.message}</p>
              </div>
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
                      message: "please entry password",
                    },
                  })}
                />
                <p className="errorMessage">{errors.password?.message}</p>
              </div>
            </div>
            <p className="errorMessage">{errorHTTP}</p>

            <button type="submit" className="checkForm-submit button-blue">
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInModal;
