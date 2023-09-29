import React, { useRef, useState } from 'react';
import "../pagestyle.css";
import Modal from 'react-bootstrap/Modal';
import { saveUser } from "../utils/API";

function RegisterModal(props) {
    const [show, setShow] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');

    const handleClose = () => {
        setShow(false);
        setPasswordError('');
        setEmailError('');
    };
    const handleShow = () => setShow(true);

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    function handleSubmit(event) {
        event.preventDefault();
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        // Password validation check
        if (password.length < 8) {
            setPasswordError("Password must be at least 8 characters long.");
            return;
        }

        // Email validation check
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError("Invalid email address.");
            return;
        }

        const user = {
            name,
            email,
            password
        };

        console.log(`Creating user: ${user}`);
        saveUser(user)
            .then(res => {
                console.log(res);
                props.handleGetSavedMovies();
                alert("User registered! Please log in to continue.");
            })
            .catch(err => alert("User already exists for the given email."));
        handleClose();
    }

    return (
        <>
            <button className="btn btn-info header-button" onClick={handleShow}>
                Register
            </button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header style={{ backgroundColor: "#4C4E49", color: "white" }} closeButton>
                    <Modal.Title style={{ fontFamily: "'Roboto Slab', serif", fontSize: "30px" }}>Register</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: "#39AEC5", borderBottomLeftRadius: "5px", borderBottomRightRadius: "5px" }}>
                    <form>
                        <div className="form-group text-center">
                            <label>Name:</label><br />
                            <input
                                className="input"
                                ref={nameRef}
                                name="name"
                                type="text"
                                placeholder="Full Name"
                            />
                        </div>
                        <div className="form-group text-center">
                            <label>Email:</label><br />
                            <input
                                className="input"
                                ref={emailRef}
                                name="email"
                                type="email"
                                placeholder="Email"
                            />
                            {emailError && (
                                <p className="text-danger">{emailError}</p>
                            )}
                        </div>
                        <div className="form-group text-center">
                            <label>Password:</label><br />
                            <input
                                className="input"
                                ref={passwordRef}
                                name="password"
                                type="password"
                                placeholder="Password"
                            />
                            {passwordError && (
                                <p className="text-danger">{passwordError}</p>
                            )}
                        </div>
                    </form>
                    <button className="btn btn-light header-button" style={{ margin: "0 auto" }} onClick={handleSubmit}>
                        Register
                    </button>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default RegisterModal;
