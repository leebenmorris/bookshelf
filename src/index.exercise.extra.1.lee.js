// 🐨 you'll need to import React and ReactDOM up here
import React from 'react'
import ReactDom from 'react-dom'
import { Dialog } from '@reach/dialog'
import '@reach/dialog/styles.css'

import { Logo } from './components/logo'

const LoginModal = ({ showLoginModal, closeLoginModal }) => (
    <Dialog isOpen={showLoginModal} onDismiss={closeLoginModal}>
        <h2>Login</h2>
        <button className="close-button" onClick={closeLoginModal}>
            close
        </button>
    </Dialog>
)

const RegisterModal = ({ showRegisterModal, closeRegisterModal }) => (
    <Dialog isOpen={showRegisterModal} onDismiss={closeRegisterModal}>
        <h2>Register</h2>
        <button
            className="closeRegisterModal-button"
            onClick={closeRegisterModal}
        >
            close
        </button>
    </Dialog>
)

const App = () => {
    const [showLoginModal, setShowLoginModal] = React.useState(false)
    const openLoginModal = () => setShowLoginModal(true)
    const closeLoginModal = () => setShowLoginModal(false)

    const [showRegisterModal, setShowRegisterModal] = React.useState(false)
    const openRegisterModal = () => setShowRegisterModal(true)
    const closeRegisterModal = () => setShowRegisterModal(false)

    const styles = {
        button: {
            display: 'block',
        },
    }

    return (
        <>
            <Logo />
            <h1>Bookshelf</h1>
            <button onClick={openLoginModal} style={styles.button}>
                Login
            </button>
            <button onClick={openRegisterModal} style={styles.button}>
                Register
            </button>
            <LoginModal {...{ showLoginModal }} {...{ closeLoginModal }} />
            <RegisterModal
                {...{ showRegisterModal }}
                {...{ closeRegisterModal }}
            />
        </>
    )
}

ReactDom.render(<App />, document.getElementById('root'))
