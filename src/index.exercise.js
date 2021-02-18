// 🐨 you'll need to import React and ReactDOM up here
import React from 'react'
import ReactDom from 'react-dom'

// 🐨 you'll also need to import the Logo component from './components/logo'
import { Logo } from './components/logo'

// 🐨 create an App component here and render the logo, the title ("Bookshelf"), a login button, and a register button.
// 🐨 for fun, you can add event handlers for both buttons to alert that the button was clicked

const getAllEnumerableProperties = inputObject => {
    const returnObject = {}
    for (const key in inputObject) {
        returnObject[key] = inputObject[key]
    }
    return returnObject
}

const App = () => {
    const buttonNames = ['Login', 'Register']

    const onClick = event => {
        event.preventDefault()

        const allProps = getAllEnumerableProperties(event.target)

        console.log(allProps)

        const { innerText, tagName } = event.target

        alert(`${innerText} ${tagName.toLowerCase()} clicked`)
    }

    const styles = {
        button: {
            display: 'block',
        },
    }

    return (
        <>
            <Logo />
            <h1>Bookshelf</h1>
            {buttonNames.map(name => (
                <button onClick={onClick} style={styles.button}>
                    {name}
                </button>
            ))}
        </>
    )
}

// 🐨 use ReactDOM to render the <App /> to the root element
// 💰 find the root element with: document.getElementById('root')

ReactDom.render(<App />, document.getElementById('root'))
