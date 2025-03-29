import { useState } from "react";
import "./ToggleSwitch.css"; // Import the CSS file
import { useDispatch, useSelector } from "react-redux";
import { changeNightMode, selectNightMode } from "../../redux/slices/nightModeSlice";

function ToggleSwitch() {
    const nightModeState = useSelector(selectNightMode);
    const dispatch = useDispatch();
    // const [isOn, setIsOn] = useState(false);

    return (
        <div className={`toggle-switch ${nightModeState ? "on" : ""}`} onClick={() => dispatch(changeNightMode())}>
            <div className="toggle-circle"></div>
        </div>
    );
}

export default ToggleSwitch;
