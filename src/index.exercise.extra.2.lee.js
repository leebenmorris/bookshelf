// 🐨 you'll need to import React and ReactDOM up here
import React, { useRef } from 'react'
import ReactDom from 'react-dom'
import { Dialog } from '@reach/dialog'
import '@reach/dialog/styles.css'
import { Logo } from './components/logo'

const Form = ({ type, onClose, onSubmit }) => {
    const usernameRef = useRef()
    const passwordRef = useRef()

    window.onkeydown = function (event) {
        // 27 is the code for escape
        if (event.keyCode === 27) {
            usernameRef.current.blur()
            passwordRef.current.blur()
        }
    }

    const handleSubmit = event => {
        event.preventDefault()

        console.log({ usernameRef, passwordRef })

        const { username, password } = event.target.elements

        onSubmit({
            type,
            username: username.value,
            password: password.value,
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="Username">Username: </label>
                <input
                    ref={usernameRef}
                    type="text"
                    name="username"
                    id="username"
                    required
                />
            </div>
            <div>
                <label htmlFor="Password">Password: </label>
                <input
                    ref={passwordRef}
                    type="password"
                    name="password"
                    id="password"
                    required
                />
            </div>
            <button type="submit">{type}</button>
            <button onClick={onClose}>Cancel</button>
        </form>
    )
}

const onSubmit = ({ type, username, password }) => {
    alert(JSON.stringify({ type, username, password }, null, 4))
}

const App = () => {
    const [showModal, setShowModal] = React.useState('none')

    const closeModal = () => setShowModal('none')

    return (
        <>
            <Logo width="100" height="100" />
            <h1>Bookshelf</h1>
            <button onClick={() => setShowModal('Login')}>Login</button>
            <br />
            <button onClick={() => setShowModal('Register')}>Register</button>
            <Dialog
                aria-label="Login form"
                isOpen={showModal === 'Login'}
                onDismiss={closeModal}
            >
                <Form onSubmit={onSubmit} type="Login" onClose={closeModal} />
            </Dialog>
            <Dialog
                aria-label="Register form"
                isOpen={showModal === 'Register'}
                onDismiss={closeModal}
            >
                <Form
                    onSubmit={onSubmit}
                    type="Register"
                    onClose={closeModal}
                />
            </Dialog>
        </>
    )
}

ReactDom.render(<App />, document.getElementById('root'))
