"use client";

import { buildImageUrl, type PublicVehicle } from "@/lib/api";

export default function VehicleDetails({
  vehicle,
  onClose,
}: {
  vehicle: PublicVehicle;
  onClose: () => void;
}) {
  const mainImage =
    vehicle.images && vehicle.images.length > 0
      ? buildImageUrl(vehicle.images[0])
      : "/placeholder.svg";

  const driver = vehicle.driver || {};

  const driverPhoto = driver.profileImage
    ? buildImageUrl(driver.profileImage)
    : "/placeholder.svg";

  const languages = Array.isArray(driver.languages)
    ? driver.languages.join(", ")
    : "-";

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] md:max-h-none overflow-hidden flex flex-col md:block"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col md:flex-row gap-0 h-full md:h-auto">
          {/* LEFT: Vehicle */}
          <div className="flex-1 p-3 md:p-6 border-b md:border-b-0 md:border-r border-gray-200 overflow-y-auto">
            <div className="relative bg-gray-100 rounded-lg mb-2 md:mb-4 h-32 md:h-48 w-full">
              <img
                src={mainImage}
                alt={vehicle.plateFull}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            <div className="mb-2 md:mb-4">
              <h2 className="text-base md:text-xl font-bold text-black mb-1">
                [{vehicle.plateFull}]
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-1 gap-2 md:space-y-2 md:block">
              <div className="bg-gray-50 p-2 rounded">
                <p className="text-xs text-gray-600">Model</p>
                <p className="text-sm font-semibold text-black">
                  {vehicle.model || "-"}
                </p>
              </div>

              <div className="bg-gray-50 p-2 rounded">
                <p className="text-xs text-gray-600">Capacity</p>
                <p className="text-sm font-semibold text-black">
                  {vehicle.capacity} seats
                </p>
              </div>

              <div className="bg-gray-50 p-2 rounded">
                <p className="text-xs text-gray-600">Window Type</p>
                <p className="text-sm font-semibold text-black">
                  {vehicle.windowType || "-"}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: Driver */}
          <div className="flex-1 bg-gray-50 p-3 md:p-6 overflow-y-auto">
            <div className="flex md:block items-center gap-3 md:gap-0 mb-4">
              <div className="relative w-12 h-12 md:w-20 md:h-20 md:mx-auto md:mb-3">
                <img
                  src={driverPhoto}
                  alt={driver.firstName || "Driver"}
                  className="w-full h-full rounded-full object-cover border-2 border-black"
                />
              </div>

              <div className="text-left md:text-center">
                <h4 className="text-sm md:text-lg font-bold text-black uppercase">
                  {driver.firstName || "Driver"}
                </h4>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
              <div className="bg-white p-2 rounded">
                <p className="text-xs text-gray-600">Nationality</p>
                <p className="text-sm font-semibold text-black">
                  {driver.citizenship || "-"}
                </p>
              </div>

              <div className="bg-white p-2 rounded">
                <p className="text-xs text-gray-600">Level</p>
                <p className="text-sm font-semibold text-black capitalize">
                  {driver.level || "-"}
                </p>
              </div>

              <div className="bg-white p-2 rounded col-span-2 md:col-span-1">
                <p className="text-xs text-gray-600">Languages</p>
                <p className="text-sm font-semibold text-black">
                  {languages}
                </p>
              </div>
            </div>

            <button className="w-full mt-4 py-2 bg-black text-white rounded font-semibold hover:bg-gray-900 transition text-sm uppercase">
              Reserve For Me
            </button>
          </div>
        </div>

        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white text-xl font-bold z-10"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
