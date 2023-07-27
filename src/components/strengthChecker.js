import React from 'react';

const PasswordStrengthIndicator = ({ password = "" }) => {

    const generatePasswordStrength = () => {
        const passwordLength = password.length;

        if (passwordLength < 1) {
            return "";
        }
        if (passwordLength < 4) {
            return "Very Weak";
        }
        if (passwordLength < 8) {
            return "Poor";
        }
        if (passwordLength < 12) {
            return "Medium";
        }
        return "Strong";
    };

    const passwordStrength = generatePasswordStrength();
    if (!passwordStrength) {
        return <React.Fragment />;
    }

    return (
        <div className="password-strength">
            Password Strength: <span style={{ fontWeight: "bold", fontSize: "22px", color: "lightgreen"}}>{passwordStrength}</span>
        </div>
    );
};

export default PasswordStrengthIndicator;