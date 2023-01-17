import { useLoadScript } from "@react-google-maps/api";

/**
 * google maps scriptを読み込む
 */
export function useGoogleMapLoadScript() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY ?? "",
    libraries: ["places"],
    language: "ja",
    region: "JP",
  });

  return {
    loading: !isLoaded,
    error: loadError,
  };
}
