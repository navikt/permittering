import React from 'react';

const InfoIkon = () => {
    return (
        <svg
            width="100"
            height="100"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
        >
            <title>Informasjonstavle</title>
            <defs>
                <circle id="a" cx="50" cy="50" r="50" />
                <path
                    d="M0 8.3V46c0 1.3 1 2.4 2.4 2.4h31.9c1.3 0 2.3-1 2.3-2.4V2.4c0-1.3-1-2.4-2.3-2.4H8.8L0 8.3z"
                    id="c"
                />
            </defs>
            <g fill="none" fillRule="evenodd">
                <g>
                    <mask id="b" fill="#fff">
                        <use xlinkHref="#a" />
                    </mask>
                    <g mask="url(#b)" fill="#99BDCD">
                        <path d="M0 100h100V0H0z" />
                    </g>
                </g>
                <path
                    d="M71 24.1H31a3 3 0 00-3 3V78a3 3 0 001 2.3 3 3 0 002 .7h40a3 3 0 003-3V27a3 3 0 00-3-3"
                    fill="#515658"
                />
                <g transform="translate(32.3 28.3)">
                    <mask id="d" fill="#fff">
                        <use xlinkHref="#c" />
                    </mask>
                    <g mask="url(#d)" fill="#FFF">
                        <path d="M-5.4-7h46.8v61.7H-5.4z" />
                    </g>
                </g>
                <path d="M41 28.3v5.8c0 1.4-1 2.5-2.5 2.5h-6.2l8.8-8.3z" fill="#C9C9C9" />
                <g fill="#515658">
                    <path d="M54 62.5V49.8h-8.9v2.5h2v10.2h-2V65H56v-2.5zM50.6 47.7c2.2 0 4-1.9 4-4.1 0-2.3-1.8-4.2-4-4.2-2.3 0-4.1 1.9-4.1 4.2 0 2.2 1.8 4.1 4 4.1" />
                </g>
                <path
                    d="M51.4 26a1 1 0 01-1-1c0-.5.5-.9 1-.9s1 .4 1 1c0 .5-.5 1-1 1m5.8-4h-3.5v-.7c0-1.3-1-2.4-2.3-2.4-1.3 0-2.3 1-2.3 2.4v.7h-3.5a3.2 3.2 0 00-3.1 3.2v3.9h17.9v-3.9c0-1.8-1.4-3.2-3.2-3.2"
                    fill="#2F3237"
                />
            </g>
        </svg>
    );
};
export default InfoIkon;
