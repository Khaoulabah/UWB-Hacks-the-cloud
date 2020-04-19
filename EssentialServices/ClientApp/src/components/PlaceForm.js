import React from "react";
import { Formik, Field, Form } from "formik";
import { mergeStyleSets } from "@fluentui/react";
import { GoogleApiWrapper } from "google-maps-react";
import { GoogleApiConfig } from "../constants";

function _PlaceForm() {
  return (
    <Formik
      initialValues={{
        name: "Khaoula's Store",
        type: "groceryStore",
        address: "13700 NE 99TH ST, Issaquah, WA 99401",
        coordinates: {},
        hours: {
          monday: {
            openTime: "08:00",
            closeTime: "15:30",
          },
        },
        phoneNumber: "405-555-4019",
        emailAddress: "me@mysite.com",
        social: {
          facebook: "",
          instagram: "",
        },
        options: {
          curbsidePickup: true,
        },
        notes: "",
      }}
      onSubmit={async (values, { setSubmitting }) => {
        const latLong = values.coordinates;
        if (!latLong || !latLong.lat || !latLong.lng) {
          try {
            values.coordinates = await getLatLong(values.address);
          } catch (error) {
            debugger;
          }
        }
        const response = await fetch("api/place", {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify(values),
        });

        await response.json();

        setSubmitting(false);
        // setTimeout(() => {
        //   alert(JSON.stringify(values, null, 2));
        //   setSubmitting(false);
        // }, 500);
      }}
      render={() => (
        <Form className={styles.form}>
          <label htmlFor="name">Name</label>
          <Field
            className={styles.field}
            id="name"
            name="name"
            placeholder=""
            type="text"
          />

          <label htmlFor="type">Type</label>
          <Field
            className={styles.field}
            as="select"
            id="type"
            name="type"
            placeholder=""
            type="text"
          >
            <option value="groceryStore">Grocery Store</option>
            <option value="pharmacy">Pharmacy</option>
            <option value="doctorOffice">Doctor's Office</option>
            <option value="restaurant">Restaurant</option>
          </Field>

          <label htmlFor="address">Adress</label>
          <Field
            className={styles.field}
            id="address"
            name="address"
            placeholder=""
            type="text"
          />

          <label className={styles.inlineFieldTitle} htmlFor="coordinates">
            Coordinates
          </label>
          <Field
            className={styles.inlineField}
            id="coordinates.lat"
            name="coordinates.lat"
            placeholder="Latitude"
            type="number"
          />
          <Field
            className={styles.inlineField}
            id="coordinates.lng"
            name="coordinates.lng"
            placeholder="Longitude"
            type="number"
          />

          <div>Hours</div>
          <div className={styles.hoursContainer}>
            {daysOfWeek.map((day) => (
              <div>
                <div className={styles.inlineFieldTitle}>
                  {capitalizeFirstLetter(day)}
                </div>
                <Field
                  className={styles.inlineField}
                  id={"hours." + day + ".openTime"}
                  name={"hours." + day + ".openTime"}
                  placeholder="Open Time"
                  type="time"
                />
                <Field
                  className={styles.inlineField}
                  id={"hours." + day + ".closeTime"}
                  name={"hours." + day + ".closeTime"}
                  placeholder="Close Time"
                  type="time"
                />
              </div>
            ))}
          </div>

          <label htmlFor="phoneNumber">Phone Number</label>
          <Field
            className={styles.field}
            id="phoneNumber"
            name="phoneNumber"
            placeholder=""
            type="text"
          />

          <label htmlFor="emailAddress">Email</label>
          <Field
            className={styles.field}
            id="emailAddress"
            name="emailAddress"
            placeholder="john@acme.com"
            type="emailAddress"
          />

          <label htmlFor="social.facebook">Facebook</label>
          <Field
            className={styles.field}
            id="social.facebook"
            name="social.facebook"
            placeholder=""
            type="text"
          />

          <label htmlFor="social.instagram">Instagram</label>
          <Field
            className={styles.field}
            id="social.instagram"
            name="social.instagram"
            placeholder=""
            type="text"
          />

          <div>Options</div>
          <Field
            className={styles.inlineField}
            id="options.delivery"
            name="options.delivery"
            type="checkbox"
          />
          <label htmlFor="options.delivery">Delivery</label>
          <Field
            className={styles.inlineField}
            id="options.curbsidePickup"
            name="options.curbsidePickup"
            type="checkbox"
          />
          <label htmlFor="options.curbsidePickup">Curbside pickup</label>

          <button type="submit" style={{ display: "block" }}>
            Submit
          </button>
        </Form>
      )}
    />
  );
}

const styles = mergeStyleSets({
  form: {
    padding: 16,
    maxWidth: 500,
    selectors: {
      label: { margin: 0 },
    },
  },
  field: {
    marginBottom: 16,
    display: "block",
  },
  hoursContainer: {
    marginLeft: 32,
  },
  inlineFieldTitle: {
    width: 80,
    display: "inline-block",
    marginBottom: 8,
  },
  inlineField: {
    marginLeft: 16,
  },
});

const daysOfWeek = [
  "saturday",
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
];

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

let geocoder;
function getLatLong(address) {
  if (!geocoder) geocoder = new window.google.maps.Geocoder();

  return new Promise((resolve, reject) => {
    geocoder.geocode({ address }, (result, status) => {
      if (status !== "OK") return reject(status);

      resolve(result[0].geometry.location);
    });
  });
}

export const PlaceForm = GoogleApiWrapper(GoogleApiConfig)(_PlaceForm);
