// ===================================================
// AUTO-DETECT BACKEND BASE URL FOR WORLD APP
// ===================================================
function getBaseUrl(): string {
  // 1. Production override
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }

  // 2. Server-side rendering
  if (typeof window === "undefined") {
    return "http://localhost:3002";
  }

  const host = window.location.hostname;

  // 3. Desktop browser
  if (host === "localhost" || host === "127.0.0.1") {
    return "http://localhost:3002";
  }

  // 4. Mobile / other device on SAME WiFi (192.168.0.x)
  if (host.startsWith("192.168.0.")) {
    return "http://192.168.0.101:3002";
  }

  // 5. Any other subnet fallback
  return "http://192.168.0.101:3002";
}

export const BASE_URL = getBaseUrl();


// ===================================================
// IMAGE URL BUILDER
// ===================================================
export function buildImageUrl(path?: string | null): string {
  if (!path) return "";

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  let cleaned = path
    .replace(/^src[\\/]/, "")  // remove "src/"
    .replace(/^\/+/, "")       // remove leading slash
    .replace(/\\/g, "/");      // windows "\" → "/"

  return `${BASE_URL}/${cleaned}`;
}


// ===================================================
// FETCH PUBLIC VEHICLES FOR WORLD
// ===================================================
export async function fetchAllPublicVehicles() {
  const res = await fetch(`${BASE_URL}/api/public/vehicles`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error(`Failed to fetch vehicles (${res.status})`);

  const data = await res.json();
  const raw = Array.isArray(data) ? data : data.vehicles ?? [];

  return raw.map((v: any) => {
    const driver = v.driverId || v.driver || {};
    const plate = v.plateNumber ?? v.plate ?? "";

    return {
      id: String(v._id ?? v.id ?? plate),
      plateFull: plate,
      plateShort: plate.split(" ")[0] ?? plate,
      model: v.model ?? "",
      windowType: v.windowType ?? "",
      capacity: Number(v.capacity ?? 0),
      images: Array.isArray(v.images) ? v.images : [],
      driver: {
        firstName: driver.firstName ?? "",
        citizenship: driver.citizenship ?? "",
        level: driver.level ?? "",
        languages: Array.isArray(driver.languages) ? driver.languages : [],
        profileImage: driver.profileImage ?? null,
      },
    };
  });
}
