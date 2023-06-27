import React from "react";

function Login({onSubmit}) {
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
        });
    }

    return(
        <section className="auth">
            <div className="form">
                <h2 className="form__title">Вход</h2>
                <form className="form-set" onSubmit={handleSubmit}>
                    <input name="email" type="email" className="form-set__input" value={formValue.email} required placeholder="Email" onChange={handleChange}></input>
                    <input name="password" type="password" className="form-set__input" value={formValue.password} required placeholder="Пароль" onChange={handleChange}></input>
                    <button className="form-set__submit">Войти</button>
                </form>
            </div>
        </section>
    );
}

export default Login;