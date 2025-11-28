"use client";

import { buildImageUrl } from "@/lib/api";
import type { PublicVehicle } from "@/lib/api";

export default function VehicleCard({
  vehicle,
  onClick,
}: {
  vehicle: PublicVehicle;
  onClick: () => void;
}) {
  const mainImage =
    vehicle.images && vehicle.images.length > 0
      ? buildImageUrl(vehicle.images[0])
      : "/placeholder.svg";

  return (
    <div
      onClick={onClick}
      className="bg-white border border-gray-300 rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer"
    >
      {/* Vehicle Image */}
      <div className="relative bg-gray-100 h-24 w-full">
        <img
          src={mainImage}
          alt={vehicle.plateShort}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Vehicle Info */}
      <div className="p-2">
        <h3 className="text-xs font-semibold text-black mb-1">
          {vehicle.plateShort}/{vehicle.driver.firstName || "N/A"}
        </h3>

        <div className="space-y-0.5 text-xs">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Model</span>
            <span className="font-medium text-black text-right">
              {vehicle.model || "-"}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">Capacity</span>
            <span className="font-medium text-black">
              {vehicle.capacity || "-"}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">Window</span>
            <span className="font-medium text-black">
              {vehicle.windowType || "-"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
