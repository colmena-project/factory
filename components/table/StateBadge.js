import React from 'react';

const StateBadge = props => {

    const { state, percent } = props;

    let text = 'Terminado';
    let backgroundColor = '#4CB5AB';
    let icon = '/icons/pagado.png';
    let color = 'white';

    if (state === 'rejected') {
        backgroundColor = '#FF4081';
        icon = '/icons/vermas.png';
        text = 'Rechazado';
    }

    if (state === 'in_progress') {
        backgroundColor = '#EEEEEE';
        icon = null;
        text = `${percent}%`;
        color = '#4CB5AB';
    }

    return (
        <div style={{ display: 'flex' }}>
            <div className="w-3/6 text-center p-1 rounded-full" style={{ backgroundColor }}>
                <span className="text-center p-2" style={{ color }}>
                    {text}
                </span>
            </div>
            <div style={{ paddingLeft: 10 }}>
                {icon && <img style={{ width: 30, height: 30, paddingLeft: 0 }} src={icon} alt="" />}
            </div>
        </div>
    );
};

export default StateBadge;