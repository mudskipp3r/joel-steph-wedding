'use client';

import React, { useEffect, useRef, useState } from 'react';

// Google Maps type declarations
interface GoogleMapsApi {
  maps: {
    Map: new (element: HTMLElement, options: unknown) => GoogleMapsMap;
    Marker: new (options: unknown) => GoogleMapsMarker;
    Animation: {
      DROP: unknown;
    };
    Size: new (width: number, height: number) => unknown;
    Point: new (x: number, y: number) => unknown;
    LatLng: new (lat: number, lng: number) => unknown;
    LatLngBounds: new () => GoogleMapsLatLngBounds;
  };
}

interface GoogleMapsMap {
  setCenter: (latLng: unknown) => void;
  setZoom: (zoom: number) => void;
  fitBounds: (bounds: unknown) => void;
}

interface GoogleMapsMarker {
  setMap: (map: GoogleMapsMap | null) => void;
}

interface GoogleMapsLatLngBounds {
  extend: (latLng: unknown) => void;
}

declare global {
  interface Window {
    google?: GoogleMapsApi;
  }
}

const venues = [
  {
    id: 1,
    name: "Saint Brigid's Catholic Church",
    address: "Livingstone Rd, Marrickville, NSW 2204",
    coordinates: { lat: -33.9133, lng: 151.1553 },
    type: "Ceremony",
    parking: "Limited street parking available. Public parking at nearby Marrickville Metro (5min walk).",
    publicTransport: {
      train: "Marrickville Station (10min walk) - Inner West Line",
      bus: "Routes 426, 428, 445 - Stop at Marrickville Road"
    }
  },
  {
    id: 2,
    name: "The Sky Ballroom",
    address: "Level 3/462 Chapel Rd, Bankstown NSW 2200",
    coordinates: { lat: -33.9198, lng: 151.0346 },
    type: "Reception",
    parking: "Free parking available at venue. Additional parking at Chapel Road Centre.",
    publicTransport: {
      train: "Bankstown Station (8min walk) - T3 Bankstown Line",
      bus: "Routes 901, 902, 925 - Stop at Chapel Road/Restwell Street"
    }
  }
];

const VenueSection: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<GoogleMapsMap | null>(null);
  const [markers, setMarkers] = useState<GoogleMapsMarker[]>([]);
  const [activeVenue, setActiveVenue] = useState(0); // 0 for ceremony, 1 for reception

  // Initialize Google Maps
  const initializeMap = () => {
    if (!mapRef.current || !window.google?.maps) {
      console.log('Google Maps not ready, retrying...');
      setTimeout(initializeMap, 500);
      return;
    }

    try {
      const newMap = new window.google!.maps.Map(mapRef.current, {
        zoom: 15,
        center: venues[0].coordinates, // Start with ceremony location
        mapTypeId: 'roadmap',
        styles: [
          {
            featureType: 'all',
            elementType: 'geometry.fill',
            stylers: [{ color: '#f8f8f8' }]
          },
          {
            featureType: 'water',
            elementType: 'geometry.fill',
            stylers: [{ color: '#a8d1e0' }]
          },
          {
            featureType: 'poi',
            elementType: 'geometry.fill',
            stylers: [{ color: '#e8f5e8' }]
          }
        ]
      });

      // Create markers for both venues
      const newMarkers: GoogleMapsMarker[] = [];
      venues.forEach((venue, index) => {
        console.log(`Creating marker for ${venue.name} at`, venue.coordinates);
        const marker = new window.google!.maps.Marker({
          position: venue.coordinates,
          map: newMap,
          title: venue.name,
          animation: window.google!.maps.Animation.DROP,
          icon: {
            url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="8" fill="${index === 0 ? '#FF6B6B' : '#4ECDC4'}" stroke="white" stroke-width="2"/>
                <text x="12" y="16" font-family="Arial" font-size="10" fill="white" text-anchor="middle">${index + 1}</text>
              </svg>
            `)}`,
            scaledSize: new window.google!.maps.Size(32, 32),
            anchor: new window.google!.maps.Point(16, 16)
          }
        });
        newMarkers.push(marker);
      });

      console.log('Google Maps initialized with', newMarkers.length, 'markers');

      setMap(newMap);
      setMarkers(newMarkers);
    } catch (error) {
      console.error('Error initializing Google Maps:', error);
    }
  };

  // Switch between venues
  const switchToVenue = (venueIndex: number) => {
    setActiveVenue(venueIndex);
    if (map && venues[venueIndex]) {
      const venue = venues[venueIndex];
      map.setCenter(new window.google!.maps.LatLng(venue.coordinates.lat, venue.coordinates.lng));
      map.setZoom(15);
    }
  };

  // Open Google Maps with directions
  const openGoogleMaps = () => {
    const venue = venues[activeVenue];
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue.address)}`;
    window.open(url, '_blank');
  };

  // Load Google Maps API
  useEffect(() => {
    if (window.google?.maps) {
      initializeMap();
      return;
    }

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      console.error('Google Maps API key not found');
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=geometry&v=3.54`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      console.log('Google Maps script loaded');
      setTimeout(initializeMap, 100);
    };

    script.onerror = (error) => {
      console.error('Failed to load Google Maps script:', error);
    };

    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <section
      className="venue-section"
      style={{
        padding: '3rem 2rem',
        background: 'transparent', // No background - managed by BackgroundColorManager
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.5rem' // Tightened spacing
      }}
    >
      <h2
        style={{
          fontFamily: 'Cardo, serif',
          fontSize: 'clamp(3rem, 6vw, 5rem)',
          color: 'white',
          fontWeight: '400',
          letterSpacing: '-0.02em',
          margin: '0',
          textAlign: 'center'
        }}
      >
        Venues
      </h2>

      {/* Navigation Toggle */}
      <div
        style={{
          display: 'flex',
          background: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '25px',
          padding: '4px',
          gap: '4px',
          boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)'
        }}
      >
        {venues.map((venue, index) => (
          <button
            key={venue.id}
            onClick={() => switchToVenue(index)}
            style={{
              fontFamily: 'Instrument Sans, sans-serif',
              fontSize: '1rem',
              fontWeight: '500',
              padding: '12px 24px',
              borderRadius: '20px',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              background: activeVenue === index ? '#FF6B6B' : 'transparent',
              color: activeVenue === index ? 'white' : '#666',
            }}
          >
            {venue.type}
          </button>
        ))}
      </div>

      {/* Map Container with Overlay */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1000px', // Larger map
          height: '600px', // Larger height
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
          border: '3px solid white'
        }}
      >
        <div
          ref={mapRef}
          style={{
            width: '100%',
            height: '100%'
          }}
        />

        {/* Overlaid Venue Information */}
        <div
          style={{
            position: 'absolute',
            top: '8px',
            left: '8px',
            bottom: '8px',
            width: 'calc(30% - 8px)', // Expanded to 30% to fit more content
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '12px',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(5px)',
            overflowY: 'auto'
          }}
        >
          {/* Venue Header */}
          <div style={{ marginBottom: '1rem' }}>
            <h3
              style={{
                fontFamily: 'Cardo, serif',
                fontSize: '1.6rem',
                color: '#1a1a1a',
                fontWeight: '400',
                marginBottom: '0.25rem',
                textAlign: 'left'
              }}
            >
              {venues[activeVenue].type}
            </h3>
            <h4
              style={{
                fontFamily: 'Instrument Sans, sans-serif',
                fontSize: '1rem',
                color: '#333',
                fontWeight: '500',
                marginBottom: '0.5rem',
                textAlign: 'left'
              }}
            >
              {venues[activeVenue].name}
            </h4>
            <p
              style={{
                fontFamily: 'Instrument Sans, sans-serif',
                fontSize: '0.85rem',
                color: '#666',
                fontWeight: '400',
                lineHeight: '1.3',
                textAlign: 'left',
                marginBottom: '1rem'
              }}
            >
              {venues[activeVenue].address}
            </p>
          </div>

          {/* Google Maps CTA Button */}
          <button
            onClick={openGoogleMaps}
            style={{
              fontFamily: 'Instrument Sans, sans-serif',
              fontSize: '0.9rem',
              fontWeight: '500',
              color: 'white',
              background: '#4285F4', // Google Maps blue
              border: 'none',
              borderRadius: '8px',
              padding: '10px 16px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#3367D6';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#4285F4';
            }}
          >
            🗺️ Open in Google Maps
          </button>

          {/* Parking Information */}
          <div style={{ marginBottom: '1rem' }}>
            <h5
              style={{
                fontFamily: 'Instrument Sans, sans-serif',
                fontSize: '0.9rem',
                color: '#1a1a1a',
                fontWeight: '600',
                marginBottom: '0.5rem'
              }}
            >
              🚗 Parking
            </h5>
            <p
              style={{
                fontFamily: 'Instrument Sans, sans-serif',
                fontSize: '0.8rem',
                color: '#666',
                fontWeight: '400',
                lineHeight: '1.3',
                marginBottom: '0'
              }}
            >
              {venues[activeVenue].parking}
            </p>
          </div>

          {/* Public Transport Information */}
          <div>
            <h5
              style={{
                fontFamily: 'Instrument Sans, sans-serif',
                fontSize: '0.9rem',
                color: '#1a1a1a',
                fontWeight: '600',
                marginBottom: '0.5rem'
              }}
            >
              🚊 Public Transport
            </h5>
            <div style={{ marginBottom: '0.5rem' }}>
              <p
                style={{
                  fontFamily: 'Instrument Sans, sans-serif',
                  fontSize: '0.8rem',
                  color: '#666',
                  fontWeight: '500',
                  lineHeight: '1.3',
                  marginBottom: '0.25rem'
                }}
              >
                🚂 Train:
              </p>
              <p
                style={{
                  fontFamily: 'Instrument Sans, sans-serif',
                  fontSize: '0.75rem',
                  color: '#666',
                  fontWeight: '400',
                  lineHeight: '1.3',
                  marginBottom: '0.5rem',
                  paddingLeft: '1rem'
                }}
              >
                {venues[activeVenue].publicTransport.train}
              </p>
            </div>
            <div>
              <p
                style={{
                  fontFamily: 'Instrument Sans, sans-serif',
                  fontSize: '0.8rem',
                  color: '#666',
                  fontWeight: '500',
                  lineHeight: '1.3',
                  marginBottom: '0.25rem'
                }}
              >
                🚌 Bus:
              </p>
              <p
                style={{
                  fontFamily: 'Instrument Sans, sans-serif',
                  fontSize: '0.75rem',
                  color: '#666',
                  fontWeight: '400',
                  lineHeight: '1.3',
                  marginBottom: '0',
                  paddingLeft: '1rem'
                }}
              >
                {venues[activeVenue].publicTransport.bus}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VenueSection;