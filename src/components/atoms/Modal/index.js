import { Box } from "@mui/material";
import { FlatButton, Message, Modal } from "@boletia/react-ui";

export const ModalAlert = ({
    title,
    severity,
    color,
    labelButtonOk,
    showButtonCancel,
    onClose,
    onSuccess
}) => {
    return (
        <Modal color="primary" open>
            <Box sx={{ height: '300px' }}>
                <Message
                    title={title}
                    severity={severity}
                    color={color}
                />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        gap: '10px',
                        justifyContent: 'space-between',
                        marginTop: '20px'
                    }}
                >
                    {showButtonCancel &&
                        <FlatButton
                            style={{ width: '100px', margin: 'auto' }}
                            variant="secondary"
                            rounded="rounder"
                            border="small"
                            size="small"
                            onClick={onClose}
                        >
                            Cancelar
                        </FlatButton>
                    }

                    <FlatButton
                        style={{ width: '100px', margin: 'auto' }}
                        rounded="rounder"
                        size="small"
                        onClick={onSuccess}
                    >
                        {labelButtonOk}
                    </FlatButton>
                </Box>
            </Box>
        </Modal>
    );
};