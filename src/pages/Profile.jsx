import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProfileInfo from '../components/profile/ProfileInfo';
import ProfileAlerts from '../components/profile/ProfileAlerts';
import ProfileBookingsList from '../components/profile/ProfileBookingsList';
import ProfileReviewForm from '../components/profile/ProfileReviewForm';
import ProfileReviewsList from '../components/profile/ProfileReviewsList';
import { useProfilePage } from '../hooks/useProfilePage';

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const profileData = useProfilePage();

  if (!user) {
    navigate('/login');
    return null;
  }

  if (profileData.bookingsLoading || profileData.reviewsLoading) {
    return <div className="loading">Загрузка...</div>;
  }

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      <h1 className="section-title">Личный кабинет</h1>

      <ProfileAlerts
        bookingsError={profileData.bookingsError}
        reviewsError={profileData.reviewsError}
        successMsg={profileData.successMsg}
        onClearError={profileData.handleClearError}
      />

      <ProfileInfo user={user} avgRating={profileData.avgRating} />

      <ProfileBookingsList
        bookings={profileData.userBookings}
        onCancel={profileData.handleCancelBooking}
      />

      <ProfileReviewForm
        reviewText={profileData.reviewText}
        rating={profileData.rating}
        onTextChange={profileData.setReviewText}
        onRatingChange={profileData.setRating}
        onSubmit={profileData.handlePostReview}
      />

      <ProfileReviewsList
        reviews={profileData.reviewsList}
        editingId={profileData.editingId}
        editingText={profileData.editingText}
        onEditStart={(id, text) => {
          profileData.setEditingId(id);
          profileData.setEditingText(text);
        }}
        onEditCancel={() => {
          profileData.setEditingId(null);
          profileData.setEditingText('');
        }}
        onEditTextChange={profileData.setEditingText}
        onUpdate={profileData.handleUpdateReview}
        onDelete={profileData.handleDeleteReview}
      />
    </div>
  );
};

export default Profile;
