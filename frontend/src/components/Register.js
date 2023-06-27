import React from "react";
import { Link } from "react-router-dom";

function Register({onSubmit}) {
    const [formValue, setFormValue] = React.useState({
        email: '',
        password: ''
    });

    function handleChange(e) {
        const {name, value} = e.target;

        setFormValue({
            ...formValue,
            [name]: value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit(formValue);
        setFormValue({
            email: '',
            password: ''
        })
    }

    return(
        <section className="auth">
            <div className="form">
                <h2 className="form__title">Регистрация</h2>
                <form className="form-set" onSubmit={handleSubmit}>
                    <input type="email" name="email" className="form-set__input" value={formValue.email} required placeholder="Email" onChange={handleChange}></input>
                    <input type="password" name="password" className="form-set__input" value={formValue.password} required placeholder="Пароль" onChange={handleChange}></input>
                    <button className="form-set__submit">Зарегестрироваться</button>
                    <p className="form-set__description">Уже зарегистрированы? {<Link to='/sign-in' className="form-set__description_type_link">Войти</Link>}</p>
                </form>
            </div>
        </section>
    );
}

export default Register;