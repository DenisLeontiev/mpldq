<template>
    <section class="view-section p-b-0">
       
        <div class="view-grid view-grid--align-center">
            <div class="view-grid__column view-grid__column--12">
                <div class="view-container">
                    <h2 class="view-title view-title--h2 view-title--section text-medium">
                        {{title}}
                    </h2>
                </div>
               
            </div>

            <div class="view-grid__column view-grid__column--12 view-competition-map">
                <div>
                    <div class="view-placefinder__map__board" id="map" ref="googleMap" style="height: 660px"></div>
                </div>

            </div>
        </div>

       
    </section>
</template>

<script>
import GoogleMapsApiLoader from 'google-maps-api-loader';

export default {
    props: {
        title: String,
        location: {
            type: Object,
            default: function (){
                return {
                    lat: '0',
                    lng: '0'
                }
            }
        }
    },
    data() {
        return {
            google: null,
            map: null,
            bounds: null,
        }
  },

  methods: {
        initializeMap() {
            this.map = new this.google.maps.Map(
                document.getElementById("map"), {
                    center: { lat: parseFloat(this.location.lat), lng: parseFloat(this.location.lng) },
                    zoom: 14
                }
            );
        
            const location = new this.google.maps.LatLng(parseFloat(this.location.lat), parseFloat(this.location.lng));
            new this.google.maps.Marker({
                position: location,
                map: this.map,
                status: 'active'
            })
        }
  },
  async mounted() {
        const googleMapApi = await GoogleMapsApiLoader({
            apiKey: process.env.VUE_APP_GOOGLE_TOKEN
        });
        this.google = googleMapApi;
        this.initializeMap();
    }
}
</script>