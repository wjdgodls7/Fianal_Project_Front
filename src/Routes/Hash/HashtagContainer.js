import React, { useState } from 'react';
import './Hashtag.css';

export const TagsInput = props => {
    const [tags] = useState(props.tags);
    const linkTag = (tag) => {
        console.log(tag)
    }
    return (
        <div className="tages-input">
            <ul id="tags">
                {tags.map((tag, index) => (
                    <li key={index} className="tag">
                        <span className='tag-title' onClick={() => linkTag(tag)}>;{tag}</span>
                    </li>
                ))}
            </ul>
        </div>


    );
};