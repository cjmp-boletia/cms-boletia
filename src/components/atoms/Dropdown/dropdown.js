import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Menu from '@mui/material/Menu';
import { FlatButton, UpDownIcon } from '@boletia/react-ui';
import useAuth from '../../../hooks/useAuth';

function DropdownFC({
    children,
    transformOrigin,
    anchorOrigin,
    arrow,
}) {
    const { user } = useAuth();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const getArrow = () => {
        const arrowStyle = {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
        };

        switch (arrow) {
            case 'left':
                return {
                    '&:before': {
                        ...arrowStyle,
                        left: 11,
                    },
                };
            case 'center':
                return {
                    '&:before': {
                        ...arrowStyle,
                        left: '50%',
                    },
                };
            case 'right':
                return {
                    '&:before': {
                        ...arrowStyle,
                        right: 11,
                    },
                };
            default:
                return {};
        }
    };

    return (
        <>
            <FlatButton rounded='rounder' style={{ color: '#000', background: '#F5F5F4', marginRight: '20px' }} onClick={handleClick}>
                {user.first_name} {user.last_name}
            </FlatButton>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 4px 16px rgba(0, 0, 0, 0.12))',
                        mt: 5,
                        borderRadius: '10px',
                        ...getArrow(),
                    },
                }}
                transformOrigin={transformOrigin}
                anchorOrigin={anchorOrigin}
            >
                {children}
            </Menu>
        </>
    );
}

DropdownFC.propTypes = {
    children: PropTypes.node,
    buttonProps: PropTypes.any,
    buttonContent: PropTypes.node,
    Icon: PropTypes.any,
    transformOrigin: PropTypes.any,
    anchorOrigin: PropTypes.any,
    arrow: PropTypes.oneOf(['none', 'left', 'center', 'right']),
};

DropdownFC.defaultProps = {
    children: <></>,
    buttonProps: {
        size: 'mini',
        rounded: 'circle',
    },
    buttonContent: null,
    Icon: UpDownIcon,
    transformOrigin: { horizontal: 'left', vertical: 'top' },
    anchorOrigin: { horizontal: 'left', vertical: 'bottom' },
    arrow: 'left',
};

export default DropdownFC;
