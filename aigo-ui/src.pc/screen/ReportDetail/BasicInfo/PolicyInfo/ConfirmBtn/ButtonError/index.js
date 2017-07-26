/* eslint no-dupe-keys: 0, no-mixed-operators: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button } from 'antd';

function error() {
    Modal.error({
        title: 'This is an error message',
        content: 'some messages...some messages...',
    });
}

 export default class Alerts extends React.Component {
    constructor(props) {
        super(props);
    }
     

    render() {
        return (
            <Button onClick={error}>Error</Button>
        );
    }
}

