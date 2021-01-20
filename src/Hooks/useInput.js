import { useState } from 'react';

export default (defaultvalue) => {
    const [value, setvalue] = useState(defaultvalue);

    const onChange = e => {
        const {
            target: { value }
        } = e;
        setvalue(value);
    };
    return { value, onChange, setvalue };
};