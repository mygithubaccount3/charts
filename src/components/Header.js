import React, { useEffect } from 'react';

function Header({ el, days, dayWidth, isOnMobile }) {
    useEffect(() => {
        function func(isOnMobile) {
            if (isOnMobile.matches) {
                const dayW = ((11 / days) + Number(dayWidth.slice(0, dayWidth.length - 1))) + "%";
                document.getElementById('months').style.gridTemplateColumns = `repeat(${days}, ${dayW})`;
                document.getElementById('blankCell').style.display = 'none';
            } else {
                document.getElementById('months').style.gridTemplateColumns = `11% repeat(${days}, ${dayWidth})`;
                document.getElementById('blankCell').style.display = 'block';
            }
        }
        func(isOnMobile)
        isOnMobile.addListener(func)

        return function cleanup() {
            isOnMobile.removeListener(func)
        }
    }, [isOnMobile, dayWidth, days])

    return (
        <div id='months'>
            <div id='blankCell'></div>
            {el}
        </div>
    )
}

export default Header;
