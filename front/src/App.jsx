import { useState } from 'react'
import './App.css'
import axios from 'axios'

const isDocker = import.meta.env.VITE_DOCKER_MODE === 'true'
const baseUrl = isDocker ? 'backend' : 'localhost'

function FetchBlock({ url, method, title, id }) {
    const [headers, setHeaders] = useState(undefined)
    const [body, setBody] = useState(undefined)
    const [error, setError] = useState(undefined)
    const [loading, setLoading] = useState(false)
    
    const callServer = async () => {
        setLoading(true)
        setError(undefined)
        setBody(undefined)
        setHeaders(undefined)
        try {
            const response = await axios.request({
                url,
                method,
                withCredentials: true,
            })
            setHeaders(response.headers)
            setBody(response.data)
        } catch (e) {
            setError(e)
        }
        setLoading(false)
    }
    
    return (
        <div className="fetchBlock" id={id}>
        <h2>{title}</h2>
        {error !== undefined && 
            <div className="errorBlock">
            <h3>{error.name} - {error.code}</h3>
            <p>{error.message}</p>
            </div>
        }
        
        <button onClick={callServer} disabled={loading}>Call server</button>
        
        <div className="greyBlock">
        <span>Headers:</span>
        {headers !== undefined && <code>{JSON.stringify(headers, null, 4)}</code>}
        </div>
        <div className="greyBlock">
        <span>Body:</span>
        {body !== undefined && <code>{JSON.stringify(body, null, 4)}</code>}
        </div>
        </div>
    )
}

function App() {
    return (
        <div className="container">
        <h1>Fetch API</h1>
        <div className="fetchGrid">
        <FetchBlock id="cookieCreate" title="Get httpOnly cookie" url={`http://${baseUrl}:9897/login`} method="GET" />
        <FetchBlock id="cookieCheck" title="Test httpOnly cookie" url={`http://${baseUrl}:9897/check`} method="GET" />
        </div>
        </div>
    )
}

export default App
