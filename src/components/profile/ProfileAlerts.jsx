import React from 'react';

const ProfileAlerts = ({
  bookingsError,
  reviewsError,
  successMsg,
  onClearError,
}) => {
  const hasError = bookingsError || reviewsError;

  return (
    <>
      {hasError && (
        <div className="error">
          <p>{bookingsError || reviewsError}</p>
          <button
            type="button"
            className="gradient-btn"
            onClick={onClearError}
            style={{ marginTop: '0.5rem' }}
          >
            Закрыть
          </button>
        </div>
      )}

      {successMsg && <div className="success">{successMsg}</div>}
    </>
  );
};

export default ProfileAlerts;
