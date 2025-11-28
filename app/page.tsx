"use client";

import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import VehicleCard from "@/components/vehicle-card";
import VehicleDetails from "@/components/vehicle-details";
import RequestModal from "@/components/request-modal";

import { useVehicleFeed } from "@/hooks/useVehicleFeed";
import { ChevronLeft } from "lucide-react";

export default function Home() {
  const {
    loading,
    error,
    hasVehicles,
    vehicles,
    handleExploreMore,
    handleBack,
    showDialog,
    closeDialog,
    continueAfterDialog,
  } = useVehicleFeed();

  const [selectedVehicle, setSelectedVehicle] = React.useState<any>(null);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 py-8 md:py-12">
        {/* LOADING */}
        {loading && (
          <div className="flex items-center justify-center h-96">
            <p className="text-gray-600 text-lg">Loading vehicles...</p>
          </div>
        )}

        {/* ERROR */}
        {!loading && error && (
          <div className="flex items-center justify-center h-96">
            <p className="text-red-500 text-lg">{error}</p>
          </div>
        )}

        {/* NO VEHICLES */}
        {!loading && !error && !hasVehicles && (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-black mb-2">
                NO VEHICLES UPLOADED YET
              </h2>
              <p className="text-gray-500">
                Check back soon for available vehicles
              </p>
            </div>
          </div>
        )}

        {/* VEHICLE GRID */}
        {!loading && hasVehicles && (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              {vehicles.map((vehicle) => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  onClick={() => setSelectedVehicle(vehicle)}
                />
              ))}
            </div>

            {/* PAGINATION BUTTONS */}
            <div className="flex justify-center items-center gap-4 mb-12">
              <button
                onClick={handleBack}
                className="w-14 h-14 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-black" />
              </button>

              <button
                onClick={handleExploreMore}
                className="bg-black text-white px-12 py-4 rounded-full font-bold text-lg hover:bg-gray-800 transition-transform active:scale-95 shadow-lg uppercase"
              >
                Explore More
              </button>
            </div>
          </>
        )}
      </main>

      <Footer />

      {/* VEHICLE DETAILS POPUP */}
      {selectedVehicle && (
        <VehicleDetails
          vehicle={selectedVehicle}
          onClose={() => setSelectedVehicle(null)}
        />
      )}

      {/* EVERY 3 CLICKS → DIALOG */}
      {showDialog && (
        <RequestModal
          onClose={closeDialog}
          onContinue={continueAfterDialog}
        />
      )}
    </div>
  );
}
