import Vue from 'vue';

import '../css/app.scss';
import './components';

const imagesList = [
    'images/candle.jpg',
    'images/cat.jpg',
    'images/flowers.jpg',
    'images/spider.jpg',
    'images/stars.jpg',
    'images/sunset.jpg'
];

new Vue({
    el: '#app',
    data() {
        return {
            images: imagesList,
            image: imagesList[0],
            aspectRatio: null
        }
    },
    methods: {
        cropperReady(cropper) {
            this.cropper = cropper;
        },
        cropEnd(cropper, event) {
            console.log(cropper.getData());
        }
    },
    watch: {
        aspectRatio(newRatio) {
            if (this.cropper) {
                this.cropper.setAspectRatio(newRatio);
            }
        }
    }
});
