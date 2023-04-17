import { useState, useEffect } from 'react';
import React from 'react';
import Head from 'next/head';
import {  FormGroup, Label} from "reactstrap";
import { FormControl } from 'react-bootstrap';

export default function MyPage() {
  const [location, setLocation] = useState('');

  useEffect(() => {
    // Initialize Google Maps Autocomplete
    const autoComplete = new google.maps.places.Autocomplete(
      document.getElementById('location-input')
    );

    // Listen for place changes
    autoComplete.addListener('place_changed', () => {
      const place = autoComplete.getPlace();

      if (place.geometry && place.geometry.location) {
        setLocation(place.formatted_address);
      }
    });
  }, []);

  return (
    <div>
      <Head>
        <script src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyCF4NLOSeVNrdFSVF730XPt83wjDihtYBo&libraries=places`}></script>
      </Head>
      <div className="form_group">
        <FormGroup className="mb-3" controlId="formBasicEmail">
          <Label>Location</Label>
          <FormControl
            type="text"
            placeholder="Enter Location"
            name="location"
            id="location-input"
            value={location}
            className="form_control"
            style={{ border: '1px solid grey' }}
          />
        </FormGroup>
      </div>
    </div>
  );
}
