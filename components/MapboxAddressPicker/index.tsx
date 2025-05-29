// components/MapboxAddressPicker.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import Map, { Marker, NavigationControl, ViewState } from "react-map-gl";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!;

mapboxgl.accessToken = MAPBOX_TOKEN;

type Props = {
    onSelect: (data: { address: string; lat: number; lng: number }) => void;
    defaultAddress?: string;
    defaultLat?: number;
    defaultLng?: number;
};

export default function MapboxAddressPicker({
    onSelect,
    defaultAddress = "",
    defaultLat = 21.0285,
    defaultLng = 105.8048,
}: Props) {
    const [address, setAddress] = useState(defaultAddress);
    const [position, setPosition] = useState({ lat: defaultLat, lng: defaultLng });
    const [viewState, setViewState] = useState<ViewState>({
        latitude: defaultLat,
        longitude: defaultLng,
        zoom: 14,
    });

    const mapRef = useRef<any>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (typeof window !== "undefined" && (window as any).MapboxSearch) {
            const geocoder = new (window as any).MapboxSearch.Geocoder();
            geocoder.accessToken = MAPBOX_TOKEN;
            geocoder.options = {
                limit: 5,
                language: "vi",
                country: "VN",
            };

            if (inputRef.current) {
                geocoder.addTo(inputRef.current);
                geocoder.on("result", (e: any) => {
                    const place = e.result;
                    const addr = place.place_name;
                    const [lng, lat] = place.geometry.coordinates;

                    setAddress(addr);
                    setPosition({ lat, lng });
                    setViewState((prev) => ({ ...prev, latitude: lat, longitude: lng }));

                    onSelect({ address: addr, lat, lng });
                });
            }
        }
    }, []);

    const handleDragEnd = (e: any) => {
        const lat = e.lngLat.lat;
        const lng = e.lngLat.lng;
        setPosition({ lat, lng });
        onSelect({ address, lat, lng });
    };
    console.log("defaultAddress", address);
    console.log("defaultAddress", position);
    return (
        <div className="space-y-2">
            <div>
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Nhập địa chỉ khách sạn"
                    className="border w-full px-3 py-2 rounded text-sm"
                    defaultValue={address}
                />
            </div>

            <div className="h-56 rounded overflow-hidden">
                <Map
                    {...viewState}
                    mapboxAccessToken={MAPBOX_TOKEN}
                    mapStyle="mapbox://styles/mapbox/streets-v11"
                    onMove={(evt) => setViewState(evt.viewState)}
                    ref={mapRef}
                    style={{ width: "100%", height: "100%" }}
                >
                    <NavigationControl position="top-left" />
                    <Marker
                        longitude={position.lng}
                        latitude={position.lat}
                        draggable
                        onDragEnd={handleDragEnd}
                    />
                </Map>
            </div>
        </div>
    );
}
