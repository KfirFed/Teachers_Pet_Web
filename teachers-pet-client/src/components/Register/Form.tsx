import style from "./Register.module.css";

export const Form = () => {
  return (
    <div>
      <form>
        <div>
          <input type="text" placeholder="User Name" className={style.input} />
        </div>
        <div>
          <input type="email" placeholder="Email" className={style.input} />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            className={style.input}
          />
        </div>
        <div>
          <input
            type="file"
            placeholder="Profile Image"
            className={style.input}
          />
        </div>
        <button type="submit" className={style.button}>
          Register
        </button>
      </form>
    </div>
  );
};
