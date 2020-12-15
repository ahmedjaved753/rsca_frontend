import React from 'react';
import './footer.css'

function Footer() {
    return (
        <footer className="footer">
            <span>Privacy Policy | Terms and Conditions | Copyright c {new Date().getFullYear()} RSCA All rights reserved</span>
        </footer>
    )
}

export default Footer
