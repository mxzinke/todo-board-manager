import React from 'react';
import loading from  '../../assets/icons/loading.gif';

export default function LoadingScreen() {
    return (
        <div className="Loading">
            <img className="LoadingImage" src={ loading } alt="Loading" /><br />
            Please wait...
        </div>
    );
}
