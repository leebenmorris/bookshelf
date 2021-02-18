// 🐨 you'll need to import React and ReactDOM up here
import React from 'react'
import ReactDom from 'react-dom'
import { Dialog } from '@reach/dialog'
import '@reach/dialog/styles.css'
import { Logo } from './components/logo'

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
                <h2>Login</h2>
                <button className="close-button" onClick={closeModal}>
                    close
                </button>
            </Dialog>
            <Dialog
                aria-label="Register form"
                isOpen={showModal === 'Register'}
                onDismiss={closeModal}
            >
                <h2>Register</h2>
                <button className="close-button" onClick={closeModal}>
                    close
                </button>
            </Dialog>
        </>
    )
}

ReactDom.render(<App />, document.getElementById('root'))
