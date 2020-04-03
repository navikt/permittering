import React from 'react';

const KvitteringIkon = () => {
    return (
        <svg
            width="100"
            height="100"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
        >
            <title>Melding er sendt</title>
            <defs>
                <circle id="a" cx="50" cy="50" r="50" />
            </defs>
            <g fill="none" fill-rule="evenodd">
                <g>
                    <mask id="b" fill="#fff">
                        <use xlinkHref="#a" />
                    </mask>
                    <g mask="url(#b)" fill="#9BD0B0">
                        <path d="M0 100h100V0H0z" />
                    </g>
                </g>
                <path
                    d="M22.9 50.2l-.9-8 26.7-22.7c.7-.7 1.9-.7 2.6 0L78 42.1 77 52 50 68 22.9 50.2z"
                    fill="#0C576F"
                />
                <path
                    d="M72.4 66H27.6a.6.6 0 01-.6-.6V35.6c0-.4.2-.6.6-.6h44.8c.4 0 .6.2.6.6v29.8c0 .4-.2.6-.6.6"
                    fill="#DCDCD2"
                />
                <path d="M24 79h45c1.1 0-47-37-47-37v34.9a2 2 0 002 2.1" fill="#D94C56" />
                <path d="M76 79H31C30 79 78 42 78 42v34.9a2 2 0 01-2 2.1" fill="#C52C35" />
                <g fill-rule="nonzero">
                    <path d="M50 40.6A7.2 7.2 0 1050 55a7.2 7.2 0 000-14.4z" fill="#06893A" />
                    <path
                        d="M48.2 49.7a.3.3 0 01.4 0l-.2-.2-.2.2zm.2-1l4.2-3.7a1 1 0 011.3 0c.4.4.4 1 0 1.4L49 50.6a1
                    1 0 01-.6.2 1 1 0 01-.7-.3L46.1 49a.9.9 0 010-1.2 1 1 0 011.4 0l1 .8z"
                        fill="#FFF"
                    />
                </g>
            </g>
        </svg>
    );
};
export default KvitteringIkon;
