"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MapPin, Search, Loader2 } from "lucide-react"

// Dynamically import map components to avoid SSR issues
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), {
  ssr: false,
  loading: () => <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
    <Loader2 className="h-6 w-6 animate-spin" />
  </div>
})

const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false })
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false })
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false })

interface AddressMapProps {
  onAddressSelect?: (address: {
    lat: number
    lng: number
    formattedAddress: string
    city: string
    state: string
    zipCode: string
  }) => void
}

export function AddressMap({ onAddressSelect }: AddressMapProps) {
  const [position, setPosition] = useState<[number, number]>([28.6139, 77.2090]) // Default to Delhi
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition([pos.coords.latitude, pos.coords.longitude])
        },
        (error) => {
          console.log("Location access denied:", error)
          // Keep default position (Delhi)
        }
      )
    }
    setIsLoaded(true)
  }, [])

  const searchAddress = async () => {
    if (!searchQuery.trim()) return
    
    setIsSearching(true)
    try {
      // Using OpenStreetMap Nominatim API (free, no API key required)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&countrycodes=in&limit=1`
      )
      const data = await response.json()
      
      if (data && data.length > 0) {
        const result = data[0]
        const lat = parseFloat(result.lat)
        const lng = parseFloat(result.lon)
        
        setPosition([lat, lng])
        
        // Extract address components
        const addressParts = result.display_name.split(", ")
        
        const addressData = {
          lat,
          lng,
          formattedAddress: result.display_name,
          city: extractCity(result),
          state: extractState(result),
          zipCode: extractZipCode(result),
        }
        
        if (onAddressSelect) {
          onAddressSelect(addressData)
        }
      }
    } catch (error) {
      console.error("Geocoding error:", error)
    } finally {
      setIsSearching(false)
    }
  }

  const extractCity = (result: any) => {
    return result.address?.city || 
           result.address?.town || 
           result.address?.village || 
           result.address?.suburb || 
           "Unknown City"
  }

  const extractState = (result: any) => {
    return result.address?.state || 
           result.address?.region || 
           "Unknown State"
  }

  const extractZipCode = (result: any) => {
    return result.address?.postcode || ""
  }

  const handleMapClick = async (e: any) => {
    const { lat, lng } = e.latlng
    setPosition([lat, lng])
    
    try {
      // Reverse geocoding to get address from coordinates
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&countrycodes=in`
      )
      const data = await response.json()
      
      if (data) {
        const addressData = {
          lat,
          lng,
          formattedAddress: data.display_name,
          city: extractCity(data),
          state: extractState(data),
          zipCode: extractZipCode(data),
        }
        
        if (onAddressSelect) {
          onAddressSelect(addressData)
        }
      }
    } catch (error) {
      console.error("Reverse geocoding error:", error)
    }
  }

  if (!isLoaded) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-blue-500" />
          Select Address on Map
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search Bar */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for an address..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              onKeyPress={(e) => e.key === "Enter" && searchAddress()}
            />
          </div>
          <Button 
            onClick={searchAddress} 
            disabled={isSearching || !searchQuery.trim()}
          >
            {isSearching ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Search className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Map */}
        <div className="h-64 rounded-lg overflow-hidden border">
          <MapContainer
            center={position}
            zoom={15}
            style={{ height: "100%", width: "100%" }}
            eventHandlers={{
              click: handleMapClick,
            }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>
                Selected Location<br />
                Lat: {position[0].toFixed(6)}<br />
                Lng: {position[1].toFixed(6)}
              </Popup>
            </Marker>
          </MapContainer>
        </div>

        <div className="text-sm text-muted-foreground">
          <p>💡 Click on the map to select your exact location</p>
          <p>📍 Current position: {position[0].toFixed(4)}, {position[1].toFixed(4)}</p>
        </div>
      </CardContent>
    </Card>
  )
}
