import React, { useState } from 'react';
import Calendar from 'react-calendar';
import '../../../node_modules/react-calendar/dist/Calendar.css';
const Clender = () => {
    const [value, onChange] = useState(new Date());

    return (
        <>
            <Calendar className=" mt-3" onChange={onChange} value={value} />
        </>
    );
}

export default Clender