function Notification({ message, type = 'info' }) {
    if (!message) return null;
    const styles = {
        padding: '8px 12px',
        marginTop: 12,
        border: '1px solid',
        borderColor: type === 'error' ? '#c00' : '#999'
    };
    return <div style={styles}>{message}</div>;
}

export default Notification