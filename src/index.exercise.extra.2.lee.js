import React, { useRef, useEffect } from 'react'
import ReactDom from 'react-dom'
import { fromEvent, merge } from 'rxjs'
import { filter } from 'rxjs/operators'
import { Dialog } from '@reach/dialog'

import { Logo } from './components/logo'

import '@reach/dialog/styles.css'

const log = obj => console.log(JSON.stringify(obj, null, 4))

const Form = ({ type, onClose }) => {
    const usernameRef = useRef()
    const passwordRef = useRef()

    useEffect(() => {
        const closeOnEscape = merge(
            fromEvent(usernameRef.current, 'keydown'),
            fromEvent(passwordRef.current, 'keydown'),
        )
            .pipe(filter(({ keyCode }) => keyCode === 27))
            .subscribe(onClose)

        return () => closeOnEscape.unsubscribe()
    })

    return (
        <form
            action="/send-form"
            method="POST"
            onSubmit={event => onSubmit(event, onClose)}
            onClose={onClose}
        >
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
            <input type="submit" name="submit" value={type} />
            <button onClick={onClose}>Cancel</button>
        </form>
    )
}

const onSubmit = (event, closeModal) => {
    event.preventDefault()

    const timeDelay = 2000

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
        .then(closeModal)
}

const ButtonAndForm = ({ type }) => {
    const [showModal, setShowModal] = React.useState(false)

    return (
        <div>
            <button onClick={() => setShowModal(true)}>{type}</button>
            <Dialog
                isOpen={showModal}
                aria-label={`${type} form`}
                onDismiss={() => setShowModal(false)}
            >
                <Form
                    onSubmit={onSubmit}
                    type={type}
                    onClose={() => setShowModal(false)}
                />
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
