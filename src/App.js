import { useState } from 'react';
import './App.css';
import usePasswordGenerator from './Hooks/use-password-generator';
import PasswordStrengthIndicator from './components/strengthChecker';
import Button from './components/Button';
import Checkbox from './components/CheckBox';

function App() {

    const [length, setLength] = useState(4);
    const [checkboxData, setCheckboxData] = useState([
        { title: "Include Uppercase Letters", state: false },
        { title: "Include Lowercase Letters", state: false },
        { title: "Include Numbers", state: false },
        { title: "Include Symbols", state: false }
    ]);

    const [copied, setCopied] = useState(false);

    const handleCheckboxChange = (index) => {
        const updatedCheckboxData = [...checkboxData];
        updatedCheckboxData[index].state = !updatedCheckboxData[index].state;
        setCheckboxData(updatedCheckboxData);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(password);
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 1500);
    };

    const { password, errorMessage, generatePassword } = usePasswordGenerator();

    return (
        <div className="container">

            {/* Password Text & Copy */}
            {password && (
                <div className="header">
                    <div className="title">{password}</div>
                    <Button
                        text={copied ? "Copied" : "Copy"}
                        customClass="copybtn"
                        onClick={handleCopy}
                    />
                </div>
            )}

            {/* Character Length */}
            <div className="charlength">
                <span>
                    <label>Character Length</label>
                    <label>{length}</label>
                </span>
                <input type="range" min="4" max="20" value={length} onChange={(e) => {
                    setLength(e.target.value);
                }} />
            </div>

            {/* Checkboxes */}
            <div className="checkboxes">
                {checkboxData.map((checkbox, index) => {
                    return (
                        <Checkbox
                            key={index}
                            title={checkbox.title}
                            onChange={() => handleCheckboxChange(index)}
                            state={checkbox.state}
                        />
                    );
                })}
            </div>

            {/* Strength */}
            <PasswordStrengthIndicator password={password} />

            {/* Error Handling */}
            {errorMessage && <div className="errorMessage">{errorMessage}</div>}

            {/* Generate Button */}
            <Button
                text="Generate Password"
                customClass="generateBtn"
                onClick={() => generatePassword(checkboxData, length)}
            />

        </div>
    );
}

export default App;