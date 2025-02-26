import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import image from '../../images/image.jpg';
import PatientNavbar from '../../components/PatientNavbar';

const AppointmentDetails = () => {
  const { tokenId } = useParams();
  const [appointmentData, setAppointmentData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchAppointmentData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/bookingAppointments/token/${tokenId}`
        );
        const data = await response.json();
        setAppointmentData(data);
      } catch (error) {
        console.error('Failed to fetch appointment data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointmentData();
  }, [tokenId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!appointmentData) {
    return <div>Error: Failed to fetch appointment details</div>;
  }

  // Fallback value for specialization if doctorDetails is missing.
  const specialization = appointmentData.doctor.doctorDetails?.specialization || "N/A";

  return (
    <>
      <PatientNavbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <div className="bg-white p-16 rounded-lg shadow-lg w-[80%] text-center">
          <h1 className="text-3xl font-semibold mb-8">
            Thanks for booking with Dr. {appointmentData.doctor.username}!
          </h1>
          <div className="flex flex-col items-center mb-8">
            <img
              src={image}
              alt={appointmentData.doctor.username}
              className="w-40 h-40 rounded-full object-cover mb-4"
            />
            <div className="text-gray-700">
              <div className="text-xl font-medium">
                {`Dr. ${appointmentData.doctor.username}`}
              </div>
              <div className="text-md text-gray-500">{specialization}</div>
            </div>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg mb-8">
            <div className="text-gray-500 text-sm">Appointment token number</div>
            <div className="text-2xl font-semibold">{appointmentData.token}</div>
          </div>
          {/* Prescription image section with modal trigger */}
          {appointmentData.prescriptionImageUrl && (
            <div className="flex flex-col items-center mb-8">
              <h2 className="text-xl font-semibold mb-4">Prescription</h2>
              <img
                src={appointmentData.prescriptionImageUrl}
                alt="Prescription"
                className="w-40 h-40 object-cover mb-4 border rounded-lg cursor-pointer hover:scale-105 transition-transform duration-200"
                onClick={() => setIsModalOpen(true)}
              />
            </div>
          )}
          <button className="bg-blue-500 text-white py-3 px-6 rounded-lg mb-8">
            Add to calendar
          </button>
          <div className="text-left">
            <div className="mb-4">
              <strong>Need help?</strong>
              <p className="text-gray-500 text-sm">
                Have questions? You can always reach out to our support team.
              </p>
            </div>
            <div className="mb-4">
              <strong>Reminder</strong>
              <p className="text-gray-500 text-sm">
                We'll send you a reminder email 24 hours before your appointment.
              </p>
            </div>
            <div>
              <strong>Manage your appointment</strong>
              <p className="text-gray-500 text-sm">
                You can manage your appointment or cancel it from your account.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modal for larger prescription image */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-white p-4 rounded-lg shadow-xl relative w-[90%] h-[90%] flex flex-col">
            <button 
              onClick={() => setIsModalOpen(false)} 
              className="absolute top-4 right-4 text-3xl font-bold text-gray-700 hover:text-gray-900"
            >
              &times;
            </button>
            <img 
              src={appointmentData.prescriptionImageUrl}
              alt="Prescription"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AppointmentDetails;
