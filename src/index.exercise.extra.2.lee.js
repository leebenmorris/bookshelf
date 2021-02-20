import React, { useState } from 'react'
import ReactDom from 'react-dom'
import { Dialog } from '@reach/dialog'

import { Logo } from './components/logo'

import '@reach/dialog/styles.css'

const log = obj => console.log(JSON.stringify(obj, null, 4))

const onSubmit = (event, closeModal, setIsSending, setErrorMessage) => {
    event.preventDefault()

    const timeDelay = 2000
    const shouldSendError = true

    setIsSending(true)

    const {
        target: {
            action,
            method,
            elements: {
                submit: { value: type },
                username: { value: username },
                password: { value: password },
            },
        },
    } = event

    new Promise(resolve =>
        setTimeout(resolve, timeDelay, {
            action,
            method,
            type,
            username,
            password,
        }),
    )
        .then(log)
        .then(() => shouldSendError && Promise.reject(new Error('Ooops')))
        .then(closeModal)
        .catch(err => {
            setErrorMessage(err.message)
            setIsSending(false)
        })
}

const onKeyDown = (event, onClose) => {
    event.code === 'Escape' && onClose()
}

const Form = ({ type, onClose }) => {
    const [errorMessage, setErrorMessage] = useState(null)
    const [isSending, setIsSending] = useState(false)

    const styles = {
        form: {
            position: 'relative',
            opacity: isSending ? 0.5 : 1.0,
        },
        waiting: {
            position: 'absolute',
            display: isSending ? 'block' : 'none',
        },
        error: {
            display: errorMessage ? 'block' : 'none',
        },
    }

    return (
        <div>
            <h2 style={styles.waiting}>Loading...</h2>
            <h2 style={styles.error}>{errorMessage}</h2>
            <form
                style={styles.form}
                action="/send-form"
                method="POST"
                onSubmit={event =>
                    onSubmit(event, onClose, setIsSending, setErrorMessage)
                }
                onClose={onClose}
            >
                <div>
                    <label htmlFor="Username">Username: </label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        required
                        disabled={isSending}
                        onKeyDown={event => onKeyDown(event, onClose)}
                    />
                </div>
                <div>
                    <label htmlFor="Password">Password: </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        required
                        disabled={isSending}
                        onKeyDown={event => onKeyDown(event, onClose)}
                    />
                </div>
                <input
                    type="submit"
                    name="submit"
                    value={type}
                    disabled={isSending}
                />
                <button onClick={onClose} disabled={isSending}>
                    Cancel
                </button>
            </form>
        </div>
    )
}

const ButtonAndForm = ({ type }) => {
    const [showModal, setShowModal] = React.useState(false)

    return (
        <div>
            <button onClick={() => setShowModal(true)}>{type}</button>
            <Dialog
                isOpen={showModal}
                onDismiss={() => setShowModal(false)}
                aria-label={`${type} form`}
            >
                <Form type={type} onClose={() => setShowModal(false)} />
            </Dialog>
        </div>
    )
}

const App = () => (
    <>
        <Logo width="100" height="100" />
        <h1>Bookshelf</h1>
        <ButtonAndForm type="Login" />
        <ButtonAndForm type="Register" />
    </>
)

ReactDom.render(<App />, document.getElementById('root'))
