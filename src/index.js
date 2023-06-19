
import React from 'react';
import ReactDOM from 'react-dom/client';
import {Col, Button, Row} from 'reactstrap'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ErrorBoundary } from 'react-error-boundary';



const root = ReactDOM.createRoot(document.getElementById('root'));

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div
      style={{
        backgroundColor: '#eaeaea',
        padding: '20px 12px',
        border: '1px solid red',
        lineHeight: '2'
      }}
    >
      <h2>Something went wrong:</h2>
      <hr />
      <Row>
        <Col className="col-3">File Name : </Col>
        <Col>{error.filename}</Col>
      </Row>
      <Row>
        <Col className="col-1">Message : </Col>
        <Col style={{'color':'red'}}>{error.message}</Col>
      </Row>
      <hr />
      <Button color="primary" size="sm" onClick={resetErrorBoundary}>
        Try again
      </Button>
    </div>
  );
}

root.render(
  <React.StrictMode>
  <ErrorBoundary
   FallbackComponent={ErrorFallback}
   onReset={() => {
     window.location.reload();
   }}>

  
    <App />
    </ErrorBoundary>
  
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
